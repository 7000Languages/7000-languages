import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message'
import  * as ImagePicker from 'react-native-image-picker';

import Sound from 'react-native-sound'
import * as RNFS from 'react-native-fs'

import Modal from 'react-native-modal'
import CustomInput from '../CustomInput/CustomInput.component'
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn.component'
import _, { ImageOrVideo } from 'react-native-image-crop-picker';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'

import styles from './AddVocabModal.style'
import { CourseType, LessonType, VocabType } from '../../@types'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { PRIMARY_COLOR } from '../../constants/colors'
import { realmContext } from '../../realm/realm'
import { BSON } from 'realm'
import { uploadFileToS3 } from '../../utils/s3'
import { formatAudioDuration, requestCameraPermission } from '../../utils/helpers'

type IProps = {
    isModalVisible: boolean
    onCloseModal: () => void
    course: CourseType
    lesson: LessonType
}

let duration = 0


Sound.setCategory('Playback', true);

const AddVocabModal: React.FC<IProps> = ({ isModalVisible, onCloseModal, course, lesson }) => {

    const [original, setOriginal] = useState('');
    const [translation, setTranslation] = useState('');
    const [context, setContext] = useState('');
    const [image, setImage] = useState<any>();
    const [audio, setAudio] = useState<any>({ uri: '' });
    const [imageToUpload, setImageToUpload] = useState(null);
    const [audioToUpload, setAudioToUpload] = useState(null);
    const [audioDuration, setAudioDuration] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [selectingImage, setSelectingImage] = useState(false);
    const [loading, setLoading] = useState(false);

    // Error states
    const [originalError, setOriginalError] = useState('');
    const [translationError, setTranslationError] = useState('');

    // animations
    const scale = useSharedValue(0);
    const right = useSharedValue(-10);

    const scaleAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            right: right.value,
        };
    });

    const { useRealm } = realmContext
    const realm = useRealm()

    const openPicker = () => {
        ImagePicker.launchImageLibrary({
            // maxWidth: 500,
            mediaType: 'photo'
        }, (response) =>{
            setImage(response.assets![0]);
            console.log(response.assets![0]);
            setSelectingImage(prev => !prev);
        });
    };

    const openCamera = () => {
        requestCameraPermission()
        ImagePicker.launchCamera({
            cameraType: 'back',
            mediaType: 'photo'
        }).then(response => {
            setImage(response.assets![0]);
            console.log(response.assets![0]);
        });
    };

    const pickAudioFile = () => {
        DocumentPicker.pickSingle({
            type: [DocumentPicker.types.audio, DocumentPicker.types.images]
        }).then(result => {
            console.log(result);
            // setImage(result)
            setAudio(result)
            console.log(result)
        }).catch(err => {
            console.log("Audio file error: " + err);
        })
    }

    const currentAudio = useMemo(() =>
        new Sound(audio.uri,
            undefined,
            error => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // if loaded successfully
                duration = currentAudio.getDuration()
                setAudioDuration(duration)
            },
        ),
        [audio?.uri])

    const playPause = () => {
        if (currentAudio.isPlaying()) {
            console.log("Audio is playing");
            currentAudio.pause();
            setPlaying(false)
        } else {
            setPlaying(true);
            currentAudio.play(success => {
                if (success) {
                    setPlaying(false);
                    console.log('successfully finished playing');
                } else {
                    setPlaying(false);
                    console.log('playback failed due to audio decoding errors');
                }
            });
        }
    }

    const toggleImageSelection = () => setSelectingImage(prev => !prev);

    const animationChanges = () => {
        const scaleToValue = !selectingImage ? 0 : 1;
        const rightToValue = !selectingImage ? -100 : 0;
        scale.value = withTiming(scaleToValue, { duration: 600 });
        right.value = withTiming(rightToValue, { duration: 400 });
    }

    useEffect(() => {
        animationChanges();
    }, [selectingImage])

    useEffect(() => {
      
    }, [isModalVisible])
    

    const resetErrorStates = () => {
        setOriginalError('');
        setTranslationError('');
    }
    const resetStates = () => {
        setOriginal('');
        setTranslation('');
        setContext('')
        setImage(undefined)
        setAudio(undefined)
    }

    const addItem = async () => {
        // resetErrorStates();
        // setLoading(true);
        // let hasError = false;

        // if (original.length < 2) {
        //     setOriginalError('Vocab text is too short');
        //     hasError = true;
        // }
        // if (translation.length < 2) {
        //     setTranslationError('Vocab translation is too short');
        //     hasError = true;
        // }
        // if (hasError) {
        //     setLoading(false);
        //     return;
        // }

        // let newVocab: VocabType

        // realm.write(() => {
        //     newVocab = {
        //         _id: new BSON.ObjectId() as any,
        //         _order: lesson.vocab.length,
        //         original,
        //         translation,
        //         image: '',
        //         audio: '',
        //         hidden: false,
        //         selected: false,
        //         notes: context
        //     }
        //     lesson.vocab.push(newVocab)

        // });

        // Toast.show({
        //     type: 'success',
        //     text1: 'Hurray 🌟',
        //     visibilityTime: 5000,
        //     text2: 'Vocab added successfully',
        // });

        if(typeof image !== undefined && image){
            let fileName = image.fileName

                const resultToUpload = await uploadFileToS3(fileName, image, image.type)
                console.log(resultToUpload);
                
        }

        setLoading(false);
        // resetStates()
    }

    return (
        <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.inputsContianer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'
                >

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
                            <Text style={styles.title}>Add a Vocab Item</Text>
                            <AntDesign name='close' size={24} color="#111827" onPress={onCloseModal} />
                            <Text style={styles.subTitle}>A vocab item can be a word or a phrase</Text>
                        </View>
                        <CustomInput
                            label={`${course.details.name}*`}
                            value={original}
                            errorText={originalError}
                            onChangeText={(text: string) => setOriginal(text)}
                        />
                        {
                            audio.uri.length > 0 ?
                                <View style={styles.textAndIcon}>
                                    <AntDesign name="close" size={20} color="black" style={{ position: 'absolute', bottom: -25, right: 14 }} onPress={() => setAudio({uri:''})} />
                                    <Text>{formatAudioDuration(duration)}</Text>
                                    <Ionicons
                                        name={!playing ? 'play-circle-sharp' : 'pause-circle-sharp'}
                                        size={26}
                                        color="#5B6165"
                                        style={{ position: 'absolute', right: 10 }}
                                        onPress={playPause}
                                    />
                                </View>
                                :
                                <TouchableOpacity style={styles.audioContainer} onPress={pickAudioFile}>
                                    <FontAwesome5 name="file-audio" size={18} color="#9F3E1A" />
                                    <Text style={styles.addAudio}>Add audio</Text>
                                </TouchableOpacity>
                        }
                        <CustomInput
                            label={`${course.details.translated_language}*`}
                            value={translation}
                            errorText={translationError}
                            onChangeText={(text: string) => setTranslation(text)}
                        />
                        <CustomInput
                            label='Context'
                            subLabel='Use this space to give additional information about the Vocab Item, such as grammatical and cultural information, usage, or additional translations/meanings.'
                            value={context}
                            onChangeText={(text: string) => setContext(text)}
                            textArea={true}
                        />
                        {
                            image ?
                                <View style={styles.imageAndIcon}>
                                    <Image source={{ uri: image.uri }} style={styles.image} resizeMode='contain' />
                                    <AntDesign name="close" size={24} color="black" style={{ position: 'absolute', top: 5, right: 20 }} onPress={() => setImage(undefined)} />
                                </View>
                                :
                                <TouchableOpacity style={styles.addImageView} onPress={toggleImageSelection}>
                                    <Entypo name="image-inverted" size={26} color="#9F3E1A" />
                                    <Text style={styles.addImageText}>Add Image</Text>
                                </TouchableOpacity>
                        }
                        {
                            loading
                                ?
                                <ActivityIndicator style={{ alignSelf: 'center' }} size={'small'} color={PRIMARY_COLOR} />
                                :
                                <PrimaryBtn
                                    label="Add Item"
                                    onPress={addItem}
                                />
                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default AddVocabModal