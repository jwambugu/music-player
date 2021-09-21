import { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
    // Refs
    const audioRef = useRef(null);

    // State
    const [songInfo, setSongInfo] = useState({
        currentTime: null,
        duration: null,
    });

    // Event handlers
    const playSongHandler = () => {
        !isPlaying ? audioRef.current.play() : audioRef.current.pause();

        setIsPlaying(!isPlaying);
    };

    const timeUpdateHandler = (e) => {
        const { currentTime, duration } = e.target;

        setSongInfo({ ...songInfo, currentTime, duration });
    };

    const getTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const secondsWithZero = String(seconds).padStart(2, "0");
        return `${minutes}:${secondsWithZero}`;
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input type="range" />
                <p>{getTime(songInfo.duration)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    icon={faAngleLeft}
                    size="2x"
                />

                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    icon={faPlay}
                    size="2x"
                />

                <FontAwesomeIcon
                    className="skip-forward"
                    icon={faAngleRight}
                    size="2x"
                />
            </div>

            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </div>
    );
};

export default Player;
