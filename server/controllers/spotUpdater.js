// const votePercentage = (voteArray) => (
//        (spot.upvotes + Math.floor(spot.mehvotes / 2)) / 
//     (spot.upvotes + spot.downvotes + spot.mehvotes)
//     );

// module.exports = votePercentage;

const SpotUpdater = function (voteArray) {
    const voteInfo = {
       ups: 0,
       downs: 0,
       mehs: 0, 
       percent: 0
    };

    for (let i = 0; i < voteArray.length; i++) {
        if (voteArray[i].properties.voteType === 'upvote') voteInfo.ups++;
        else if (voteArray[i].properties.voteType === 'downvote') voteInfo.downs++;
        else voteInfo.mehs++;
    }

    voteInfo.percent = (voteInfo.ups + Math.floor(voteInfo.mehs / 2)) / 
                        (voteInfo.ups + voteInfo.downs + voteInfo.mehs);
    return voteInfo;
};

module.exports = SpotUpdater;
