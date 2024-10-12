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
        this.assertEquals("Two plus two", 4, 2 + 2);
        this.assertEquals("Two plus two equals five", 5, 2 + 2);
    }
}