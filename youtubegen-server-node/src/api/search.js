export async function getSearchResults(query, videoId) {
    const rtr = require('./retrieve');

    //TODO configurable
    let searchQuery = 'http://localhost:8080/ytRelated?id=' + videoId;
    let searchResults = rtr.retrieve(searchQuery);
    return searchResults;
}
