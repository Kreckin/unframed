import config from './config.js';

const Votes = {
  upVote: (spot) => (fetch(`${config.apiUrl}/upvote/${spot}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log('error in upvote', err);
      })),
  downVote: (spot) => (fetch(`${config.apiUrl}/downvote/${spot}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log('error in upvote', err);
      })),
  mehVote: (meh) => (console.log('meh vote cast', meh))
};

export default Votes;
