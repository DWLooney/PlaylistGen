import {retrieve} from './retrieve'
export async function getSearchResults(query, videoId) {


    //TODO configurable
    let searchQuery = 'http://localhost:8080/ytRelated?id=' + videoId;
    let searchResults = retrieve(searchQuery);
    return searchResults;
}

export async function genPlaylist(videoId, amount, tags) {

    let searchQuery = 'http://localhost:8080/generate?id=' + videoId + '&amount=' + amount + '&tags=' + tags;
    console.log(searchQuery);
    let searchResults = retrieve(searchQuery);
    return searchResults;
}

export async function savePlaylist(list) {

    let searchQuery = 'http://localhost:8080/saveplaylist?list=' + list;
    let searchResults = retrieve(searchQuery);
    return searchResults;
}

export async function loadPlaylist(name) {
    let searchQuery = 'http://localhost:8080/getplaylist?name=' + name;
    let searchResults = retrieve(searchQuery);
    return searchResults;
}