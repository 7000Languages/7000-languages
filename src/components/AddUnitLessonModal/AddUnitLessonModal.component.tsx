import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image, View, Text, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Toast from 'react-native-toast-message';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs'
import uuid from 'react-native-uuid';

import styles from './AddUnitLessonModal.style'

import { CourseType, UnitType } from '../../@types'
import { PRIMARY_COLOR } from '../../constants/colors'
import { realmContext } from '../../realm/realm'
import CustomInput from '../CustomInput/CustomInput.component'
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn.component'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Unit from '../../realm/schemas/Unit'
import { requestCameraPermission } from '../../utils/helpers'
import { useAppSelector } from '../../redux/store'
import Course from '../../realm/schemas/Course'

type IProps = {
    isModalVisible: boolean
    type: 'unit' | 'lesson'
    onCloseModal: () => void
    course: Course & Realm.Object<unknown, never>
    unit?: UnitType
}

const { useRealm, useQuery } = realmContext

const AddUnitLessonModal: React.FC<IProps> = ({ isModalVisible, type, onCloseModal, course, unit }) => {

    const [name, setName] = useState('');
    const [image, setImage] = useState<any>();
    const [selectingImage, setSelectingImage] = useState(false);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    // Error states
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [emojiError, setEmojiError] = useState('');

    const units = useQuery('units');
    const lessons = useQuery('lessons');

    const user  = useAppSelector(state=>state.auth.user)

    const resetErrorStates = () => {
        setNameError('');
        setDescriptionError('');
        setEmojiError('');
    }

    const resetStates = () => {
        setName('');
        setDescription('');
        setImage(undefined);
    }

    const realm = useRealm()

    const openPicker = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: false,
          includeBase64: true
        }).then(image => {
          // //console.log(image);
          setImage(image);
          setSelectingImage(prev => !prev);
        });
    };

    const openCamera = () => {
        requestCameraPermission()
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
            includeBase64: true
          }).then(image => {
            // //console.log(image);
            setImage(image);
            setSelectingImage(prev => !prev);
          });
    };

    const addUnit = async () => {
      setLoading(true);
      resetErrorStates();
      let hasError = false;
      if (name.length < 5) {
        setNameError('Name of the unit is too short');
        hasError = true;
      }
      if (description.length < 5) {
        setDescriptionError('Description of the unit is too short');
        hasError = true;
      }
      if (hasError) {
        setLoading(false);
        return;
      }

      let baseDirectory = RNFS.DocumentDirectoryPath;

      let newFolderPath = '';
      let newActualPath = '';
      let fileName = '';
      let fileSize = '';
      let height = '';
      let width = '';
      let type = '';

      let uniqueId = uuid.v4();

      if (typeof image !== undefined && image) {

        fileName =
          Platform.OS == 'android'
            ? image.path.split('/').pop()
            : image.filename;
        fileSize = image.size;
        height = image.height;
        width = image.width;
        type = image.mime;

        newFolderPath = `${course?._id}/${uniqueId}/image`;
        newActualPath = `${course?._id}/${uniqueId}/image/${fileName}`;

        await RNFS.mkdir(`${baseDirectory}/${newFolderPath}`).then(() => {
          // COPY the file
          RNFS.writeFile(
            `${baseDirectory}/${newActualPath}`,
            image.data,
            'base64',
          )
            .then(() => {
              //console.log('Image saved!!!');
            })
            .catch(err => {
              //console.log(err.message);
            });
        });
      }

      realm.write(() => {
        let numberOfUnits = units.filtered(
          '_course_id = $0',
          course?._id.toString(),
        ).length;
        realm.create('units', {
          _course_id: course?._id.toString(),
          _user_id: user._id,
          name,
          _order: numberOfUnits + 1,
          selected: false,
          description,
          local_image_path: newFolderPath,
          image_metadata: {
            fileName: newActualPath,
            fileSize,
            height,
            type,
            width,
          },
        });
      });

      Toast.show({
        type: 'success',
        text1: 'Hurray 🌟',
        visibilityTime: 5000,
        text2: 'Unit added successfully',
      });
      onCloseModal();
      resetStates();
      setLoading(false);
    }

    const addLesson = async () => {
        setLoading(true);
        resetErrorStates()
        let hasError = false;
        if (name.length < 5) {
            setNameError('Name of the lesson is too short');
            hasError = true;
        }
        if (description.length < 5) {
            setDescriptionError('Description of the lesson is too short');
            hasError = true;
        }
        if (hasError) {
            setLoading(false)
            return
        }

        let baseDirectory = RNFS.DocumentDirectoryPath;

        let newFolderPath = '';
        let newActualPath = '';
        let fileName = '';
        let fileSize = '';
        let height = '';
        let width = '';
        let type = '';

        let uniqueId = uuid.v4();

        if (typeof image !== undefined && image) {
          fileName =
            Platform.OS == 'android'
              ? image.path.split('/').pop()
              : image.filename;
          fileSize = image.size;
          height = image.height;
          width = image.width;
          type = image.mime;

          newFolderPath = `${course?._id}/${unit?._id.toString()}/${uniqueId}/image`;
          newActualPath = `${course?._id}/${unit?._id.toString()}/${uniqueId}/image/${fileName}`;

          await RNFS.mkdir(`${baseDirectory}/${newFolderPath}`).then(() => {
            // COPY the file
            RNFS.writeFile(
              `${baseDirectory}/${newActualPath}`,
              image.data,
              'base64',
            )
              .then(() => {
                //console.log('Image saved!!!');
              })
              .catch(err => {
                //console.log(err.message);
              });
          });
        }

        realm.write(() => {
            let numberOfLessons = lessons.filtered('_unit_id = $0', unit?._id.toString()).length
            realm.create('lessons', {
              _course_id: course?._id.toString(),
              _user_id: user._id,
              _unit_id: unit?._id.toString(),
              name,
              _order: numberOfLessons + 1,
              selected: false,
              description,
              local_image_path: newFolderPath,
              image_metadata: {
                fileName: newActualPath,
                fileSize,
                height,
                type,
                width,
              },
            });
        })



        Toast.show({
            type: 'success',
            text1: 'Hurray 🌟',
            visibilityTime: 5000,
            text2: 'Lesson added successfully',
        });

        onCloseModal();
        resetStates()
        setLoading(false)

    }

    const toggleImageSelection = () => setSelectingImage(prev => !prev);

     // animations
     const scale = useSharedValue(0);
     const right = useSharedValue(-10);
 
     const scaleAnimatedStyles = useAnimatedStyle(() => {
         return {
             transform: [{ scale: scale.value }],
             right: right.value,
         };
     });
 
    useEffect(() => {
      setSelectingImage(false)
    }, [])
    
    const animationChanges = () => {
        const scaleToValue = !selectingImage ? 0 : 1;
        const rightToValue = !selectingImage ? -100 : 0;
        scale.value = withTiming(scaleToValue, { duration: 600 });
        right.value = withTiming(rightToValue, { duration: 400 });
    }

    useEffect(() => {
        animationChanges()
    }, [selectingImage])

    return (
        <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={styles.inputsContianer} keyboardShouldPersistTaps='always'>
                    {/* Animated view for camera or gallery */}
                    <Animated.View
                        style={[styles.textAndIconsContainer, scaleAnimatedStyles]}>
                        <TouchableOpacity onPress={openCamera} style={styles.cameraTextAndIcon}>
                            <Feather name="camera" size={22} color="#227093" />
                            <Text style={styles.iconText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openPicker} style={styles.cameraTextAndIcon}>
                            <Feather name="image" size={22} color="#227093" />
                            <Text style={styles.iconText}>Gallery</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Add Custom {type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                            <AntDesign name='close' size={24} color="#111827" onPress={onCloseModal} />
                        </View>
                        <View style={styles.suggestion}>
                            <View style={{ marginBottom: 6, alignItems: 'center', flexDirection: 'row', height: 20 }}>
                                <MaterialCommunityIcons name="lightbulb-on" size={15} color="#496277" />
                                <Text style={[styles.suggestionText, { marginLeft: 5, marginTop: 3 }]}>Suggestion</Text>
                            </View>
                            <Text style={styles.suggestionText}>When creating a {type}, think about how it will be used. More text here explaining what they should look for when making a {type}.</Text>
                        </View>
                        <CustomInput
                            label={`Give your ${type} a name`}
                            value={name}
                            errorText={nameError}
                            onChangeText={(text: string) => setName(text)}
                        />

                        {
                            image ?
                                <View style={styles.imageAndIcon}>
                                    <Image source={{ uri: image.path }} style={styles.image} />
                                    <AntDesign name="close" size={24} color="black" style={{ position: 'absolute', top: 5, right: 20 }} onPress={() => setImage(undefined)} />
                                </View>
                                :
                                <TouchableOpacity style={styles.addImageView} onPress={toggleImageSelection}>
                                    <Entypo name="image-inverted" size={26} color="#9F3E1A" />
                                    <Text style={styles.addImageText}>Add Image</Text>
                                </TouchableOpacity>
                        }

                        <CustomInput
                            label={`What are the learning goals for this ${type}`}
                            value={description}
                            errorText={descriptionError}
                            onChangeText={(text: string) => setDescription(text)}
                            textArea={true}
                        />
                        {
                            loading
                                ?
                                <ActivityIndicator color={PRIMARY_COLOR} size='large' />
                                :
                                <PrimaryBtn
                                    label={`Create ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                                    onPress={type == 'unit' ? addUnit : addLesson}
                                />
                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default AddUnitLessonModal