import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LoggedInContainer from "../containers/loggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverhelpers";
import SingleSongCard from "../Components/Common/SingleSongCard";

const SingleplaylistView = () => {
  const { playlistId } = useParams();
  const [playlistdetails, setPlaylistDetails] = useState({});
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + playlistId
      );
      setPlaylistDetails(response);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer currentActiveScreen={"library"}>
      {playlistdetails._id && (
        <div>
          <div className="text-lg text-white pl-10 pt-8 font-bold">
            {playlistdetails.name}
          </div>
          <div className=" mx-4 space-y-3 pt-10">
            {playlistdetails.songs.map((item) => {
              return (
                <SingleSongCard
                  props={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                />
              );
            })}
          </div>
        </div>
      )}
    </LoggedInContainer>
  );
};
export default SingleplaylistView;
