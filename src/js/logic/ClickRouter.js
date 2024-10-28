class ClickRouter {
    constructor(controller, game) {
        this.controller = controller;
        this.game = game;
    }

    handleFactoryDisplayTileClick(factoryDisplayId, tileNum) {
        // Exit criteria
        if (this.game.factoryDisplays[factoryDisplayId].size() == 0) {
            return;
        }

        this.controller.updateSelectedTilesToFactoryDisplay(factoryDisplayId, tileNum);
    }

    handleFactoryCenterTileClick(tileNum) {
        // Exit criteria
        if (this.game.factoryCenter.size() == 0) {
            return;
        }

        this.controller.updateSelectedTilesToFactoryCenter(tileNum);
    }

    handlePatternLineRowClick(player, rowNum) {

        // Variables
        let playerId = player.id;
        let activePlayerId = this.game.activePlayerNum;
        let selectedTileValue = this.game.getSelectedTileValue();
        let targetPatternLine = player.patternLine;
        let wall = player.wall;

        // Exit criteria:
        //  - If not this Player's turn
        //  - If no Tiles are selected
        //  - If the selectedTile(s) cannot be placed on this row
        if (playerId != activePlayerId) {
            return; 
        }
        if (selectedTileValue == -1) {
            return;
        }
        if (targetPatternLine.canPlaceTileValue(selectedTileValue, rowNum, wall) == false) {
            return;
        }

        this.controller.placeTilesOnPatternLineAndEndTurn(rowNum);
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
    

}