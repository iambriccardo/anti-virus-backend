const axios = require('axios');

async function getImageUrl() {
    const uri = 'https://randomuser.me/api/';
    const response = await axios.get(encodeURI(uri))
    return response.data.results[0].picture.medium;
}

module.exports = {
    getImageUrl
}

