class FloorLine extends AbstractTileContainer {
    constructor() {
        super();
        this.tiles = [null, null, null, null, null, null, null];
        this.penalties = [-1, -1, -2, -2, -2, -3, -3];
    }
    addMultiple(tileArray) {
        for (let i = 0; i < this.size(); i++) {
            if (tileArray.length == 0) {
                break;
            }
            if (this.tiles[i] != null) {
                continue;
            }
            this.tiles[i] = tileArray.pop();
        }
        return tileArray;
    }
    calculateScore() {
        let score = 0;
        for(let i = 0; i < this.size(); i++) {
            if (this.tiles[i] == null) {
                break;
            }
            score += this.penalties[i];
        }
        return score;
    }
    isEmpty() {
        return this.tiles[0] == null;
    }
    clear() {
        let clearedTiles = [];
        for (let i = 0; i < this.size(); i++) {
            if (i != null) {
                clearedTiles.push(this.tiles[i]);
                this.tiles[i] = null;
            }
        }
        return clearedTiles;
    }
}