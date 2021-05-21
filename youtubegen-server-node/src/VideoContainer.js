
import VideoCard from './VideoCard'
import {Container} from '@material-ui/core';
import {useState, useEffect} from 'react';
import {getSearchResults} from'./api/search'


function VideoContainer(props) {
    const [results, setResults] = useState([]);


    //Instantiate output on new api
    useEffect(() => {
        async function callAPI() {
            let output = await getSearchResults("", props.id);
            if (output !== undefined) {
                for(let idx = 0; idx < output.items.length; idx++) {
                    console.log("Creating card...");
                    console.dir(output.items[idx]);
                    if (output.items[idx].thumbnail !== null) {
                        results.push(<VideoCard data = {output.items[idx]} key = {output.items[idx].videoId} />)
                    }
                }
                setResults(results);
            }
        }
        callAPI()
    }, [results, props.search, props.id])
 
    return(<Container fixed style={{backgroundColor: "lightGray", height: '100vh', padding:'10px'}}>{results}</Container>)
    
}
export default VideoContainer;