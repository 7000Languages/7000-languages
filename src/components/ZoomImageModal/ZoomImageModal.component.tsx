import React from 'react'
import Modal from 'react-native-modal';
import styles from './ZoomImageModal.style';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { View } from 'react-native';

type IProps = {
  images: { url: string }[]
  showImageModal: boolean
  onCloseImageModal: () => void
}

const ZoomImageModal: React.FC<IProps> = ({ images, showImageModal, onCloseImageModal }) => {
  return (
    <Modal isVisible={showImageModal}>
      <View style={styles.container}>
        <AntDesign
          name="closecircle"
          size={24}
          color="#FFFFFF"
          onPress={onCloseImageModal}
          style={styles.closeIcon}
        />
        <ImageViewer imageUrls={images} />
      </View>
    </Modal>
  )
}

export default ZoomImageModal