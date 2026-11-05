<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button color="warning" @click="clearBingoItems"> Reset Game</ion-button>
      <p>This will clear your game progress, remove saved data, and present a new bingo card.</p>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { BingoItemsProvider } from '@/types'; 
import { inject } from 'vue'

const { clearBingoItems } = inject<BingoItemsProvider>('bingoItems')!

</script>

<style scoped>
ion-content {
  text-align: center;
}
ion-button {
  margin-top: 30px;
}
p {
  margin: 15px;
}
</style>
