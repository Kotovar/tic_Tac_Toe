let game = (function () {
  //массив со значениями клеток и победными комбинациями
  let Gameboard = {
    line: ["", "", "", "", "", "", "", "", ""],
  };

  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //получение элементов DOM
  const board = document.getElementById("game_board");
  const message = document.getElementById("message");
  // const button = document.getElementById("button");
  const buttons = document.getElementById("buttons");
  const scoreLeft = document.getElementById("first_player");
  const scoreRight = document.getElementById("second_player");

  //Стартовые элементы
  let symbol = "X";
  let leftWins = 0;
  let rightWins = 0;
  let gameVsAi = false;

  //Ход игрока
  let playerTurn = function (e) {
    updateBoard(e);
    changeSymbol();
    checkGameWin(playerTurn);
    allCellsFull();
  };

  //отрисовать Х или О
  let updateBoard = function (e) {
    let cell = e.target;
    if (cell.className === "cell" && cell.innerText === "") {
      cell.innerText = symbol;
      currentDiv = [...board.children].indexOf(cell);
      Gameboard.line[currentDiv] = symbol;
    }
  };

  //Ход игрока и компьютера
  let playerVsAi = function (e) {
    updateBoard(e);
    playerCanNotTurn(playerVsAi);
    changeSymbol();
    checkGameWin() === "no end" && allCellsFull() === "no end"
      ? setTimeout(aiTurn, 500)
      : null;
  };

  //Ход ИИ
  let aiTurn = function (mode) {
    let emptyCells = Gameboard.line
      .map((el, i) => (el === "" ? i : null))
      .filter((el) => el !== null);
    let randomCell = Math.floor(Math.random() * emptyCells.length);
    board.children[emptyCells[randomCell]].textContent = symbol;
    Gameboard.line[emptyCells[randomCell]] = symbol;
    mode !== "bothComputers" ? checkGameWin() : null;
    changeSymbol();
    gameVsAi ? playerCanTurn(playerVsAi) : null;
  };

  //режим ИИ против ИИ
  let aiVsAi = function () {
    let interval = 1000;
    let oneTurn = function () {
      aiTurn("bothComputers");
      if (checkGameWin() !== "no end" || allCellsFull() !== "no end") {
        clearInterval(turns);
      }
    };
    let turns = setInterval(oneTurn, interval);
  };

  //включить(выключить) возможность ходить игроку
  let playerCanTurn = (choose) => board.addEventListener("click", choose);
  let playerCanNotTurn = (choose) => board.removeEventListener("click", choose);

  // проверка, что все ячейки заполнены
  function allCellsFull() {
    if (Gameboard.line.every((el) => el !== "")) {
      message.textContent = "Draw!";
      playerCanNotTurn();
      return;
    }
    return "no end";
  }

  //привязка функций к кнопкам
  buttons.addEventListener("click", function (e) {
    // console.log(e.target.id);
    switch (e.target.id) {
      case "buttonPA":
        cleaning();
        playerCanTurn(playerVsAi);
        gameVsAi = true;
        break;
      case "buttonPP":
        cleaning();
        playerCanTurn(playerTurn);
        break;
      case "buttonAA":
        cleaning();
        aiVsAi();
        gameVsAi = false;
    }
  });

  //проверка, победил ли кто-нибудь
  let checkGameWin = function (mode) {
    for (let combo of winLines) {
      let [a, b, c] = combo.map((i) => Gameboard.line[i]);
      if (a === b && a === c && a !== "") {
        message.textContent = "Round by player " + a + "!";
        addScore(a);
        playerCanNotTurn(mode);
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
})();
