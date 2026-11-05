import { ref } from 'vue';
import { Preferences } from '@capacitor/preferences';
import { BingoItem } from '@/types'; 

export function useBingoItems() {

    const items = [
        'Mollit commodo incididunt labore proident consectetur eu ea anim adipisicing minim ex.',
       'Ullamco cillum eiusmod id reprehenderit tempor laboris commodo et aute excepteur eu.', 
       'Culpa est incididunt qui eu duis.', 
       'Veniam cillum tempor id laboris.', 
       'Adipisicing mollit nostrud enim dolore ut.',
        'Eiusmod velit ut nostrud nulla deserunt proident anim nostrud exercitation voluptate qui officia occaecat culpa.', 
        'Sint reprehenderit duis et officia laboris ullamco.', 
        'Non reprehenderit aliqua id commodo ex nisi reprehenderit eiusmod veniam eu.', 
        'Aliqua Lorem fugiat deserunt exercitation esse nostrud in duis magna incididunt in tempor.', 
        'Eu Lorem Lorem veniam nisi excepteur duis laborum voluptate sit.',
        'Eiusmod minim veniam aliquip laborum voluptate.', 
        'Velit exercitation labore pariatur pariatur sit mollit reprehenderit ut do irure voluptate.', 
        'Consectetur occaecat duis eiusmod sunt eiusmod laborum culpa excepteur consequat cillum duis.', 
        'Reprehenderit deserunt et veniam fugiat fugiat non deserunt ut fugiat elit ullamco veniam excepteur do.', 
        'Occaecat Lorem commodo pariatur quis ex non Lorem veniam ut consectetur magna consequat occaecat cupidatat.',
        'Aliquip deserunt aliquip commodo tempor elit.', 
      ];
    
      const shuffle = (array: string[])  => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]
        }
        return array
      }
      
      const bingoItems = ref<BingoItem[]>([])
      
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
       }
      
       const bingoItemsString = JSON.stringify(bingoItems.value)
      
       saveBingoItems(bingoItemsString)
      }
      
      const clearBingoItems = async () => {
      
      await Preferences.clear()
      
      loadBingoItems()
      
      }

      return {
        bingoItems,
        loadBingoItems,
        saveBingoItems,
        markComplete,
        clearBingoItems
    };

}
