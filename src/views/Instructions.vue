<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Instructions</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Instructions</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="instructions">
        <p>Play a photo-based bingo game at Ponce City Market!</p>
      <ol>
        <li>Tap a bingo square to view the full text of the prompt.</li>
        <li>Find something within Ponce City Market that matches the prompt.</li>
        <li>Tap the blue camera icon to take a photo!</li>
        <li>Tap "Mark Complete".</li>
        <li>Once you have four squares in a row (including diagonally), you win!</li>
      </ol>
      <p>Your progress is saved even if you close out of the app. If something goes wrong, you can reset the game from the Settings tab.</p>
      <p>Happy networking!!</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>

<style scoped>
.instructions {
  margin: 15px
}
</style>
