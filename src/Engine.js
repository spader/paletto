var Engine = function () {
    'use strict';

    var board,
        colors,
        pieces = 36,
        player,
        firstPlayer;

    var init = function () {
        firstPlayer = {black: 0, green: 0, white: 0, blue: 0, red: 0, yellow: 0};
        player = firstPlayer;

        colors = {black: 0, green: 1, white: 2, blue: 3, red: 4, yellow: 5};
        board = [
            [colors.black, colors.green, colors.white, colors.blue, colors.red, colors.white],
            [colors.yellow, colors.white, colors.green, colors.red, colors.yellow, colors.blue],
            [colors.blue, colors.yellow, colors.blue, colors.white, colors.black, colors.red],
            [colors.red, colors.black, colors.red, colors.green, colors.blue, colors.white],
            [colors.white, colors.green, colors.yellow, colors.black, colors.yellow, colors.green],
            [colors.yellow, colors.blue, colors.black, colors.red, colors.green, colors.black]
        ];
    };

    var convertCoords = function (c) {
        var line = c.charCodeAt(1) - 48;
        var column = c.charCodeAt(0) - 65;

        return {l: line, c: column};
    };

    var updateScore = function (chooseColor) {
        var c, color;

        for (c in colors) {
            if (chooseColor === colors[c]) {
                color = c;
                break;
            }
        }

        player[color] += 1;
    };

    var choose = function (c) {
        var chooseColor = board[c.l][c.c];

        updateScore(chooseColor);
        board[c.l][c.c] = 0;
        pieces -= 1;
    };

    this.play = function (c) {
        choose(convertCoords(c));
    };

    this.getCase = function(i, j) {
        return board[i][j];
    };

    this.getColor = function (color) {
        return colors[color];
    };

    this.getPieces = function () {
        return pieces;
    }

    this.getScorePlayer = function (c) {
        return player[c];
    };

    init();
};