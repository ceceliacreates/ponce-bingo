<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { BingoItem, SavedFileImage } from '@/types'; 
import { ref, provide } from 'vue'
import { Preferences } from '@capacitor/preferences';

//TODO Persistent photo storage -- not sure if this is needed because we're saving photo to gallery

//TODO display photo as bingo square instead of text ??

//TODO update reset game to also clear photos ??

//ADD Game selection dropdown - not MVP

//ADD AI-generate new game option - not MVP

const items = [
  'Find the Central Food Hall',
  'Take a group photo on the Atlanta BeltLine',
  'Spot a dog out for a walk',
  'Find a mural or piece of public art',
  'Find a bookstore',
  'Find a place that sells ice cream or gelato',
  'Find a coffee shop',
  'Find something for sale that is handmade or one-of-a-kind',
  'Spot the water tower on top of the building',
  'Find the elevator that goes up to the roof',
  'Find something for sale with "Atlanta" or "ATL" on it',
  'Find a peach anywhere (on a menu, a sign, or merchandise)',
  'Find a menu with a cuisine nobody in your group has tried',
  'Find a spot where you can see the Atlanta skyline',
  'Spot someone riding a bike or scooter',
  'Find a store that sells furniture',
];

const shuffle = (array: string[])  => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const bingoItems = ref<BingoItem[]>([])

const completedSquares = ref<Number[]>([])

const gameWon = ref<Boolean>(false)

const winningCombos = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16],
  [1,5,9,13],
  [2,6,10,14],
  [3,7,11,15],
  [4,8,12,16],
  [1,6,11,16],
  [4,7,10,13]
]

const checkForWin = () => {
  if (completedSquares.value.length < 4) {
    return false
  } else {
    return winningCombos.some(combo =>
      combo.every(num => completedSquares.value.includes(num))
    );
  }
}

const loadBingoItems = async () => {
  let bingoItemsString = ''

  // loads bingoItems from local/device storage if exists

    const result = await Preferences.get({ key: 'bingoItems'})

    bingoItemsString = result.value || '';

   if (bingoItemsString) {
 
    // sets ref based on local/device storage if exists
    bingoItems.value = JSON.parse(bingoItemsString)

   } else {
    let shuffledItems = shuffle([...items]);
    // sets ref to shuffled items with no items complete
    bingoItems.value = shuffledItems.map((item, index) => ({
  id: index + 1, // Assigning a unique ID based on the shuffled index
  text: item,
  completed: false
}))

  // then saves newly created items to local/device storage
  saveBingoItems(JSON.stringify(bingoItems.value))
   }
}

const saveBingoItems = async (bingoItemsString: string) => {

    await Preferences.set({
      key: 'bingoItems',
      value: bingoItemsString
    })

}

const markComplete = (id: number) => {
 const item = bingoItems.value.find(item => item.id === id)

 if (item) {
  item.completed = true;
  completedSquares.value.push(id)
  gameWon.value = checkForWin()
 }

 const bingoItemsString = JSON.stringify(bingoItems.value)

 saveBingoItems(bingoItemsString)
}

const addPhoto = (id: number, savedFileImage: SavedFileImage) => {
  const item = bingoItems.value.find(item => item.id === id)

  if (item) {
    item.photo = savedFileImage;
  }
}

const clearBingoItems = async () => {

await Preferences.clear()
gameWon.value = false;
loadBingoItems()

}

// loads bingo Items on initialization
loadBingoItems()

provide('bingoItems', {
  bingoItems, gameWon, loadBingoItems, saveBingoItems, markComplete, addPhoto, clearBingoItems
})
</script>
