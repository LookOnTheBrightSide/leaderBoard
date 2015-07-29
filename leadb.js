PlayersList = new Mongo.Collection('players');
Posts = new Mongo.Collection('posts');


if (Meteor.isClient) {
    // counter starts at 0
    console.log('#### NEVER PASTE ANY CODE IN HERE!')
    console.log(PlayersList.find({sort:{score: -1}}).fetch());

    Template.leaderBoard.helpers({
        players: function() {
            return PlayersList.find().fetch();
        }
    });
    Template.index.helpers({
        playersCount: function() {
            return PlayersList.find().count();
        },
        topPlayer: function() {
            return PlayersList.find({sort:{'score': 1},limit:1}).fetch();
            
        },
        lowPlayer: function() {
            return PlayersList.find({sort:{'score': -1},limit:1}).fetch();
        }
    });
}

if (Meteor.isServer) {
    console.log('go to http://localhost:3000')
    Meteor.startup(function() {
        // code to run on server at startup

    });
}