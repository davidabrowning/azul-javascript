class UserInterface {
    constructor() {
        this.controller = null;
    }
    setController(controller) {
        this.controller = controller;
    }
    createFactoryDisplay(factoryDisplay) {
        let div = document.createElement("div");
        div.setAttribute("id", "factory-display-" + factoryDisplay.id);
        div.classList.add("factory-display");
        document.querySelector("#factory-displays").appendChild(div);

        factoryDisplay.tiles.forEach(tile => {
            let tileDiv = document.createElement("div");
            tileDiv.classList.add("tile", "tile-style-" + tile.value);
            div.appendChild(tileDiv);
        });
    }
}