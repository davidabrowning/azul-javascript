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
            for (let tileNum = 0; tileNum < 4; tileNum++) {
                this.userInterface.addFactoryDisplayTileEventListeners(factoryDisplay, tileNum);
            }
        });
        this.game.players.forEach(player => {
            for (let row = 0; row < 5; row++) {
                this.userInterface.addPatternlineEventListeners(player, row);
            }
        });
    }

    handleFactoryDisplayTileClick(factoryDisplayId, tileNum) {
        // Remove previously selected tiles
        this.userInterface.removeSelectedEffectFromAllTiles();
        this.game.factoryDisplays.forEach(factoryDisplay => {
            factoryDisplay.unselect();
        });
        this.game.factoryCenter.unselect();

        // Select these tiles
        let factoryDisplay = this.game.factoryDisplays[factoryDisplayId];
        let tile = factoryDisplay.tiles[tileNum];
        let tileValue = tile.value;
        this.userInterface.addSelectedEffectFactoryDisplay(factoryDisplayId, tileValue);
        factoryDisplay.select(tileValue);

        // Update printed instructions
        this.userInterface.printPlaceTileMessage(this.game.players[this.game.activePlayerNum]);
    }

    handlePatternLineRowClick(player, row) {
        if (player.id != this.game.activePlayerNum) {
            return;
        }

        this.game.placeTilesOnPatternLine(row);
        this.game.factoryDisplays.forEach(fd => {
            if (fd.isEmpty()) {
                this.userInterface.redrawEmptyFactoryDisplay(fd.id);
            }
        });
        this.userInterface.resetFactoryCenter();
        this.game.factoryCenter.tiles.forEach(tile => {
            this.userInterface.addTileToFactoryCenter(tile.value);
        })
        this.userInterface.redrawPatternLineRow(player, row);
        this.userInterface.redrawFloorLine(player);

        this.game.endTurn();
        this.userInterface.printTakeTileMessage(this.game.players[this.game.activePlayerNum]);
    }
}