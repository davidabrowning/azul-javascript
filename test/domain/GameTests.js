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
}