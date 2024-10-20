class Player {
    constructor(id) {
        this.id = id;
        this.patternLine = new PatternLine();
        this.wall = new Wall();
        this.floorLine = new FloorLine();
        this.score = 0;
    }
    addPoints(newPoints) {
        this.score += newPoints;
    }
}