function runPlayerTests(testRunner) {
    let testTitle = "";
    let testGame = null;

    testTitle = "First player has id of 0";
    testGame = new Game(4);
    testRunner.assertEquals(testTitle, 0, testGame.players[0].id);

    testTitle = "Third player has id of 2";
    testGame = new Game(4);
    testRunner.assertEquals(testTitle, 2, testGame.players[2].id);
}