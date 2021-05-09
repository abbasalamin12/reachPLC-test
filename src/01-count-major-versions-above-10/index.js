const { default: axios } = require('axios');

/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

module.exports = async function countMajorVersionsAbove10() {
  // TODO
  let count = 0;

  return axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(function (response) {
      dataContent = response.data.content;
      dataContent.forEach(element => {
        if (parseFloat(element.package.version) > 10) {
          // increment count by 1 if the version is greater than 10
          count++;
        }
      });
      return count;
    })
    .catch(error => {
      console.log(error);
    });
};
