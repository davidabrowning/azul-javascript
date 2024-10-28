class ClickRouter {
    constructor(controller, game) {
        this.controller = controller;
        this.game = game;
    }

    handleFactoryDisplayTileClick(factoryDisplayId, tileNum) {
        // Exit criteria
        if (this.game.factoryDisplays[factoryDisplayId].size() == 0) {
            return;
        }

        this.controller.updateSelectedTilesToFactoryDisplay(factoryDisplayId, tileNum);
    }
    

}