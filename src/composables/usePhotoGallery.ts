import { ref } from 'vue';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { SavedFileImage } from '@/types'

// Photos taken this session, keyed by webPath, so the share sheet can open
// immediately on tap (iOS Safari rejects navigator.share if we await too long).
const photoFiles = new Map<string, File>();

const toFile = async (webPath: string, fileName: string): Promise<File> => {
  const cached = photoFiles.get(webPath);
  if (cached) return cached;
  const blob = await (await fetch(webPath)).blob();
  const file = new File([blob], fileName, { type: blob.type || 'image/jpeg' });
  photoFiles.set(webPath, file);
  return file;
};

export const usePhotoGallery = () => {
  const savedFileImage = ref<SavedFileImage>();

  // saveToGallery only works in the native iOS/Android app; browsers ignore it.
  const canSaveToGalleryNatively = Capacitor.isNativePlatform();

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      quality: 100,
      saveToGallery: true
    });

    const fileName = Date.now() + '.jpeg';

    if (photo.webPath) {
      savedFileImage.value = {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
      if (!canSaveToGalleryNatively) {
        // Prepare the file now so "Save to Photos" can share it without delay.
        toFile(photo.webPath, fileName).catch(() => undefined);
      }
    }
  };

  // Web fallback: open the share sheet ("Save Image" on iOS, "Save to Photos"
  // on Android), or download the file where sharing files isn't supported.
  const savePhotoToDevice = async (image: SavedFileImage) => {
    if (!image.webviewPath) return;
    const file = await toFile(image.webviewPath, image.filepath);

    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file] });
      } catch (e) {
        if ((e as DOMException).name !== 'AbortError') throw e; // user cancelled
      }
      return;
    }

    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return {
    takePhoto, savedFileImage, savePhotoToDevice, canSaveToGalleryNatively
  };
};
