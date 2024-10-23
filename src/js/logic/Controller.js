class Controller {
    constructor(userInterface) {
        this.uiBuilder = null;
        this.uiRemover = null;
        this.uiUpdater = null;
        this.listenerBuilder = null;
        this.listenerRemover = null;
        this.game = null;
    }

    // startSession() is the general entry point for the program
    startSession() {
        // Initialize properties
        this.uiBuilder = new UIBuilder();
        this.uiRemover = new UIRemover();
        this.uiUpdater = new UIUpdater();
        this.listenerBuilder = new ListenerBuilder(this);
        this.listenerRemover = new ListenerRemover(this);
        this.game = new Game(2);

        // Build game UI
        this.uiBuilder.buildUI(this.game);
        this.listenerBuilder.buildEventListeners(this.game);
        this.startNextRound();
    }

    startNextRound() {
        // Deal Tiles
        this.game.dealTilesToFactoryDisplays();
        this.uiUpdater.redrawFactoryDisplays(this.game.factoryDisplays);

        // Set active player
        let activePlayer = this.game.players[this.game.activePlayerNum];
        this.uiUpdater.printTakeTileMessage(activePlayer);
    }

    unselectAllTiles() {
        this.uiUpdater.removeSelectedEffectFromAllTiles();
        this.game.unselectAllTiles();
    }

    selectFactoryDisplayTiles(factoryDisplayId, tileNum) {
        let factoryDisplay = this.game.factoryDisplays[factoryDisplayId];
        let tileValue = factoryDisplay.tiles[tileNum].value;
        this.uiUpdater.addSelectedEffectFactoryDisplay(factoryDisplayId, tileValue);
        factoryDisplay.select(tileValue);
    }

    selectFactoryCenterTiles(tileNum) {
        let factoryCenter = this.game.factoryCenter;
        let tile = factoryCenter.tiles[tileNum];
        let tileValue = tile.value;
        for (let i = 0; i < factoryCenter.size(); i++) {
            if (factoryCenter.tiles[i].value == tileValue) {
                this.uiUpdater.addSelectedEffectFactoryCenterTile(i);
            }
        }
        factoryCenter.select(tileValue);
    }

    handleFactoryDisplayTileClick(factoryDisplayId, tileNum) {
        // Exit criteria
        if (this.game.factoryDisplays[factoryDisplayId].size() == 0) {
            return;
        }

        this.unselectAllTiles();
        this.selectFactoryDisplayTiles(factoryDisplayId, tileNum);
        this.uiUpdater.printPlaceTileMessage(this.game.players[this.game.activePlayerNum]);
    }

    handleFactoryCenterTileClick(tileNum) {
        // Exit criteria
        if (this.game.factoryCenter.size() == 0) {
            return;
        }

        this.unselectAllTiles();
        this.selectFactoryCenterTiles(tileNum);
        this.uiUpdater.printPlaceTileMessage(this.game.players[this.game.activePlayerNum]);
    }

    handlePatternLineRowClick(player, row) {

        // Variables
        let playerId = player.id;
        let activePlayerId = this.game.activePlayerNum;
        let selectedTileValue = this.game.getSelectedTileValue();
        let targetPatternLine = player.patternLine;
        let factoryCenter = this.game.factoryCenter;
        let wall = player.wall;

        // Exit criteria
        if (playerId != activePlayerId) {
            return; // If not this Player's turn
        }
        if (selectedTileValue == -1) {
            return; // If no Tiles are selected
        }
        if (targetPatternLine.canPlaceTileValue(selectedTileValue, row, wall) == false) {
            return; // If the selected Tile(s) cannot be placed on this row
        }

        // Place tiles
        this.game.placeTilesOnPatternLine(row);

        // Redraw board
        this.redrawBoard();

        // Redraw this player's pattern line
        // Can probably move this into this.redrawBoard()
        this.uiUpdater.redrawPatternLineRow(player, row);

        // End turn
        this.endTurn();
    }

    redrawBoard() {
        let player = this.game.players[this.game.activePlayerNum];
        let factoryCenter = this.game.factoryCenter;

        // Redraw board
        this.game.factoryDisplays.forEach(fd => {
            if (fd.isEmpty()) {
                this.uiUpdater.redrawEmptyFactoryDisplay(fd.id);
            }
        });
        this.uiRemover.resetFactoryCenter();
        for (let i = 0; i < factoryCenter.size(); i++) {
            let tile = factoryCenter.tiles[i];
            this.uiUpdater.addTileToFactoryCenter(i, tile.value);
            this.listenerBuilder.addFactoryCenterTileEventListener(i);
        }
        this.uiUpdater.redrawFloorLine(player);
    }

    endTurn() {
        // End turn
        this.game.endTurn();
        this.uiUpdater.printTakeTileMessage(this.game.players[this.game.activePlayerNum]);

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
            let floorLine = player.floorLine;

            if (firstFullRow != -1) {               // If this Player has row Tiles to score
                let tileValue = patternLine.rowPlacedTilesType(firstFullRow);
                let wall = player.wall;
                let wallTileIndex = wall.targetTileIndexByRow(tileValue, firstFullRow);
                let incrementalScore = wall.calculateIncrementalScore(tileValue, firstFullRow);
    
                this.uiUpdater.redrawWallScoringTile(player.id, wallTileIndex, incrementalScore);
                this.listenerBuilder.addWallScoringTileEventListener(player.id, wallTileIndex);
                return;
            }
            if (floorLine.isEmpty() == false) {     // If this Player has FloorLine penalty Tiles to score
                let floorLineScoreTotal = floorLine.calculateScore();
                this.uiUpdater.addFloorLineScoreSummaryTile(player.id, floorLineScoreTotal);
                this.listenerBuilder.addFloorLineScoreSummaryTileListener(player.id);
                return;
            }
        }

        this.startNextRound();
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
        this.uiUpdater.redrawScorepip(playerId, player.score);

        // Update pattern line, wall, and wall display
        let clearedTiles = patternLine.clearRow(scoringRow);
        this.uiUpdater.redrawPatternLineRow(player, scoringRow);
        wall.place(clearedTiles.pop(), scoringRow);
        this.game.tileBag.addMultiple(clearedTiles);
        this.uiUpdater.redrawWallTile(playerId, wallTileIndex, tileValue);

        // Prepare next score confirmation
        this.prepareNextScoreConfirmation();
    }

    handleFloorLineClick(playerId) {
        let player = this.game.players[playerId];
        let activePlayerId = this.game.activePlayerNum;
        let selectedTileValue = this.game.getSelectedTileValue();

        // Exit criteria
        if (playerId != activePlayerId) {
            return; // If not this Player's turn
        }
        if (selectedTileValue == -1) {
            return; // If no Tiles are selected
        }

        this.game.placeTilesOnFloorLine();
        this.redrawBoard();
        this.endTurn();
    }

    handleFloorLineScoringClick(playerId) {
        let player = this.game.players[playerId];
        let floorLine = player.floorLine;
        let scorePenalty = floorLine.calculateScore();

        // Penalize the player for these FloorLine Tiles
        // Return the Tiles to the TileBag
        // Redraw the FloorLine
        player.addPoints(scorePenalty);
        this.game.tileBag.addMultiple(player.floorLine.clear());
        this.uiUpdater.redrawScorepip(playerId, player.score);
        this.uiUpdater.redrawFloorLine(player);
        this.uiRemover.removeFloorLineScoreSummaryTile(playerId);

        // Continue to the next step of the scoring round
        this.prepareNextScoreConfirmation();
    }
}