import LoggedInContainer from "../containers/loggedInContainer";
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverhelpers";
import { useNavigate } from "react-router-dom";
const LibraryComponent = () => {
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylist(response.data);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer currentActiveScreen={"library"}>
      <div className="text-lg text-white pl-10 pt-8 font-bold">
        {" "}
        My Playlists
      </div>
      <div className=" py-4 pl-6 grid gap-4 grid-cols-5      ">
        {myPlaylist.map((item) => {
          return (
            <Card
              title={item.name}
              srcimg={item.thumbnail}
              key={JSON.stringify(item)}
              playlistID={item._id}
            />
          );
        })}
      </div>
    </LoggedInContainer>
  );
};

const Card = ({ title, srcimg, playlistID }) => {
  const navigate = useNavigate();
  return (
    <div
      className=" p-4 cursor-pointer bg-black w-full bg-opacity-60 rounded-lg "
      onClick={() => {
        navigate("/playlist/" + playlistID);
      }}
    >
      <div className="">
        <img className=" rounded-md" src={srcimg} alt="lable " />
      </div>
      <div className=" text-white flex  justify-center font-semibold text-xs pt-2 pb-1">
        {title}
      </div>
    </div>
  );
};
export default LibraryComponent;
