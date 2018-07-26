var path = require('path');
var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);

    });

    app.post("/api/friends", function (req, res) {
        var userInput = req.body;
        var userScores = userInput.scores;

        var match = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        for (var i = 0; i < friends.length; i++) {
            var difference = 0;

            for (var j = 0; j < friends[i].scores[j]; j++) {
                difference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                if (difference <= match.friendDifference) {
                    match.name = friends[i].name;
                    match.photo = friends[i].photo;
                    match.friendDifference = difference;
                }
            }
        }
        friends.push(userInput);
        res.json(match);
    });
};
