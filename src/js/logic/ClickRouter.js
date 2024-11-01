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
        this.controller.moveTilesFromPatternLineToWall(playerId, wallTileIndex);
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

        this.controller.placeTilesOnFloorLineAndEndTurn();
    }

    handleFloorLineScoringClick(playerId) {
        this.controller.scoreTheFloorLine(playerId);
    }

    handleFloorLineBonusClick(playerId) {
        this.controller.scoreGameEndBonuses(playerId);
    }
}