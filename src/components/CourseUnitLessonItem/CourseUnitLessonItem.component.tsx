import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './CourseUnitLessonItem.style';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/colors';
import RNFS from 'react-native-fs';
import { DEVICE_WIDTH } from '../../constants/sizes';
import ZoomImageModal from '../ZoomImageModal/ZoomImageModal.component';

interface IProps {
  title: string;
  numOfSubItems: number;
  index?: number | React.ReactNode;
  type: 'course' | 'unit' | 'lesson';
  onPress?: () => void | undefined;
  backgroundColor?: string;
  section?: 'contributor' | 'learner';
  showIndex?: boolean;
  progress?: 'in_progress' | 'completed';
  localImagePath?: string;
  onArchivePress?: () => void | undefined;
  hidden?: boolean;
}

const CourseUnitLessonItem: React.FC<IProps> = ({
  title,
  numOfSubItems,
  backgroundColor,
  index,
  type,
  onPress,
  section,
  showIndex,
  progress,
  localImagePath,
  hidden,
  onArchivePress,
}) => {
  const subItemType =
    type == 'course' ? 'Units' : type == 'unit' ? 'Lessons' : 'Vocab Items';
  const courseProgress =
    progress == 'in_progress' ? 'In Progress' : 'Completed';
  const progressBackgroundColor =
    progress == 'in_progress' ? 'transparent' : '#91B38B';
  const progressBorderWidth = progress == 'in_progress' ? 2 : 0;

  const [image, setImage] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [imagesToShow, setImagesToShow] = useState<{ url: string }[]>([]);

  let baseDirectory = RNFS.DocumentDirectoryPath

  const getImage = async () => {
    const response = await RNFS.readDir(`${baseDirectory}/${localImagePath}`);
    setImage(response[0].path);
  };

  // Animations
  const translateX = useSharedValue(0)
  const TRANSLATEX_THRESHOLD = - DEVICE_WIDTH * 0.35

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({

    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },

    onActive: (event, ctx: any) => {
      translateX.value = ctx.startX + event.translationX
    },

    onEnd: (event) => {
      const shouldNotMove = translateX.value <= TRANSLATEX_THRESHOLD
      if (shouldNotMove) {
        translateX.value = withSpring(TRANSLATEX_THRESHOLD, {
          damping: 15
        })
      } else {
        translateX.value = withTiming(0)
      }
    }

  })

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value
      }
    ]
  }))

  const rIconsContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(translateX.value, {
          damping: 15
        })
      }
    ]
  }))

  const onImagePress = () => {
    let imagesToShow = [{ url:  Platform.OS === 'ios' ? image : `file://${image}`}]
    setImagesToShow(imagesToShow)
    setShowImageModal(true)
  }

  const closeImageModal = () => {
    setShowImageModal(false)
  }

  useEffect(() => {
    localImagePath ? getImage() : null;
  }, []);

  return (
    <>
      <ZoomImageModal onCloseImageModal={closeImageModal} images={imagesToShow} showImageModal={showImageModal} />
      <PanGestureHandler
        onGestureEvent={section == 'contributor' ? panGesture : undefined}
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
      >
        <Animated.View style={[styles.container, rStyle]}>
          <View
            style={[styles.container, { backgroundColor }]}

          >
            <TouchableOpacity
              style={[
                styles.numberContainer,
                { backgroundColor: section == 'learner' ? '#DEE5E9' : '#FBEAE9' },
              ]}
              onPress={onImagePress}
              >
              {image && image.length > 0 ? (
                <Image
                  source={{
                    uri: Platform.OS === 'ios' ? image : `file://${image}`,
                  }}
                  style={{ height: '100%', width: '100%' }}
                />
              ) : (
                <>
                  {section == 'learner' && showIndex == false ? (
                    <Image
                      source={require('../../../assets/images/darkLogo.png')}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text
                      style={[
                        styles.number,
                        {
                          color:
                            section == 'learner' ? SECONDARY_COLOR : PRIMARY_COLOR,
                        },
                      ]}>
                      {index}
                    </Text>
                  )}
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.textsContainer}
              onPress={onPress}
              activeOpacity={onPress !== undefined ? 0.5 : 0.7}
            >
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              <Text style={styles.numOfSubItems}>
                {numOfSubItems} {subItemType}
              </Text>
              {
                section == 'learner' && numOfSubItems > 0
                &&
                <View style={styles.progressContainer}>
                  <View
                    style={[
                      styles.progressIndicator,
                      {
                        backgroundColor: progressBackgroundColor,
                        borderWidth: progressBorderWidth,
                      },
                    ]}
                  />
                  <Text style={styles.progressText}>{courseProgress}</Text>
                </View>
              }
            </TouchableOpacity>
            <Entypo
              name="chevron-thin-right"
              size={21}
              color="black"
              style={styles.icon}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.iconsContainer, rIconsContainerStyle]}>
        <TouchableOpacity style={styles.iconView}>
          {
            !hidden
              ?
              <Ionicons name="md-archive" size={30} color="#778ca3" onPress={onArchivePress} />
              :
              <MaterialCommunityIcons name="archive-cancel" size={30} color="#778ca3" onPress={onArchivePress} />
          }
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default CourseUnitLessonItem;
