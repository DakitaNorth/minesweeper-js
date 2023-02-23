export default class Controller {

    constructor(matrix, view) {
        this.matrix = matrix;
        this.view = view;

        this.isPlaying = false;
        this.isGameOver = false;

        this.timerId = null;
        this.timerValue = 0;

        this.guessBombCount = 5;

        this.view.canvas.addEventListener("click", this.handlerLeftClick.bind(this));
        document.addEventListener("keydown", this.handleKeydown.bind(this));

        this.view.renderStartScreen();
    };

    mouseCoordinates(e) {
        const rect = this.view.canvas.getBoundingClientRect();
        const y = Math.floor((e.clientY - rect.top) / this.view.btnSize);
        const x = Math.floor((e.clientX - rect.left) / this.view.btnSize);

        return {
            y, x
        };
    };

    handlerLeftClick(e) {
        if (this.isPlaying) {
            const { y, x } = this.mouseCoordinates(e);

            if (this.matrix.matrix[y][x].number === 9) {
                this.matrix.openAllBombs(this.matrix.matrix);

                this.gameOver();
            }
            else {
                this.matrix.showBLock(y, x, this.matrix.matrix);
                this.view.renderMatrix(this.matrix);
            }
        };
    };

    play() {
        this.isPlaying = true;

        this.startTimer();

        this.view.renderMatrix(this.matrix);
        this.view.renderPanel(this.timerValue);
    };

    pause() {
        this.isPlaying = false;

        this.stopTimer();

        this.view.renderPauseScreen();
    };

    gameOver() {
        this.isPlaying = false;
        this.isGameOver = true;

        this.stopTimer();

        this.view.renderEndScreen(this.timerValue, this.guessBombCount);
    };

    reset() {
        this.isPlaying = false;
        this.isGameOver = false;

        this.timerId = null;
        this.timerValue = 0;

        this.guessBombCount = 5;

        this.view.clearAllCanvas();

        this.matrix.createMatrix();

        this.view.renderStartScreen();
    };

    resetTimer() {
        this.view.clearPanel();
        this.view.renderPanel(this.timerValue);
    };

    startTimer() {
        const speed = 1000;

        if (!this.timerId) {
            this.timerId = setInterval(() => {
                this.timerValue += 1;
                this.resetTimer();
            }, speed);
        }
    };

    stopTimer() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    };

    handleKeydown(e) {
        switch (e.key) {
            case "Enter":
                if (this.isGameOver) {
                    this.reset();
                }
                else if (this.isPlaying) {
                    this.pause();
                }
                else {
                    this.play()
                }
                break;
        }
    };
};