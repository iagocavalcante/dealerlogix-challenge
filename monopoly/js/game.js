import Square from './square.js'
import Player from './player.js'
export default class Game {
  constructor () {
    this.squares = [
      new Square('Rent', 'square2'),
      new Square('Rent', 'square5'),
      new Square('Rent', 'square7'),
      new Square('Rent', 'square8'),
      new Square('Rent', 'square9'),
      new Square('Rent', 'square12'),
      new Square('Rent', 'square14'),
      new Square('Rent', 'square15'),
      new Square('Utility', 'square3'),
      new Square('Utility', 'square4'),
      new Square('Utility', 'square6'),
      new Square('Utility', 'square10'),
      new Square('Utility', 'square11'),
      new Square('Utility', 'square13'),
      new Square('Utility', 'square16')
    ];

    this.players = [
      new Player('Player1', 500, 'red', 'player1'),
      new Player('Player2', 500, 'blue', 'player2'),
      new Player('Player3', 500, 'green', 'player3'),
      new Player('Player4', 500, 'purple', 'player4')
    ];

    this.diceValue = 0
    this.currentPlayer = 0
    const button = document.getElementById('roll')
    button.onclick = this.takeTurn.bind(this)
  }

  rentValues = [
    2, 5, 7, 8, 9, 12, 14, 15
  ];

  utilityValues = [
    3, 4, 6, 10, 11, 13, 16
  ];

  populateBoard () {
    this.squares.forEach(square => {
      let id = square.squareID;
  
      const squareName = document.getElementById(`${id}-name`);
     
      squareName.innerHTML = square.name;
    })

    const square1 = document.getElementById('square1-residents');
    
    this.players.forEach((player, index) => {
      const id = index + 1
      player.createPlayer(square1)
      this.updateByID(`player${id}-money`, player.money);
    })

    this.updateByID('player-color', this.players[this.currentPlayer].color);
  }

  updateByID (id, msg) {
    document.getElementById(id).innerHTML = msg;
  }

  movePlayer () {
    const totalSquares = this.squares.length + 1;
    this.updateDiceValue();
    console.log(this.currentPlayer)
    const currentPlayer = this.players[this.currentPlayer];
    const currentSquare = parseInt(currentPlayer.currentSquare.slice(6));
    
    if (currentSquare + this.diceValue <= totalSquares) {
      var nextSquare = currentSquare + this.diceValue;
    } else {
      var nextSquare = currentSquare + this.diceValue - totalSquares;
      currentPlayer.money += 200
      currentPlayer.updateMoney(currentPlayer.money);
    }

    currentPlayer.currentSquare = `square${nextSquare}`;
    
    const currentPlayerToken = document.getElementById(currentPlayer.id);
    currentPlayerToken.parentNode.removeChild(currentPlayerToken);

    const newSquare = document.getElementById(currentPlayer.currentSquare)
    currentPlayer.createPlayer(newSquare);

    currentPlayer.updateMoney(this.chargePlayer(currentPlayer));
  }

  chargePlayer (player) {
    const currentSquare = parseInt(player.currentSquare.slice(6));
    this.rentValues.forEach(rent => {
      if (currentSquare === rent) {
        player.money -= (this.diceValue * 30)
      }
    })

    
    this.utilityValues.forEach(utility => {
      if (currentSquare === utility) {
        player.money -= (this.diceValue * 20)
      }
    })

    return player.money
  }

  nextPlayer (currentPlayer) {
    const nextPlayer = currentPlayer + 1;

    if (nextPlayer == this.players.length) {
      return 0;
    }

    return nextPlayer;
  }

  rollDice () {
    const diceOne = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
    const diceTwo = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
    return diceOne + diceTwo;
  }

  updateDiceValue () {
    this.diceValue = this.rollDice();

    const dice = document.getElementById('value');
  
    dice.innerHTML = this.diceValue;
  }
  
  takeTurn () {
    this.movePlayer();

    if (this.players[this.currentPlayer].money < 0) {
      alert(`Sorry ${this.players[this.currentPlayer].name}, you lose!`);
      this.players = this.players.filter(player => player.id != this.players[this.currentPlayer].id)
    }

    this.currentPlayer = this.nextPlayer(this.currentPlayer);

    this.updateByID('player-color', this.players[this.currentPlayer].color);
  }
} 