let game = (function () {
  //массив со значениями клеток
  let Gameboard = {
    line: ["", "", "", "", "", "", "", "", ""],
  };

  //получение элементов DOM
  const board = document.getElementById("game_board");
  const message = document.getElementById("message");
  const button = document.getElementById("button");
  const scoreLeft = document.getElementById("first_player");
  const scoreRight = document.getElementById("second_player");

  //Стартовые элементы
  let symbol = "X";
  let leftWins = 0;
  let rightWins = 0;

  //Ход игрока
  let playerTurn = function (e) {
    if (e.target.className === "cell" && e.target.innerText === "") {
      e.target.innerText = symbol;
      for (let i = 0; i < 9; i++) {
        if (board.children[i] == e.target) {
          currentDiv = i;
        }
      }
      Gameboard.line[currentDiv] = symbol;

      playerCanNotTurn();
      // allCellsFull();
      changeSymbol();
      checkGameWin() === "no end" && allCellsFull() === "no end"
        ? setTimeout(aiTurn, 500)
        : null;
    }
  };

  //Ход ИИ
  let aiTurn = function () {
    let temp = Gameboard.line.map((el, i) => (el === "" ? i : null));
    let NewArrayWithIndexs = temp.filter((el) => el !== null);
    let randomCell = Math.floor(Math.random() * NewArrayWithIndexs.length);
    board.children[NewArrayWithIndexs[randomCell]].textContent = symbol;
    Gameboard.line[NewArrayWithIndexs[randomCell]] = symbol;
    checkGameWin();
    changeSymbol();
    playerCanTurn();
  };

  //включить возможность ходить игроку
  let playerCanTurn = function () {
    board.addEventListener("click", playerTurn);
  };

  //выключить возможность ходить игроку
  let playerCanNotTurn = function () {
    board.removeEventListener("click", playerTurn);
  };

  // проверка, что все ячейки заполнены
  function allCellsFull() {
    if (Gameboard.line.every((el) => el !== "")) {
      message.textContent = "Draw!";
      playerCanNotTurn();
      return;
    }
    return "no end";
  }

  //проверка содержимого массива
  let getArray = function () {
    console.log(Gameboard.line);
  };

  //привязка функций к кнопке
  button.addEventListener("click", function () {
    cleaning();
    playerCanTurn();
  });

  //проверка, победил ли кто-нибудь
  let checkGameWin = function () {
    let horizontal = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    let vertical = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    let diagonal = [
      [0, 4, 8],
      [2, 4, 6],
    ];
    let lines = [...horizontal, ...vertical, ...diagonal];
    for (let combo of lines) {
      let [a, b, c] = combo.map((i) => Gameboard.line[i]);
      if (a === b && a === c && a !== "") {
        message.textContent = "Round by player " + a + "!";

        addScore(a);
        playerCanNotTurn();
        return;
      }
    }
    return "no end";
  };

  //добавление победных очков и объявление финала
  let addScore = function (char) {
    char === "X"
      ? (leftWins++, (scoreLeft.textContent = leftWins))
      : (rightWins++, (scoreRight.textContent = rightWins));
    if (leftWins === 3) {
      final("1");
    } else if (rightWins === 3) {
      final("2");
    }
  };

  //Финал
  let final = function (player) {
    alert("Player " + player + " wins");
    leftWins = 0;
    rightWins = 0;
  };

  //смена символа Х или О
  function changeSymbol() {
    if (symbol === "X") {
      symbol = "O";
    } else {
      symbol = "X";
    }
  }

  //сброс игры
  let cleaning = function () {
    Gameboard = {
      line: ["", "", "", "", "", "", "", "", ""],
    };
    for (let i = 0; i < 9; i++) {
      board.children.item(i).textContent = "";
    }
    message.textContent = "";
    symbol = "X";
    scoreLeft.textContent = leftWins;
    scoreRight.textContent = rightWins;
  };

  return {
    playerCanTurn: playerCanTurn,
    playerCanNotTurn: playerCanNotTurn,
    cleaning: cleaning,
    getArray: getArray,
    aiTurn: aiTurn,
  };
})();
