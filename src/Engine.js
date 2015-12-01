var Engine = function () {
    'use strict';

    var board,
        colors,
        pieces = 36,
        players,
        player,
        winner;

    var init = function () {
        players = [
            {black: 0, green: 0, white: 0, blue: 0, red: 0, yellow: 0},
            {black: 0, green: 0, white: 0, blue: 0, red: 0, yellow: 0}
        ];
        player = 0;
        winner = false;

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

    this.secondBoard = function () {
        board = [
            [colors.none, colors.none, colors.none, colors.blue, colors.red, colors.white],
            [colors.none, colors.none, colors.none, colors.red, colors.yellow, colors.none],
            [colors.none, colors.none, colors.blue, colors.white, colors.black, colors.none],
            [colors.red, colors.black, colors.red, colors.none, colors.none, colors.none],
            [colors.none, colors.green, colors.yellow, colors.none, colors.none, colors.none],
            [colors.none, colors.none, colors.black, colors.none, colors.none, colors.none]
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

    var neighborPositions = function (l, c) {
        var verticalPosition = '';
        var horizontalPosition = '';

        if (goToUp(l, c))
            verticalPosition += 'u';

        if (goToDown(l, c))
            verticalPosition += 'd';

        if (goToLeft(l, c))
            horizontalPosition += 'l';

        if (goToRight(l, c))
            horizontalPosition += 'r';

        return (verticalPosition + horizontalPosition);
    };

    var checkPositions = function (p, l, c) {
        var check = null;

        if (p == 'ur') {
            return board[l - 1][c + 1] != colors.none;
        }
        if (p == 'ul') {
            return board[l - 1][c - 1] != colors.none;
        }

        if (check != null) {
            return check;
        }

        if (p == 'dr') {
            return board[l + 1][c + 1] != colors.none;
        }
        return board[l + 1][c - 1] != colors.none;
    };

    var verifyGame = function (lin, col) {
        var positions = neighborPositions(lin, col);

        if (positions === 'ud' || positions === 'lr') {
            return false;
        }

        return checkPositions(positions, lin, col);
    };

    var verifyScoreHaveWinner = function () {
        var color;

        for (color in players[player])
            if (players[player][color] == 6)
                winner = player;
        return;
    };

    var haveWinner = function () {
        verifyScoreHaveWinner();

        if (!winner)
            if (balls == 0)
                winner = player;
    };

    this.changeTurn = function () {
        if (player == 0)
            player = 1;
        else
            player = 0;
    };

    this.play = function (coords) {
        if (this.isAllowed(coords))
            choose(convertCoords(coords));

        haveWinner();
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

    this.isAllowed = function (coords) {
        var cCoords = convertCoords(coords);
        var neighbours = countNeighbor(cCoords.lin, cCoords.col);

        if (neighbours >= 3)
            return false;

        if (neighbours == 2)
            return verifyGame(cCoords.lin, cCoords.col);

        return true;
    };

    this.getWinner = function () {
        return winner;
    };

    init();
};