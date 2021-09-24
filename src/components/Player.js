import { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
    currentSong,
    isPlaying,
    setIsPlaying,
    songs,
    setCurrentSong,
}) => {
    // Refs
    const audioRef = useRef(null);

    // State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });

    const SKIP_FORWARD_DIRECTION = 1;
    const SKIP_BACKWARD_DIRECTION = -1;

    // Event handlers
    const playSongHandler = () => {
        !isPlaying ? audioRef.current.play() : audioRef.current.pause();

        setIsPlaying(!isPlaying);
    };

    const timeUpdateHandler = (e) => {
        const { currentTime, duration } = e.target;
        const animationPercentage = Math.round((currentTime / duration) * 100);

        setSongInfo({
            ...songInfo,
            currentTime,
            duration: duration || 0,
            animationPercentage,
        });
    };

    const getTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const secondsWithZero = String(seconds).padStart(2, "0");
        return `${minutes}:${secondsWithZero}`;
    };

    const dragHandler = (e) => {
        const { value } = e.target;

        audioRef.current.currentTime = value;
        setSongInfo({ ...songInfo, currentTime: value });
    };

    const autoPlayHandler = () => {
        if (isPlaying) {
            audioRef.current.play();
        }
    };

    const skipSongHandler = (direction) => {
        // direction is an integer 1 for forward and -1 for backward
        let currentIndex = songs.indexOf(currentSong);
        let targetSongIndex = currentIndex + direction;

        let songToPlay =
            songs[targetSongIndex] ||
            songs[targetSongIndex % songs.length] ||
            songs[songs.length - 1];

        setCurrentSong(songToPlay);
        setSongInfo({ ...songInfo, animationPercentage: 0 });
    };

    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>

                <div
                    className="track"
                    style={{
                        background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
                    }}
                >
                    <input
                        type="range"
                        value={songInfo.currentTime}
                        min={0}
                        max={songInfo.duration}
                        onChange={dragHandler}
                    />

                    <div style={trackAnimation} className="animate-track"></div>
                </div>

                <p>{getTime(songInfo.duration)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipSongHandler(SKIP_BACKWARD_DIRECTION)}
                    className="skip-back"
                    icon={faAngleLeft}
                    size="2x"
                />

                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    icon={isPlaying ? faPause : faPlay}
                    size="2x"
                />

                <FontAwesomeIcon
                    onClick={() => skipSongHandler(SKIP_FORWARD_DIRECTION)}
                    className="skip-forward"
                    icon={faAngleRight}
                    size="2x"
                />
            </div>

            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                onLoadedData={autoPlayHandler}
                onEnded={() => skipSongHandler(SKIP_FORWARD_DIRECTION)}
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </div>
    );
};

export default Player;
