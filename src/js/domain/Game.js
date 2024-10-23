class Game {
    constructor(numPlayers) {
        this.tileBag = new TileBag();
        this.players = this.generatePlayers(numPlayers);
        this.activePlayerNum = 0;
        this.factoryDisplays = this.generateFactoryDisplays(numPlayers);
        this.factoryCenter = new FactoryCenter();
        this.assignStartingPlayerMarker();
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
        this.players[0].floorLine.tiles[0] = startingPlayerMarker;
    }
    dealTilesToFactoryDisplays() {
        this.factoryDisplays.forEach(factoryDisplay => {
            for (let i = 0; i < 4; i++) {
                let tile = this.tileBag.drawTile();
                factoryDisplay.add(tile);
            }
        });
    }
    endTurn() {
        this.activePlayerNum++;
        if (this.activePlayerNum == this.players.length) {
            this.activePlayerNum = 0;
        }
    }

    getSelectedTileValue() {
        let selectedTileValue = -1;
        this.factoryDisplays.forEach(fd => {
            if (fd.isSelected) {
                selectedTileValue = fd.selectedTileValue;
            }
        });
        if (this.factoryCenter.isSelected) {
            selectedTileValue = this.factoryCenter.selectedTileValue;
        }
        return selectedTileValue;
    }

    unselectAllTiles() {
        this.factoryDisplays.forEach(factoryDisplay => {
            factoryDisplay.unselect();
        });
        this.factoryCenter.unselect();        
    }

    placeTilesOnPatternLine(targetRow) {
        // Exit criteria
        if (this.getSelectedTileValue() == -1) {
            return;
        }

        let activePlayer = this.players[this.activePlayerNum];
        let targetTileValue = -1;
        let targetTiles = [];
        let droppedTiles = [];
        let factoryCenter = this.factoryCenter;
        let wall = activePlayer.wall;

        // If necessary, move starting player marker to FactoryCenter
        // Set the target Tiles
        // If necessary, clear and unselect the relevant FactoryDisplay
        // If necessary, clear and unselect the FactoryCenter
        if (this.isFirstTakeThisRound()) {
            let startingPlayerMarkerArray = activePlayer.floorLine.removeAll(99);
            this.factoryCenter.add(startingPlayerMarkerArray[0]);
        }
        this.factoryDisplays.forEach(fd => {
            if (fd.isSelected) {
                targetTileValue = fd.selectedTileValue;
                targetTiles = fd.removeAll(targetTileValue);
                let extraTiles = fd.clear();
                this.factoryCenter.addMultiple(extraTiles);
                fd.unselect();
            }
        });
        if (factoryCenter.isSelected) {
            if (factoryCenter.contains(99)) {
                let startingPlayerMarkerArray = factoryCenter.removeAll(99);
                activePlayer.floorLine.add(startingPlayerMarkerArray[0]);
                console.log(activePlayer.floorLine);
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

    isFirstTakeThisRound() {
        for (let i = 0; i < this.factoryDisplays.length; i++) {
            if (this.factoryDisplays[i].size() < 4) {
                return false;
            }
        }
        return true;
    }

    isGameOver() {
        return false;
    }

    isRoundOver() {
        let tilesRemain = false;

        // Check if Tiles remain on FactoryDisplays
        this.factoryDisplays.forEach(factoryDisplay => {
            if (factoryDisplay.size() > 0) {
                tilesRemain = true;
            }
        });

        // Check if Tiles remain on FactoryCenter
        if (this.factoryCenter.size() > 0) {
            tilesRemain = true;
        }

        // If any Tiles remain, round is not over (return false)
        if (tilesRemain) {
            return false;
        } else {
            return true;
        }

    }
}