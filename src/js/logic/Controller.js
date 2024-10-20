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

    unselectAllTiles() {
        this.userInterface.removeSelectedEffectFromAllTiles();
        this.game.factoryDisplays.forEach(factoryDisplay => {
            factoryDisplay.unselect();
        });
        this.game.factoryCenter.unselect();
    }

    handleFactoryDisplayTileClick(factoryDisplayId, tileNum) {
        this.unselectAllTiles();

        // Select these tiles
        let factoryDisplay = this.game.factoryDisplays[factoryDisplayId];
        let tile = factoryDisplay.tiles[tileNum];
        let tileValue = tile.value;
        this.userInterface.addSelectedEffectFactoryDisplay(factoryDisplayId, tileValue);
        factoryDisplay.select(tileValue);


        // Update printed instructions
        this.userInterface.printPlaceTileMessage(this.game.players[this.game.activePlayerNum]);
    }

    handleFactoryCenterTileClick(tileNum) {
        this.unselectAllTiles();

        // Select these tiles
        let factoryCenter = this.game.factoryCenter;
        let tile = factoryCenter.tiles[tileNum];
        let tileValue = tile.value;
        for (let i = 0; i < factoryCenter.size(); i++) {
            if (factoryCenter.tiles[i].value == tileValue) {
                this.userInterface.addSelectedEffectFactoryCenterTile(i);
            }
        }
        factoryCenter.select(tileValue);

        // Update printed instructions
        this.userInterface.printPlaceTileMessage(this.game.players[this.game.activePlayerNum]);
    }

    handlePatternLineRowClick(player, row) {

        // Variables
        let playerId = player.id;
        let activePlayerId = this.game.activePlayerNum;
        let selectedTileValue = this.game.getSelectedTileValue();
        let targetPatternLine = player.patternLine;
        let factoryCenter = this.game.factoryCenter;

        // Exit criteria
        if (playerId != activePlayerId) {
            return;
        }
        if (targetPatternLine.canPlaceTileValue(selectedTileValue, row) == false) {
            return;
        }

        // Place tiles
        this.game.placeTilesOnPatternLine(row);

        // Redraw board
        this.game.factoryDisplays.forEach(fd => {
            if (fd.isEmpty()) {
                this.userInterface.redrawEmptyFactoryDisplay(fd.id);
            }
        });
        this.userInterface.resetFactoryCenter();
        for (let i = 0; i < factoryCenter.size(); i++) {
            let tile = factoryCenter.tiles[i];
            this.userInterface.addTileToFactoryCenter(i, tile.value);
        }
        this.userInterface.redrawPatternLineRow(player, row);
        this.userInterface.redrawFloorLine(player);

        // End turn
        this.game.endTurn();
        this.userInterface.printTakeTileMessage(this.game.players[this.game.activePlayerNum]);

        if (this.game.isRoundOver()) {
            this.prepareNextScoreConfirmation();
        }
    }

    prepareNextScoreConfirmation() {
        let numPlayers = this.game.players.length;

        for (let i = 0; i < numPlayers; i++) {
            let player = this.game.players[i];
            let patternLine = player.patternLine;
            let firstFullRow = patternLine.firstFullRow();
            if (firstFullRow == -1) {   // If no full rows
                continue;               // Continue to next player
            }
            let tileValue = patternLine.rowPlacedTilesType(firstFullRow);
            let wall = player.wall;
            let wallTileIndex = wall.targetTileIndexByRow(tileValue, firstFullRow);
            let incrementalScore = wall.calculateIncrementalScore(tileValue, firstFullRow);

            this.userInterface.redrawWallScoringTile(player.id, wallTileIndex, incrementalScore);
            this.userInterface.addWallScoringTileEventListener(player.id, wallTileIndex);
            return;
        }

        alert("Time to set up the next round!");
    }

    handleWallScoringTileClick(playerId, wallTileIndex) {
        let player = this.game.players[playerId];
        let wall = player.wall;
        let tileValue = wall.targetTileValueByIndex(wallTileIndex);
        let patternLine = player.patternLine;
        let scoringRow = patternLine.firstFullRow();

        // Update score and score display
        let incrementalScore = wall.calculateIncrementalScore(tileValue, scoringRow);
        player.addPoints(incrementalScore);
        this.userInterface.redrawScorepip(playerId, player.score);

        // Update pattern line, wall, and wall display
        let clearedTiles = patternLine.clearRow(scoringRow);
        this.userInterface.redrawPatternLineRow(player, scoringRow);
        wall.place(clearedTiles.pop(), scoringRow);
        this.game.tileBag.addMultiple(clearedTiles);
        this.userInterface.redrawWallTile(playerId, wallTileIndex, tileValue);

        // Prepare next score confirmation
        this.prepareNextScoreConfirmation();
    }
}