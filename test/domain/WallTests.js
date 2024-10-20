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
}