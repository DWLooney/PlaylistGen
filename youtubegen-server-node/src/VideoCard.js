import { Box, Button, Card } from '@material-ui/core';

//Search Result card for related video
function VideoCard(props) {
        return (
            <Box className = "video-thumb" >
                <Card style={{marginTop: "10px", backgroundColor: "lightBlue"}}>
                    <h3 style={{textAlign: "center"}}>{props.data.title}</h3>
                    <div margin = "auto">
                        <img src={props.data.thumbnail.url}  alt = "thumbnail" height = "90%" width = "50%" style={{margin:"10px"}}/>
                    </div>
                    <Button color = "primary" onClick = {props.handleClick}> Watch Video</Button>
                    <Button color = "primary" onClick = {() => console.log("Added to playlist")}> Add To Playlist</Button>
                    <Button color = "primary" onClick = {() => console.log("This will view related...")}>View Related</Button>
                </Card>
            </Box>

    );
}
export default VideoCard;