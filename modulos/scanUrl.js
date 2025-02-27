const axios = require("axios");
const qs = require("querystring")

const scan = async function (url) {
    const api = "https://www.psafe.com/dfndr-lab/wp-content/themes/tonykuehn/inc/url_api_v2.php"
    const body = qs.stringify({
        action: 'url_check',
        url: url
    })
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    try {
        const response = await axios.post(api, body, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

module.exports = scan