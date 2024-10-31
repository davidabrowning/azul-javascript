class Controller {
    constructor() {
        this.game = null;
        this.gameLogic = null;
        this.clickRouter = null;
        this.uiController = null;
    }

    // startSession() is the general entry point for the program
    startSession() {
        // Initialize properties
        this.game = new Game(2);
        this.gameLogic = this.game.gameLogic;
        this.clickRouter = new ClickRouter(this, this.game);
        this.uiController = new UIController(this.game, this.clickRouter);

        // Build game UI
        this.uiController.buildUI();
        this.startNextRound();
    }

    startNextRound() {
        this.gameLogic.dealTilesToFactoryDisplays();
        this.uiController.updateFactoryDisplays();
        this.uiController.printTakeTileMessage();
    }

    unselectAllTiles() {
        this.game.unselectAllTiles();
        this.uiController.removeSelectedEffectFromAllTiles();
    }

    selectFactoryDisplayTiles(factoryDisplayId, tileNum) {
        this.gameLogic.selectFactoryDisplayTiles(factoryDisplayId, tileNum);
        this.uiController.addSelectedEffectFactoryDisplay(factoryDisplayId, tileNum);
    }

    selectFactoryCenterTiles(tileNum) {
        this.gameLogic.selectFactoryCenterTiles(tileNum);
        this.uiController.selectFactoryCenterTiles(tileNum);
    }

    updateSelectedTilesToFactoryDisplay(factoryDisplayId, tileNum) {
        this.unselectAllTiles();
        this.selectFactoryDisplayTiles(factoryDisplayId, tileNum);
        this.uiController.printPlaceTileMessage();
    }

    updateSelectedTilesToFactoryCenter(tileNum) {
        this.unselectAllTiles();
        this.selectFactoryCenterTiles(tileNum);
        this.uiController.printPlaceTileMessage();  
    }

    placeTilesOnPatternLineAndEndTurn(rowNum) {
        this.gameLogic.placeTilesOnPatternLine(rowNum);
        this.uiController.redrawBoard();
        this.endTurn();        
    }

    placeTilesOnFloorLineAndEndTurn() {
        this.gameLogic.placeTilesOnFloorLine();
        this.uiController.redrawBoard();
        this.endTurn();
    }

    endTurn() {
        // End turn
        this.gameLogic.endTurn();
        this.uiController.printTakeTileMessage();

        // If necessary, end round
        if (this.game.isRoundOver()) {
            this.prepareNextScoreConfirmation();
        }
    }

    prepareNextScoreConfirmation() {
        if (this.gameLogic.gameHasAnUnscoredPatternLine()){
            this.uiController.addNextWallScoringTile();
            return;
        }

        if (this.gameLogic.gameHasAnUnscoredFloorLine()) {
            this.uiController.addNextFloorLineScoringTile();
            return;
        }

        // If necessary, end game
        // Otherwise, start the next round
        if (this.game.isGameOver()) {
            this.scoreGameEnd();
        } else {
            this.startNextRound();
        }
    }

    scoreGameEnd() {
        alert("Good game! Calculating game-end bonuses.");

        this.game.players.forEach(player => {
            player.wall.calculateBonuses();
            console.log(player);
        });
    }

    moveTilesFromPatternLineToWall(playerId, wallTileIndex) {
        this.gameLogic.scorePatternLineRow(playerId, wallTileIndex);
        this.uiController.redrawScorecard(playerId);
        this.prepareNextScoreConfirmation();
    }

    scoreTheFloorLine(playerId) {
        this.gameLogic.scoreTheFloorLine(playerId);
        this.uiController.redrawBoard();
        this.uiController.redrawScorecard(playerId);
        this.uiController.removeFloorLineSummaryTile(playerId);
        this.prepareNextScoreConfirmation();
    }
}