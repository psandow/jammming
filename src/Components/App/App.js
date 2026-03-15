import React, { useState } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App() {

  const [searchResults, setSearchResults] = useState([]);

  const [playlistName, setPlaylistName] = useState("My New Playlist");

  const [playlistTracks, setPlaylistTracks] = useState([]);



  const addTrack = (track) => {
    // Check if the track is already in the playlist
    if (playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      return; // If it is, do not add it again
    }
    setPlaylistTracks(prevTracks => [...prevTracks, track]); // Add the track to the playlist
  };

  const removeTrack = (track) => {
    setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id)); // Remove the track from the playlist
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name); // Update the playlist name
  }

  const savePlaylist = () => {
    const trackUris = playlistTracks.map(track => track.uri);
    
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName('New Playlist'); // Reset the playlist name
      setPlaylistTracks([]); // Clear the playlist tracks
    });

    console.log('Saving playlist with name:', trackUris);
  };
    
    const search = (term) => {
    Spotify.search(term).then(results => {
      setSearchResults(results); // Update the search results state with the results from Spotify
    });
  }
    
    return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack} />
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onRemove={removeTrack} 
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
            />
        </div>
      </div>
    </div>
  );

}



export default App;
