function runPatternLineTests(testRunner) {
    let testTitle = "";
    let testGame = null;
    let testPlayer = null;
    let testPatternLine = null;
    let testTileArray = null;
    let testWall = null;

    testTitle = "rowIsEmpty() returns true when no Tiles have been placed";
    testPatternLine = new PatternLine();
    testRunner.assertEquals(testTitle, true, testPatternLine.rowIsEmpty(2));

    testTitle = "First row's maxCapacity is 1";
    testPatternLine = new PatternLine();
    testRunner.assertEquals(testTitle, 1, testPatternLine.rowMaxCapacity(0));

    testTitle = "Last row's maxCapacity is 5";
    testPatternLine = new PatternLine();
    testRunner.assertEquals(testTitle, 5, testPatternLine.rowMaxCapacity(4));

    testTitle = "rowPlacedTilesNum is 0 when tile placed in a different row";
    testPatternLine = new PatternLine();
    testPatternLine.tiles[1] = new Tile(4);
    testRunner.assertEquals(testTitle, 0, testPatternLine.rowPlacedTilesNum(2));

    testTitle = "rowPlacedTilesNum is 1 when row has 1 tile";
    testPatternLine = new PatternLine();
    testPatternLine.tiles[3] = new Tile(4);
    testRunner.assertEquals(testTitle, 1, testPatternLine.rowPlacedTilesNum(2));

    testTitle = "rowPlacedTilesNum is 1 after placing 1 tile";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1)];
    testWall = new Wall();
    testPatternLine.place(testTileArray, 2, testWall);
    testRunner.assertEquals(testTitle, 1, testPatternLine.rowPlacedTilesNum(2));

    testTitle = "rowPlacedTilesType matches tile type on that row";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(3)];
    testWall = new Wall();
    testPatternLine.place(testTileArray, 2, testWall);
    testRunner.assertEquals(testTitle, 3, testPatternLine.rowPlacedTilesType(2));

    testTitle = "canPlace() returns false when a Tile of a different type has been placed";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(3)];
    testWall = new Wall();
    testPatternLine.place(testTileArray, 3, testWall);
    testRunner.assertEquals(testTitle, false, testPatternLine.canPlace(new Tile(1), 3, testWall));

    testTitle = "canPlace() returns true when a Tile of this type has been placed";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(3)];
    testWall = new Wall();
    testPatternLine.place(testTileArray, 3, testWall);
    testRunner.assertEquals(testTitle, true, testPatternLine.canPlace(new Tile(3), 3, testWall));

    testTitle = "rowPlacedTilesNum is 2 after placing 2 tiles";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1), new Tile(1)];
    testWall = new Wall();
    testPatternLine.place(testTileArray, 1, testWall);
    testRunner.assertEquals(testTitle, 2, testPatternLine.rowPlacedTilesNum(1));

    testTitle = "rowPlacedTilesNum is 2 after placing 5 tiles (but only 2 fit)";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1), new Tile(1), new Tile(1), new Tile(1), new Tile(1)];
    testWall = new Wall();
    testPatternLine.place(testTileArray, 1, testWall);
    testRunner.assertEquals(testTitle, 2, testPatternLine.rowPlacedTilesNum(1));

    testTitle = "rowIsEmpty() returns false when Tiles have been placed";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1), new Tile(1), new Tile(1)];
    testWall = new Wall();
    testPatternLine.place(testTileArray, 2, testWall);
    testRunner.assertEquals(testTitle, false, testPatternLine.rowIsEmpty(2));

    testTitle = "Attempting to place 3 Tiles on row 0 returns 2 Tiles";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1), new Tile(1), new Tile(1)];
    testWall = new Wall();
    let rejectedTiles = testPatternLine.place(testTileArray, 0, testWall);
    testRunner.assertEquals(testTitle, 2, rejectedTiles.length);

    testTitle = "Tile placed on PatternLine row 2 shows at position Tile 3";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1), new Tile(1)];
    testWall = new Wall();
    testPatternLine.place(testTileArray, 2, testWall);
    testRunner.assertEquals(testTitle, 1, testPatternLine.tiles[3].value);

    testTitle = "Tile placed on PatternLine row 0 shows at position Tile 0";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1), new Tile(1)];
    testWall = new Wall();
    testPatternLine.place(testTileArray, 0, testWall);
    testRunner.assertEquals(testTitle, 1, testPatternLine.tiles[0].value);

    testTitle = "Index 0 has col number 0";
    testPatternLine = new PatternLine();
    testRunner.assertEquals(testTitle, 0, testPatternLine.colNum(0));

    testTitle = "Index 6 has col number 0";
    testPatternLine = new PatternLine();
    testRunner.assertEquals(testTitle, 0, testPatternLine.colNum(6));

    testTitle = "Index 8 has col number 2";
    testPatternLine = new PatternLine();
    testRunner.assertEquals(testTitle, 2, testPatternLine.colNum(8));

    testTitle = "Index 14 has col number 4"
    testPatternLine = new PatternLine();
    testRunner.assertEquals(testTitle, 4, testPatternLine.colNum(14));

    testTitle = "First open index on row 2 is 5 after placing 2 tiles";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1), new Tile(1)];
    testWall = new Wall();
    testPatternLine.place(testTileArray, 2, testWall);
    testRunner.assertEquals(testTitle, 5, testPatternLine.firstOpenTileIndexOnRow(2));

    testTitle = "Line 2 is full after placing 2 tiles twice";
    testPatternLine = new PatternLine();
    testWall = new Wall();
    testTileArray = [new Tile(1), new Tile(1)];
    testPatternLine.place(testTileArray, 2, testWall);
    testTileArray = [new Tile(1), new Tile(1)];
    testPatternLine.place(testTileArray, 2, testWall);
    testRunner.assertEquals(testTitle, 1, testPatternLine.tiles[5].value);

}