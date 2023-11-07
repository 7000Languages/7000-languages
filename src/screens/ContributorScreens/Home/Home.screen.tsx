import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, Platform, Image, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import RNFS from 'react-native-fs';

import styles from './Home.style';

import {CourseStackParamList} from '../../../navigation/types';
import {FocusAwareStatusBar, Header, PrimaryBtn} from '../../../components';
import {PRIMARY_COLOR} from '../../../constants/colors';
import {DrawerActions} from '@react-navigation/native';
import {realmContext} from '../../../realm/realm';
import {UnitType, UserType} from '../../../@types';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {convertToArrayOfPlainObject, convertToPlainObject} from '../../../utils/helpers';
import {uploadFileToS3} from '../../../utils/s3';
import { BSON } from 'realm';
import { getFileFromS3 } from '../../../utils/s3';
import { save } from '../../../utils/storage';
import { setDownloadedUnits } from '../../../redux/slices/unitsSlice';
import { setDownloadedLessons } from '../../../redux/slices/lessonsSlice';
import { setDownloadedVocabs } from '../../../redux/slices/vocabsSlice';
import CourseUnitItem from "../../../components/CourseUnitLessonItem/CourseUnitLessonItem.component";
import Course from "../../../realm/schemas/Course";
import Unit from "../../../realm/schemas/Unit";
import User from "../../../realm/schemas/User";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Lesson from '../../../realm/schemas/Lesson';
import Vocab from '../../../realm/schemas/Vocab';

const {useRealm, useQuery} = realmContext;

type NavProps = NativeStackScreenProps<CourseStackParamList, 'Home'>;

