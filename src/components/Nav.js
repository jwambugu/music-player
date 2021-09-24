import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Nav({ libraryStatus, setLibraryStatus }) {
    return (
        <nav>
            <h1>Waves</h1>
            <button
                onClick={() => setLibraryStatus(!libraryStatus)}
                className={libraryStatus ? "library-active" : ""}
            >
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    );
}

export default Nav;
