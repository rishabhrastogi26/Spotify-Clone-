import { Howl, Howler } from "howler";
import { Icon } from "@iconify/react";
import IconText from "../Components/Common/iconText";
import Navbutton from "../Components/Common/navbutton";
import { Link } from "react-router-dom";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/addToPlaylistModal";
import { makeauthenticatedPOSTRequest } from "../utils/serverhelpers";

const LoggedInContainer = ({ children, currentActiveScreen }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  const {
    currentSong,
    setCurrentSong,
    isPaused,
    setIsPaused,
    soundPlayed,
    setSoundPlayed,
  } = useContext(songContext);
  // Adding song to playlist
  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;
    const payload = { playlistId, songId };
    const response = await makeauthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };
  // console.log(currentSong);
  const firstUpdate = useRef(true); // because of this song play after changing screen  STOPPED
  const ChangeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);

    sound.play();
    setIsPaused(false);
  };
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) {
      return;
    }
    ChangeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };
  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  return (
    <div className=" h-full w-full bg-nav-black">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex `}>
        <div className="h-full w-1/5 bg-black  flex flex-col justify-between">
          <div>
            <div className=" p-4">
              <Icon icon="logos:spotify" width="125" />
            </div>
            <div className="pt-4">
              <IconText
                iconName={"ic:round-home"}
                DispText={"Home"}
                targetLink={"/home"}
                active={currentActiveScreen === "home"}
              />
              <IconText
                iconName={"ion:search"}
                DispText={"Search"}
                targetLink={"/searchMusic"}
                active={currentActiveScreen === "search"}
              />
              <IconText
                iconName={"fluent:library-24-filled"}
                DispText={"Library"}
                targetLink={"/library"}
                active={currentActiveScreen === "library"}
              />
              <Link to="/myMusic">
                <IconText
                  iconName={"foundation:music"}
                  DispText={"My Music"}
                  targetLink={"/myMusic"}
                  active={currentActiveScreen === "mymusic"}
                />
              </Link>
            </div>
            <div className="pt-7">
              <IconText
                onClick={() => {
                  setCreatePlaylistModalOpen(true);
                }}
                iconName={"material-symbols:library-add"}
                DispText={"Create Playlist"}
                // active={currentActiveScreen === ""}
              />
              <IconText iconName={"mdi:heart-box"} DispText={"Liked Songs"} />
            </div>
          </div>

          <div className="mx-5 w-1/3 mb-10">
            <div className=" border rounded-full border-gray-600 text-white flex items-center justify-center hover:border-white cursor-pointer">
              <div className="mr-2  ">
                <Icon icon="radix-icons:globe" />
              </div>
              <div className="text-sm ">English</div>
            </div>
          </div>
        </div>
        {/* right part */}
        <div className="h-full w-4/5 bg-nav-black overflow-auto ">
          <div className=" navbar bg-black bg-opacity-40 w-full h-1/10  flex items-center justify-end">
            <div className="w-1/2 flex h-full ">
              <div className="flex w-2/3 justify-around items-center">
                <Navbutton DispText={"Premium"} />
                <Navbutton DispText={"Support"} />
                <Navbutton DispText={"Download"} />
                <div className="h-1/2  border-r border-yellow-50 "></div>
              </div>

              <div className="w-1/3 flex justify-around items-center">
                <Link to="/uploadMusic">
                  <Navbutton
                    DispText={"Upload Song"}
                    active={currentActiveScreen === "uploadSong"}
                  />
                </Link>
                <div className=" bg-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer font-semibold ">
                  RR
                </div>
              </div>
            </div>
          </div>
          <div className="Maincontent">{children}</div>
        </div>
      </div>
      {/* current song playing */}
      {currentSong && (
        <div className="h-1/10 w-full px-5 bg-black bg-opacity-30 text-white flex ">
          <div className=" w-1/4 flex items-center">
            <img
              className="object-contain h-12 w-12 rounded-md"
              src={currentSong.thumbnail}
              alt=" songimg"
            />
            <div className="flex flex-col ml-3">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className=" text-xs text-gray-400 hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          {/* playing bar */}

          <div className="w-1/2  h-full flex flex-col justify-center items-center">
            <div className="flex  w-1/3 items-center mt-2 justify-between">
              <Icon
                icon="radix-icons:shuffle"
                width="25"
                className=" hover:text-white text-gray-400"
              />
              <Icon
                icon="fluent:previous-24-filled"
                width="25"
                className=" hover:text-white text-gray-400"
              />
              <Icon
                icon={isPaused ? "el:play-alt" : "el:pause-alt"}
                width="36"
                className=" hover:text-white text-gray-400"
                onClick={togglePlayPause}
              />

              <Icon
                icon="fluent:next-24-filled"
                width="25"
                className=" hover:text-white text-gray-400"
              />
              <Icon
                icon="ph:repeat"
                width="25"
                className=" hover:text-white text-gray-400"
              />
            </div>
            <div>--------------------------------------------------</div>
          </div>
          {/* playingbar right side */}
          <div className="w-1/4 flex justify-end  space-x-8 mt-2 ml-5 cursor-pointer items-center">
            <Icon
              icon="flat-color-icons:like"
              className=" hover:text-white text-gray-400"
              width={28}
            />
            <Icon
              className=" hover:text-white text-gray-400"
              icon="subway:add-playlist"
              width={28}
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
