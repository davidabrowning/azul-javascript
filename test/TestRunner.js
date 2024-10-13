class TestRunner {
    constructor() {
        this.testCount = 0;
        this.testsPassed = 0;
        this.testsFailed = 0;
    }
    printTestSectionTitle(testSectionTitle) {
        let testSectionHeader = document.createElement("h2");
        testSectionHeader.innerText = testSectionTitle;
        document.querySelector("#test-log").appendChild(testSectionHeader);
    }
    printTestResult(testResultString) {
        let testResultParagraph = document.createElement("p");
        testResultParagraph.innerText = testResultString;
        document.querySelector("#test-log").appendChild(testResultParagraph);
        document.querySelector("#tests-passed").innerText = this.testsPassed;
        document.querySelector("#tests-failed").innerText = this.testsFailed;
    }
    assertEquals(testName, a, b) {
        let testResultString = "";
        this.testCount++;
        testResultString = this.testCount + ". " + testName;
        if (a == b) {
            this.testsPassed++;
            testResultString += ": PASSED.";
        } else {
            this.testsFailed++;
            testResultString += ": FAILED.";
        }
        testResultString += " Expected: " + a;
        testResultString += ". Actual: " + b + ".";
        this.printTestResult(testResultString);
    }

    runUnitTests() {
        let testSectionTitle = "";
        let testTitle = "";
        let testGame = null;
        let testFactoryCenter = null;

        testTitle = "Two plus two equals four";
        this.assertEquals(testTitle, 4, 2 + 2);

        testTitle = "Game bag starts with 100 tiles";
        testGame = new Game(2);
        this.assertEquals(testTitle, 100, testGame.tileBag.size());

        testTitle = "Two games should not have the same tiles";
        testGame = new Game(2);
        let testGame2 = new Game(2);
        let foundDifferingTiles = false;
        for (let i = 0; i < testGame.tileBag.size(); i++) {
            if (testGame.tileBag.drawTile().value != testGame2.tileBag.drawTile().value) {
                foundDifferingTiles = true;
            }
        }
        this.assertEquals(testTitle, true, foundDifferingTiles);

        testTitle = "TileBag size after drawing one Tile is 99";
        testGame = new Game(2);
        testGame.tileBag.drawTile();
        this.assertEquals(testTitle, 99, testGame.tileBag.size());

        testTitle = "Factory display starts round with four tiles";
        testGame = new Game(2);
        testGame.prepareRound();
        this.assertEquals(testTitle, 4, testGame.factoryDisplays[2].tiles.length);

        testTitle = "Factory center starts round with zero tiles";
        testGame = new Game(2);
        testGame.prepareRound();
        this.assertEquals(testTitle, 0, testGame.factoryCenter.size());

        testTitle = "Factory center persists discarded tiles";
        testFactoryCenter = new FactoryCenter();
        testFactoryCenter.add(new Tile(0));
        testFactoryCenter.add(new Tile(2));
        this.assertEquals(testTitle, 2, testFactoryCenter.size());

        testTitle = "FactoryCenter does not contain a Tile that was never discarded";
        testFactoryCenter = new FactoryCenter();
        testFactoryCenter.add(new Tile(3));
        this.assertEquals(testTitle, false, testFactoryCenter.contains(2));

        testTitle = "FactoryCenter does contain a Tile that was discarded";
        testFactoryCenter = new FactoryCenter();
        testFactoryCenter.add(new Tile(3));
        let flag = testFactoryCenter.contains(3);
        this.assertEquals(testTitle, true, testFactoryCenter.contains(3));

        testTitle = "FactoryDisplay is empty after claiming Tile";
        testGame = new Game(2);
        testGame.factoryDisplays[0].tiles[0] = new Tile(0);
        testGame.factoryDisplays[0].tiles[1] = new Tile(0);
        testGame.factoryDisplays[0].tiles[2] = new Tile(2);
        testGame.factoryDisplays[0].tiles[3] = new Tile(2);

        testSectionTitle = "FactoryCenter tests";
        this.printTestSectionTitle(testSectionTitle);
        runFactoryCenterTests(this);

        testSectionTitle = "FactoryDisplay tests";
        this.printTestSectionTitle(testSectionTitle);
        runFactoryDisplayTests(this);

        testSectionTitle = "Game tests";
        this.printTestSectionTitle(testSectionTitle);
        runGameTests(this);

        testSectionTitle = "Player tests";
        this.printTestSectionTitle(testSectionTitle);
        runPlayerTests(this);

        testSectionTitle = "Tile tests";
        this.printTestSectionTitle(testSectionTitle);
        runTileTests(this);

        testSectionTitle = "TileBag tests";
        this.printTestSectionTitle(testSectionTitle);
        runTileBagTests(this);

        testTitle = "FactoryCenter contains unclaimed FactoryDisplay Tiles";
    }
}