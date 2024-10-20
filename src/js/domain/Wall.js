class Wall {
    constructor() {
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
    targetTileValueByIndex(targetIndex) {
        return this.targets[targetIndex];
    }
    targetTileValueByRowCol(row, col) {
        let targetIndex = row * 5 + col;
        return this.targetTileValueByIndex(targetIndex);
    }

}