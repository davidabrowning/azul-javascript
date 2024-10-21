function runGameTests(testRunner) {
    let testTitle = "";
    let testGame = null;

    testTitle = "Three player game has three players";
    testGame = new Game(3);
    testRunner.assertEquals(testTitle, 3, testGame.players.length);

    testTitle = "Two player game has five factory displays";
    testGame = new Game(2);
    testRunner.assertEquals(testTitle, 5, testGame.factoryDisplays.length);

    testTitle = "Three player game has seven factory displays";
    testGame = new Game(3);
    testRunner.assertEquals(testTitle, 7, testGame.factoryDisplays.length);

    testTitle = "Four player game has nine factory displays";
    testGame = new Game(4);
    testRunner.assertEquals(testTitle, 9, testGame.factoryDisplays.length);

    testTitle = "First active player is player 0";
    testGame = new Game(2);
    testRunner.assertEquals(testTitle, 0, testGame.activePlayerNum);

    testTitle = "Active player after ending one turn is player 1";
    testGame = new Game(2);
    testGame.endTurn();
    testRunner.assertEquals(testTitle, 1, testGame.activePlayerNum);

    testTitle = "Active player after ending every player's turn is player 0";
    testGame = new Game(4);
    testGame.endTurn();
    testGame.endTurn();
    testGame.endTurn();
    testGame.endTurn();
    testRunner.assertEquals(testTitle, 0, testGame.activePlayerNum);

    testTitle = "GameOver is false at round start";
    testGame = new Game(2);
    testRunner.assertEquals(testTitle, false, testGame.isGameOver());

    testTitle = "RoundOver is false after dealing tiles to factory displays";
    testGame = new Game(2);
    testGame.dealTilesToFactoryDisplays();
    testRunner.assertEquals(testTitle, false, testGame.isRoundOver());

    testTitle = "RoundOver is true when no tiles left to draw";
    testGame = new Game(2);
    testGame.factoryDisplays.forEach(factoryDisplay => {
        factoryDisplay.clear();
    });
    testRunner.assertEquals(testTitle, true, testGame.isRoundOver());
}