
import React from 'react';
import { Paper } from '@material-ui/core';
function VideoMain(props) {
    return (
        <Paper style = {{padding: "10px"}}>
            <div className = "yt-embed" style = {{paddingBottom: "56.25%", position:"relative", height: "0", textAlign: "center"}}>
                <h1 color="lightGray">
                    Current Video
                </h1>
                <div >
                    <iframe src={props.url + '?autoplay=' + props.firstWatch}
                        title="Current Video" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        width="100%"
                        height="90%"
                        style={{position: "absolute", bottom: "0", left: "0", right:"0"}}
                        allowFullScreen></iframe>
                </div>
            </div>
        </Paper>

    )
}


export default VideoMain;