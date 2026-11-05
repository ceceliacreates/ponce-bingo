<template>
            <ion-card class="bingo-square" :class="{ 'is-completed': item.completed }" @click="openModal" >
              <p class="bingo-text">{{ item.text }}</p>
        </ion-card>
        <ion-modal ref="modal">
          <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="medium" @click="cancel">Cancel</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>
        <b>Tap the blue camera icon to take a selfie with someone who:</b>
      </p>
      <p>{{ item?.text }}</p>
      <div class="photo">
        <ion-img :src="item.photo?.webviewPath || './images/selfieplaceholder.png'"></ion-img>
        <ion-button @click="handlePhoto">
          <ion-icon :icon="camera"></ion-icon>
        </ion-button>
        <div>
          <ion-button :color="item.completed ? 'medium' : 'success'" :disabled="item.completed" @click="markComplete()">{{ item.completed ? 'Already Complete' : 'Mark Complete' }}</ion-button>
        </div>
      </div>
    </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
import { IonCard, IonModal, IonHeader,IonContent, IonToolbar, IonButton, IonTitle, IonButtons, IonIcon, IonImg } from '@ionic/vue';
import { PropType, ref, inject } from 'vue';
import { BingoItem, BingoItemsProvider } from '@/types'; 
import { camera } from 'ionicons/icons';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

const emit = defineEmits(['markComplete'])
  
  const props = defineProps({
    item: {
      type: Object as PropType<BingoItem>,
      default: {}
      }
});

const modal = ref();

const openModal = () => {
  if (modal.value) {
    modal.value.$el.present();
  }
};

const cancel = () => modal.value.$el.dismiss();

const markComplete = () => {

emit('markComplete', props.item.id)

modal.value.$el.dismiss();
}

const { takePhoto, savedFileImage } = usePhotoGallery();

const { addPhoto } = inject<BingoItemsProvider>('bingoItems')!

const handlePhoto = async () => {
  await takePhoto();

  if (savedFileImage.value) {
    addPhoto(props.item.id, savedFileImage.value);

  }

}
</script>

<style scoped>
ion-content {
  text-align: center;
}
.bingo-square {
  width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bingo-text {
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.is-completed {
  background-color: #28a745;
  color: black;
}

.photo {
  text-align: center;
}
ion-button {
  margin: 15px;
}
</style>