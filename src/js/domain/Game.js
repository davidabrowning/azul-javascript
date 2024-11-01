class Game {
    constructor(numPlayers) {
        this.gameLogic = new GameLogic(this);
        this.tileBag = new TileBag();
        this.tileTrash = new TileTrash();
        this.players = this.gameLogic.generatePlayers(numPlayers);
        this.activePlayerNum = 0;
        this.factoryDisplays = this.gameLogic.generateFactoryDisplays(numPlayers);
        this.factoryCenter = new FactoryCenter();
        this.gameLogic.assignStartingPlayerMarker();
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

    selectFactoryDisplay(factoryDisplayId, tileValue) {
        let factoryDisplay = this.factoryDisplays[factoryDisplayId];
        factoryDisplay.select(tileValue);
    }

    unselectAllTiles() {
        this.factoryDisplays.forEach(factoryDisplay => {
            factoryDisplay.unselect();
        });
        this.factoryCenter.unselect();
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
        let gameIsOver = false;
        this.players.forEach(player => {
            if (player.wall.hasACompletedRow()) {
                gameIsOver = true;
            }
        });
        return gameIsOver;
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