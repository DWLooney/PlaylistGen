import {getApiKey} from './apiKey';
export async function getSearchResults(query, videoId) {
    let apiKey = getApiKey();
    const rtr = require('./retrieve');
    let searchQuery = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=' + videoId + '&key=' + apiKey;
    let searchResults = rtr.default(searchQuery);
    return searchResults;
}
