function LibrarySong({ song, setCurrentSong, currentSong }) {
    const selectSongHandler = () => {
        setCurrentSong(song);
    };

    return (
        <div
            onClick={selectSongHandler}
            className={`library-song ${
                currentSong.id === song.id ? "selected" : ""
            }`}
        >
            <img src={song.cover} alt={song.name}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong;
