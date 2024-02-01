import { useState } from "react";
import LoggedInContainer from "../containers/loggedInContainer";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest } from "../utils/serverhelpers";
import SingleSongCard from "../Components/Common/SingleSongCard";
const SearchMusicComponent = () => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);

  const searchSong = async () => {
    const response = await makeAuthenticatedGETRequest(
      "/song/get/songname/" + searchText
    );

    setSongData(response.data);

    // setSearchText("");
  };
  return (
    <LoggedInContainer currentActiveScreen={"search"}>
      <div className="w-full p-4 ">
        <div
          className={`flex w-1/3  space-x-3 bg-black   rounded-full px-5 ${
            isInputFocused
              ? "border-2 border-solid  border-white"
              : "hover:opacity-90 "
          }`}
        >
          <div className="bg-black flex items-center ">
            <Icon icon="gg:search" width=" 24" className="text-white " />
          </div>

          <input
            type="text"
            className="text-sm  w-full p-3 bg-black text-white focus:outline-none "
            placeholder="What do you want to listen to ?"
            onFocus={() => {
              setInputFocused(true);
            }}
            onBlur={() => {
              setInputFocused(false);
            }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              console.log(e);
              if (e.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>

        {songData.length > 0 ? (
          <div className=" space-y-3 pt-10">
            <div className="text-white ">
              Showing search result for :{" "}
              <span className="font-bold">{searchText}</span>
            </div>
            {songData.map((item) => {
              return (
                <SingleSongCard
                  props={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-white p-2 pt-5">
            <p>No results found for : <span className="font-bold">{searchText}</span></p>
            <br />
            <p className="text-gray-500">
              Please make sure your words are spelled correctly, or use fewer or
              different keywords.
            </p>
          </div>
        )}
      </div>
    </LoggedInContainer>
  );
};
export default SearchMusicComponent;
