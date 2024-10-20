class Game {
    constructor(numPlayers) {
        this.tileBag = new TileBag();
        this.players = this.generatePlayers(numPlayers);
        this.activePlayerNum = 0;
        this.factoryDisplays = this.generateFactoryDisplays(numPlayers);
        this.factoryCenter = new FactoryCenter();
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
    prepareRound() {
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

    /**
     * 
     * @param {int} factoryDisplayNum 
     * @param {int} tileValue 
     * @param {int} targetPatternLine 
     */
    claimFactoryDisplay(factoryDisplayNum, tileValue, targetPatternLine) {
        let factoryDisplay = this.factoryDisplays[factoryDisplayNum];
        let claimedTiles = factoryDisplay.removeAll(tileValue);
        let discardedTiles = factoryDisplay.clear();
        this.factoryCenter.addMultiple(discardedTiles);
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
            targetTileValue = factoryCenter.selectedTileValue;
            targetTiles = factoryCenter.removeAll(targetTileValue);
            factoryCenter.unselect();
        }

        droppedTiles = activePlayer.patternLine.place(targetTiles, targetRow, wall);
        activePlayer.floorLine.addMultiple(droppedTiles);
    }

    isGameOver() {
        return false;
    }

    isRoundOver() {
        let tilesRemain = false;

        this.factoryDisplays.forEach(factoryDisplay => {
            if (factoryDisplay.size() > 0) {
                tilesRemain = true;
            }
        });
        if (this.factoryCenter.size() > 0) {
            tilesRemain = true;
        }

        if (tilesRemain) {
            return false;
        } else {
            return true;
        }

    }
}