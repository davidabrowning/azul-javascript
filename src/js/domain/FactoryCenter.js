class FactoryCenter {
    constructor() {
        this.tiles = [];
    }
    size() {
        return this.tiles.length;
    }
    add(tile) {
        this.tiles.push(tile);
    }
}