import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types';
import styles from './Report.style';
import realm from 'realm';
import { realmContext } from '../../realm/realm';

interface ReportProps {
  isVisible: boolean;
  onClose: () => void;
  headerText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  onSubmit: () => void;

}


interface CheckBoxProps {
    label: string;
    isChecked: boolean;
    onPress: () => void;
  }
  
  const CheckBox: React.FC<CheckBoxProps> = ({ label, isChecked, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkBoxContainer}>
      <Ionicons
        name={isChecked ? 'checkbox-outline' : 'square-outline'}
        size={24}
        color="black"
        style={styles.checkBoxIcon}
      />
      <Text style={styles.checkBoxText}>{label}</Text>
    </TouchableOpacity>
  );

  const Report: React.FC<ReportProps> = ({ isVisible, onClose, headerText, option1, option2, option3, option4, onSubmit }) => {
    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);
    const [isChecked4, setChecked4] = useState(false);
    const [showTextField, setShowTextField] = useState(false);
    const [textFieldValue, setTextFieldValue] = useState('');
  
    const handleCheckBoxClick = (checkboxNumber: number) => {
      switch (checkboxNumber) {
        case 1:
          setChecked1(!isChecked1);
          break;
        case 2:
          setChecked2(!isChecked2);
          break;
        case 3:
          setChecked3(!isChecked3);
          break;
        case 4:
          setChecked4(!isChecked4);
          break;
        case 5:
          setShowTextField(!showTextField);
          break;
        default:
          break;
      }
    };
  
    const handleTextFieldChange = (text: string) => {
      setTextFieldValue(text);
    };
  
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{headerText}</Text>
  
            <CheckBox
              label={option1}
              isChecked={isChecked1}
              onPress={() => handleCheckBoxClick(1)}
            />
  
            <CheckBox
              label={option2}
              isChecked={isChecked2}
              onPress={() => handleCheckBoxClick(2)}
            />
  
            <CheckBox
              label={option3}
              isChecked={isChecked3}
              onPress={() => handleCheckBoxClick(3)}
            />
  
            <CheckBox
              label={option4}
              isChecked={isChecked4}
              onPress={() => handleCheckBoxClick(4)}
            />
  
            <CheckBox
              label="Additional: "
              isChecked={showTextField}
              onPress={() => setShowTextField(!showTextField)}
            />
  
            {showTextField && (
              <TextInput
                style={styles.textField}
                placeholder="Other reason"
                multiline={true}
                value={textFieldValue}
                onChangeText={handleTextFieldChange}
              />
            )}
            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          </View>

        </View>
      </Modal>
    );
  };
  
  export default Report;