class UIController {
    constructor(game, clickRouter) {
        this.game = game;
        this.clickRouter = clickRouter;
        this.uiBuilder = new UIBuilder();
        this.uiRemover = new UIRemover();
        this.uiUpdater = new UIUpdater();
        this.listenerBuilder = new ListenerBuilder(this.clickRouter);
        this.listenerRemover = new ListenerRemover();
    }

    buildUI() {
        this.uiBuilder.buildUI(this.game);
        this.listenerBuilder.buildEventListeners(this.game);
    }

    updateFactoryDisplays() {
        this.uiUpdater.redrawFactoryDisplays(this.game.factoryDisplays);
    }

    updateCurrentTurnMessage() {
        this.uiUpdater.updateCurrentTurnMessage(this.game.players[this.game.activePlayerNum]);
    }

    addSelectedEffectFactoryDisplay(factoryDisplayId, tileNum) {
        let factoryDisplay = this.game.factoryDisplays[factoryDisplayId];
        let tileValue = factoryDisplay.tiles[tileNum].value;
        this.uiUpdater.addSelectedEffectFactoryDisplay(factoryDisplayId, tileValue);        
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
    }

    removeSelectedEffectFromAllTiles() {
        this.uiUpdater.removeSelectedEffectFromAllTiles();
    }

    redrawScorecard(playerId) {
        let player = this.game.players[playerId];
        let wall = player.wall;

        this.uiUpdater.redrawScorepip(playerId, player.score);
        for (let row = 0; row < 5; row++) {
            this.uiUpdater.redrawPatternLineRow(player, row);
        }
        for (let tileNum = 0; tileNum < wall.size(); tileNum++) {
            if (wall.tiles[tileNum] != null) {
                let tileValue = wall.tiles[tileNum].value;
                this.uiUpdater.redrawWallTile(playerId, tileNum, tileValue);
            }
        }
        this.uiUpdater.redrawFloorLine(player);
    }

    redrawBoard() {
        let player = this.game.players[this.game.activePlayerNum];
        let factoryDisplays = this.game.factoryDisplays;
        let factoryCenter = this.game.factoryCenter;

        // Redraw:
        //  - FactoryDisplays
        //  - FactoryCenter
        //  - PatternLines
        //  - FloorLine
        this.uiUpdater.redrawFactoryDisplays(factoryDisplays);
        this.uiRemover.resetFactoryCenter();
        for (let i = 0; i < factoryCenter.size(); i++) {
            let tile = factoryCenter.tiles[i];
            this.uiUpdater.addTileToFactoryCenter(i, tile.value);
            this.listenerBuilder.addFactoryCenterTileEventListener(i);
        }
        for (let row = 0; row < 5; row++) {
            this.uiUpdater.redrawPatternLineRow(player, row);
        }
        this.redrawScorecard(player.id);
    }

    addNextWallScoringTile() {
        let player = null;
        let firstFullRow = -1;

        this.game.players.forEach(p => {
            if (player != null) {    // If we already have an unscored player, don't look for another
                return;
            }

            let pl = p.patternLine;
            let row = pl.firstFullRow();
            
            if (row != -1) {
                player = p;
                firstFullRow = row;
            }
        });

        let patternLine = player.patternLine;
        let tileValue = patternLine.rowPlacedTilesType(firstFullRow);
        let wall = player.wall;
        let wallTileIndex = wall.targetTileIndexByRow(tileValue, firstFullRow);
        let incrementalScore = wall.calculateIncrementalScore(tileValue, firstFullRow);

        this.uiUpdater.redrawWallScoringTile(player.id, wallTileIndex, incrementalScore);
        this.listenerBuilder.addWallScoringTileEventListener(player.id, wallTileIndex);
    }

    addNextFloorLineScoringTile() {
        let player = null;

        this.game.players.forEach(p => {
            if (player != null) {   // If we already have an unscored player, don't look for another
                return;
            }
            if (p.floorLine.isEmpty() == false) {
                player = p;
                return; // Exits the foreach
            }
        });

        if (player == null) {
            return;
        }

        let floorLine = player.floorLine;
        let floorLineScoreTotal = floorLine.calculateScore();
        this.uiUpdater.addFloorLineScoreSummaryTile(player.id, floorLineScoreTotal);
        this.listenerBuilder.addFloorLineScoreSummaryTileListener(player.id);
    }

    removeFloorLineSummaryTile(playerId) {
        this.uiRemover.removeFloorLineScoreSummaryTile(playerId);
    }

    addBonusScoreTiles() {
        this.game.players.forEach(player => {
            let bonusScore = player.wall.getBonusTotal();
            this.uiUpdater.addFloorLineBonusTile(player.id, bonusScore);
            this.listenerBuilder.addFloorLineBonusTileListener(player.id);
        });
    }

    removeFloorLineBonusTile(playerId) {
        this.uiRemover.removeFloorLineBonusTile(playerId);
    }
    
}