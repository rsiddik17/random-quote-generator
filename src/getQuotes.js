import axios from 'axios';

const url = 'https://api.api-ninjas.com/v1/quotes';

const config = {
    headers: { "X-Api-Key": "qX1ak7FBxI/YQB0MHKJuzQ==KpwBlnCNtz6rXds7" }, // get your api key in your api-ninjas account
}

async function getQuotes() {
    const  response  = await axios.get(url, config);

    return response.data;
}

export default getQuotes;