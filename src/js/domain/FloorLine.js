class FloorLine extends AbstractTileContainer {
    constructor() {
        super();
        this.tiles = [null, null, null, null, null, null, null];
        this.penalties = [-1, -1, -2, -2, -2, -3, -3];
    }
    addMultiple(tileArray) {
        for (let i = 0; i < this.tiles.length; i++) {
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
}