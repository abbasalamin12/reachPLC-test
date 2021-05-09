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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

module.exports = async function oldestPackageName() {
  return axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(function (response) {
      dataContent = response.data.content;

      // set default values for oldest date and oldest package name to the first package
      let smallestDate = dataContent[0].package.date;
      let oldestPackageName = dataContent[0].package.name;

      dataContent.forEach(element => {
        if (smallestDate > element.package.date) {
          // if the current smallest date is greater than the date we are checking
          smallestDate = element.package.date; // then update the smallest date to be the current date
          oldestPackageName = element.package.name; // and update the oldest package name
        }
      });
      return oldestPackageName; // return the final oldest package name
    })
    .catch(error => {
      console.log(error);
    });
};
