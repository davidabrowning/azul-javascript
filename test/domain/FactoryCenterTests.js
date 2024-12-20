function runFactoryCenterTests(testRunner) {
    let testTitle = "";
    let testFactoryCenter = null;

    testTitle = "FactoryCenter returns all Tiles of a specified value";
    testFactoryCenter = new FactoryCenter();
    testFactoryCenter.add(new Tile(0));
    testFactoryCenter.add(new Tile(1));
    testFactoryCenter.add(new Tile(1));
    testFactoryCenter.add(new Tile(1));
    testFactoryCenter.add(new Tile(1));
    testRunner.assertEquals(testTitle, 4, testFactoryCenter.removeAll(1).length);

    testTitle = "Factory center persists discarded tiles";
    testFactoryCenter = new FactoryCenter();
    testFactoryCenter.add(new Tile(0));
    testFactoryCenter.add(new Tile(2));
    testRunner.assertEquals(testTitle, 2, testFactoryCenter.size());

    testTitle = "FactoryCenter does not contain a Tile that was never discarded";
    testFactoryCenter = new FactoryCenter();
    testFactoryCenter.add(new Tile(3));
    testRunner.assertEquals(testTitle, false, testFactoryCenter.contains(2));

    testTitle = "FactoryCenter does contain a Tile that was discarded";
    testFactoryCenter = new FactoryCenter();
    testFactoryCenter.add(new Tile(3));
    let flag = testFactoryCenter.contains(3);
    testRunner.assertEquals(testTitle, true, testFactoryCenter.contains(3));

    testTitle = "Factory center starts round with zero tiles";
    testGame = new Game(2);
    testRunner.assertEquals(testTitle, 0, testGame.factoryCenter.size());

}