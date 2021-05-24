
import {Button, Box, Card, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton, TextField} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import {savePlaylist, loadPlaylist} from './api/search'

import './AddedVideos.css';

function AddedVideos(props) {


  const listItems = props.videoList;
  const updateList = props.updateVideoList;
  const handleClick = props.handleClick;

  const handleNameChange = async (event) => {
    const newName = event.target.value;
    console.log("name change?")
    updateList({name: newName, items: listItems.items});
  }

  const handleSave = async () => {
    let idList = ""
    if (listItems.items.length !== 0) {
      idList += listItems.items[0].videoId
      listItems.items.slice(1, listItems.items.length).forEach(element => {
        if (element.videoId !== null) {
          idList += ("," + element.videoId.toString())
        }
      });
    } 
    await savePlaylist(listItems.name, idList);
    window.alert("Playlist saved successfully!");
  }

  const handleLoad = async () => {
    if (listItems.name !== undefined) {
      var newList = await loadPlaylist(listItems.name);
      console.dir(newList);
      updateList({name: listItems.name, items: newList.items});
    }
  }
  let playlistComponents = [];
  if (listItems.items !== undefined) {
    playlistComponents.length = 0;
    for(let x = 0; x < listItems.items.length; x++) {
      playlistComponents.push(
        <ListItem key = {x} role = {undefined} onClick = {() => handleClick(listItems.items[x].videoId)}> 
          <ListItemText id = {'list-label-' + x}>{listItems.items[x].title.substring(0, 100)}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick = {() => updateList({name: listItems.name, 
                                                        items: listItems.items.filter(function(value, index, arr) {
                                                                                        return index !== x;
                                                                                        })
                                                        })
                                    } >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
      );
    }
  }



   return (
    <Box className = 'scrolled'>
      <Card style = {{height: "500px", width: "400px", overflow: "auto"}}>
        <h3 style={{textAlign: "center"}}>Playlist</h3>
        <TextField id="tags" label="Enter Name" style={{marginLeft: "5px"}} onChange = {handleNameChange}/>
        <Button variant = "contained" onClick = {handleLoad} style = {{float:"right", marginTop: "10px", }}>Load</Button>
        <Button variant = "contained" onClick = {handleSave} style = {{float:"right", marginTop: "10px", marginRight: "10px"}}>Save</Button>

        <List dense = {true}>
          {playlistComponents}
        </List>
      </Card>
    </Box>
   )
}


export default AddedVideos;