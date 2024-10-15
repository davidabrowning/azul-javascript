function runPatternLineTests(testRunner) {
    let testTitle = "";
    let testGame = null;
    let testPlayer = null;
    let testPatternLine = null;
    let testTileArray = null;

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

    testTitle = "rowIsEmpty() returns true when no Tiles have been placed";
    testPatternLine = new PatternLine();
    testRunner.assertEquals(testTitle, true, testPatternLine.rowIsEmpty(2));

    testTitle = "First row's maxCapacity is 1";
    testPatternLine = new PatternLine();
    testRunner.assertEquals(testTitle, 1, testPatternLine.rowMaxCapacity(0));

    testTitle = "Last row's maxCapacity is 5";
    testPatternLine = new PatternLine();
    testRunner.assertEquals(testTitle, 5, testPatternLine.rowMaxCapacity(4));

    testTitle = "canPlace() returns false when a Tile of a different type has been placed";
    testPatternLine = new PatternLine();

    testTitle = "canPlace() returns true when a Tile of this type has been placed";
    testPatternLine = new PatternLine();

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
}