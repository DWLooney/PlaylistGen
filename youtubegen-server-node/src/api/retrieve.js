async function retrieve(searchQuery) {
    var searchResults = "";
    const axios = require('axios');
    axios.get(searchQuery)
        .then(function (response) {
            searchResults = JSON.parse(response);
            if (searchResults.error !== null) {
                return searchResults;
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    return searchResults;   
}

export default retrieve;