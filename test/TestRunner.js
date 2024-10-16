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
        if (a == b) {
            this.testsPassed++;
            testResultString += "[ PASSED ] ";
        } else {
            this.testsFailed++;
            testResultString += "[[[ FAILED ]]] ";
        }
        testResultString += this.testCount + ". " + testName;
        testResultString += "... Expected: " + a;
        testResultString += ". Actual: " + b + ".";
        this.printTestResult(testResultString);
    }

    runUnitTests() {
        let testSectionTitle = "";

        testSectionTitle = "FactoryCenter tests";
        this.printTestSectionTitle(testSectionTitle);
        runFactoryCenterTests(this);

        testSectionTitle = "FactoryDisplay tests";
        this.printTestSectionTitle(testSectionTitle);
        runFactoryDisplayTests(this);

        testSectionTitle = "FloorLine tests";
        this.printTestSectionTitle(testSectionTitle);
        runFloorLineTests(this);

        testSectionTitle = "Game tests";
        this.printTestSectionTitle(testSectionTitle);
        runGameTests(this);

        testSectionTitle = "PatternLine tests";
        this.printTestSectionTitle(testSectionTitle);
        runPatternLineTests(this);

        testSectionTitle = "Player tests";
        this.printTestSectionTitle(testSectionTitle);
        runPlayerTests(this);

        testSectionTitle = "Tile tests";
        this.printTestSectionTitle(testSectionTitle);
        runTileTests(this);

        testSectionTitle = "TileBag tests";
        this.printTestSectionTitle(testSectionTitle);
        runTileBagTests(this);

        testSectionTitle = "Wall tests";
        this.printTestSectionTitle(testSectionTitle);
        runWallTests(this);
    }
}