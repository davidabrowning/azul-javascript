class Controller {
    constructor(userInterface) {
        this.userInterface = userInterface;
        this.game = null;
    }
    startSession() {
        this.userInterface.setController(this);

        // Game preparations
        this.game = new Game(2);
        this.game.players.forEach(player => {
            this.userInterface.createScorecard(player);
        });


        // Round preparations
        this.game.prepareRound();
        this.game.factoryDisplays.forEach(factoryDisplay => {
            this.userInterface.createFactoryDisplay(factoryDisplay);
        });

        // Turn preparations
        let activePlayer = this.game.players[this.game.activePlayerNum];
        this.userInterface.printTakeTileMessage(activePlayer);

        // Set event listeners
        this.game.factoryDisplays.forEach(factoryDisplay => {
            this.userInterface.addFactoryDisplayEventListeners(factoryDisplay);
        });
    }

    handleFactoryDisplayTileHover(factoryDisplayId, tileNum) {
        let factoryDisplay = this.game.factoryDisplays[factoryDisplayId];
        let tile = factoryDisplay.tiles[tileNum];
        let tileValue = tile.value;
        this.userInterface.hoverFactoryDisplay(factoryDisplayId, tileValue);
    }

    handleFactoryDisplayTileMouseout(factoryDisplayId, tileNum) {
        let factoryDisplay = this.game.factoryDisplays[factoryDisplayId];
        let tile = factoryDisplay.tiles[tileNum];
        let tileValue = tile.value;
        this.userInterface.mouseoutFactoryDisplay(factoryDisplayId, tileValue);
    }
}