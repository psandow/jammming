import React, { useState } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {

  const [searchResults, setSearchResults] = useState([
    {
      name: 'Example Song 1',
      artist: 'Example Artist 1',
      album: 'Example Album 1',
      id: 1
    },
    {
      name: 'Example Song 2',
      artist: 'Example Artist 2',
      album: 'Example Album 2',
      id: 2
    },
    {
      name: 'Example Song 3',
      artist: 'Example Artist 3',
      album: 'Example Album 3',
      id: 3
  }
]);

  const [playlistName, setPlaylistName] = useState("My New Playlist");

  const [playlistTracks, setPlaylistTracks] = useState([
    { name: 'Playlist Song 1', artist: 'Playlist Artist 1', album: 'Playlist Album 1', id: 4 },
    { name: 'Playlist Song 2', artist: 'Playlist Artist 2', album: 'Playlist Album 2', id: 5 },
    { name: 'Playlist Song 3', artist: 'Playlist Artist 3', album: 'Playlist Album 3', id: 6 }
]);



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

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack} />
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onRemove={removeTrack} />
        </div>
      </div>
    </div>
  );

}



export default App;
