async function retrieve(searchQuery) {
    var searchResults;
    const https = require('https');
    https.get(searchQuery, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            searchResults = JSON.parse(data);
            console.dir(searchResults)
            return searchResults;
        })
    }).on('error', (err) => {
        console.log("Error retrieving API request:" + err);
    })
}

export default retrieve;