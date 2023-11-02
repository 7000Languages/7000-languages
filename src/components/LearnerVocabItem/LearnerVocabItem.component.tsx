import { View, Text, Image, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import styles from './LearnerVocabItem.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ZoomImageModal from '../ZoomImageModal/ZoomImageModal.component';

type IProps = {
  audio: string;
  original: string;
  translation: string;
  notes: string;
  localImagePath: string;
  localAudioPath: string;
};

const LearnerVocabItem: React.FC<IProps> = ({
  original,
  translation,
  notes,
  localImagePath,
  localAudioPath,
}) => {
  const [image, setImage] = useState('');
  const [audio, setAudio] = useState('');
  const [playing, setPlaying] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imagesToShow, setImagesToShow] = useState<{ url: string }[]>([]);

  let baseDirectory = RNFS.DocumentDirectoryPath;

  const getImage = async () => {
    const response = await RNFS.readDir(`${baseDirectory}/${localImagePath}`);
    setImage(response[0].path);
  };

  const getAudio = async () => {
    const response = await RNFS.readDir(`${baseDirectory}/${localAudioPath}`);
    setAudio(response[0].path);
  };

  const currentAudio = useMemo(
    () =>
      new Sound(
        Platform.OS == 'ios' ? audio : `file://${audio}`,
        undefined,
        error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          // if loaded successfully
          let duration = currentAudio.getDuration();
          console.log(duration);
        },
      ),
    [audio],
  );

  const playPause = () => {
    if (audio.length == 0) {
      Alert.alert(
        'No audio available',
        'You can upload an audio for this vocab.',
      );
    }
    if (currentAudio.isPlaying()) {
      currentAudio.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      currentAudio.play(success => {
        if (success) {
          setPlaying(false);
        } else {
          setPlaying(false);
        }
      });
    }
  };

  const onImagePress = () => {
    let imagesToShow = [{ url: Platform.OS === 'ios' ? image : `file://${image}` }]
    setImagesToShow(imagesToShow)
    setShowImageModal(true)
  }

  const closeImageModal = () => {
    setShowImageModal(false)
  }


  useEffect(() => {
    localImagePath ? getImage() : null;
    localAudioPath.length > 0 ? getAudio() : null;
  }, []);

  return (
    <View style={styles.container}>
      <ZoomImageModal onCloseImageModal={closeImageModal} images={imagesToShow} showImageModal={showImageModal} />
      <View style={styles.textsContainer}>
        <Text style={styles.original}>{original}</Text>
        <Text style={styles.translation}>{translation}</Text>
      </View>
      <View style={styles.textAndImage}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.notesContainer}>
          <Text style={styles.notes}>{notes}</Text>
        </ScrollView>
        {
          image.length > 0
          &&
          <TouchableOpacity onPress={onImagePress} style={styles.imageContainer}>
            <Image
              source={{
                uri: Platform.OS === 'ios' ? image : `file://${image}`,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        }
      </View>
      <TouchableOpacity onPress={playPause} style={styles.playAudioBtn}>
        <Text style={styles.playAudioText}>Play audio</Text>
        <Ionicons
          name={!playing ? 'md-volume-medium' : 'pause-circle-sharp'}
          size={20}
          color="#DEE5E9"
        />
      </TouchableOpacity>
    </View>
  );
};

export default LearnerVocabItem;
