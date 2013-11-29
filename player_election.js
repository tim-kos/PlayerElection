function PlayerElection(players) {
  this._players       = players;
  this._pairs         = [];
  this._chosenPlayers = [];
  this._rayo          = 'Rayo';
  this._tim           = 'Tim';
}

PlayerElection.prototype.start = function() {
  if (this._players.length % 2 === 1) {
    var err = new Error('You need an even amount of players, dude. : /');
    throw err;
  }

  while (!this._allPlayersChosen()) {
    var players = this._rollTheDice();

    if (players[0] === players[1]) {
      continue;
    }

    if (this._alreadyChosen(players[0]) || this._alreadyChosen(players[1])) {
      continue;
    }

    if (players[0] === this._rayo && players[1] === this._tim) {
      this._registerPlayerPair(players);
      continue;
    }

    if (this._alreadyChosen(this._rayo) || this._alreadyChosen(this._tim)) {
      this._registerPlayerPair(players);
      continue;
    }

    var isRayoTim = players[0] === this._rayo && players[1] === this._tim ||
                    players[0] === this._tim && players[1] === this._rayo;
    if (!isRayoTim) {
      continue;
    }
  }

  return this._shuffle(this._pairs);
};

PlayerElection.prototype._allPlayersChosen = function() {
  for (var i = 0; i < this._players.length; i++) {
    var player = this._players[i];
    if (!this._alreadyChosen(player)) {
      return false;
    }
  }
  return true;
};

PlayerElection.prototype._rollTheDice = function() {
  var shuffledPlayers = this._shuffle(this._players);
  return [shuffledPlayers[0], shuffledPlayers[1]];
};

PlayerElection.prototype._shuffle = function(arr) {
  var shuffled = [];
  var rand;
  for (var i = 0; i < arr.length; i++) {
    rand = Math.floor(Math.random() * (i + 1));
    shuffled[i] = shuffled[rand];
    shuffled[rand] = arr[i];
  }
  return shuffled;
};

PlayerElection.prototype._alreadyChosen = function(player) {
  for (var i = 0; i < this._pairs.length; i++) {
    var pair = this._pairs[i];
    if (pair[0] === player || pair[1] === player) {
      return true;
    }
  }
  return false;
};

PlayerElection.prototype._registerPlayerPair = function(pair) {
  this._pairs.push(pair);
};

var players = [
  'Stefan', 'Chris', 'Rayo', 'Tim', 'Anika', 'Xema',
  'Player1', 'Player2', 'Player3', 'Player4'
];
var election = new PlayerElection(players);
var pairs = election.start();
console.log(pairs);
