class FactoryDisplay extends AbstractTileContainer {
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
}