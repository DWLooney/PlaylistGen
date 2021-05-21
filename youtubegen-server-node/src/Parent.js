import React from 'react';
import VideoMain from './VideoMain'
import VideoContainer from './VideoContainer'
import Header from './Header'
import { Container, Box, Button } from '@material-ui/core';

class Parent extends React.Component {
    constructor(props){
        super(props)
        this.performSearch = this.performSearch.bind(this);
        this.state = {url: "", id: "", search: false};
    }
    urlCallback = (childData) => {
        this.setState({url: childData.url, id: childData.id, search: this.state.search})

    };
    performSearch(){
        console.log("performing search...")
        this.setState((state, props) => { 
            return {url: this.state.url, id: this.state.id, search: true} 
        });
    };
    render() {
        return(
            <Container style={{backgroundColor: "lightgray", alignContent: "auto"}}>
                <Box>
                    <Header parentCallback = {this.urlCallback} />
                </Box>
                <Box paddingTop="20px" paddingBottom="20px">
                    <Button onClick={this.performSearch} variant="contained">Perform search</Button>
                </Box>
                <Box margin = "auto" title="Current Video" >
                    <VideoMain url = {this.state.url}/>
                </Box>
                <VideoContainer id = {this.state.id} search = {this.state.search}/>
            </Container>
        );
    }
}

export default Parent;