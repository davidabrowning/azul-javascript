class PatternLine extends AbstractTileContainer {
    constructor() {
        super();
        this.tiles = [ 
                                    null, 
                              null, null,
                        null, null, null,
                  null, null, null, null,
            null, null, null, null, null
        ];
    }
    rowIsEmpty(rowNum) {
        switch(rowNum) {
            case 0: return this.tiles[0] == null;
            case 1: return this.tiles[1] == null;
            case 2: return this.tiles[3] == null;
            case 3: return this.tiles[6] == null;
            case 4: return this.tiles[10] == null;
            default: return true;
        }
    }
    rowIsFull(rowNum) {
        return this.rowCurrentCapacity(rowNum) == 0;
    }
    firstFullRow() {
        for (let i = 0; i < 5; i++) {
            if (this.rowIsFull(i)) {
                return i;
            }
        }
        return -1;
    }
    rowMaxCapacity(rowNum) {
        return rowNum + 1;
    }
    rowCurrentCapacity(rowNum) {
        return this.rowMaxCapacity(rowNum) - this.rowPlacedTilesNum(rowNum);
    }
    rowPlacedTilesNum(rowNum) {
        switch (rowNum) {
            case 0:
                if (this.tiles[0] == null) { return 0; }
                return 1;
            case 1:
                if (this.tiles[1] == null) { return 0; }
                if (this.tiles[2] == null) { return 1; }
                return 2;
            case 2:
                if (this.tiles[3] == null) { return 0; }
                if (this.tiles[4] == null) { return 1; }
                if (this.tiles[5] == null) { return 2; }
                return 3;
            case 3:
                if (this.tiles[6] == null) { return 0; }
                if (this.tiles[7] == null) { return 1; }
                if (this.tiles[8] == null) { return 2; }
                if (this.tiles[9] == null) { return 3; }
            case 4:
                if (this.tiles[10] == null) { return 0; }
                if (this.tiles[11] == null) { return 1; }
                if (this.tiles[12] == null) { return 2; }
                if (this.tiles[13] == null) { return 3; }
                if (this.tiles[14] == null) { return 4; }
                return 5;
            default:
                break;
        }
        return -1;
    }
    rowPlacedTilesType(rowNum) {
        if (this.rowPlacedTilesNum(rowNum) == 0) {
            return -1;    
        }

        let firstIndexOnThisRow = this.rowFirstIndex(rowNum);
        return this.tiles[firstIndexOnThisRow].value;
    }
    rowFirstIndex(rowNum) {
        switch(rowNum) {
            case 0: return 0;
            case 1: return 1;
            case 2: return 3;
            case 3: return 6;
            case 4: return 10;
            default: return -1;
        }
    }
    rowLastIndex(rowNum) {
        return this.rowFirstIndex(rowNum) + rowNum;
    }
    rowFirstOpenTileIndex(rowNum) {
        for (let i = this.rowFirstIndex(rowNum); i < this.rowLastIndex(rowNum); i++) {
            if (this.tiles[i] == null) {
                return i;
            }
        }
        return -1;
    }
    firstOpenTileIndexOnRow(rowNum) {
        return this.rowFirstIndex(rowNum) + this.rowPlacedTilesNum(rowNum);
    }
    canPlaceTileValue(tileValue, rowNum, wall) {
        if (this.rowCurrentCapacity(rowNum) == 0) {
            return false;
        }
        if (this.rowPlacedTilesNum(rowNum) && this.rowPlacedTilesType(rowNum) != tileValue) {
            return false;
        }
        if (wall.canPlace(tileValue, rowNum) == false) {
            return false;
        }
        return true;        
    }
    canPlace(tile, rowNum, wall) {
        if (tile == null) {
            return -1;
        }
        return this.canPlaceTileValue(tile.value, rowNum, wall);
    }
    place(tileArray, rowNum, wall) {
        if (this.canPlace(tileArray[0], rowNum, wall) == false) {
            return tileArray;
        }

        for (let i = this.firstOpenTileIndexOnRow(rowNum); i < this.rowLastIndex(rowNum) + 1; i++) {
            if(tileArray.length == 0) {
                break;
            }
            this.tiles[i] = tileArray.pop();
        }
        return tileArray;
    }
    colNum(index) {
        switch(index) {
            case 0: case 1: case 3: case 6: case 10:
                return 0;
            case 2: case 4: case 7: case 11:
                return 1;
            case 5: case 8: case 12:
                return 2;
            case 9: case 13:
                return 3;
            case 14:
                return 4;
            default:
                return -1;
        }
    }
    clearRow(row) {
        let clearedTiles = [];
        for (let i = this.rowFirstIndex(row); i < this.rowLastIndex(row) + 1; i++) {
            clearedTiles.push(this.tiles[i]);
            this.tiles[i] = null;
        }
        return clearedTiles;
    }
}