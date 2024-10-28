class Controller {
    constructor(userInterface) {
        this.uiBuilder = null;
        this.uiRemover = null;
        this.uiUpdater = null;
        this.listenerBuilder = null;
        this.listenerRemover = null;
        this.clickRouter = null;
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
        this.clickRouter = new ClickRouter(this, this.game);
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

        // Update take tile message active player
        this.uiUpdater.printTakeTileMessage(this.game.players[this.game.activePlayerNum]);
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

    updateSelectedTilesToFactoryDisplay(factoryDisplayId, tileNum) {
        this.unselectAllTiles();
        this.selectFactoryDisplayTiles(factoryDisplayId, tileNum);
        this.uiUpdater.printPlaceTileMessage(this.game.players[this.game.activePlayerNum]);
    }

    updateSelectedTilesToFactoryCenter(tileNum) {
        this.unselectAllTiles();
        this.selectFactoryCenterTiles(tileNum);
        this.uiUpdater.printPlaceTileMessage(this.game.players[this.game.activePlayerNum]);        
    }

    placeTilesOnPatternLineAndEndTurn(rowNum) {
        // Place tiles, redraw board, and end turn
        this.game.placeTilesOnPatternLine(row);
        this.redrawBoard();
        this.endTurn();        
    }

    redrawBoard() {
        let player = this.game.players[this.game.activePlayerNum];
        let factoryCenter = this.game.factoryCenter;

        // Redraw:
        //  - FactoryDisplays
        //  - FactoryCenter
        //  - PatternLines
        //  - FloorLine
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
        for (let row = 0; row < 5; row++) {
            this.uiUpdater.redrawPatternLineRow(player, row);
        }
        this.uiUpdater.redrawFloorLine(player);
    }

    endTurn() {
        // End turn
        this.game.endTurn();
        this.uiUpdater.printTakeTileMessage(this.game.players[this.game.activePlayerNum]);

        // If necessary, end round
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

            // If this Player has row Tiles to score, add a Wall scoring tile
            // If this player has FloorLine penalty Tiles to score, add a FloorLine scoring tile
            if (firstFullRow != -1) {
                this.addWallScoringTile(player, firstFullRow);
                return;
            }
            if (floorLine.isEmpty() == false) {
                this.addFloorLineScoringTile(player);
                return;
            }
        }

        // Otherwise, start the next round
        this.startNextRound();
    }

    addWallScoringTile(player, firstFullRow) {
        let patternLine = player.patternLine;
        let tileValue = patternLine.rowPlacedTilesType(firstFullRow);
        let wall = player.wall;
        let wallTileIndex = wall.targetTileIndexByRow(tileValue, firstFullRow);
        let incrementalScore = wall.calculateIncrementalScore(tileValue, firstFullRow);

        this.uiUpdater.redrawWallScoringTile(player.id, wallTileIndex, incrementalScore);
        this.listenerBuilder.addWallScoringTileEventListener(player.id, wallTileIndex);
    }

    addFloorLineScoringTile(player) {
        let floorLine = player.floorLine;
        let floorLineScoreTotal = floorLine.calculateScore();
        this.uiUpdater.addFloorLineScoreSummaryTile(player.id, floorLineScoreTotal);
        this.listenerBuilder.addFloorLineScoreSummaryTileListener(player.id);
    }

    handleWallScoringTileClick(playerId, wallTileIndex) {
        let player = this.game.players[playerId];
        let wall = player.wall;
        let tileValue = wall.targetTileValueByIndex(wallTileIndex);
        let patternLine = player.patternLine;
        let scoringRow = patternLine.firstFullRow();
        let incrementalScore = wall.calculateIncrementalScore(tileValue, scoringRow);

        // Update score and score display
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

        // If this player has the next player marker:
        //  - Set them to go first next round
        //  - Return the marker to the FactoryCenter
        // Penalize the player for these FloorLine Tiles
        // Return the Tiles to the TileBag
        // Redraw the FloorLine
        if (floorLine.contains(99)) {
            this.game.activePlayerNum = playerId;
            let startingPlayerMarkerArray = floorLine.removeAll(99);
            this.game.factoryCenter.add(startingPlayerMarkerArray[0]);
            this.redrawBoard();
        }
        player.addPoints(scorePenalty);
        this.game.tileBag.addMultiple(player.floorLine.clear());
        this.uiUpdater.redrawScorepip(playerId, player.score);
        this.uiUpdater.redrawFloorLine(player);
        this.uiRemover.removeFloorLineScoreSummaryTile(playerId);

        // Continue to the next step of the scoring round
        this.prepareNextScoreConfirmation();
    }
}