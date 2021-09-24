// https://fonts.google.com/specimen/Lato?query=lato&sidebar.open=true&selection.family=Lato:wght@700
import LibrarySong from "./LibrarySong";

function Library({ songs }) {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong song={song} key={song.id} />
                ))}
            </div>
        </div>
    );
}

export default Library;
