import config from './config.js';

const Votes = {
  upVote: (user, spot) => (fetch(`${config.apiUrl}/upvote/${user}/${spot}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log('error in upvote', err);
      })),
  downVote: (user, spot) => (fetch(`${config.apiUrl}/downvote/${user}/${spot}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log('error in upvote', err);
      })),
  mehVote: (user, spot) => (fetch(`${config.apiUrl}/mehvote/${user}/${spot}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log('error in upvote', err);
      })),
};

export default Votes;
