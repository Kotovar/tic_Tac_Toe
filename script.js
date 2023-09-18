let game = (function () {
  //массив со значениями клеток
  let Gameboard = {
    line: ["", "", "", "", "", "", "", "", ""],
  };

  //получение элементов DOM
  let board = document.getElementById("game_board");
  let message = document.getElementById("message");
  let button = document.getElementById("button");
  let scoreLeft = document.getElementById("first_player");
  let scoreRight = document.getElementById("second_player");

  //Стартовые элементы
  let symbol = "X";
  let leftWins = 0;
  let rightWins = 0;

  //функция клика для игрока
  let listener = function (e) {
    if (e.target.className === "cell" && e.target.innerText === "") {
      e.target.innerText = symbol;
      for (let i = 0; i < 9; i++) {
        if (board.children[i] == e.target) {
          currentDiv = i;
        }
      }
      Gameboard.line[currentDiv] = symbol;
      gameWin();
      checkCells(Gameboard);
      if (symbol === "X") {
        symbol = "O";
      } else {
        symbol = "X";
      }
    }
  };

  //включить прослушивание
  let listenerOn = function () {
    board.addEventListener("click", listener);
  };

  //отключить прослушивание
  let listenerOff = function () {
    board.removeEventListener("click", listener);
  };

  // проверка, что все ячейки заполнены
  function checkCells(board) {
    if (board.line.every((el) => el !== "")) {
      message.textContent = "Игра завершена!";
      listenerOff();
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

  //проверка содержимого массива
  let getArray = function () {
    console.log(Gameboard.line);
  };

  //привязка функций к кнопке
  button.addEventListener("click", function () {
    cleaning();
    listenerOn();
  });

  //проверка, победил ли кто-нибудь
  let gameWin = function () {
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
        message.textContent = "Победа " + a + "!";
        addScore(a);
        listenerOff();
        return;
      }
    }
  };

  let addScore = function (char) {
    char === "X"
      ? (leftWins++, (scoreLeft.textContent = leftWins))
      : (rightWins++, (scoreRight.textContent = rightWins));
    if (leftWins >= 3) {
      final("1");
    } else if (rightWins >= 3) {
      final("2");
    }
  };

  let final = function (player) {
    alert("Победил " + player + "й игрок!");
    leftWins = 0;
    rightWins = 0;
  };

  return {
    listenerOn: listenerOn,
    listenerOff: listenerOff,
    cleaning: cleaning,
    getArray: getArray,
  };
})();
