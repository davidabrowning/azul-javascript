class Game {
    constructor(numPlayers) {
        this.tileBag = new TileBag();
        this.players = this.generatePlayers(numPlayers);
        this.factoryDisplays = this.generateFactoryDisplays(numPlayers);
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
        for (let i = 0; i < 5; i++) {
            newFactoryDisplayArray.push(new FactoryDisplay());
        }
        return newFactoryDisplayArray;
    }
}