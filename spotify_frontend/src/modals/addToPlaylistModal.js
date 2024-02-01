import {
  makeauthenticatedPOSTRequest,
  makeAuthenticatedGETRequest,
} from "../utils/serverhelpers";
import { useState, useEffect } from "react";
const AddToPlaylistModal = ({ closeModal, addSongToPlaylist }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");
  const createPlaylist = async () => {
    const response = await makeauthenticatedPOSTRequest("/playlist/create", {
      name: playlistName,
      thumbnail: playlistThumbnail,
      songs: [],
    });
    if (response._id) {
      closeModal();
    }
  };
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylist(response.data);
    };
    getData();
  }, []);

  return (
    <div
      className=" bg-black  absolute w-screen h-screen bg-opacity-80 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-nav-black border border-double border-gray-700 w-1/3 rounded-md p-4 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className=" mb-4">
          <div className="mb-1 text-green-500 font-bold text-lg">
            Select Playlist{" "}
          </div>
          <hr />
        </div>
        <div className="flex flex-col items-center space-y-2">
          {myPlaylist.map((items) => {
            return (
              <PlaylistListComponent
                info={items}
                addSongToPlaylist={addSongToPlaylist}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
const PlaylistListComponent = ({ info ,addSongToPlaylist}) => {
  return (
    <div
      className="bg-nav-black w-full flex p-1 items-center text-white hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer rounded"
      onClick={() => {
        addSongToPlaylist(info._id);
      }}
    >
      <div>
        <img src={info.thumbnail} className="  w-12 h-12 rounded" />
      </div>
      <div className="font-semibold text-sm pl-3">{info.name}</div>
    </div>
  );
};
export default AddToPlaylistModal;
