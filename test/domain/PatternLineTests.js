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
}