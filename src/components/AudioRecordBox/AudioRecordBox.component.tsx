import {View, Text, Pressable} from 'react-native';
import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './AudioRecordBox.style';

import {PRIMARY_COLOR} from '../../constants/colors';
import CustomSlider from '../CustomSlider/CustomSlider.component';
import {formatAudioDuration} from '../../utils/helpers';

type IProps = {
  pickedAudio: any;
  recordedAudio: any;
  playing: boolean;
  recording: boolean;
  currentDurationSec: number;
  audioDuration: number;
  currentPositionSec: number;
  recordingPaused: boolean;
  recordSecs: number;
  selectingAudio: boolean;
  onClosePress: () => void;
  onStartPlay: () => void;
  onPausePlay: () => void;
  playPausePickedFile: () => void;
  onStartRecord: () => void;
  onPickAudioFile: () => void;
  onResumeRecord: () => void;
  onPauseRecord: () => void;
  onStopRecord: () => void;
  onReplaceAudio?: () => void;
};

const AudioRecordBox: React.FC<IProps> = ({
  recordSecs,
  pickedAudio,
  recordedAudio,
  playing,
  currentDurationSec,
  audioDuration,
  currentPositionSec,
  recording,
  recordingPaused,
  selectingAudio,
  onStopRecord,
  onPauseRecord,
  onResumeRecord,
  onClosePress,
  onStartPlay,
  onPausePlay,
  playPausePickedFile,
  onStartRecord,
  onPickAudioFile,
  onReplaceAudio
}) => {
  // =======  Audio recording ends here. =======
  return (
    <>
      {pickedAudio.uri.length > 0 || recordedAudio.uri.length > 0 ? (
        <View style={styles.textAndIcon}>
          {selectingAudio && (
            <AntDesign
              name="close"
              size={22}
              color="black"
              style={{position: 'absolute', bottom: -30, right: 6}}
              onPress={onClosePress}
            />
          )}
          {!selectingAudio && (
            <Pressable onPress={onReplaceAudio} style={{position: 'absolute', bottom: -46, left: 0, alignItems: 'center'}}>
              <MaterialIcons
                name="find-replace"
                size={30}
                color="#eb4d4b"
              />
              <Text style={styles.replaceAudioFile}>Replace Audio</Text>
            </Pressable>
          )}
          {recordedAudio.uri.length > 0 && (
            <>
              <Ionicons
                name={!playing ? 'play-circle-sharp' : 'pause-circle-sharp'}
                size={26}
                color="#5B6165"
                onPress={!playing ? onStartPlay : onPausePlay}
              />
              <CustomSlider
                currentDuration={currentDurationSec / 1000}
                currentPosition={currentPositionSec / 1000}
              />
            </>
          )}
          {pickedAudio.uri.length > 0 && (
            <>
              <Ionicons
                name={!playing ? 'play-circle-sharp' : 'pause-circle-sharp'}
                size={26}
                color="#5B6165"
                onPress={playPausePickedFile}
              />
              <CustomSlider
                currentDuration={audioDuration}
                currentPosition={currentPositionSec}
              />
            </>
          )}
        </View>
      ) : (
        <View style={styles.audioContainer}>
          <FontAwesome
            style={[styles.audioIcon, {left: 10}]}
            name="microphone"
            size={24}
            color={PRIMARY_COLOR}
            onPress={onStartRecord}
          />
          <FontAwesome5
            style={[styles.audioIcon, {left: 50}]}
            onPress={onPickAudioFile}
            name="file-audio"
            size={24}
            color="#9F3E1A"
          />
          <Text style={styles.addAudio}>Record or Select audio</Text>
        </View>
      )}
      <View style={styles.recording}>
        {recording && (
          <>
            {recordingPaused && (
              <View style={styles.iconAndText}>
                <Entypo
                  name="controller-record"
                  size={24}
                  color={PRIMARY_COLOR}
                  onPress={onResumeRecord}
                />
                <Text style={styles.text}>Resume record</Text>
              </View>
            )}
            {!recordingPaused && (
              <View style={styles.iconAndText}>
                <Ionicons
                  name="pause"
                  size={24}
                  color={PRIMARY_COLOR}
                  onPress={onPauseRecord}
                />
                <Text style={styles.text}>Pause record</Text>
              </View>
            )}
            <Text>{formatAudioDuration(recordSecs / 1000)}</Text>
            <View style={styles.iconAndText}>
              <Ionicons
                name="stop"
                size={24}
                color={PRIMARY_COLOR}
                onPress={onStopRecord}
              />
              <Text style={styles.text}>Stop Record</Text>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default AudioRecordBox;
