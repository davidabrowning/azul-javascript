class Tile {
    constructor(value) {
        this.value = value;
    }
    equals(otherTile) {
        return this.value == otherTile.value;
    }
}