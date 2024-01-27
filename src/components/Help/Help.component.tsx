import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types';
import styles from './Help.style';

interface HelpProps {
  isVisible: boolean;
  onClose: () => void;
  headerText: string;
  midHeaderText: string;
  bodyText: string;
}

const Help: React.FC<HelpProps> = ({ isVisible, onClose, headerText, midHeaderText, bodyText }) => {
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
          <Text style={styles.midHeaderText}>{midHeaderText}</Text>
          <Text style={styles.bodyText}>{bodyText}</Text>
         
        </View>
      </View>
    </Modal>
  );
};

export default Help;