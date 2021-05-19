
import VideoCard from '../VideoCard/VideoCard'
import {Container} from '@material-ui/core';
import {useState, useEffect} from 'react';

function VideoContainer(props) {
    const search = require('../api/search/search')
    const [results, setResults] = useState({items: "0"});
    var output = [];

    //Instantiate output on new api
    useEffect(() => {
        //Has fetched results
        if (results.items !== "1" && results.items !== "0" && results.items !== undefined) {
            for(let idx = 0; idx < results.items.length; idx++) {
                console.log("Creating card...");
                console.dir(results.items[idx]);
                if (results.items[idx].snippet !== undefined) {
                    output.push(<VideoCard data = {results.items[idx]} key = {results.items[idx].id.videoId} />)
                }
            }
        }
        if (results.items !== "1" && results !== undefined && props.search) {
            setResults({items: "1"});
            const query = search.getSearchResults("", props.id);
            console.log(JSON.stringify(query));
            setResults(query);
        }
    })
 
    return(<Container fixed style={{backgroundColor: "lightGray", height: '100vh', padding:'10px'}}>{output}</Container>)
    
}
export default VideoContainer;