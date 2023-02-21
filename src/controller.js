export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;

        this.intervalId = null;
        
        this.view.canvas.addEventListener("click", this.handlerClick.bind(this));

        this.view.renderMatrix(this.game.matrix);
    };

    handlerClick(e) {
        const rect = this.view.canvas.getBoundingClientRect();
        const y = Math.floor((e.clientY - rect.top) / this.view.btnSize);
        const x = Math.floor((e.clientX - rect.left) / this.view.btnSize);

        if (this.game.matrix[y][x].number === 9) {
            this.game.openAllBombs(this.game.matrix);
            console.log("lose");
        };

        this.showBLock(y, x);
    };

    showBLock(y, x) {
        this.game.matrix[y][x].show = 1;

        if (this.game.matrix[y][x].number !== 0) {
            this.view.renderMatrix(this.game.matrix);
            return;
        }

        this.checkZero(y, x - 1);
        this.checkZero(y, x + 1);
        this.checkZero(y - 1, x);
        this.checkZero(y + 1, x);
    };

    checkZero(y, x) {
        if (y >= 0 && y <= this.game.matrix.length - 1 && x >= 0 && x <= this.game.matrix.length - 1) {
            if (!this.game.matrix[y][x].show) {
                this.showBLock(y, x);
                this.view.renderMatrix(this.game.matrix);
            }
        }
    };
};