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
            numFactoryDisplaysToCreate = 1;
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
}