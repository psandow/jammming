import React, { useCallback } from 'react';
import './Playlist.css';  
import TrackList from '../TrackList/TrackList';

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange, onSave }) {
  
  const handleNameChange = useCallback((event) => {
    onNameChange(event.target.value); // Call the onNameChange function passed as a prop with the new name
  }, [onNameChange]);
  
  
  return (      
<div className="Playlist">
  <input defaultValue={playlistName} onChange={handleNameChange}/>
  <TrackList 
    tracks={playlistTracks} 
    isRemoval={true}
    onRemove={onRemove} />

  <button className="Playlist-save" onClick={onSave}>
    SAVE TO SPOTIFY
    </button>
</div>
  );
}

export default Playlist;