class TestRunner {
    constructor() {
        this.testCount = 0;
        this.testsPassed = 0;
        this.testsFailed = 0;
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
        let testTitle = "";
        let testGame = null;

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

        

    }
}