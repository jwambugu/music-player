// https://fonts.google.com/specimen/Lato?query=lato&sidebar.open=true&selection.family=Lato:wght@700
import LibrarySong from "./LibrarySong";

function Library({ songs, setCurrentSong, currentSong, libraryStatus }) {
    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong
                        key={song.id}
                        song={song}
                        setCurrentSong={setCurrentSong}
                        currentSong={currentSong}
                    />
                ))}
            </div>
        </div>
    );
}

export default Library;
