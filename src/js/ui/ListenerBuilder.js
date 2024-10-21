class ListenerBuilder {
    constructor(controller) {
        this.controller = controller;
    }    

    addFactoryDisplayTileEventListeners(factoryDisplay, tileNum) {
        let tileDiv = document.querySelector("#factory-display-" + factoryDisplay.id + "-tile-" + tileNum);
        tileDiv.addEventListener("click", (event) => {
            this.controller.handleFactoryDisplayTileClick(factoryDisplay.id, tileNum);
        });
    }

    addFactoryCenterTileEventListener(tileNum) {
        let tileDiv = document.querySelector("#factory-center-tile-" + tileNum);
        tileDiv.addEventListener("click", (event) => {
            this.controller.handleFactoryCenterTileClick(tileNum);
        });
    }

    addPatternlineEventListeners(player, row) {
        let playerId = player.id;
        let rowDiv = document.querySelector("#patternlines-row-" + row + "-player-" + playerId);        
        rowDiv.addEventListener("click", (event) => {
            this.controller.handlePatternLineRowClick(player, row);
        });        
    }

    addWallScoringTileEventListener(playerId, wallTileIndex) {
        let tileDiv = document.querySelector("#wall-tile-" + wallTileIndex + "-p" + playerId);
        tileDiv.addEventListener("click", (event) => {
            this.controller.handleWallScoringTileClick(playerId, wallTileIndex);
        });
    }

    addFloorLineEventListener(player) {
        let floorLineDiv = document.querySelector("#floorline-player-" + player.id);
        floorLineDiv.addEventListener("click", (event) => {
            this.controller.handleFloorLineClick(player.id);
        })
    }

    addFloorLineScoringTileEventListener(playerId) {
        let floorLineScoreDiv = document.querySelector("#floorline-score-tile-p" + playerId);
        floorLineScoreDiv.addEventListener("click", (event) => {
            this.controller.handleFloorLineScoringClick(playerId);
        });
    }
}