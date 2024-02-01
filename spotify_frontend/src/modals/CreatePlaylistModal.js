import InputBox from "../Components/Common/InputBox";
import { makeauthenticatedPOSTRequest } from "../utils/serverhelpers";
import { Icon } from '@iconify/react';
import { useState } from "react";
const CreatePlaylistModal = ({ closeModal }) => {
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
            Create Playlist{" "}
          </div>
          <hr />
        </div>
        <div className="flex flex-col items-center">
          <InputBox
            lableClassName={"text-white"}
            label={"Name"}
            placeholder={"Enter the Playlist Name"}
            value={playlistName}
            setValue={setPlaylistName}
          />
          <InputBox
            lableClassName={"text-white"}
            label={"Thumbnail"}
            placeholder={"Enter the Thumbnail"}
            value={playlistThumbnail}
            setValue={setPlaylistThumbnail}
          />
          <div
            onClick={createPlaylist}
            className=" w-1/3 cursor-pointer  mt-5 rounded-md bg-green-500 flex items-center justify-center"
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePlaylistModal;
