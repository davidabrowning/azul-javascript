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
    rowPlacedTilesNum(rowNum) {
        switch (rowNum) {
            case 0:
                if (this.tiles[0] == null) { return 0; }
                break;
            case 1:
                if (this.tiles[1] == null) { return 0; }
                if (this.tiles[2] == null) { return 1; }
                break;
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
                break;
            default:
                break;
        }
        return -1;
    }
    rowPlacedTilesType(rowNum) {

    }
    place(tileArray, row) {
        let thisRowAlreadyHasTiles = false;
        let rejectedTiles = [];
        switch(row) {
            case 0:
                this.tiles[0] = tileArray[0];
                break;
            case 1:
                break;
            case 2:
                this.tiles[3] = tileArray[0];
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }
        return rejectedTiles;
    }
}