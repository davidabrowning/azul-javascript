function runFactoryDisplayTests(testRunner) {
    let testTitle = "";
    let testGame = null;

    testTitle = "Factory display starts round with four tiles";
    testGame = new Game(2);
    testGame.prepareRound();
    testRunner.assertEquals(testTitle, 4, testGame.factoryDisplays[2].tiles.length);

    testTitle = "FactoryDisplay is empty after claiming Tile";
    testGame = new Game(2);
    testGame.factoryDisplays[0].tiles[0] = new Tile(0);
    testGame.factoryDisplays[0].tiles[1] = new Tile(0);
    testGame.factoryDisplays[0].tiles[2] = new Tile(2);
    testGame.factoryDisplays[0].tiles[3] = new Tile(2);
    
    testRunner.assertEquals(testTitle, true, false);
}