import config from './config.js';

module.exports = (user) => (fetch(`${config.apiUrl}/spots/totalvisited/${user}`)
                .then((res) => {
                    console.log('the res is ', res);
                    return res.json();
                })
                .catch((err) => {
                  console.log('error in upvote', err); 
                  })
                );
