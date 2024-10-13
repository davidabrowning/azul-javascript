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
        let scorecardDiv = document.createElement("div");
        scorecardDiv.setAttribute("id", "scorecard-" + player.id);
        scorecardDiv.classList.add("scorecard");
        document.querySelector("#scorecards").appendChild(scorecardDiv);

        let scorecardHeader = document.createElement("header");
        scorecardHeader.setAttribute("id", "scorecard-header-" + player.id);
        scorecardHeader.classList.add("scorecard-header");
        scorecardDiv.appendChild(scorecardHeader);

        let scorepipCounter = 1;
        for (let row = 0; row < 5; row++) {
            let scorepipRowDiv = document.createElement("div");
            scorepipRowDiv.classList.add("scorepip-row");
            scorecardHeader.appendChild(scorepipRowDiv);

            for (let col = 0; col < 20; col++) {
                let scorepipDiv = document.createElement("div");
                scorepipDiv.setAttribute("id", "scorepip-" + player.id + "-" 
                    + scorepipCounter);
                scorepipDiv.classList.add("scorepip");
                scorepipDiv.innerText = scorepipCounter;
                scorepipRowDiv.appendChild(scorepipDiv);

                scorepipCounter++;
            }
        }
    }
}