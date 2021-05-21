import { Box, Paper } from '@material-ui/core';
//import './VideoCard.css';

function VideoCard(props) {
        return (
            <Box className = "video-thumb" >
                <Paper>
                    <h5 style={{position: "relative"}}>{props.data.title}</h5>
                    <div margin = "auto">
                        <img src={props.data.thumbnail.url}  alt = "thumbnail" height = "100px" width = "100px"/>
                    </div>
                </Paper>
            </Box>

    );
}
export default VideoCard;