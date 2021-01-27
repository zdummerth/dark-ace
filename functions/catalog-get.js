const { Client, Environment } = require('square')


const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.NETLIFY_SQUARE_SANDBOX_ACCESS_TOKEN,
})

const catalogApi = client.catalogApi;

exports.handler = async function () {

    const catalog = await catalogApi.listCatalog();

    console.log(catalog)
    return {
        statusCode: 200,
        // headers: {
        //     'Set-Cookie': myCookie,
        //     'Cache-Control': 'no-cache',
        //     'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(url)
    };
}