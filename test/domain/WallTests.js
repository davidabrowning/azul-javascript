function runWallTests(testRunner) {
    let testTitle = "";
    let testGame = null;
    testWall = null;

    testTitle = "Target tile value for position 0 is 0";
    testWall = new Wall();
    testRunner.assertEquals(testTitle, 0, testWall.targetTileValueByIndex(0));

    testTitle = "Target tile value for position 13 is 1";
    testWall = new Wall();
    testRunner.assertEquals(testTitle, 0, testWall.targetTileValueByIndex(24));

    testTitle = "Target tile value for position 16 is 3";
    testWall = new Wall();
    testRunner.assertEquals(testTitle, 0, testWall.targetTileValueByIndex(24));

    testTitle = "Target tile value for position 24 is 0";
    testWall = new Wall();
    testRunner.assertEquals(testTitle, 0, testWall.targetTileValueByIndex(24));

    testTitle = "Target tile value for position (1, 3) is 2";
    testWall = new Wall();
    testRunner.assertEquals(testTitle, 2, testWall.targetTileValueByRowCol(1, 3));

    testTitle = "AdjacentTilesLeft for first tile is 0";
    testWall = new Wall();
    testRunner.assertEquals(testTitle, 0, testWall.adjacentTilesLeft(0, 0));

    testTitle = "AdjacentTilesRight for first tile is 0";
    testWall = new Wall();
    testRunner.assertEquals(testTitle, 0, testWall.adjacentTilesRight(0, 0));

    testTitle = "Incremental score for first tile is 1";
    testWall = new Wall();
    testRunner.assertEquals(testTitle, 1, testWall.calculateIncrementalScore(0, 0));

    testTitle = "Incremental score for second tile in a row is 2";
    testWall = new Wall();
    testWall.tiles[0] = new Tile(0);
    testRunner.assertEquals(testTitle, 2, testWall.calculateIncrementalScore(1, 0));

    testTitle = "Incremental score with tiles on either side is 3";
    testWall = new Wall();
    testWall.tiles[5] = new Tile(0);
    testWall.tiles[7] = new Tile(0);
    testRunner.assertEquals(testTitle, 3, testWall.calculateIncrementalScore(0, 1));

    testTitle = "Incremental score with two tiles above is 3";
    testWall = new Wall();
    testWall.tiles[4] = new Tile(0);
    testWall.tiles[9] = new Tile(0);
    testRunner.assertEquals(testTitle, 3, testWall.calculateIncrementalScore(2, 2));

    testTitle = "Incremental score with tiles on all 4 sides is 6";
    testWall = new Wall();
    testWall.tiles[13] = new Tile(0);
    testWall.tiles[17] = new Tile(0);
    testWall.tiles[19] = new Tile(0);
    testWall.tiles[23] = new Tile(0);
    testRunner.assertEquals(testTitle, 6, testWall.calculateIncrementalScore(0, 3));
}