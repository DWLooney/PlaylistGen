import React from 'react';
import VideoMain from '../VideoMain/VideoMain'
import VideoCard from '../VideoCard/VideoCard'
import Header from '../Header/Header'
import { Container, Box } from '@material-ui/core';

class Parent extends React.Component {
    state = {url: ""};
    urlCallback = (childData) => {
        this.setState({url: childData})
    };

    render() {
        const btOffset = '2';
        return(
            <Container>
                <Box>
                    <Header parentCallback = {this.urlCallback} />
                </Box>
                <Box margin = "auto" >
                    <VideoMain sourceUrl = {this.state.url}/>
                </Box>
                <div className = "card-tree" padding-bottom={btOffset}>
                <VideoCard />
                </div>
            </Container>
        );
    }
}

export default Parent;