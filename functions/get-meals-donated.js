const fetch = require('node-fetch');
require("dotenv").config();



exports.handler = async event => {


    const response = await fetch(FormURL, {
        method: 'POST',
        body: formData
    })

    console.log('response', response.status)
  
    //still need to do error handling
    return {
      statusCode: response.status,
      body: 'FUck YEak',
    }
  
  }