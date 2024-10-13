class Controller {
    constructor(userInterface) {
        this.userInterface = userInterface;
        this.game = null;
    }
    startSession() {
        this.userInterface.setController(this);
        this.game = new Game(2);
        this.game.prepareRound();
        this.game.factoryDisplays.forEach(factoryDisplay => {
            this.userInterface.createFactoryDisplay(factoryDisplay);
        });
    }
}