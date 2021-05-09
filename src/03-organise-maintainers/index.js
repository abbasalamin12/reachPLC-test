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

module.exports = async function organiseMaintainers() {
  return axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(function (response) {
      dataContent = response.data.content;

      let organisedMaintainers = []; // this array will contain each maintainer name and their associated packages

      dataContent.forEach(element => {
        let currentPackageMaintainers = element.package.maintainers;
        currentPackageMaintainers.forEach(currentPackageMaintainers => {
          // for each package, add each maintainer to an array unless it already exists
          if (
            organisedMaintainers.every(
              // if it doesnt exist in the array
              maintainer =>
                maintainer.username != currentPackageMaintainers.username,
            )
          ) {
            organisedMaintainers.push({
              // add it to the array with its package
              username: currentPackageMaintainers.username,
              packageNames: [element.package.name],
            });
          } else {
            // if it already exists
            let maintainerIndex = organisedMaintainers.findIndex(
              maintainer =>
                maintainer.username == currentPackageMaintainers.username,
            );
            // then add the packages to the maintainer's list of packages
            organisedMaintainers[maintainerIndex].packageNames.push(
              element.package.name,
            );
          }
        });

        // sort things in alphabetical order
        // sort each package list in alphabetical order
        organisedMaintainers.forEach(organisedMaintainer =>
          organisedMaintainer.packageNames.sort(),
        );
        // sort the entire array in alphabetical order
        organisedMaintainers.sort(function (a, b) {
          if (a.username < b.username) {
            return -1;
          }
          if (a.username > b.username) {
            return 1;
          }
          return 0;
        });
      });
      return organisedMaintainers;
    })
    .catch(error => {
      console.log(error);
    });
};
