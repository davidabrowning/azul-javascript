class Controller {
    constructor(userInterface) {
        this.userInterface = userInterface;
    }
    startSession() {
        this.userInterface.setController(this);
    }
}