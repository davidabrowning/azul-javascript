class UIRemover {
    constructor() {
    }

    resetFactoryCenter() {
        let factoryCenterDiv = document.querySelector("#factory-center");
        factoryCenterDiv.innerHTML = "";
    }

    removeFloorLineScoreSummaryTile(playerId) {
        let floorLineDiv = document.querySelector("#floorline-player-" + playerId);
        let floorLineScoreDiv = document.querySelector("#floorline-score-tile-p" + playerId);
        floorLineDiv.removeChild(floorLineScoreDiv);
    }

    removeFloorLineBonusTile(playerId) {
        let floorLineDiv = document.querySelector("#floorline-player-" + playerId);
        let floorLineBonusDiv = document.querySelector("#floorline-bonus-tile-p" + playerId);
        floorLineDiv.removeChild(floorLineBonusDiv);
    }
}