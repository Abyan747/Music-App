import { useState } from 'react';
import './App.css';


function App() {
  const [keyword, setKeyword] = useState('');
  const [tracks, setTracks]= useState([]);
  const [Loading, setLoading] = useState(true)
  const [playlist, setPlaylist] = useState([]);


  const getTracks = async () => {
    let data = await fetch('https://v1.nocodeapi.com/abhn047/spotify/pNMpcLCbuUistAgC/search?q=a&type=track')
    let convertedData = await data.json();
    setTracks(convertedData.tracks.items);
    console.log(tracks);
  }



  return (
    <div className="app">
      <nav className="nav main-nav">
        <ul className="list">
          <li>
            <a href="#">HOME</a>
          </li>
          <li>
            <a href="#playlist">PLAYLIST</a>
          </li>
        </ul>
      </nav>

      <h1 className='title'>Music App</h1>
      <button onClick={getTracks}>Get Tracks</button>
      <div className="search">
        <input type="text" placeholder="Search for a song" 
        value={keyword} onChange={(event) => {setKeyword(event.target.value)}} />
      </div>
      <div className="flex-container">
        {tracks
        .filter(track => {
        return keyword.toLowerCase() === '' ?track:
        track.name.toLowerCase().includes(keyword);})
        .map((track) =>(
          <div key={track.id} class="box">
            <img src={track.album.images[1].url} w-100 alt={track.name} />
            <h4>{track.name}</h4>
            <div className='artist'>
              <p>{track.artists[0].name}</p>
            </div> 
            <audio controls src={track.preview_url}></audio>
            <button onClick={()=>{
              let notPresent =true;
              for (let i of playlist){
                if (i.id === track.id){
                  notPresent = false;
                }
              }
              if (notPresent){
                setPlaylist([...playlist, track]);
                alert('Song added to playlist');
              } else {
                alert('This song is already in the playlist');
              }
              console.log(playlist);
            }}>Add to Playlist</button>
          </div>
        ))}
      </div> 
      <div id="playlist">
          <h1 className='title'>PLAYLIST</h1>
          <div className="flex-container">
            {playlist.map((track) =>(
              <div key={track.id} class="box">
              <img src={track.album.images[1].url} w-100 alt={track.name} />
              <h4>{track.name}</h4>
              <div className='artist'>
                <p>{track.artists[0].name}&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div> 
              <audio controls src={track.preview_url}></audio>
              <button onClick={()=>{
              setPlaylist(playlist.filter((t) => t.id!== track.id));
            }}>Delete from Playlist</button>
              </div>
            ))}
          </div>
      </div> 
    </div>
  );
}

export default App;
