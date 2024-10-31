class Wall {
    constructor() {
        this.rowSize = 5;
        this.colSize = 5;
        this.tiles = [  null, null, null, null, null,
                        null, null, null, null, null,
                        null, null, null, null, null,
                        null, null, null, null, null,
                        null, null, null, null, null ];
        this.targets = [0, 1, 2, 3, 4,
                        4, 0, 1, 2, 3,
                        3, 4, 0, 1, 2,
                        2, 3, 4, 0, 1,
                        1, 2, 3, 4, 0 ];
        this.rowBonuses = [0, 0, 0, 0, 0];
        this.colBonuses = [0, 0, 0, 0, 0];
        this.colorBonuses = [0, 0, 0, 0, 0];
    }
    size() {
        return this.rowSize * this.colSize;
    }
    placedTileValueByIndex(placedTileIndex) {
        return this.tiles[placedTileIndex];
    }
    placedTileValueByRowCol(row, col) {
        let placedTileIndex = row * this.rowSize + col;
        return this.placedTileValueByIndex(placedTileIndex);
    }
    targetTileValueByIndex(targetIndex) {
        return this.targets[targetIndex];
    }
    targetTileRowByIndex(targetIndex) {
        return targetIndex / 5;
    }
    targetTileColByIndex(targetIndex) {
        return targetIndex % 5;
    }
    targetTileValueByRowCol(row, col) {
        let targetIndex = row * this.rowSize + col;
        return this.targetTileValueByIndex(targetIndex);
    }
    targetTileIndexByRow(tileType, row) {
        let indexCountStart = row * this.rowSize;
        for (let i = indexCountStart; i < indexCountStart + this.rowSize; i++) {
            if (this.targets[i] == tileType) {
                return i;
            }
        }
        return -1;
    }
    adjacentTilesLeft(row, col) {
        let adjacentTileCounter = 0;
        for (let i = col - 1; i >= 0; i--) {
            if (this.placedTileValueByRowCol(row, i) == null) {
                break;
            }
            adjacentTileCounter++;
        }
        return adjacentTileCounter;
    }
    adjacentTilesRight(row, col) {
        let adjacentTileCounter = 0;
        for (let i = col + 1; i < this.rowSize; i++) {
            if (this.placedTileValueByRowCol(row, i) == null) {
                break;
            }
            adjacentTileCounter++;
        }
        return adjacentTileCounter;
    }
    adjacentTilesAbove(row, col) {
        let adjacentTileCounter = 0;
        for (let i = row - 1; i >= 0; i--) {
            if (this.placedTileValueByRowCol(i, col) == null) {
                break;
            }
            adjacentTileCounter++;
        }
        return adjacentTileCounter;
    }
    adjacentTilesBelow(row, col) {
        let adjacentTileCounter = 0;
        for (let i = row + 1; i < this.colSize; i++) {
            if (this.placedTileValueByRowCol(i, col) == null) {
                break;
            }
            adjacentTileCounter++;
        }
        return adjacentTileCounter;
    }
    calculateIncrementalScore(tileType, row) {
        let rowScore = 0;
        let colScore = 0;
        let totalScore = 0;

        let targetTileIndex = this.targetTileIndexByRow(tileType, row);
        let col = this.targetTileColByIndex(targetTileIndex);

        rowScore += this.adjacentTilesLeft(row, col);
        rowScore += this.adjacentTilesRight(row, col);
        if (rowScore > 0) {  // If there are row points,
            rowScore++;      // Get a point for the tile itself
        }

        colScore += this.adjacentTilesAbove(row, col);
        colScore += this.adjacentTilesBelow(row, col);
        if (colScore > 0) {  // If there are col points,
            colScore++;      // Get a point for the tile itself
        }

        if (rowScore == 0 && colScore == 0) {
            totalScore = 1;
        } else {
            totalScore = rowScore + colScore;
        }

        return totalScore;
    }
    canPlace(tileValue, row) {
        let tileIndex = this.targetTileIndexByRow(tileValue, row);
        return this.tiles[tileIndex] == null;
    }
    place(tile, row) {
        let tileValue = tile.value;
        let tileIndex = this.targetTileIndexByRow(tileValue, row);
        this.tiles[tileIndex] = tile;
    }
    hasACompletedRow() {
        for (let row = 0; row < 5; row++) {
            if (this.rowIsCompleted(row)) {
                return true;
            }
        }
        return false;
    }
    rowIsCompleted(rowNum) {
        let startIndex = rowNum * 5;
        for (let i = startIndex; i < startIndex + 5; i++) {
            if (this.tiles[i] == null) {
                return false;
            }
        }
        return true;
    }
    colIsCompleted(colNum) {
        let startIndex = colNum;
        for (let i = colNum; i < 25; i+= 5) {
            if (this.tiles[i] == null) {
                return false;
            }
        }
        return true;
    }
    colorIsCompleted(colorNum) {
        switch(colorNum) {
            case 0:
                if (this.tiles[0] == null) { return false; }
                if (this.tiles[6] == null) { return false; }
                if (this.tiles[12] == null) { return false; }
                if (this.tiles[18] == null) { return false; }
                if (this.tiles[24] == null) { return false; }
                return true;
            case 1:
                if (this.tiles[1] == null) { return false; }
                if (this.tiles[7] == null) { return false; }
                if (this.tiles[13] == null) { return false; }
                if (this.tiles[19] == null) { return false; }
                if (this.tiles[20] == null) { return false; }
                return true;                
            case 2:
                if (this.tiles[2] == null) { return false; }
                if (this.tiles[8] == null) { return false; }
                if (this.tiles[14] == null) { return false; }
                if (this.tiles[15] == null) { return false; }
                if (this.tiles[21] == null) { return false; }
                return true;                
            case 3:
                if (this.tiles[3] == null) { return false; }
                if (this.tiles[9] == null) { return false; }
                if (this.tiles[10] == null) { return false; }
                if (this.tiles[16] == null) { return false; }
                if (this.tiles[22] == null) { return false; }
                return true;                
            case 4:
                if (this.tiles[4] == null) { return false; }
                if (this.tiles[5] == null) { return false; }
                if (this.tiles[11] == null) { return false; }
                if (this.tiles[17] == null) { return false; }
                if (this.tiles[23] == null) { return false; }
                return true;
            default:
                return false;                
        }
    }
    calculateBonuses() {
        for (let row = 0; row < 5; row++) {
            if (this.rowIsCompleted(row)) {
                this.rowBonuses[row] = 2;
            }
        }
        for (let col = 0; col < 5; col++) {
            if (this.colIsCompleted(col)) {
                this.colBonuses[col] = 7;
            }
        }
        for (let color = 0; color < 5; color++) {
            if (this.colorIsCompleted(color)) {
                this.colorBonuses[color] = 10;
            }
        }
    }
}