import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoadingContext } from "../../../context/loadingContext";

const Songs = () => {

  const [suggestedSongs, setSuggestedSongs] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [debouncer, setDebouncer] = useState(null)
  const [selectedSong, setSelectedSong] = useState({})
  const [focusInput, setFocusInput] = useState(false)

  const {loading, setLoading} = useContext(LoadingContext)

  // Handle debouncer
  useEffect(() => {
    clearTimeout(debouncer)

    if(searchValue.length > 0) {
      setDebouncer(setTimeout(() => {
        setLoading(true)
        setFocusInput(false)
        searchSongs(searchValue)
      }, 500))
    } else {
      setSuggestedSongs([])
      setFocusInput(false)
    }

  }, [searchValue])

  // Handle input change
  const searchChange = (e) => {
    setSearchValue(e.target.value)
  }

  const searchSongs = async (search) => {
    const data = await axios.get(`/api/songs/suggest/${ search }`)
    if(data.data.songs.length) {
      setFocusInput(true)
      setSuggestedSongs(data.data.songs)
    }
    setLoading(false)
  }
  
  return <section className="song-view-container">
    <article className="home-header">
      <h1>SEARCH SONG</h1>
      <p>Make better scores with this feature!</p>
    </article>

    <article className="search-container">
      <div className="search-box">
        <input onFocus={(e) => setFocusInput(true)} onChange={ searchChange } maxLength={ 50 } placeholder="Search song..." type="text" name="song" id="song" />
        <img src="/assets/search.svg" alt="search-img" />
      </div>

      { loading ? <p>Loading...</p> : <></> }

      <div className={ `suggested-songs ${ suggestedSongs.length && focusInput ? "show" : "" }` }>
        { suggestedSongs.length && focusInput ? suggestedSongs.map((song, index) => <div onClick={ (e) => { 
          setSelectedSong(suggestedSongs[index])
          setFocusInput(false)
         } } className={ song.difficulty == "Normal" ? 'normal-display' : song.difficulty == "Hard" ? 'hard-display' : 'extreme-display' } key={index}>
          <img src={ song.image } alt="" />
          <p>{ song.is_deluxe ? '[Deluxe] ' : '' }{ song.song_title } by { song.artists }</p>
        </div>) : <></> }
      </div>

      { selectedSong.song_title ? <div className={`song-details ${selectedSong.difficulty.toLowerCase()}-difficulty`}>
        <div className="song-title">
          <span>{ `${selectedSong.song_title} - ${selectedSong.artists}` }</span>
          </div>
        <div className="basic-info">
          <div className="song-tags">
            <span className={ `tag-${selectedSong.difficulty.toLowerCase()}` }>{selectedSong.difficulty}</span>
            { selectedSong.is_deluxe ? <span className="tag-deluxe">Deluxe</span> : <></> }
            { selectedSong.genres.split(", ").map((genre, index) => <span className={ `tag-${genre.toLowerCase()}` } key={index}>{ genre }</span>) }
          </div>

          <div className="song-image">
            <img src={ selectedSong.image } alt="song-img" />
            <span>Length: { selectedSong.duration }</span>
          </div>
        </div>

        <table className="song-stages">
          <tbody>
            <tr>
              <th>Stage</th>
              <th>Points</th>
            </tr>

            { selectedSong.stages.map((stage, index) => <tr key={index}>
              <td>{ index == 0 ? "Intro Stage" : index == selectedSong.stages.length - 1 ? "Final Stage" : `Stage ${ index + 1 }` }</td>
              <td>{ stage }</td>
            </tr>) }
          </tbody>
        </table>
      </div> : <></> }
    </article>
  </section>;
};

export default Songs;
