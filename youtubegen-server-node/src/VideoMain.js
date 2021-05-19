import React from 'react';
import './VideoMain.css';
function VideoMain(props) {
    return (
        <div className = "yt-embed">
            <h2 color="lightGray">
                Current Video
            </h2>
            <iframe src={props.url}
                title="Current Video" 
                frameBorder="0" 
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen></iframe>
        </div>
    )
}


export default VideoMain;