class TileBag extends AbstractTileContainer {
    constructor() {
        super();
        this.tiles = this.generateNewTiles();
    }
    generateNewTiles() {
        let generatedTiles = [];
        for (let i = 0; i < 20; i++) {
            generatedTiles.push(new Tile(0));
            generatedTiles.push(new Tile(1));
            generatedTiles.push(new Tile(2));
            generatedTiles.push(new Tile(3));
            generatedTiles.push(new Tile(4));
        }
        return generatedTiles;
    }
    drawTile() {
        let indexToDraw = Math.floor(Math.random() * this.size());
        let tile = this.tiles[indexToDraw];
        this.tiles.splice(indexToDraw, 1);
        return tile;
    }
}