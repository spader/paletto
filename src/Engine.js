var Engine = function () {
    'use strict';

    var board,
        colors,
        pieces = 36,
        players,
        player;

    var init = function () {
        players = [
            {black: 0, green: 0, white: 0, blue: 0, red: 0, yellow: 0},
            {black: 0, green: 0, white: 0, blue: 0, red: 0, yellow: 0}
        ];
        player = 0;

        colors = {none: 0, black: 1, green: 2, white: 3, blue: 4, red: 5, yellow: 6};
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
        var line = c.charCodeAt(1) - 49;
        var column = c.charCodeAt(0) - 65;

        return {l: line, c: column};
    };

    var convertColor = function (colorCode) {
        var c, color;

        for (c in colors) {
            if (colorCode === colors[c]) {
                color = c;
                break;
            }
        }

        return color;
    };

    var updateScore = function (chooseColor) {
        players[player][convertColor(chooseColor)] += 1;
    };

    var choose = function (c) {
        var chooseColor = board[c.l][c.c];

        updateScore(chooseColor);
        board[c.l][c.c] = 0;
        pieces -= 1;
    };

    var goToLeft = function (i, j) {
        if (j - 1 >= 0)
            if (board[i][j - 1] != 0)
                return 1;

        return 0;
    };

    var goToRight = function (i, j) {
        if (j + 1 < 6)
            if (board[i][j + 1] != 0)
                return 1;

        return 0;
    };

    var goToUp = function (i, j) {
        if (i - 1 >= 0)
            if (board[i - 1][j] != 0)
                return 1;

        return 0;
    };

    var goToDown = function (i, j) {
        if (i + 1 < 6)
            if (board[i + 1][j] != 0)
                return 1;

        return 0;
    };

    var countNeighbor = function (i, j) {
        return goToUp(i, j) + goToDown(i, j) + goToLeft(i, j) + goToRight(i, j);
    };

    var updatePossibleColors = function (possibleColors, i, j) {
        if (possibleColors.indexOf(convertColor(board[i][j])) < 0) {
            if (countNeighbor(i, j) <= 2) {
                possibleColors.push(convertColor(board[i][j]));
            }
        }
    };

    this.changeTurn = function () {
        if (player == 0)
            player = 1
        else
            player = 0
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

    this.getScorePlayer = function (player, c) {
        return players[player][c];
    };

    this.getPossibleColors = function () {
        var i, j;
        var possibleColors = [];

        for (i = 0; i < 6; i++) {
            for (j = 0; j < 6; j++) {
                updatePossibleColors(possibleColors, i, j);
            }
        }

        return possibleColors;
    };

    init();
};