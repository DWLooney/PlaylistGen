import React,{useEffect, useState} from 'react';
import {Button, Box, Card, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton, TextField} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

import './AddedVideos.css';
function AddedVideos(props) {
  

  const [playlist, setPlaylist] = useState([]);

  const [name, setName] = useState([]);

  const listItems = props.videoList;
  const updateList = props.updateVideoList;
  const handleClick = props.handleClick;

  const handleNameChange = (event) => {
    const name = event.target.value;
    setName(name);
  }

  const handleSave = (event) => {
    console.log("saved: " + name);
  }

  const handleLoad = (event) => {
    console.log("loaded: " + name);
  }
  useEffect( () => {

    let playlistComponents = [];
    if (listItems !== undefined) {
      playlistComponents.length = 0;
      for(let x = 0; x < listItems.length; x++) {
        playlistComponents.push(
          <ListItem key = {x} role = {undefined} onClick = {() => handleClick(listItems[x].videoId)}> 
            <ListItemText id = {'list-label-' + x}>{listItems[x].title.substring(0, 100)}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick = {() => updateList(listItems.filter(function(value, index, arr) {
                                                                  return index !== x;}))}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
          </ListItem>
        );
      }
  
      setPlaylist(playlistComponents)
    }
  }, [listItems, updateList, handleClick])


   return (
    <Box className = 'scrolled'>
      <Card style = {{height: "40vh", width: "18vw", overflow: "auto"}}>
        <h3 style={{textAlign: "center"}}>Playlist</h3>
        <TextField id="tags" label="Enter Name" style={{marginLeft: "5px"}} onChange = {handleNameChange}/>
        <Button variant = "contained" onClick = {handleLoad} style = {{float:"right", marginTop: "10px", }}>Load</Button>
        <Button variant = "contained" onClick = {handleSave} style = {{float:"right", marginTop: "10px", marginRight: "10px"}}>Save</Button>

        <List dense = {true}>
          {playlist}
        </List>
      </Card>
    </Box>
   )
}


export default AddedVideos;