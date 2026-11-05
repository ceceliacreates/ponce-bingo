<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="instructions" href="/tabs/instructions">
          <ion-icon aria-hidden="true" :icon="help" />
          <ion-label>Instructions</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="play" href="/tabs/play">
          <ion-icon aria-hidden="true" :icon="cameraOutline" />
          <ion-label>Play</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/tabs/settings">
          <ion-icon aria-hidden="true" :icon="settingsOutline" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { cameraOutline,help, settingsOutline } from 'ionicons/icons';
</script>
