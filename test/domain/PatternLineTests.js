function runPatternLineTests(testRunner) {
    let testTitle = "";
    let testGame = null;
    let testPlayer = null;
    let testPatternLine = null;
    let testTileArray = null;


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
    testPatternLine.place(testTileArray, 2);
    testRunner.assertEquals(testTitle, 1, testPatternLine.rowPlacedTilesNum(2));

    testTitle = "rowPlacedTilesType matches tile type on that row";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(3)];
    testPatternLine.place(testTileArray, 2);
    testRunner.assertEquals(testTitle, 3, testPatternLine.rowPlacedTilesType(2));

    testTitle = "canPlace() returns false when a Tile of a different type has been placed";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(3)];
    testPatternLine.place(testTileArray, 3);
    testRunner.assertEquals(testTitle, false, testPatternLine.canPlace(new Tile(1), 3));

    testTitle = "canPlace() returns true when a Tile of this type has been placed";
    testPatternLine = new PatternLine();
    testRunner.assertEquals(testTitle, true, false);

    testTitle = "rowPlacedTilesNum is 2 after placing 2 tiles";
    testRunner.assertEquals(testTitle, true, false);

    testTitle = "rowPlacedTilesNum is 2 after placing 5 tiles (but only 2 fit)";
    testRunner.assertEquals(testTitle, true, false);

    testTitle = "rowIsEmpty() returns false when Tiles have been placed";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1), new Tile(1), new Tile(1)];
    testPatternLine.place(testTileArray, 2);
    testRunner.assertEquals(testTitle, true, testPatternLine.rowIsEmpty(2));

    testTitle = "Attempting to place 3 Tiles on row 0 returns 2 Tiles";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1), new Tile(1), new Tile(1)];
    let rejectedTiles = testPatternLine.place(testTileArray, 0);
    testRunner.assertEquals(testTitle, 2, rejectedTiles.length);

    testTitle = "Tile placed on PatternLine row 2 shows at position Tile 3";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1), new Tile(1)];
    testPatternLine.place(testTileArray, 2);
    testRunner.assertEquals(testTitle, 1, testPatternLine.tiles[3].value);

    testTitle = "Tile placed on PatternLine row 0 shows at position Tile 0";
    testPatternLine = new PatternLine();
    testTileArray = [new Tile(1), new Tile(1)];
    testPatternLine.place(testTileArray, 0);
    testRunner.assertEquals(testTitle, 1, testPatternLine.tiles[0].value);
}