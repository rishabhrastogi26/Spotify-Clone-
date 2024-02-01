import InputBox from "../Components/Common/InputBox";
import CloudinaryUpload from "../Components/Common/CloudinaryUpload";
import { useState } from "react";
import { makeauthenticatedPOSTRequest } from "../utils/serverhelpers";
import { Link } from "react-router-dom";
import LoggedInContainer from "../containers/loggedInContainer";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setplaylistUrl] = useState("");
  const [uploadedsongfilename, setuploadedsongfilename] = useState("");
  const SubmitSong = async () => {
    // console.log(name);
    // console.log(thumbnail);
    // console.log(playlistUrl);
    const data = { name, thumbnail, track: playlistUrl };
    const response = await makeauthenticatedPOSTRequest("/song/create", data);
    console.log(response);
  };
  return (
    <LoggedInContainer currentActiveScreen={"uploadSong"}>
      <div className="Maincontent p-8 pt-0 overflow-auto">
        <div className="text-2xl font-semibold  mb-3 mt-5 text-white">
          Upload Your Song
        </div>
        <div className=" flex space-x-3 w-2/3">
          <div className="w-1/2">
            {/* name of the song */}
            <InputBox
              lableClassName={"text-white "}
              label={"Name of the Song"}
              placeholder={"Enter the Name"}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="w-1/2">
            {/* Thumbnail of the song  */}
            <InputBox
              lableClassName={"text-white"}
              label={"Thumbnail"}
              placeholder={"Enter the Thumbnail"}
              value={thumbnail}
              setValue={setThumbnail}
            />
            {/* playlist select karne ka ek menu dena baki hai 
              and actual song upload karane ka ek menu dena baki hai 
              */}
          </div>
        </div>
        <div className="pt-5">
          {/* track */}
          {uploadedsongfilename ? (
            <div className="bg-white  rounded-full w-1/3 p-3">
              {uploadedsongfilename.substring(0, 35)}...
            </div>
          ) : (
            <CloudinaryUpload
              setUrl={setplaylistUrl}
              setName={setuploadedsongfilename}
            />
          )}
        </div>
        <div
          onClick={SubmitSong}
          className="  bg-white w-1/6 p-3 cursor-pointer font-medium text-center rounded-full mt-10 justify-center"
        >
          Submit Song
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default UploadSong;