const Home: React.FC<NavProps> = ({navigation}) => {
  const realm = useRealm();
  
  // redux states
  const user: UserType = useAppSelector(state => state.auth.user);
 
  
  console.log("admin languages", user.adminLanguages);
  const userGoogleInfo = useAppSelector(state => state.auth.userGoogleInfo);
  const {i18n} = useAppSelector(state => state.locale);
  const downloadedUnits = useAppSelector(state => state.units.downloadedUnits);
  const downloadedLessons = useAppSelector(state => state.lessons.downloadedLessons);
  const downloadedVocabs = useAppSelector(state => state.vocabs.downloadedVocabs);

  const { useQuery, useObject } = realmContext

  const coursesNavigation = useNavigation<NativeStackNavigationProp<CourseStackParamList>>()

  const userFromRealm = useObject(User, new BSON.ObjectId(user._id))!  
  const coursesData = useQuery(Course) 
  const allUnits = useQuery(Unit)
  let adminCourses = coursesData.filter((course: Course & Realm.Object) => course.admin_id == (user).authID)
  let learnerCourses = coursesData.filter((course: Course & Realm.Object) => (user).learnerLanguages.includes((course._id.toString())))
  
  const goToContributorCourse = (course_id: string) => coursesNavigation.navigate('ContributorCourse', { course_id })
  const goToLearnerCourse = (course_id: string) => coursesNavigation.navigate('LearnerCourse', { course_id })
  const dispatch = useAppDispatch()
  
  realm.subscriptions.update(subs => {
    subs.add(
      realm
        .objects('activityLevels'),
      {
        name: 'activityLevelSubscription',
      },
    );
    subs.add(
      realm
        .objects('activities'),
      {
        name: 'activitySubscription',
      },
    );
  });

  /**
   * From here we are taking care of uploading and downloading files to and from s3.
   * Here there is just a SINGLE SOURCE OF TRUTH(where files are stored and read from), which is the users
   * device. We upload from the user's device or download to the user's device depending on
   * whether the user is currently having an internet connection that is reachable to the internet
   */


  // Units, Lessons and Vocabs with Local files
  let unitsWithLocalFiles: any = useQuery(Unit).filter(
    (unit: any) =>
      unit._user_id == user._id &&
      unit.local_image_path &&
      unit.local_image_uploaded == false,
  );

  let lessonsWithLocalFiles: any = useQuery(Lesson).filter(
    (lesson: any) =>
      lesson._user_id == user._id &&
      lesson.local_image_path &&
      lesson.local_image_uploaded == false,
  );

  let vocabsWithLocalFiles: any = useQuery(Vocab).filter(
    (vocab: any) =>
      vocab._user_id == user._id &&
      ((vocab.local_image_path.length > 0 && vocab.local_image_uploaded == false) ||
        (vocab.local_audio_path.length > 0 && vocab.local_audio_uploaded == false)),
  );

  console.log(JSON.stringify(user.avatar));
  
  // Units, Lessons and Vocabs that have not been downloaded yet
  let unitsNotDownloaded: any = useQuery('units').filter(
    (unit: any) =>
      ((user).adminLanguages.includes(
        unit._course_id,
      ) ||
        (user).learnerLanguages.includes(
          unit._course_id,
        ))
         &&
      !downloadedUnits.includes(unit._id),
  );

  let lessonsNotDownloaded: any = useQuery('lessons').filter(
    (lesson: any) =>
      (convertToPlainObject(user).adminLanguages.includes(
        lesson._course_id,
      ) ||
        convertToPlainObject(user).learnerLanguages.includes(
          lesson._course_id,
        ))
         &&
      !downloadedLessons.includes(lesson._id),
  );

  let vocabsNotDownloaded: any = useQuery('vocabs').filter(
    (vocab: any) =>
      ((user).adminLanguages.includes(
        vocab._course_id,
      ) ||
        (user).learnerLanguages.includes(
          vocab._course_id,
        ))
         &&
      !downloadedVocabs.includes(vocab._id),
  );
  
  
  let baseDirectory = RNFS.DocumentDirectoryPath;

  // Uploading Unit, Lesson, and Vocab files to S3
  const uploadLocalUnitFilesTos3 = async () => {
    for (let unitWithLocalFiles of unitsWithLocalFiles) {
      const {fileName, fileSize, height, type, width} =
        unitWithLocalFiles.image_metadata;
      const response = await RNFS.readDir(
        `${baseDirectory}/${unitWithLocalFiles.local_image_path}`,
      );
      let file = response[0];
      console.log(response);

      let dataToUpload = {
        fileName,
        fileSize,
        height,
        type,
        uri: Platform.OS == 'android' ? 'file://' + file.path : file.path,
        width,
      };
      const resultToUpload = await uploadFileToS3(
        fileName!,
        dataToUpload,
        type!,
      );

      console.log('uploaded successfully', resultToUpload);

      // If file uploads successfuly, change the uploaded fields to true
      if (resultToUpload) {
        realm.write(() => {
          unitWithLocalFiles.local_image_uploaded = true;
          unitWithLocalFiles.image = unitWithLocalFiles.image_metadata.fileName;
        });
      }
    }
  };

  const uploadLocalLessonFilesTos3 = async () => {
    for (let lessonWithLocalFiles of lessonsWithLocalFiles) {
      const {fileName, fileSize, height, type, width} =
      lessonWithLocalFiles.image_metadata;
      const response = await RNFS.readDir(
        `${baseDirectory}/${lessonWithLocalFiles.local_image_path}`,
      );
      let file = response[0];
      console.log(response);

      let dataToUpload = {
        fileName,
        fileSize,
        height,
        type,
        uri: Platform.OS == 'android' ? 'file://' + file.path : file.path,
        width,
      };
      const resultToUpload = await uploadFileToS3(
        fileName!,
        dataToUpload,
        type!,
      );

      console.log('uploaded successfully', resultToUpload);

      // If file uploads successfuly, change the uploaded fields to true
      if (resultToUpload) {
        realm.write(() => {
          lessonWithLocalFiles.local_image_uploaded = true;
          lessonWithLocalFiles.image = lessonWithLocalFiles.image_metadata.fileName;
        });
      }
    }
  };

  const uploadLocalVocabFilesTos3 = async () => {
    for (let vocabWithLocalFiles of vocabsWithLocalFiles) {      
      const {imageName, imageSize, imageHeight, imageType, imageWidth} = vocabWithLocalFiles.image_metadata;
      const {audioName, audioSize, audioType} = vocabWithLocalFiles.audio_metadata;

      // For image upload
      if(vocabWithLocalFiles.local_image_path.length > 0) {
        const imageResponse = await RNFS.readDir(
          `${baseDirectory}/${vocabWithLocalFiles.local_image_path}`,
        );

        let imageFile = imageResponse[0];
        
        let imageToUpload = {
          imageName,
          imageSize,
          imageHeight,
          imageType,
          imageWidth,
          uri: Platform.OS == 'android' ? 'file://' + imageFile.path : imageFile.path,
        };
  
        const imageResultToUpload = await uploadFileToS3(
          imageName!,
          imageToUpload,
          imageType!,
        );
  
        console.log('Image uploaded successfully', imageResultToUpload);
  
        // If image file uploads successfuly, change the uploaded fields to true
        if (imageResultToUpload) {
          realm.write(() => {
            vocabWithLocalFiles.local_image_uploaded = true;
            vocabWithLocalFiles.image = vocabWithLocalFiles.image_metadata.imageName;
          });
        }

      }

      // For audio upload
      if(vocabWithLocalFiles.local_audio_path.length > 0) {
        const audioResponse = await RNFS.readDir(
          `${baseDirectory}/${vocabWithLocalFiles.local_audio_path}`,
        );
  
        let audioFile = audioResponse[0];
      
        let audioToUpload = {
          audioName,
          audioSize,
          audioType,
          uri: Platform.OS == 'android' ? 'file://' + audioFile.path : audioFile.path,
        };
  
        console.log("Audio to upload", audioToUpload);
        // return
        const audioResultToUpload = await uploadFileToS3(
          audioName!,
          audioToUpload,
          audioType!,
        );
  
        console.log('Audio uploaded successfully', audioResultToUpload);
  
        // If audio file uploads successfuly, change the uploaded fields to true
        if (audioResultToUpload) {
          realm.write(() => {
            vocabWithLocalFiles.local_audio_uploaded = true;
            vocabWithLocalFiles.audio = vocabWithLocalFiles.audio_metadata.audioName;
          });
        }
      }
    }
  };

  // Download Unit, Lesson and Vocab files from S3
  const downloadUnitFilesFromS3 = async () => {
    for (let unitNotDownloaded of unitsNotDownloaded){
      if(unitNotDownloaded.image.length > 0){
        console.log(unitNotDownloaded.image);
        const resultToSave = await getFileFromS3(unitNotDownloaded.image);

        // Convert to base64 string
        const streamToString = await resultToSave.Body?.transformToString("base64");

        await RNFS.mkdir( baseDirectory + '/' + unitNotDownloaded.local_image_path).then(() => {
          // COPY the file
          RNFS.writeFile(
            baseDirectory + '/' + unitNotDownloaded.image,
            streamToString!,
            'base64',
          )
            .then(() => {
              console.log("Image saved!!!");
              // Add unit with downloaded image to the "downloadedUnits" in storage
              let newDownloadedUnits = [
                ...downloadedUnits,
                {downloadedDate: new Date(), _id: unitNotDownloaded._id},
              ];
              console.log(newDownloadedUnits);
              save('downloadedUnits', newDownloadedUnits)
              dispatch(setDownloadedUnits(newDownloadedUnits))
            })
            .catch(err => {
              console.log(err.message);
            });
        });
      }
    }
  }

  const downloadLessonFilesFromS3 = async () => {
    for (let lessonNotDownloaded of lessonsNotDownloaded){
      if(lessonNotDownloaded.image.length > 0){

        const resultToSave = await getFileFromS3(lessonNotDownloaded.image);

        // Convert to base64 string
        const streamToString = await resultToSave.Body?.transformToString("base64");

        await RNFS.mkdir( baseDirectory + '/' + lessonNotDownloaded.local_image_path).then(() => {
          // COPY the file
          RNFS.writeFile(
            baseDirectory + '/' + lessonNotDownloaded.image,
            streamToString!,
            'base64',
          )
            .then(() => {
              // console.log("Image saved!!!");
              // Add lesson with downloaded image to the "downloadedLessons" in storage
              let newDownloadedLessons = [
                ...downloadedLessons,
                {downloadedDate: new Date(), _id: lessonNotDownloaded._id},
              ];
              save('downloadedLessons', newDownloadedLessons)
              dispatch(setDownloadedLessons(newDownloadedLessons))
            })
            .catch(err => {
              console.log(err.message);
            });
        });
      }
    }
  }

  const downloadVocabFilesFromS3 = async () => {
    for (let vocabNotDownloaded of vocabsNotDownloaded){

      let imageDownloaded = false;
      let audioDownloaded = false;

      if(vocabNotDownloaded.image.length > 0){
        const imageResultToSave = await getFileFromS3(vocabNotDownloaded.image);

        // Convert to base64 string
        const imageStreamToString = await imageResultToSave.Body?.transformToString("base64");

        await RNFS.mkdir( baseDirectory + '/' + vocabNotDownloaded.local_image_path).then(() => {
          // COPY the image file
          RNFS.writeFile(
            baseDirectory + '/' + vocabNotDownloaded.image,
            imageStreamToString!,
            'base64',
          )
            .then(() => {
              console.log("Image saved!!!");
              imageDownloaded = true;
            })
            .catch(err => {
              console.log(err.message);
            });
        });
      }
      if(vocabNotDownloaded.audio.length > 0){
        const audioResultToSave = await getFileFromS3(vocabNotDownloaded.audio);

        // Convert to base64 string
        const audioStreamToString = await audioResultToSave.Body?.transformToString("base64");

        await RNFS.mkdir( baseDirectory + '/' + vocabNotDownloaded.local_audio_path).then(() => {
          // COPY the audio file
          RNFS.writeFile(
            baseDirectory + '/' + vocabNotDownloaded.audio,
            audioStreamToString!,
            'base64',
          )
            .then(() => {
              audioDownloaded = true
              console.log("Audio saved!!!");
            })
            .catch(err => {
              console.log(err.message);
            });
        });
      }

      if(imageDownloaded && audioDownloaded){
        // let newDownloadedVocabs = [...downloadedVocabs, vocabNotDownloaded._id]
        let newDownloadedVocabs = [
          ...downloadedLessons,
          {downloadedDate: new Date(), _id: vocabNotDownloaded._id},
        ];
        save('downloadedVocabs', newDownloadedVocabs)
        dispatch(setDownloadedVocabs(newDownloadedVocabs))
      }
    }
  }

  useEffect(() => {
    uploadLocalUnitFilesTos3();
    downloadUnitFilesFromS3();

    uploadLocalLessonFilesTos3();
    downloadLessonFilesFromS3();

    uploadLocalVocabFilesTos3();
    downloadVocabFilesFromS3();
  }, []);

  return (
    
    <View style={styles.container}>
            <Image style={styles.backgroundImage} source={require("../../../../assets/images/homeBackgroundImage.png")} />

      <FocusAwareStatusBar
        backgroundColor={PRIMARY_COLOR}
        barStyle={'light-content'}
        showStatusBackground={true}
      />
      
         <Header
        title="Home"
        headerStyle={{backgroundColor: PRIMARY_COLOR}}
        leftIcon={
          <Feather
            name="menu"
            size={24}
            color="#ffffff"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        }
      />
    
<ScrollView>

    



      <View style={styles.content}>

        <Text style={styles.welcomeText}>
          {i18n.t('dict.welcome')}, {userGoogleInfo.givenName}!
        </Text>

        {user.learnerLanguages.length == 0 &&
        <Text style={styles.learnerText}>
          {i18n.t('dialogue.notLearnerPrompt')}
        </Text>
      }
        {user.learnerLanguages.length > 0 &&
        <Text style={styles.learnerText}>
          {i18n.t('dialogue.yesLearnerPrompt')}
        </Text>
      }

        {
          learnerCourses.map((course: Course & Realm.Object, index: number)=>{
            const units = (allUnits).filter((unit:Unit & Realm.Object) => unit._course_id == course._id)
            return (
              <CourseUnitItem
                title={course.details.name}
                numOfSubItems={units.length}
                type="course"
                index={index + 1}
                backgroundColor="transparent"
                key={course._id}
                onPress={()=>goToLearnerCourse(course._id)}
                section='learner'
              />
            )
          })
        }
         
        <PrimaryBtn
          label={i18n.t('actions.searchCourses')}
          onPress={() => navigation.navigate('Search')}
          style={styles.searchBtn}
          labelStyle={styles.searchCoursesLabel}
          leftIcon={<Feather name="search" size={24} color="#ffffff" />}
        />
        <View style={styles.divider} />
      
        {adminCourses.length > 0 && (
  <Text style={styles.missionStatement}>
    {i18n.t('dialogue.thankYou')}{' '}
    {'\n'} 
    <Text style={{ fontWeight: 'bold' }}>
      {i18n.t('dialogue.continueEditing')}
    </Text>
  </Text>
)}
       {adminCourses.length == 0 &&
       <Text style={styles.missionStatement}>
       {i18n.t('dialogue.noAdminCourse')}{' '}
     </Text>
      }

        {
          adminCourses.map((course: Course & Realm.Object, index: number)=>{
            const units = (allUnits).filter((unit: Unit & Realm.Object) => unit._course_id == course._id)
            console.log(adminCourses);
            
            return (
              <CourseUnitItem
                title={course.details.name}
                numOfSubItems={units.length}
                type="course"
                index={index + 1}
                backgroundColor="#F9F9F9"
                key={course._id}
                onPress={()=>goToContributorCourse(course._id)}
                section='contributor'
              />
            )
          })
        }
       
        <TouchableOpacity
          onPress={() => navigation.navigate('BecomeContributor')}>
          <Text style={styles.becomeText}>
            {i18n.t('actions.becomeContributor')}
          </Text>
        </TouchableOpacity>
      </View>

      </ScrollView>
    </View>
  );
};

export default Home;
