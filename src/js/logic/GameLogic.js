class GameLogic {
    constructor(game) {
        this.game = game;
    }

    generatePlayers(numPlayers) {
        let newPlayerArray = [];
        for (let i = 0; i < numPlayers; i++) {
            newPlayerArray.push(new Player(i));
        }
        return newPlayerArray;
    }

    generateFactoryDisplays(numPlayers) {
        let newFactoryDisplayArray = [];
        let numFactoryDisplaysToCreate = 0;
        if (numPlayers == 2) {
            numFactoryDisplaysToCreate = 5;
        } else if (numPlayers == 3) {
            numFactoryDisplaysToCreate = 7;
        } else {
            numFactoryDisplaysToCreate = 9;
        }
        for (let i = 0; i < numFactoryDisplaysToCreate; i++) {
            newFactoryDisplayArray.push(new FactoryDisplay(i));
        }
        return newFactoryDisplayArray;
    }

    assignStartingPlayerMarker() {
        let startingPlayerMarker = new Tile(99);
        this.game.factoryCenter.add(startingPlayerMarker);
    }

    dealTilesToFactoryDisplays() {
        let factoryDisplays = this.game.factoryDisplays;
        let tileBag = this.game.tileBag;
        let tileTrash = this.game.tileTrash;

        factoryDisplays.forEach(factoryDisplay => {
            for (let i = 0; i < 4; i++) {
                if (tileBag.size() == 0) {
                    let recycledTiles = tileTrash.clear();
                    tileBag.addMultiple(recycledTiles);
                }
                let tile = tileBag.drawTile();
                factoryDisplay.add(tile);
            }
        });
    }

    endTurn() {
        this.game.activePlayerNum++;
        if (this.game.activePlayerNum == this.game.players.length) {
            this.game.activePlayerNum = 0;
        }
    }

    placeTilesOnPatternLine(targetRow) {
        // Exit criteria
        if (this.game.getSelectedTileValue() == -1) {
            return;
        }

        let activePlayer = this.game.players[this.game.activePlayerNum];
        let targetTileValue = -1;
        let targetTiles = [];
        let droppedTiles = [];
        let factoryDisplays = this.game.factoryDisplays;
        let factoryCenter = this.game.factoryCenter;
        let wall = activePlayer.wall;

        factoryDisplays.forEach(fd => {
            if (fd.isSelected) {
                targetTileValue = fd.selectedTileValue;
                targetTiles = fd.removeAll(targetTileValue);
                let extraTiles = fd.clear();
                factoryCenter.addMultiple(extraTiles);
                fd.unselect();
            }
        });
        if (factoryCenter.isSelected) {
            if (factoryCenter.contains(99)) {
                let startingPlayerMarkerArray = factoryCenter.removeAll(99);
                activePlayer.floorLine.add(startingPlayerMarkerArray[0]);
            }
            targetTileValue = factoryCenter.selectedTileValue;
            targetTiles = factoryCenter.removeAll(targetTileValue);
            factoryCenter.unselect();
        }

        // If the target is the FloorLine, then drop all Tiles
        // Else place Tiles and drop any remaining Tiles
        if (targetRow == -1) {
            droppedTiles = targetTiles;
        } else {
            droppedTiles = activePlayer.patternLine.place(targetTiles, targetRow, wall);
        }
        activePlayer.floorLine.addMultiple(droppedTiles);
    }

    placeTilesOnFloorLine() {
        this.placeTilesOnPatternLine(-1);
    }

    selectFactoryDisplayTiles(factoryDisplayId, tileNum) {
        let factoryDisplay = this.game.factoryDisplays[factoryDisplayId];
        let tileValue = factoryDisplay.tiles[tileNum].value;
        this.game.selectFactoryDisplay(factoryDisplayId, tileValue);      
    }

    selectFactoryCenterTiles(tileNum) {
        let factoryCenter = this.game.factoryCenter;
        let tile = factoryCenter.tiles[tileNum];
        let tileValue = tile.value;

        factoryCenter.select(tileValue);        
    }

    gameHasAnUnscoredPatternLine() {
        let foundUnscoredPatternLine = false;
        this.game.players.forEach(player => {
            let patternLine = player.patternLine;
            let firstFullRow = patternLine.firstFullRow();
            
            if (firstFullRow != -1) {
                foundUnscoredPatternLine = true;
            }
        });
        return foundUnscoredPatternLine;
    }

    gameHasAnUnscoredFloorLine() {
        let foundUnscoredFloorLine = false;
        this.game.players.forEach(player => {
            let floorLine = player.floorLine;
            
            if (floorLine.isEmpty() == false) {
                foundUnscoredFloorLine = true;
            }
        });
        return foundUnscoredFloorLine;
    }

    scorePatternLineRow(playerId, wallTileIndex) {
        let player = this.game.players[playerId];
        let wall = player.wall;
        let tileValue = wall.targetTileValueByIndex(wallTileIndex);
        let patternLine = player.patternLine;
        let scoringRow = patternLine.firstFullRow();
        let incrementalScore = wall.calculateIncrementalScore(tileValue, scoringRow);

        player.addPoints(incrementalScore);
        let clearedTiles = patternLine.clearRow(scoringRow);
        wall.place(clearedTiles.pop(), scoringRow);
        this.game.tileTrash.addMultiple(clearedTiles);
    }

    scoreTheFloorLine(playerId) {
        let player = this.game.players[playerId];
        let floorLine = player.floorLine;
        let scorePenalty = floorLine.calculateScore();

        // If this player has the next player marker:
        //  - Return the marker to the FactoryCenter
        // Penalize the player for these FloorLine Tiles
        // Return the Tiles to the TileBag
        if (floorLine.contains(99)) {
            this.game.activePlayerNum = playerId;
            let startingPlayerMarkerArray = floorLine.removeAll(99);
            this.game.factoryCenter.add(startingPlayerMarkerArray[0]);
        }
        player.addPoints(scorePenalty);
        this.game.tileTrash.addMultiple(player.floorLine.clear());
    }

    calculateGameEndBonuses() {
        this.game.players.forEach(player => {
            player.wall.calculateBonuses();
        });
    }

    scoreGameEndBonuses(playerId) {
        let player = this.game.players[playerId];
        let wall = player.wall;
        let bonusScore = wall.getBonusTotal();
        player.addPoints(bonusScore);
    }
}