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

        factoryDisplay.tiles.forEach(tile => {
            let tileDiv = document.createElement("div");
            tileDiv.classList.add("tile", "tile-style-" + tile.value);
            div.appendChild(tileDiv);
        });
    }
    createScorecard(player) {
        // Create overall scorecard
        let scorecardDiv = document.createElement("div");
        scorecardDiv.setAttribute("id", "scorecard-p" + player.id);
        scorecardDiv.classList.add("scorecard");
        document.querySelector("#scorecards").appendChild(scorecardDiv);

        // Create header which holds score counter
        let scorecardHeader = document.createElement("header");
        scorecardHeader.setAttribute("id", "scorecard-header-p" + player.id);
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
                scorepipDiv.setAttribute("id", "scorepip-" + scorepipCounter 
                    + "-p" + player.id);
                scorepipDiv.classList.add("scorepip");
                scorepipDiv.innerText = scorepipCounter;
                scorepipRowDiv.appendChild(scorepipDiv);

                scorepipCounter++;
            }
        }

        // Create main which holds pattern lines and wall
        let scorecardMain = document.createElement("main");
        scorecardMain.setAttribute("id", "scorecard-main-p" + player.id);
        scorecardMain.classList.add("scorecard-main");
        scorecardDiv.appendChild(scorecardMain);

        // Create pattern lines
        let patternlinesDiv = document.createElement("div");
        patternlinesDiv.setAttribute("id", "patternlines-p" + player.id);
        patternlinesDiv.classList.add("patternlines");
        scorecardMain.appendChild(patternlinesDiv);

        for (let row = 0; row < 5; row++) {
            let patternlinesRowDiv = document.createElement("div");
            patternlinesRowDiv.setAttribute("id", "patternlines-row-" 
                + row + "-p" + player.id);
            patternlinesRowDiv.classList.add("patternlines-row");
            patternlinesDiv.appendChild(patternlinesRowDiv);

            for (let col = row; col >= 0; col--) {
                let patternlineTileDiv = document.createElement("div");
                patternlineTileDiv.setAttribute("id", "patternline-tile-"
                    + row + "-" + col + "-p" + player.id);
                patternlineTileDiv.classList.add("tile", "tile-style-3");
                patternlinesRowDiv.appendChild(patternlineTileDiv);
            }
        }

        // Create wall
        let wallDiv = document.createElement("div");
        wallDiv.setAttribute("id", "wall-p" + player.id);
        wallDiv.classList.add("wall");
        scorecardMain.appendChild(wallDiv);

        for (let row = 0; row < 5; row++) {
            let wallRowDiv = document.createElement("div");
            wallRowDiv.setAttribute("id", "wall-row-" + row + "-p" + player.id);
            wallRowDiv.classList.add("wall-row");
            wallDiv.appendChild(wallRowDiv);

            for (let col = 0; col < 5; col++) {
                let wallTileNum = row * 5 + col;

                let wallTileDiv = document.createElement("div");
                wallTileDiv.setAttribute("id", "wall-row-tile-" + wallTileNum
                    + "-p" + player.id);
                wallTileDiv.classList.add("tile", "tile-style-1");
                wallRowDiv.appendChild(wallTileDiv);
            }
        }

        // Create footer which holds floorline
        let scorecardFooter = document.createElement("footer");
        scorecardFooter.setAttribute("id", "scorecard-footer-p" + player.id);
        scorecardFooter.classList.add("scorecard-footer");
        scorecardDiv.appendChild(scorecardFooter);

        // Create floorline
        let floorlineDiv = document.createElement("div");
        floorlineDiv.setAttribute("id", "floorline-p" + player.id);
        floorlineDiv.classList.add("floorline");
        scorecardFooter.appendChild(floorlineDiv);

        for (let i = 0; i < 3; i++) {
            let floorlineTileDiv = document.createElement("div");
            floorlineTileDiv.classList.add("tile", "tile-style-0");
            floorlineDiv.appendChild(floorlineTileDiv);
        }

    }
}