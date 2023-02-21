export default class View {

    constructor(root, btnSize, matrixSize) {
        this.root = root;
        this.btnSize = btnSize;
        this.matrixSize = matrixSize;

        this.bombImg = new Image();
        this.bombImg.src = "data:image/png;base64,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";

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.matrixSize;
        this.canvas.height = this.matrixSize;
        this.context = this.canvas.getContext("2d");

        this.playfieldBorderWidth = 4;
        this.playfieldX = this.playfieldBorderWidth + 5;
        this.playfieldY = this.playfieldBorderWidth + 5;
        this.playfieldWidth = this.matrixSize;
        this.playfieldHeight = this.matrixSize;

        this.root.appendChild(this.canvas);
    };

    renderMatrix(matrix) {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                this.renderElement(
                    matrix[y][x],
                    this.playfieldX + (x * this.btnSize),
                    this.playfieldY + (y * this.btnSize),
                    this.btnSize
                );

                if (matrix[y][x].show === 1) {
                    this.renderText(
                        matrix[y][x],
                        this.playfieldX + (x * this.btnSize),
                        this.playfieldY + (y * this.btnSize),
                        this.btnSize
                    );
                };
            }
        };

        this.context.strokeStyle = "#D1FB84";
        this.context.lineWidth = this.playfieldBorderWidth;
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    };

    renderElement(element, x, y, btnSize) {
        if (element.show) {
            this.context.fillStyle = "green";
        }
        else {
            this.context.fillStyle = "#D1FB84";
        }

        this.context.strokeStyle = "black";
        this.context.lineWidth = 3;

        this.context.fillRect(x, y, btnSize, btnSize);
        this.context.strokeRect(x, y, btnSize, btnSize);
    };

    renderText(element, x, y, btnSize) {
        this.context.fillStyle = "black";
        this.context.font = '12px "Press Start 2P"';
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";

        if(element.number !== 0 && element.number !== 9) {
            this.context.fillText(element.number, x + btnSize / 2, y + btnSize / 2);
        }
        else if(element.number === 9) {
            this.context.drawImage(this.bombImg, x + 13, y + 10, btnSize - 25, btnSize - 20);
        }
    };

    renderBomb(element, x, y, btnSize) {
        //чтобы в ячейке была бомба при открытии
    };

    renderStartScreen() {
        //Экран приветствия
    };

    renderPauseScreen() {
        //Экран остановки таймера
    };

    renderEndScreen() {
        //Экран game-over'а с возможностью перезапуска, временем и правильно найденными бомбами
    };
};