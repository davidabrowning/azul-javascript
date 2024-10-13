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
            newPlayerArray.push(new Player());
        }
        return newPlayerArray;
    }
    generateFactoryDisplays(numPlayers) {
        let newFactoryDisplayArray = [];
        let numFactoryDisplaysToCreate = 0;
        if (numPlayers == 2) {
            numFactoryDisplaysToCreate = 5;
        } else if (numPlayers == 3) {
            numFactoryDisplaysToCreate = 7;
        } else {
            numFactoryDisplaysToCreate = 9;
        }
        for (let i = 0; i < numFactoryDisplaysToCreate; i++) {
            newFactoryDisplayArray.push(new FactoryDisplay());
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
}