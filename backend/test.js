require("dotenv").config();
const config = process.env;

const axios = require("axios");


async function sample() {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:1337/api/courses/?populate=deep',
      headers: {
        'Authorization': `Bearer ${config.STRAPI_TOKEN}`
      }
    });
    // const response = await axios.get("http://127.0.0.1:1337/api/courses/?populate=deep")
    console.log(response.data.data);
  } catch(error) {
    console.log(error);
  }
}

sample()