class AbstractTileContainer {
    constructor() {
        this.tiles = [];
        this.isSelected = false;
        this.selectedTileValue = -1;
    }

    select(tileValue) {
        this.isSelected = true;
        this.selectedTileValue = tileValue;
    }
    unselect() {
        this.isSelected = false;
        this.selectedTileValue = -1;
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
    isEmpty() {
        return this.size() == 0;
    }
    firstIndexOf(tileValue) {
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].value == tileValue) {
                return i;
            }
        }
        return -1;
    }

    removeAll(tileValue) {  // Removes all tiles of a certain value
        let claimedTiles = [];
        while(this.contains(tileValue)) {
            let tileIndex = this.firstIndexOf(tileValue);
            let tile = this.removeAt(tileIndex);
            claimedTiles.push(tile);
        }
        return claimedTiles;
    }
    removeAt(tileIndex) {   // Remove a tile at a specific index
        let tile = this.tiles[tileIndex];
        this.tiles.splice(tileIndex, 1);
        return tile;
    }
    clear() {               // Removes all tiles
        let removedTiles = [];
        this.tiles.forEach(tile => {
            removedTiles.push(tile);
        });
        this.tiles = [];
        return removedTiles;
    }
}