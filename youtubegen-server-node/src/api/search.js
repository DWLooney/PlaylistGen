import {retrieve} from './retrieve'
export async function getSearchResults(query, videoId) {

    let searchQuery = 'http://localhost:8080/ytRelated?id=' + videoId;
    let searchResults = retrieve(searchQuery);
    return searchResults;
}

export async function genPlaylist(videoId, amount, tags) {

    let searchQuery = 'http://localhost:8080/ytGenerate?id=' + videoId + '&amount=' + amount + '&tags=' + tags;
    let searchResults = retrieve(searchQuery);
    console.dir(searchResults);
    return searchResults;
}

export async function savePlaylist(name, list) {

    let searchQuery = 'http://localhost:8080/saveplaylist?ids=' + list + "&name=" + name;
    console.log(searchQuery);
    let searchResults = retrieve(searchQuery);
    return searchResults;
}

export async function loadPlaylist(name) {
    let searchQuery = 'http://localhost:8080/getplaylist?name=' + name;
    let searchResults = retrieve(searchQuery);
    return searchResults;
}