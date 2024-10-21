class UIBuilder {
    constructor() {
    }

    buildUI(game) {
        this.buildFactoryDisplayUI(game.factoryDisplays);
        this.buildFactoryCenterUI();
        this.buildPlayerScorecardsUI(game.players);
    }

    buildFactoryDisplayUI(factoryDisplays) {
        factoryDisplays.forEach(factoryDisplay => {
            this.createFactoryDisplay(factoryDisplay);
        });
    }

    buildFactoryCenterUI() {
        this.createFactoryCenter();
    }

    buildPlayerScorecardsUI(players) {
        players.forEach(player => {
            this.createScorecard(player);
        });
    }

    createFactoryDisplay(factoryDisplay) {
        let div = document.createElement("div");
        div.setAttribute("id", "factory-display-" + factoryDisplay.id);
        div.classList.add("factory-display");
        document.querySelector("#factory-displays").appendChild(div);

        for (let i = 0; i < 4; i++) {
            let tileDiv = document.createElement("div");
            tileDiv.setAttribute("id", "factory-display-" + factoryDisplay.id + "-tile-" + i);
            tileDiv.classList.add("tile", "tile-style-empty");
            div.appendChild(tileDiv);
        }
    }

    createFactoryCenter() {
        let factoryCenterDiv = document.querySelector("#factory-center");
        let placeholderTileDiv = document.createElement("div");
        placeholderTileDiv.classList.add("tile", "tile-style-empty", "tile-style-faded");
        factoryCenterDiv.appendChild(placeholderTileDiv);
    }

    createScorecard(player) {

        this.createScorecardContainer(player);

        this.createScorecardHeaderContainer(player);
        this.createScorecardCounter(player);

        this.createScorecardMainContainer(player);
        this.createScorecardPatternLines(player);
        this.createScorecardWall(player);

        this.createScorecardFooterContainer(player);
        this.createScorecardFloorLine(player);

    }

    createScorecardContainer(player) {
        let scorecardDiv = document.createElement("div");
        scorecardDiv.setAttribute("id", "scorecard-player-" + player.id);
        scorecardDiv.classList.add("scorecard");
        document.querySelector("#scorecards").appendChild(scorecardDiv);
    }

    createScorecardHeaderContainer(player) {
        let scorecardDiv = document.querySelector("#scorecard-player-" + player.id);
        let scorecardHeader = document.createElement("header");
        scorecardHeader.setAttribute("id", "scorecard-header-player-" + player.id);
        scorecardHeader.classList.add("scorecard-header");
        scorecardDiv.appendChild(scorecardHeader);
    }

    createScorecardCounter(player) {
        let scorecardHeader = document.querySelector("#scorecard-header-player-" + player.id);
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
    }

    createScorecardMainContainer(player) {
        let scorecardDiv = document.querySelector("#scorecard-player-" + player.id);
        let scorecardMain = document.createElement("main");
        scorecardMain.setAttribute("id", "scorecard-main-player-" + player.id);
        scorecardMain.classList.add("scorecard-main");
        scorecardDiv.appendChild(scorecardMain);
    }

    createScorecardPatternLines(player) {
        let scorecardMain = document.querySelector("#scorecard-main-player-" + player.id);
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
    }

    createScorecardWall(player) {
        let scorecardMain = document.querySelector("#scorecard-main-player-" + player.id);
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
    }

    createScorecardFooterContainer(player) {
        let scorecardDiv = document.querySelector("#scorecard-player-" + player.id);
        let scorecardFooter = document.createElement("footer");
        scorecardFooter.setAttribute("id", "scorecard-footer-player-" + player.id);
        scorecardFooter.classList.add("scorecard-footer");
        scorecardDiv.appendChild(scorecardFooter);
    }

    createScorecardFloorLine(player) {
        let scorecardFooter = document.querySelector("#scorecard-footer-player-" + player.id);
        let floorlineDiv = document.createElement("div");
        floorlineDiv.setAttribute("id", "floorline-player-" + player.id);
        floorlineDiv.classList.add("floorline");
        scorecardFooter.appendChild(floorlineDiv);

        let floorLine = player.floorLine;
        for (let i = 0; i < floorLine.penalties.length; i++) {
            let floorLineTileDiv = document.createElement("div");
            floorLineTileDiv.setAttribute("id", "floorline-tile-" + i + "-p" + player.id);
            if (floorLine.tiles[i] != null) {
                floorLineTileDiv.classList.add("tile", "tile-style-99");
            } else {
                floorLineTileDiv.classList.add("tile", "tile-style-empty");
            } 
            floorLineTileDiv.innerText = floorLine.penalties[i];
            floorlineDiv.appendChild(floorLineTileDiv);
        }
    }
}