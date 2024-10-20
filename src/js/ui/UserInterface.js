class UserInterface {
    constructor() {
        this.controller = null;
    }
    setController(controller) {
        this.controller = controller;
    }
    createFactoryDisplay(factoryDisplay) {
        let div = document.createElement("div");
        div.setAttribute("id", "factory-display-" + factoryDisplay.id);
        div.classList.add("factory-display");
        document.querySelector("#factory-displays").appendChild(div);

        for (let i = 0; i < 4; i++) {
            let tile = factoryDisplay.tiles[i];

            let tileDiv = document.createElement("div");
            tileDiv.setAttribute("id", "factory-display-" + factoryDisplay.id + "-tile-" + i);
            tileDiv.classList.add("tile", "tile-style-" + tile.value);
            div.appendChild(tileDiv);
        }
    }
    createScorecard(player) {
        // Create overall scorecard
        let scorecardDiv = document.createElement("div");
        scorecardDiv.setAttribute("id", "scorecard-player-" + player.id);
        scorecardDiv.classList.add("scorecard");
        document.querySelector("#scorecards").appendChild(scorecardDiv);

        // Create header which holds score counter
        let scorecardHeader = document.createElement("header");
        scorecardHeader.setAttribute("id", "scorecard-header-player-" + player.id);
        scorecardHeader.classList.add("scorecard-header");
        scorecardDiv.appendChild(scorecardHeader);

        // Create header's score counter
        let scorepipCounter = 1;
        for (let row = 0; row < 5; row++) {
            let scorepipRowDiv = document.createElement("div");
            scorepipRowDiv.classList.add("scorepip-row");
            scorecardHeader.appendChild(scorepipRowDiv);

            for (let col = 0; col < 20; col++) {
                let scorepipDiv = document.createElement("div");
                scorepipDiv.setAttribute("id", "scorepip-" + scorepipCounter + "-p" + player.id);
                scorepipDiv.classList.add("scorepip", "scorepip-inactive");
                scorepipDiv.innerText = scorepipCounter;
                scorepipRowDiv.appendChild(scorepipDiv);

                scorepipCounter++;
            }
        }

        // Create main which holds pattern lines and wall
        let scorecardMain = document.createElement("main");
        scorecardMain.setAttribute("id", "scorecard-main-player-" + player.id);
        scorecardMain.classList.add("scorecard-main");
        scorecardDiv.appendChild(scorecardMain);

        // Create pattern lines
        let patternlinesDiv = document.createElement("div");
        patternlinesDiv.setAttribute("id", "patternlines-player-" + player.id);
        patternlinesDiv.classList.add("patternlines");
        scorecardMain.appendChild(patternlinesDiv);

        for (let row = 0; row < 5; row++) {
            let patternlinesRowDiv = document.createElement("div");
            patternlinesRowDiv.setAttribute("id", "patternlines-row-" + row + "-player-" + player.id);
            patternlinesRowDiv.classList.add("patternlines-row");
            patternlinesDiv.appendChild(patternlinesRowDiv);

            for (let col = row; col >= 0; col--) {
                let patternlineTileDiv = document.createElement("div");
                patternlineTileDiv.setAttribute("id", "patternline-tile-row-" + row + "-col-" + col + "-player-" + player.id);
                patternlineTileDiv.classList.add("tile", "tile-style-empty");
                patternlinesRowDiv.appendChild(patternlineTileDiv);
            }
        }

        // Create wall
        let wallDiv = document.createElement("div");
        wallDiv.setAttribute("id", "wall-player-" + player.id);
        wallDiv.classList.add("wall");
        scorecardMain.appendChild(wallDiv);

        for (let row = 0; row < 5; row++) {
            let wallRowDiv = document.createElement("div");
            wallRowDiv.setAttribute("id", "wall-row-" + row + "-player-" + player.id);
            wallRowDiv.classList.add("wall-row");
            wallDiv.appendChild(wallRowDiv);

            for (let col = 0; col < 5; col++) {
                let wallTileNum = row * 5 + col;
                let wallTileStyleNum = player.wall.targetTileValueByIndex(wallTileNum);

                let wallTileDiv = document.createElement("div");
                wallTileDiv.setAttribute("id", "wall-tile-" + wallTileNum + "-p" + player.id);
                wallTileDiv.classList.add("tile", "tile-style-" + wallTileStyleNum, "tile-style-faded");
                wallRowDiv.appendChild(wallTileDiv);
            }
        }

        // Create footer which holds floorline
        let scorecardFooter = document.createElement("footer");
        scorecardFooter.setAttribute("id", "scorecard-footer-player-" + player.id);
        scorecardFooter.classList.add("scorecard-footer");
        scorecardDiv.appendChild(scorecardFooter);

        // Create floorline
        let floorlineDiv = document.createElement("div");
        floorlineDiv.setAttribute("id", "floorline-player-" + player.id);
        floorlineDiv.classList.add("floorline");
        scorecardFooter.appendChild(floorlineDiv);

        // for (let i = 0; i < 8; i++) {
        //     let floorlineTileDiv = document.createElement("div");
        //     floorlineTileDiv.classList.add("tile", "tile-style-empty");
        //     floorlineDiv.appendChild(floorlineTileDiv);
        // }

    }

    redrawEmptyFactoryDisplay(factoryDisplayId) {
        for (let i = 0; i < 4; i++) {            
            let tileDiv = document.querySelector("#factory-display-" + factoryDisplayId + "-tile-" + i);
            tileDiv.classList.remove("tile-selected");
            tileDiv.classList.remove("tile-style-0", "tile-style-1", "tile-style-2", "tile-style-3", "tile-style-4");
            tileDiv.classList.add("tile-style-empty", "tile-style-faded");
        }
    }

    resetFactoryCenter() {
        let factoryCenterDiv = document.querySelector("#factory-center");
        factoryCenterDiv.innerHTML = "";
    }

    addTileToFactoryCenter(tileId, tileValue) {
        let factoryCenterDiv = document.querySelector("#factory-center");
        let tileDiv = document.createElement("div");
        tileDiv.setAttribute("id", "factory-center-tile-" + tileId);
        tileDiv.classList.add("tile", "tile-style-" + tileValue);
        factoryCenterDiv.appendChild(tileDiv);

        this.addFactoryCenterTileEventListener(tileId);
    }

    redrawPatternLineRow(player, row) {
        let pl = player.patternLine;
        for (let i = pl.rowFirstIndex(row); i < pl.rowLastIndex(row) + 1; i++) {
            let colNum = pl.colNum(i);
            
            if (pl.tiles[i] != null) {
                let tileValue = pl.tiles[i].value;
                let tileDiv = document.querySelector("#patternline-tile-row-" + row + "-col-" + colNum + "-player-" + player.id);
                tileDiv.classList.remove("tile-style-empty");
                tileDiv.classList.add("tile-style-" + tileValue);
            }
        }
    }

    redrawFloorLine(player) {
        let playerId = player.id;
        let floorLineDiv = document.querySelector("#floorline-player-" + playerId);
        floorLineDiv.innerHTML = "";
        player.floorLine.tiles.forEach(t => {
            let tileDiv = document.createElement("div");
            tileDiv.classList.add("tile", "tile-style-" + t.value);
            floorLineDiv.appendChild(tileDiv);
        });
    }

    redrawWallScoringTile(playerId, wallTileIndex, incrementalScore) {
        let tileDiv = document.querySelector("#wall-tile-" + wallTileIndex + "-p" + playerId);
        tileDiv.classList.remove("tile-style-faded");
        tileDiv.classList.add("tile-style-scoring");
        tileDiv.innerText = "+" + incrementalScore;
    }

    printTakeTileMessage(activePlayer) {
        let instructionsHeader = document.querySelector("#instructions");
        instructionsHeader.innerText = "Player " + (activePlayer.id + 1) + ", please choose a tile or tiles to take.";
    }

    printPlaceTileMessage(activePlayer) {
        let instructionsHeader = document.querySelector("#instructions");
        instructionsHeader.innerText = "Player " + (activePlayer.id + 1) + ", please choose a pattern or floor line row to place these tiles.";
    }

    addFactoryDisplayTileEventListeners(factoryDisplay, tileNum) {
        let tileDiv = document.querySelector("#factory-display-" + factoryDisplay.id + "-tile-" + tileNum);
        tileDiv.addEventListener("click", (event) => {
            this.controller.handleFactoryDisplayTileClick(factoryDisplay.id, tileNum);
        });
    }

    addSelectedEffectFactoryDisplay(factoryDisplayId, tileValue) {
        for (let i = 0; i < 4; i++) {
            let tileDivs = document.querySelectorAll("#factory-display-" + factoryDisplayId + " .tile-style-" + tileValue);
            tileDivs.forEach(tileDiv => {
                tileDiv.classList.add("tile-selected");    
            });
        }
    }

    removeSelectedEffectFromAllTiles() {
        let tileDivs = document.querySelectorAll(".tile");
        tileDivs.forEach(tileDiv => {
            tileDiv.classList.remove("tile-selected");
        });
    }

    addFactoryCenterTileEventListener(tileNum) {
        let tileDiv = document.querySelector("#factory-center-tile-" + tileNum);
        tileDiv.addEventListener("click", (event) => {
            this.controller.handleFactoryCenterTileClick(tileNum);
        });
    }

    addSelectedEffectFactoryCenterTile(tileNum) {
        let tileDiv = document.querySelector("#factory-center-tile-" + tileNum);
        tileDiv.classList.add("tile-selected");
    }

    addPatternlineEventListeners(player, row) {
        let playerId = player.id;
        let rowDiv = document.querySelector("#patternlines-row-" + row + "-player-" + playerId);        
        rowDiv.addEventListener("click", (event) => {
            this.controller.handlePatternLineRowClick(player, row);
        });        
    }
}