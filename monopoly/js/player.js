export default class Player {
  constructor(name, money, color, id) {
    this.name = name;
    this.money = money;
    this.color = color;
    this.id = id;
    this.currentSquare = "square1";
  }


  createPlayer (square) {
    let playerSpan = document.createElement("span");
    playerSpan.setAttribute("class", this.color);
    playerSpan.setAttribute("id", this.id);
    square.appendChild(playerSpan);
  }

  updateMoney (amount) {
    document.getElementById(this.id + "-money").innerHTML = amount;
    this.money = amount;
  }
}
