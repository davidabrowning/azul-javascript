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
    canPlace(tile, rowNum) {
        if (this.rowCurrentCapacity(rowNum) == 0) {
            return false;
        }
        if (this.rowPlacedTilesNum(rowNum) && this.rowPlacedTilesType(rowNum) != tile.value) {
            return false;
        }
        return true;
    }
    place(tileArray, rowNum) {
        if (this.canPlace(tileArray[0], rowNum) == false) {
            return tileArray;
        }

        for (let i = this.rowFirstIndex(rowNum); i <= this.rowLastIndex(rowNum); i++) {
            if(tileArray.length == 0) {
                break;
            }
            this.tiles[i] = tileArray.pop();
        }
        return tileArray;
    }
}