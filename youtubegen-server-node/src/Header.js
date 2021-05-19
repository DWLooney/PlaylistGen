import React from 'react';
import './Header.css'
import {TextField} from '@material-ui/core';

class Header extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {url: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        if (event.target.value !== null) {
            this.setState({url:event.target.value});
            let videoData = transformUrlToEmbed(event.target.value);
            
            if (videoData.url !== "") {
                this.props.parentCallback(videoData); 
            }
        }
    }
    
    handleSubmit(event) {
        this.setState({url:event.target.value});
        if (event.target.value !== null) {
            this.props.parentCallback(transformUrlToEmbed(event.target.value));
        }

    }
    
    render() {
        return (
            <div className = "headerContainer">
                <div className = "header-text">Youtube Playlist Generator!</div>    
                <div className = "header-url">
                    <form onSubmit={this.handleSubmit} style={{backgroundColor: "white"}}>
                        <TextField fullWidth className = "input" label="Enter a url to start:" value = {this.state.url} onChange = {this.handleChange} style={{margin: "5px"}}/>
                    </form>
                </div>
            </div>

        )
    }
}

function transformUrlToEmbed(url) {
    //Grab unique identifier
    let startIndex = url.indexOf("=") + 1;
    if (startIndex === -1) return {url:"", id:""};
    let uniqueIndex = url.substring(startIndex, url.length);
    let embedUrl = "https://www.youtube.com/embed/" + uniqueIndex;
    return {url: embedUrl, id: uniqueIndex};
}
export default Header;