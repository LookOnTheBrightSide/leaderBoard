PlayersList = new Mongo.Collection('players');
Posts = new Mongo.Collection('posts');


if (Meteor.isClient) {
    // counter starts at 0
    console.log('#### NEVER PASTE ANY CODE IN HERE!')
    //console.log(PlayersList.findOne({sort:{score: -1}}));

    Template.leaderBoard.helpers({
        players: function() {
            return PlayersList.find({},{sort:{score: -1, name: 1}});
        },
      'selectedClass': function(){
        var playerId = this._id;
        var selectedPlayer = Session.get('selectedPlayer');
        if (playerId === selectedPlayer) {
          return 'playerSelectedClass'
        };
      }
    });
    Template.leaderBoard.events({
      'click .playerWell': function () {
        //session name then value
        var selectedOne = this._id;
        Session.set('selectedPlayer', selectedOne);
        var selectedOne = Session.get('selectedPlayer');
        //console.log(selectedOne);
        //document.getElementsByClassName('playerWell').IdName = selectedOne;
      },
      'focus .playerSelected': function(){
        console.log('all focus on me now!');
      },
      'change .playerSelected': function(){
        console.log('tupac changes is playing');
      },
      'click .points': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.update(selectedPlayer, {$inc:{score: 5}});
        console.log(selectedPlayer);
      },
      'click .pointsMinus': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.update(selectedPlayer, {$inc:{score: -5}});
      },
      'click .remove': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        if(confirm('Remove this player?')){PlayersList.remove(selectedPlayer)};
      }
    });
    Template.addPlayerForm.events({
      'submit form': function (event) {
        event.preventDefault();
        var playerName = event.target.name.value;
        var age = event.target.age.value;
        PlayersList.insert({
          name: playerName,
          score: 0,
          age: age
        })
        var playerName = "";
        var age = "";
        console.log('submitted form');
        console.log(playerName, age);
      }
    });
  Template.index.helpers({
      playersCount: function() {
          return PlayersList.find().count();
      },
      topPlayer: function() {
          return PlayersList.find({}, {sort:{'score': -1},limit:1});
              
      },
      lowPlayer: function() {
          return PlayersList.find({}, {sort:{'score': 1},limit:1});
      }
  });
}

if (Meteor.isServer) {
    console.log('go to http://localhost:3000')
    Meteor.startup(function() {
        // code to run on server at startup

    });
}


































// Template.index.helpers({
//     playersCount: function() {
//         return PlayersList.find().fetch().count();
//     },
//     topPlayer: function() {
//         return PlayersList.find({}, {sort:{'score': 1},limit:1}).fetch();
            
//     },
//     lowPlayer: function() {
//         return PlayersList.find({}, {sort:{'score': -1},limit:1}).fetch();
//     }
// });