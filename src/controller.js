export default class Controller {

    constructor(matrix, view) {
        this.matrix = matrix;
        this.view = view;

        this.isPlaying = false;
        this.isGameOver = false;

        this.timerId = null;
        this.timerValue = 0;

        this.guessBombCount = 0;

        this.view.canvas.addEventListener("click", this.handlerLeftClick.bind(this));
        this.view.canvas.addEventListener("contextmenu", this.handlerRightClick.bind(this));
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

            if (this.matrix.matrix[y][x].isFlag !== 1) {
                if (this.matrix.matrix[y][x].number === 9) {
                    this.gameOver();
                }
                else {
                    this.matrix.showBLock(y, x);
                    this.view.renderMatrix(this.matrix);
                }
            };
        };
    };

    handlerRightClick(e) {
        e.preventDefault();

        if (this.isPlaying) {
            const { y, x } = this.mouseCoordinates(e);

            this.matrix.setFlag(y, x);

            const { bombCount } = this.matrix.getState();
            
            this.guessBombCount = this.matrix.isAllBombsGuessed();

            if (bombCount === this.guessBombCount) {
                this.youAreWin();
            }
            else {
                this.view.renderMatrix(this.matrix);
                console.log(this.guessBombCount);
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

        this.matrix.openAllBombs();
        this.view.renderMatrix(this.matrix);

        this.view.renderGameOverScreen(this.timerValue, this.guessBombCount);
    };

    youAreWin() {
        this.isPlaying = false;
        this.isGameOver = true;

        this.stopTimer();

        this.view.renderMatrix(this.matrix);

        this.view.renderWinScreen(this.timerValue, this.guessBombCount);
    };

    reset() {
        this.isPlaying = false;
        this.isGameOver = false;

        this.timerId = null;
        this.timerValue = 0;

        this.guessBombCount = 0;

        this.view.clearAllCanvas();

        this.matrix.reset();

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