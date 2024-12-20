class ListenerBuilder {
    constructor(clickRouter) {
        this.clickRouter = clickRouter;
    }

    buildEventListeners(game) {
        this.buildFactoryDisplayListeners(game.factoryDisplays);
        this.buildPatternLineListeners(game.players);
        this.buildFloorLineListeners(game.players);
    }

    buildFactoryDisplayListeners(factoryDisplays) {
        factoryDisplays.forEach(factoryDisplay => {
            for (let tileNum = 0; tileNum < 4; tileNum++) {
                this.addFactoryDisplayTileEventListeners(factoryDisplay, tileNum);
            }
        });
    }

    buildPatternLineListeners(players) {
        players.forEach(player => {
            for (let row = 0; row < 5; row++) {
                this.addPatternlineEventListeners(player, row);
            }
        });
    }

    buildFloorLineListeners(players) {
        players.forEach(player => {
            this.addFloorLineEventListener(player);
        });
    }

    addFactoryDisplayTileEventListeners(factoryDisplay, tileNum) {
        let tileDiv = document.querySelector("#factory-display-" + factoryDisplay.id + "-tile-" + tileNum);
        tileDiv.addEventListener("click", (event) => {
            this.clickRouter.handleFactoryDisplayTileClick(factoryDisplay.id, tileNum);
        });
    }

    addFactoryCenterTileEventListener(tileNum) {
        let tileDiv = document.querySelector("#factory-center-tile-" + tileNum);
        tileDiv.addEventListener("click", (event) => {
            this.clickRouter.handleFactoryCenterTileClick(tileNum);
        });
    }

    addPatternlineEventListeners(player, row) {
        let playerId = player.id;
        let rowDiv = document.querySelector("#patternlines-row-" + row + "-player-" + playerId);        
        rowDiv.addEventListener("click", (event) => {
            this.clickRouter.handlePatternLineRowClick(player, row);
        });        
    }

    addWallScoringTileEventListener(playerId, wallTileIndex) {
        let tileDiv = document.querySelector("#wall-tile-" + wallTileIndex + "-p" + playerId);
        tileDiv.addEventListener("click", (event) => {
            this.clickRouter.handleWallScoringTileClick(playerId, wallTileIndex);
        }, { once: true }); // Remove the listener after being clicked once
    }

    addFloorLineEventListener(player) {
        let floorLineDiv = document.querySelector("#floorline-player-" + player.id);
        floorLineDiv.addEventListener("click", (event) => {
            this.clickRouter.handleFloorLineClick(player.id);
        })
    }

    addFloorLineScoreSummaryTileListener(playerId) {
        let floorLineScoreDiv = document.querySelector("#floorline-score-tile-p" + playerId);
        floorLineScoreDiv.addEventListener("click", (event) => {
            this.clickRouter.handleFloorLineScoringClick(playerId);
        });
    }

    addFloorLineBonusTileListener(playerId) {
        let floorLineBonusDiv = document.querySelector("#floorline-bonus-tile-p" + playerId);
        floorLineBonusDiv.addEventListener("click", (event) => {
            this.clickRouter.handleFloorLineBonusClick(playerId);
        });
    }
}