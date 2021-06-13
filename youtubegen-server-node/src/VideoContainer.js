
import VideoCard from './VideoCard'
import {Container} from '@material-ui/core';
import {useState, useEffect} from 'react';
import {getSearchResults} from'./api/search'


function VideoContainer(props) {
    const [results, setResults] = useState([]);
    //Instantiate output on new api
    useEffect(() => {
        async function callAPI() {
            if (results.length > 0) {
                results.length = 0;
            }
            let output = await getSearchResults("", props.id);
            if (output !== undefined && output.items.length !== 0) {
                for(let idx = 0; idx < output.items.length; idx++) {
                    if (output.items[idx].thumbnail !== null) {
                        results.push(<VideoCard 
                                        handleClick = {() => props.handleVideoClicked(output.items[idx].videoId)} 
                                        handleAdd = {() => props.handleVideoAdded(output.items[idx])}
                                        handleSearchRelated = {() => props.handleSearchRelated(output.items[idx].videoId)}
                                        key = {idx}
                                        data = {output.items[idx]}/>);
                    }
                }
                setResults(results)
            }
        }

        if (props.doSearch) {
            callAPI()
        }
    }, [results, props])
 
    return(<Container style={{backgroundColor: "lightGray"}}>{results}</Container>)
    
}
export default VideoContainer;