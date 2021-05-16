import React from 'react';
import './VideoMain.css'
function VideoMain(props) {
    return (
        <div className = "yt-embed">
            <iframe width="560" 
                height="315" src={props.sourceUrl.url}
                title="Current Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen></iframe>
        </div>
    )
}


export default VideoMain;