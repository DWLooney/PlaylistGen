import React from 'react';
import VideoMain from './VideoMain'
import VideoContainer from './VideoContainer'
import Header from './Header'
import {genPlaylist} from './api/search'
import { Container, Box, Button, FormControl, MenuItem, InputLabel, Select, TextField } from '@material-ui/core';
import AddedVideos from './AddedVideos'
class Parent extends React.Component {
    constructor(props){
        super(props)
        this.performSearch = this.performSearch.bind(this);
        this.searchRelated = this.searchRelated.bind(this)
        this.state = {url: "", 
                      id: "", 
                      search: false, 
                      firstWatch: 0, 
                      currentPlaylist: {name: "", items: []}};
    }

    videoClicked =  (videoId) => {
        this.setState({url: "https://www.youtube.com/embed/" + videoId, 
                       id: videoId, 
                       search: false, 
                       firstWatch: 1, 
                       currentPlaylist: this.state.currentPlaylist})
        window.scrollTo(0, 0);
    }

    urlCallback = (childData) => {
        this.setState({url: childData.url, 
                       id: childData.id, 
                       search: true, 
                       firstWatch: this.state.firstWatch, 
                       currentPlaylist: this.state.currentPlaylist})

    };

    updateVideoList = (list) => {
        this.setState({url:this.state.url,
            id: this.state.id, 
            search: false, 
            firstWatch: this.state.firstWatch, 
            currentPlaylist: list})
    }

    videoAdded = (item) => {
        this.setState({url:this.state.url,
                       id: this.state.id, 
                       search: false, 
                       firstWatch: this.state.firstWatch, 
                       currentPlaylist: {name: this.state.currentPlaylist.name, items: [...this.state.currentPlaylist.items, item]}})
    }

    performSearch() {
        this.setState((state, props) => { 
            return {url: this.state.url, 
                    id: this.state.id, 
                    search: true, 
                    firstWatch: this.state.firstWatch,
                    currentPlaylist: this.state.currentPlaylist} 
        });
    };
    searchRelated(videoId) {
        this.setState({url: "https://www.youtube.com/embed/" + videoId, 
        id: videoId, 
        search: true, 
        firstWatch: 0, 
        currentPlaylist: this.state.currentPlaylist})
    }

    generatePlaylist = async (amount, tags) => {
        const newPlaylist = await genPlaylist(this.state.id, amount, tags);
        if (newPlaylist !== undefined && newPlaylist.items !== undefined) {
            this.setState( () => {
                return {url: this.state.url, 
                        id: this.state.id, 
                        search: true, 
                        firstWatch: this.state.firstWatch,
                        currentPlaylist: {name: this.state.currentPlaylist.name, items: newPlaylist.items}} 
                });
        }
    }

    render() {
        return(
            <div>
                <Container style={{backgroundColor: "lightgray", alignContent: "auto"}}>
                    <Box>
                        <Header performSearch = {this.urlCallback}/>
                    </Box>
                    <Box paddingTop="20px" paddingBottom="20px">
                        <Button onClick={this.performSearch} style={{float: "left"}} variant="contained">Perform search</Button>
                        <SelectAmt width = "100%" style ={{float: "right"}} generatePlaylist = {this.generatePlaylist}/>
                    </Box>

                    <Box title="Current Video" >
                        <VideoMain url = {this.state.url} firstWatch = {this.state.firstWatch}/>
                    </Box>
                    <VideoContainer id = {this.state.id} 
                                    doSearch = {this.state.search} 
                                    handleVideoClicked = {this.videoClicked}
                                    handleVideoAdded = {this.videoAdded}
                                    handleSearchRelated = {this.searchRelated}
                                    depth = {0}/>
                </Container>
                <AddedVideos videoList = {this.state.currentPlaylist} updateVideoList = {this.updateVideoList} handleClick = {this.videoClicked}/>
            </div>
        );
    }
}

export default Parent;

function SelectAmt(props) {
    const [amount, setAmount] = React.useState({amt: '', tags: ''})

    const handleChange = (event) => {
        const amt = event.target.value;
        setAmount({amt: amt, tags: amount.tags});
    }

    const setTags = (event) => {
        const tags = event.target.value
        setAmount({amt: amount.amt, tags: tags})
    }
    return (
        <div style={{width: "30%"}}>
            <Button variant = "contained" style = {{marginLeft: "2%"}} onClick = {() => props.generatePlaylist(amount.amt, amount.tags)}> Generate Playlist </Button>
            <FormControl className="genSelect" fullWidth = {true} style = {{width: "75%"}}>
                <InputLabel id="video-amount-select"># Of Videos</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange = {handleChange}
                    defaultValue = {10}

                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
                <TextField id="tags" label="Enter tags (comma seperated)" onChange = {setTags} />
            </FormControl>
        </div>
    )

}