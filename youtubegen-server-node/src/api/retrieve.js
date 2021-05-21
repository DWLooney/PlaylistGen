export async function retrieve(searchQuery) {
    var searchResults = "";
    const axios = require('axios');
    await axios.get(searchQuery)
        .then(function (response) {
            searchResults = response;
        })
        .catch(function (error) {
        })
    return searchResults.data;   
}
