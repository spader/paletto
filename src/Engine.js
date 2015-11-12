var Engine = function () {
    'use strict';

    var board,
        colors;

    var init = function () {
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

    this.getCase = function(i, j) {
        return board[i][j];
    };

    this.getColor = function (color) {
        return colors[color];
    };

    init();
};