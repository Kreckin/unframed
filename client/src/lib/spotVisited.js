import config from './config.js';

module.exports = (user, spot) => (fetch(`${config.apiUrl}/spots/visited/${user}/${spot}`)
                .then((res) => res.json())
                .catch((err) => {
                  console.log('error in upvote', err); 
                  })
                );
