import { Box, Paper } from '@material-ui/core';
import './VideoCard.css';

function VideoCard(props) {
        return (
            <Box className = "video-thumb" >
                <Paper>
                    <h5 style={{position: "relative"}}>{props.data.snippet.title}</h5>
                    <div margin = "auto">
                        <img src={props.data.snippet.thumbnails.default.url}/>
                    </div>
                </Paper>
            </Box>

    );
}
export default VideoCard;