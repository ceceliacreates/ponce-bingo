<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Selfie Bingo 🤳</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-alert
    :is-open="displayGameWonAlert"
    header="Congrats!"
    message="You won the game! Reset the game from the 'Settings' tab to play again!"
    :buttons="alertButtons"
    @didDismiss="setDisplayGameWonAlert(false)"
  ></ion-alert>
      <ion-grid class="full-grid">
    <ion-row v-for="n in 4" :key="n" class="full-height">
      <ion-col size="3" v-for="(item) in bingoItems.slice((n-1)*4, n*4)" :key="item.id">
        <BingoSquare :item="item" @mark-complete="markComplete" />
      </ion-col>
    </ion-row>
  </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/vue';
import  BingoSquare  from '@/components/BingoSquare.vue'
import { BingoItemsProvider } from '@/types'; 
import { inject, ref } from 'vue'

const { bingoItems, gameWon, markComplete } = inject<BingoItemsProvider>('bingoItems')!

const displayGameWonAlert = ref<Boolean>(gameWon)
  const alertButtons = ['Dismiss'];

const setDisplayGameWonAlert = (state: boolean) => {
    displayGameWonAlert.value = state;
  };


</script>

<style scoped>
.full-grid {
  height: 100%;
  width: 100%;
}
.full-height {
  height: 25%;
}
ion-col {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>