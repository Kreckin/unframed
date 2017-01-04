const votePercentage = (spot) => (
       (spot.upvotes + Math.floor(spot.mehvotes / 2)) / 
    (spot.upvotes + spot.downvotes + spot.mehvotes)
    );

module.exports = votePercentage;
