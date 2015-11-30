'use strict';

var PalettoTestCase = TestCase("PalettoTestCase");

PalettoTestCase.prototype.testStory1 = function () {
    var engine = new Engine();
    var size = 6;

    for (var i = 0; i < size - 1; i++) {
        for (var j = 0; j < size - 1; j++) {
            assertNotEquals(engine.getCase(i, j), engine.getCase(i+1, j));
            assertNotEquals(engine.getCase(i, j), engine.getCase(i, j+1));
        }
    }
};

PalettoTestCase.prototype.testStory2 = function () {
    var engine = new Engine();
    assertEquals(engine.getCase(5,0), engine.getColor('yellow'));
};

PalettoTestCase.prototype.testStory3 = function () {
    var engine = new Engine();

    engine.play('A6');

    assertEquals(engine.getCase(5, 0), 0);
    assertEquals(engine.getPieces(), 35);
    assertEquals(engine.getScorePlayer(0, 'yellow'), 1);
};

PalettoTestCase.prototype.testStory4 = function () {
    var engine = new Engine();

    engine.play('A6');

    var possibleColors = engine.getPossibleColors();
    assertTrue(possibleColors.indexOf('black') !== -1);
    assertTrue(possibleColors.indexOf('white') !== -1);
    assertTrue(possibleColors.indexOf('blue') !== -1);

    engine.changeTurn();
    engine.play('A1');
    engine.play('F6');
    assertEquals(engine.getScorePlayer(1, 'black'), 2);
};

PalettoTestCase.prototype.testStory5 = function () {
    var engine = new Engine();

    engine.secondBoard();

    assertTrue(engine.isAllowed('D1'));
    assertTrue(engine.isAllowed('F1'));
    assertTrue(engine.isAllowed('E3'));
    assertTrue(engine.isAllowed('A4'));
    assertTrue(engine.isAllowed('B5'));
    assertTrue(engine.isAllowed('C6'));
    assertTrue(engine.isAllowed('C3'));
};