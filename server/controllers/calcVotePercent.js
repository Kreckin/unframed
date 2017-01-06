// const votePercentage = (voteArray) => (
//        (spot.upvotes + Math.floor(spot.mehvotes / 2)) / 
//     (spot.upvotes + spot.downvotes + spot.mehvotes)
//     );

// module.exports = votePercentage;

const votePercentage = function (voteArray) {
    let ups = 0;
    let downs = 0;
    let mehs = 0;
    for (let i = 0; i < voteArray.length; i++) {
        if (voteArray[i].properties.voteType === 'upvote') ups++;
        else if (voteArray[i].properties.voteType === 'upvote') downs++;
        else mehs++;
    }
    return (ups + Math.floor(mehs / 2)) / (ups + downs + mehs);
};

module.exports = votePercentage;
