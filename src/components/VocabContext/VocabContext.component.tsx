import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './VocabContext.style';

interface VocabContextProps {
  isVisible: boolean;
  onClose: () => void;
  contextData: string;
}

const VocabContext: React.FC<VocabContextProps> = ({ isVisible, onClose, contextData }) => {
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
          <Text style={styles.contextText}>{contextData}</Text> 
        </View>
      </View>
    </Modal>
  );
};

VocabContext.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contextData: PropTypes.string.isRequired, // Add this prop type
};

export default VocabContext;