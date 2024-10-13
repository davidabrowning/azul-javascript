class FactoryCenter {
    constructor() {
        this.tiles = [];
    }
    size() {
        return this.tiles.length;
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
    remove(tileIndex) {
        let tile = this.tiles[tileIndex];
        this.tiles.splice(tileIndex, 1);
        return tile;
    }
    claim(tileValue) {

    }
}