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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

axios
  .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
    url: 'https://api.npms.io/v2/search/suggestions?q=react',
    method: 'GET',
    return_payload: true,
  })
  .then(function (response) {
    dataContent = response.data.content;

    let maintainerArray = [];

    dataContent.forEach(element => {
      let packageMaintainers = element.package.maintainers;
      packageMaintainers.forEach(element => {
        if (!maintainerArray.includes(element.username)) {
          maintainerArray.push(element.username);
        }
      });
    });

    maintainerArray = maintainerArray.map(maintainer => {
      return {
        username: maintainer,
        packageNames: [],
      };
    });
    console.log(maintainerArray);
  })
  .catch(error => {
    console.log(error);
  });

module.exports = async function organiseMaintainers() {
  // TODO

  return maintainers;
};
