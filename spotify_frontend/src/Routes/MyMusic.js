import { Howl, Howler } from "howler";
import { Link } from "react-router-dom";
import SingleSongCard from "../Components/Common/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverhelpers";
import { useState, useEffect } from "react";
import LoggedInContainer from "../containers/loggedInContainer";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const playSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);

    sound.play();
  };
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      setSongData(response.data);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer currentActiveScreen={"mymusic"}>
      <div className="Maincontent p-8 ">
          <div className="text-white text-lg font-semibold pb-4 pl-2 ">
            My Songs
          </div>
          <div className=" space-y-3 overflow-auto">
            {songData.map((item) => {
              return <SingleSongCard props={item} playSound={playSound} />;
            })}
          </div>
        </div>
    </LoggedInContainer>
  );
};

export default MyMusic;
