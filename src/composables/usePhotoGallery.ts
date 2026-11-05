import { ref, onMounted, watch } from 'vue';
import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { SavedFileImage } from '@/types'

export const usePhotoGallery = () => {
  const savedFileImage = ref<SavedFileImage>();

    const takePhoto = async () => {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        quality: 100,
        direction: CameraDirection.Front,
        saveToGallery: true
      });

      const fileName = Date.now() + '.jpeg';

      if (photo.webPath) {
        savedFileImage.value = {
          filepath: fileName,
          webviewPath: photo.webPath,
  }
      }
  
    };
  
    return {
      takePhoto, savedFileImage
    };
  };