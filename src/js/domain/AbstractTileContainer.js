class AbstractTileContainer {
    constructor() {
        this.tiles = [];
    }
    add(tile) {
        this.tiles.push(tile);
    }
    contains(tileValue) {
        let foundNeedle = false;
        this.tiles.forEach(tile => {
            if(tile.value == tileValue) {
                foundNeedle = true;
            }
        });
        return foundNeedle;
    }
}