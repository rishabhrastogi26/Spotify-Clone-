import "./output.css";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginComponent from "./Routes/Login.js";
import SignupComponent from "./Routes/Signup.js";
import HomeComponent from "./Routes/Home.js";
import LoggedInHomeComponent from "./Routes/loggedInHome.js";
import SearchMusicComponent from "./Routes/SearchMusic.js";
import UploadMusicComponent from "./Routes/uploadMusic.js";
import MyMusicComponent from "./Routes/MyMusic.js";
import { useCookies } from "react-cookie";
import songContext from "./contexts/songContext.js";
import LibraryComponent from "./Routes/Library.js";
import SinglePlaylistView from "./Routes/SingleplaylistView.js"

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  console.log(cookie.token); //Here is the cookie logged
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true); // by default song is paused
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          //logged in routes
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <Routes>
              {/* gives 100 % access to songContext */}

              <Route path="/home" element={<LoggedInHomeComponent />} />
              <Route path="/uploadMusic" element={<UploadMusicComponent />} />
              <Route path="/library" element={<LibraryComponent />} />
              <Route path="/playlist/:playlistId" element={<SinglePlaylistView />} />
              <Route path="/myMusic" element={<MyMusicComponent />} />
              <Route path="/searchMusic" element={<SearchMusicComponent />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          //logged out routes
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/Signup" element={<SignupComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="*" element={<Navigate to="/login" />}></Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
