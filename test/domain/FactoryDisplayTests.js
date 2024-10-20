function runFactoryDisplayTests(testRunner) {
    let testTitle = "";
    let testGame = null;

    testTitle = "Factory display starts round with four tiles";
    testGame = new Game(2);
    testGame.prepareRound();
    testRunner.assertEquals(testTitle, 4, testGame.factoryDisplays[0].tiles.length);

    testTitle = "FactoryDisplay is empty after claiming Tile";
    testGame = new Game(2);
    testGame.factoryDisplays[0].tiles[0] = new Tile(0);
    testGame.factoryDisplays[0].tiles[1] = new Tile(0);
    testGame.factoryDisplays[0].tiles[2] = new Tile(2);
    testGame.factoryDisplays[0].tiles[3] = new Tile(2);
    testGame.claimFactoryDisplay(0, 2, 0);
    testRunner.assertEquals(testTitle, 0, testGame.factoryDisplays[0].tiles.length);

    testTitle = "FactoryDisplay at array position 4 has id of 4";
    testGame = new Game(4);
    testRunner.assertEquals(testTitle, 4, testGame.factoryDisplays[4].id);

    testTitle = "Selected FactoryDisplay has a selectedTileValue of 2";
    testGame = new Game(2);
    testGame.factoryDisplays[0].tiles[0] = new Tile(0);
    testGame.factoryDisplays[0].tiles[1] = new Tile(0);
    testGame.factoryDisplays[0].tiles[2] = new Tile(2);
    testGame.factoryDisplays[0].tiles[3] = new Tile(2);
    testGame.factoryDisplays[0].select(2);
    testRunner.assertEquals(testTitle, 2, testGame.factoryDisplays[0].selectedTileValue);

    testTitle = "Unselected FactoryDisplay has a selectedTileValue of -1";
    testGame = new Game(2);
    testGame.factoryDisplays[0].tiles[0] = new Tile(0);
    testGame.factoryDisplays[0].tiles[1] = new Tile(0);
    testGame.factoryDisplays[0].tiles[2] = new Tile(2);
    testGame.factoryDisplays[0].tiles[3] = new Tile(2);
    testGame.factoryDisplays[0].select(2);
    testGame.factoryDisplays[0].unselect();
    testRunner.assertEquals(testTitle, -1, testGame.factoryDisplays[0].selectedTileValue);
}