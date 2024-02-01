import { useContext } from "react";
import songContext from "../../contexts/songContext";
const SingleSongCard = ({ props, playSound }) => {
  const {currentSong,setCurrentSong} = useContext(songContext);

  return (
    <div
      className="flex hover:bg-gray-400 hover:bg-opacity-20 rounded-md p-2 "
      onClick={() => {
        // playSound(props.track);
        setCurrentSong(props);
      }}
    >
      <div
        className=" bg-cover bg-center w-10 h-10 bg-white "
        style={{
          backgroundImage: `url("${props.thumbnail}")`,
        }}
      ></div>
      <div className="pl-4 flex flex-col justify-center  text-white text-sm w-5/6">
        <div className="hover:underline cursor-pointer">{props.name}</div>
        <div className="text-xs text-gray-400 hover:underline cursor-pointer">
          {props.artist.firstName + " " + props.artist.lastName}
        </div>
      </div>
      <div className="w-1/6 text-gray-400 items-center justify-center  flex text-sm">
        <div>3:44</div>
      </div>
    </div>
  );
};
export default SingleSongCard;
