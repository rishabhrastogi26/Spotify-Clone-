import { createContext } from "react";
const songContext = createContext({
  currentSong: null, // when you load the page  you are not listening to any song so null
  setCurrentSong: (currentSong) => {}, // this statement wiil not be in use
  soundPlayed: null,
  setSoundPlayed: () => {},
  isPaused: null,
  setIsPaused: () => {},
});
export default songContext;
