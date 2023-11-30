import {
    View,
    Text,
    TouchableOpacity,
    Pressable,
    ScrollView
  } from 'react-native';
  import React, {useCallback, useEffect, useState} from 'react';
  
  import styles from './TextToText.style';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {ActivityLevelType, ActivityType, UserType} from '../../../@types';
  import {
    PRIMARY_GREEN_COLOR,
    PRIMARY_ORANGE_COLOR,
  } from '../../../constants/colors';
import { convertToPlainObject, randomisedArray } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { realmContext } from '../../../realm/realm';
import { BSON } from 'realm';
import { save } from '../../../utils/storage';
import { setUser } from '../../../redux/slices/authSlice';
  
  type IProps = {
    activityLevels: ActivityLevelType[];
    goToNextActivity: (type: ActivityType| 'completed') => void;
  };
  
  const colors = [
    {
      textAndBorderColor: '#9F3E1A',
      bgColor: '#FBEAE9'
    },
    {
      textAndBorderColor: '#E7900F',
      bgColor: '#FFF2E1'
    },
    {
      textAndBorderColor: '#91B38B',
      bgColor: '#F5F9DE'
    },
    {
      textAndBorderColor: '#006F7B',
      bgColor: '#E5F7F7'
    }
  ];

  const { useObject, useRealm } = realmContext

  const TextToText: React.FC<IProps> = ({
    activityLevels,
    goToNextActivity,
  }) => {

    const [currentActivityLevelIndex, setCurrentActivityLevelIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [correctNess, setCorrectNess] = useState('');
    const [correctNessColor, setCorrectNessColor] =
      useState(PRIMARY_ORANGE_COLOR);
    const [sectionToSelectFrom, setSectionToSelectFrom] = useState('')
    const [matches, setMatches] = useState<any[]>([]);
    const [currentMatch, setCurrentMatch] = useState<any>({});
    const [randomOriginalWords, setRandomOriginalWords] = useState<any[]>([]);
    const [randomTranslationWords, setRandomTranslationWords] = useState<any[]>([]);
    const [colorsToSelect, setColorsToSelect] = useState<{}[]>([]);

    const dispatch = useAppDispatch()

    const realm = useRealm();

    const user: UserType = useAppSelector(state => state.auth.user)
    const userToUpdate: any = useObject('users', new BSON.ObjectId(convertToPlainObject(user)._id))!  

    let currentActivityLevel = activityLevels[currentActivityLevelIndex];

    const determineMatch = () => {

      let copyOfSelectedOptions = [...selectedOptions]
      let copyOfMatches = [...matches ]
      
      for(let match of matches){
        let wordsToMatch = currentActivityLevel.words_to_match.find(word => word.original == match.original)
        if(wordsToMatch?.original !== match.original || wordsToMatch?.translation !== match.translation){
          let removedWrongOriginals = copyOfSelectedOptions.splice(copyOfSelectedOptions.indexOf(match.original), 1);
          let removedWrongTranslations = copyOfSelectedOptions.splice(copyOfSelectedOptions.indexOf(match.translation), 1);

          copyOfMatches.splice(copyOfMatches.indexOf(copyOfMatches.find(m=>m.original == removedWrongOriginals[0])), 1);
        }
      }
      setSelectedOptions(copyOfSelectedOptions)
      setMatches(copyOfMatches)
      setCurrentMatch({})

      if(copyOfMatches.length === currentActivityLevel.words_to_match.length){
        setCorrectNess('Correct');
        setCorrectNessColor(PRIMARY_GREEN_COLOR);

        // Add this activityLevel to completedActivityLevels and go to the next activity Level
        realm.write(()=>{
          userToUpdate.completedActivityLevels.push(currentActivityLevel._id.toString())
        })
        // Update user in storage and redux
        save('user', convertToPlainObject(userToUpdate))
        dispatch(setUser(convertToPlainObject(userToUpdate)))

        const timeOut = setTimeout(() => {
          if (currentActivityLevelIndex + 1 < activityLevels.length) {
            setCurrentActivityLevelIndex(currentActivityLevelIndex + 1);
            setSelectedOptions([]);
            resetStates()
          } else {
            //go to the next activity
            goToNextActivity('completed')
            return;
          }
        }, 1000);
      }
      else {
        setCorrectNess('Try again');
        setColorsToSelect(colors)
        setCorrectNessColor(PRIMARY_ORANGE_COLOR);
      }
      const timeOut = setTimeout(() => {
        setCorrectNess('');
      }, 1000);
    };
    const onPressBack = () => {
      if (currentActivityLevelIndex > 0) {
        setCurrentActivityLevelIndex(prev => prev - 1);
      }
    };
  
    const onPressForward = () => {
      if (currentActivityLevelIndex < activityLevels.length - 1) {
        setCurrentActivityLevelIndex(prev => prev + 1);
      }
    };

    const addToMatches = (originalOrTranslation: string, section: string) => {
      let newMatch = currentMatch
      let selectedColor = colorsToSelect.filter(col => colorsToSelect.indexOf(col) == 0)[0] //Get the first color
      console.log(originalOrTranslation);
      // return
      setSelectedOptions([...selectedOptions, originalOrTranslation]);
      newMatch[section] = originalOrTranslation;

      if(Object.keys(newMatch).length == 1){
        newMatch['color'] = selectedColor
      }

      let sectionToSelectFrom = section == 'original' ? 'translation' : 'original';
      setSectionToSelectFrom(sectionToSelectFrom);
      setCurrentMatch(newMatch)

      if(Object.keys(newMatch).length === 3 ){
        let newMatches: any = []
        newMatches = [...matches, newMatch ]
        // console.log(newMatches);
        setMatches(newMatches)
        setCurrentMatch({});
        let remainingColors = colorsToSelect.filter(col => colorsToSelect.indexOf(col) !== 0)
        setColorsToSelect(remainingColors);
        return
      }
    };

    const getRandomOriginalWords = useCallback((words: {original: string, translation: string}[]) => {
      let randomWords = randomisedArray(words)
      setRandomOriginalWords(randomisedArray([...randomWords]))
    },[currentActivityLevelIndex])

    const getRandomTranslationWords = useCallback((words: {original: string, translation: string}[]) => {
      let randomWords = randomisedArray(words)
      setRandomTranslationWords(randomisedArray([...randomWords]))
    },[currentActivityLevelIndex])

    const resetStates = () => {
      setMatches([])
      setSelectedOptions([]);
      setSectionToSelectFrom('');
      setCurrentMatch({})
    }

    useEffect(() => {
      getRandomOriginalWords(currentActivityLevel.words_to_match);
      getRandomTranslationWords(currentActivityLevel.words_to_match);
      setColorsToSelect(colors)
    }, [currentActivityLevelIndex]);

    useEffect(() => {
     
    }, [matches, currentMatch])

    useEffect(() => {
      setCurrentActivityLevelIndex(0)
      activityLevels.length == 0 ? goToNextActivity('completed') : null
    }, []);
    
    let matchingCompleted = currentActivityLevel ? (matches.length === currentActivityLevel.words_to_match.length) : false
    
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.activityNumber}>
            {currentActivityLevelIndex + 1}/{activityLevels.length}
          </Text>
          <Text style={[styles.correctNess, {color: correctNessColor}]}>
          {correctNess}
          </Text>
          <View style={styles.arrowContainer}>
          <Pressable onPress={onPressBack} style={styles.arrowButton}>
            <Ionicons name="arrow-back-outline" size={30} />
          </Pressable>
          <Pressable onPress={onPressForward} style={styles.arrowButton2}>
            <Ionicons name="arrow-forward-outline" size={30} />
          </Pressable>
        </View>
          <View style={styles.textsContainer}>
            <View style={styles.left}>
              {randomOriginalWords.map((word, index) => {
                let borderColor = selectedOptions.includes(word.original) ? matches.includes(matches.find(match => match.original === word.original)) ? matches.find(match => match.original === word.original)['color'].textAndBorderColor : currentMatch['color'].textAndBorderColor : '#1C1C1C'
                let textColor = selectedOptions.includes(word.original) ? matches.includes(matches.find(match => match.original === word.original)) ? matches.find(match => match.original === word.original)['color'].textAndBorderColor : currentMatch['color'].textAndBorderColor : '#1C1C1C'
                let bgColor = selectedOptions.includes(word.original) ? matches.includes(matches.find(match => match.original === word.original)) ? matches.find(match => match.original === word.original)['color'].bgColor : currentMatch['color'].bgColor : 'transparent'
                return (
                  <TouchableOpacity
                    key={index}
                    disabled={
                      sectionToSelectFrom == 'translation' ||
                      selectedOptions.includes(word.original)
                    }
                    onPress={() => addToMatches(word.original, 'original')}
                    style={[
                      styles.originalWord,
                      {borderColor, backgroundColor: bgColor},
                    ]}>
                    <Text 
                      style={[styles.word, {color: textColor}]}
                    >
                      {word.original}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.right}>
              {randomTranslationWords.map((word, index) => {
                let borderColor = selectedOptions.includes(word.translation) ? matches.includes(matches.find(match => match.translation === word.translation)) ? matches.find(match => match.translation === word.translation)['color'].textAndBorderColor : currentMatch['color'].textAndBorderColor : '#1C1C1C'
                let textColor = selectedOptions.includes(word.translation) ? matches.includes(matches.find(match => match.translation === word.translation)) ? matches.find(match => match.translation === word.translation)['color'].textAndBorderColor : currentMatch['color'].textAndBorderColor : '#1C1C1C'
                let bgColor = selectedOptions.includes(word.translation) ? matches.includes(matches.find(match => match.translation === word.translation)) ? matches.find(match => match.translation === word.translation)['color'].bgColor : currentMatch['color'].bgColor : 'transparent'
                return (
                  <TouchableOpacity
                    key={index}
                    disabled={
                      sectionToSelectFrom == 'original' ||
                      selectedOptions.includes(word.translation)
                    }
                    onPress={() =>
                      addToMatches(word.translation, 'translation')
                    }
                    style={[
                      styles.originalWord,
                      {borderColor, backgroundColor: bgColor},
                    ]}>
                    <Text 
                    style={[styles.word, {color: textColor}]}
                    >
                      {word.translation}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <TouchableOpacity
            onPress={determineMatch}
            style={[
              styles.selectAudioBtn,
                {
                  elevation: matchingCompleted ? 6 : 0,
                  shadowColor:
                    !matchingCompleted ? 'transparent' : 'rgba(0, 0, 0,0.9)',
                  backgroundColor:
                    !matchingCompleted
                      ? '#DEE5E9'
                      : correctNess == 'Correct'
                      ? '#91B38B'
                      : '#F9F9F9',
                },
            ]}
            disabled={!matchingCompleted}
          >
            <Text
              style={[
                styles.selectAudioText,
                {
                  color: !matchingCompleted ? '#A6AFB5' : '#000',
                },
              ]}>
              {matchingCompleted ? 'Confirm Matching' : 'Match Texts'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default TextToText;
  