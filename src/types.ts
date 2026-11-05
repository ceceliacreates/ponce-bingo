export interface BingoItem {
    id: number;
    text: string;
    completed: boolean;
    photo?: SavedFileImage
  }

export interface BingoItemsProvider {
  bingoItems: BingoItem[];
  gameWon: Boolean;
  loadBingoItems: () => void;
  saveBingoItems: (bingoItemsString: string) => void;
  markComplete: (id: number) => void;
  addPhoto: (id: number, savedFileImage: SavedFileImage) => void;
  clearBingoItems: () => void;
}

export interface SavedFileImage {
  filepath: string;
  webviewPath: string;
}