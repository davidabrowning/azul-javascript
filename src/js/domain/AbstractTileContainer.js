class AbstractTileContainer {
    constructor() {
        this.tiles = [];
    }
    add(tile) {
        this.tiles.push(tile);
    }
    addMultiple(tileArray) {
        tileArray.forEach(tile => {
            this.add(tile);
        });
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
    size() {
        return this.tiles.length;
    }
    firstIndexOf(tileValue) {
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].value == tileValue) {
                return i;
            }
        }
        return -1;
    }

    removeAll(tileValue) {
        let claimedTiles = [];
        while(this.contains(tileValue)) {
            let tileIndex = this.firstIndexOf(tileValue);
            let tile = this.removeAt(tileIndex);
            claimedTiles.push(tile);
        }
        return claimedTiles;
    }

    clear() {
        let removedTiles = [];
        this.tiles.forEach(tile => {
            removedTiles.push(tile);
        });
        this.tiles = [];
        return removedTiles;
    }

    removeAt(tileIndex) {
        let tile = this.tiles[tileIndex];
        this.tiles.splice(tileIndex, 1);
        return tile;
    }    
}