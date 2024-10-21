class UIUpdater {
    constructor() {
    }

    printTakeTileMessage(activePlayer) {
        let instructionsHeader = document.querySelector("#instructions");
        instructionsHeader.innerText = "Player " + (activePlayer.id + 1) + ", please choose a tile or tiles to take.";
    }

    printPlaceTileMessage(activePlayer) {
        let instructionsHeader = document.querySelector("#instructions");
        instructionsHeader.innerText = "Player " + (activePlayer.id + 1) + ", please choose a pattern or floor line row to place these tiles.";
    }

    redrawFactoryDisplayTile(factoryDisplayId, tileNum, tileValue) {
        let tileDiv = document.querySelector("#factory-display-" + factoryDisplayId + "-tile-" + tileNum);
        tileDiv.classList.remove("tile-style-empty", "tile-style-faded");
        tileDiv.classList.add("tile-style-" + tileValue);
    }

    redrawEmptyFactoryDisplay(factoryDisplayId) {
        for (let i = 0; i < 4; i++) {            
            let tileDiv = document.querySelector("#factory-display-" + factoryDisplayId + "-tile-" + i);
            tileDiv.classList.remove("tile-selected");
            tileDiv.classList.remove("tile-style-0", "tile-style-1", "tile-style-2", "tile-style-3", "tile-style-4");
            tileDiv.classList.add("tile-style-empty", "tile-style-faded");
        }
    }

    redrawScorepip(playerId, playerPoints) {
        for (let i = 1; i < 101; i++) {
            let inactiveScorepipDiv = document.querySelector("#scorepip-" + i + "-p" + playerId);
            inactiveScorepipDiv.classList.remove("scorepip-active");
            inactiveScorepipDiv.classList.add("scorepip-inactive");
        }
        if (playerPoints > 0) {
            let activeScorepipDiv = document.querySelector("#scorepip-" + playerPoints + "-p" + playerId);
            activeScorepipDiv.classList.remove("scorepip-inactive");
            activeScorepipDiv.classList.add("scorepip-active");
        }
    }

    redrawPatternLineRow(player, row) {
        let pl = player.patternLine;
        for (let i = pl.rowFirstIndex(row); i < pl.rowLastIndex(row) + 1; i++) {
            let colNum = pl.colNum(i);
            let tileDiv = document.querySelector("#patternline-tile-row-" + row + "-col-" + colNum + "-player-" + player.id);
            
            if (pl.tiles[i] == null) {
                tileDiv.classList.remove("tile-style-0", "tile-style-1", "tile-style-2", "tile-style-3", "tile-style-4");
                tileDiv.classList.add("tile-style-empty");
            } else {
                let tileValue = pl.tiles[i].value;
                tileDiv.classList.remove("tile-style-empty");
                tileDiv.classList.add("tile-style-" + tileValue);
            } 
        }
    }

    redrawWallScoringTile(playerId, wallTileIndex, incrementalScore) {
        let tileDiv = document.querySelector("#wall-tile-" + wallTileIndex + "-p" + playerId);
        tileDiv.classList.remove("tile-style-faded");
        tileDiv.classList.add("tile-style-scoring");
        tileDiv.innerText = "+" + incrementalScore;
    }

    redrawWallTile(playerId, wallTileIndex, tileValue) {
        let tileDiv = document.querySelector("#wall-tile-" + wallTileIndex + "-p" + playerId);
        tileDiv.classList.remove("tile-style-scoring");
        tileDiv.innerText = "";
        tileDiv.classList.add("tile-style-" + tileValue);
    }

    redrawFloorLine(player) {
        let playerId = player.id;
        let floorLine = player.floorLine;
        for (let tileNum = 0; tileNum < floorLine.penalties.length; tileNum++) {
            let floorLineTileDiv = document.querySelector("#floorline-tile-" + tileNum + "-p" + playerId);
            if (floorLine.tiles[tileNum] == null) {
                floorLineTileDiv.classList.remove("tile-style-0", "tile-style-1", "tile-style-2", "tile-style-3", "tile-style-4");
                floorLineTileDiv.classList.add("tile-style-empty");
            } else {
                let tileValue = floorLine.tiles[tileNum].value;
                floorLineTileDiv.classList.remove("tile-style-empty");
                floorLineTileDiv.classList.add("tile-style-" + tileValue);
            }
        }
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

    addSelectedEffectFactoryCenterTile(tileNum) {
        let tileDiv = document.querySelector("#factory-center-tile-" + tileNum);
        tileDiv.classList.add("tile-selected");
    }

    addTileToFactoryCenter(tileId, tileValue) {
        let factoryCenterDiv = document.querySelector("#factory-center");
        let tileDiv = document.createElement("div");
        tileDiv.setAttribute("id", "factory-center-tile-" + tileId);
        tileDiv.classList.add("tile", "tile-style-" + tileValue);
        factoryCenterDiv.appendChild(tileDiv);
    }

    addFloorLineScoreSummaryTile(playerId, score) {
        let floorLineDiv = document.querySelector("#floorline-player-" + playerId);
        let floorLineScoreDiv = document.createElement("div");
        floorLineScoreDiv.setAttribute("id", "floorline-score-tile-p" + playerId);
        floorLineScoreDiv.classList.add("tile", "tile-style-scoring");
        floorLineScoreDiv.innerHTML = score;
        floorLineDiv.appendChild(floorLineScoreDiv);
    }
}