class Controller {
    constructor(userInterface) {
        this.userInterface = userInterface;
        this.game = null;
    }
    startSession() {
        this.userInterface.setController(this);
        this.game = new Game(2);
        for (let i = 0; i < this.game.factoryDisplays.length; i++) {
            // this.userInterface.showFactoryDisplay();
        }
    }
}