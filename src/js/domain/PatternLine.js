class PatternLine extends AbstractTileContainer {
    place(tileArray, row) {
        switch(row) {
            case 0:
                this.tiles[0] = tileArray[0];
            case 2:
                this.tiles[3] = tileArray[0];
                break;
            default:
                break;
        }
        return [];
    }
}