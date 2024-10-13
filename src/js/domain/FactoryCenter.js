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

    /**
     * @param {int} tileValue the Tile.value to search for
     * @returns int representing first found instance of Tile with tileValue
     */
    indexOf(tileValue) {
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].value == tileValue) {
                return i;
            }
        }
        return -1;
    }

    claim(tileValue) {
        let claimedTiles = [];
        while(this.contains(tileValue)) {
            let tileIndex = this.indexOf(tileValue);
            let tile = this.remove(tileIndex);
            claimedTiles.push(tile);
        }
        return claimedTiles;
    }
}