class Wall {
    constructor() {
        this.rowSize = 5;
        this.colSize = 5;
        this.tiles = [  -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1 ];
        this.targets = [0, 1, 2, 3, 4,
                        4, 0, 1, 2, 3,
                        3, 4, 0, 1, 2,
                        2, 3, 4, 0, 1,
                        1, 2, 3, 4, 0 ];
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
            if (this.placedTileValueByRowCol(row, i) == -1) {
                break;
            }
            adjacentTileCounter++;
        }
        return adjacentTileCounter;
    }
    adjacentTilesRight(row, col) {
        let adjacentTileCounter = 0;
        for (let i = col + 1; i < this.rowSize; i++) {
            if (this.placedTileValueByRowCol(row, i) == -1) {
                break;
            }
            adjacentTileCounter++;
        }
        return adjacentTileCounter;
    }
    adjacentTilesAbove(row, col) {
        let adjacentTileCounter = 0;
        for (let i = row - 1; i >= 0; i--) {
            if (this.placedTileValueByRowCol(i, col) == -1) {
                break;
            }
            adjacentTileCounter++;
        }
        return adjacentTileCounter;
    }
    adjacentTilesBelow(row, col) {
        let adjacentTileCounter = 0;
        for (let i = row + 1; i < this.colSize; i++) {
            if (this.placedTileValueByRowCol(i, col) == -1) {
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
}