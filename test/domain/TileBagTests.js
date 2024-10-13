function runTileBagTests(testRunner) {
    let testTitle = "";
    let testGame = null;

    testTitle = "Game bag starts with 100 tiles";
    testGame = new Game(2);
    testRunner.assertEquals(testTitle, 100, testGame.tileBag.size());

    testTitle = "Two games should not have the same tiles";
    testGame = new Game(2);
    let testGame2 = new Game(2);
    let foundDifferingTiles = false;
    for (let i = 0; i < testGame.tileBag.size(); i++) {
        if (testGame.tileBag.drawTile().value != testGame2.tileBag.drawTile().value) {
            foundDifferingTiles = true;
        }
    }
    testRunner.assertEquals(testTitle, true, foundDifferingTiles);

    testTitle = "TileBag size after drawing one Tile is 99";
    testGame = new Game(2);
    testGame.tileBag.drawTile();
    testRunner.assertEquals(testTitle, 99, testGame.tileBag.size());
}