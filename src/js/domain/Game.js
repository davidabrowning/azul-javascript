class Game {
    constructor(numPlayers) {
        this.tileBag = new TileBag();
        this.players = this.generatePlayers(numPlayers);
    }
    generatePlayers(numPlayers) {
        let newPlayerArray = [];
        for (let i = 0; i < numPlayers; i++) {
            newPlayerArray.push(new Player());
        }
        return newPlayerArray;
    }
}