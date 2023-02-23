export default class Matrix {

    constructor(width, height, bombCount) {
        this.width = width;
        this.height = height;
        this.bombCount = bombCount;

        this.setState();
    };

    generateRandom = (min = 0, max = 100) => {
        let difference = max - min;
    
        let rand = Math.random();
    
        rand = Math.floor(rand * difference);
    
        rand = rand + min;
    
        return rand;
    };

    addBombs(matrix) {
        let currentBombCount = this.bombCount;

        let matrixWidth = matrix[0].length;
        let matrixHeight = matrix.length;

        while (currentBombCount) {
            const x = this.generateRandom(0, matrixWidth - 1);
            const y = this.generateRandom(0, matrixHeight - 1);

            const matrixElem = matrix[y][x];

            if (!matrixElem.number) {
                matrix[y][x] = {number: 9, show: 0, isFlag: 0 };
                currentBombCount -= 1;
            }
        }
    };

    plusOne(y, x, matrix) {
        if (y >= 0 && y <= matrix.length - 1 && x >= 0 && x <= matrix.length - 1) {
            if (matrix[y][x].number !== 9) {
                matrix[y][x].number += 1;
            }
        }
    };

    addNumbers(matrix) {
        for (let y = 0; y < matrix.length ; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x].number === 9) {
                    this.plusOne(y, x - 1, matrix);
                    this.plusOne(y, x + 1, matrix);

                    this.plusOne(y - 1, x, matrix);
                    this.plusOne(y + 1, x, matrix);

                    this.plusOne(y - 1, x - 1, matrix);
                    this.plusOne(y + 1, x + 1, matrix);

                    this.plusOne(y - 1, x + 1, matrix);
                    this.plusOne(y + 1, x - 1, matrix);
                }
            }
        }
    };

    createMatrix() {
        const matrix = [];

        for (let y = 0; y < this.height; y++) {
            matrix[y] = [];

            for (let x = 0; x < this.width; x++) {
                matrix[y][x] = { number: 0, show: 0, isFlag: 0 };
            }
        }

        this.addBombs(matrix);
        this.addNumbers(matrix);

        return matrix;
    };

    openAllBombs(matrix) {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x].number === 9) {
                    matrix[y][x].show = 1;
                };
            }
        };
    };

    showBLock(y, x, matrix) {
        matrix[y][x].show = 1;

        if (matrix[y][x].number !== 0) {
            return;
        }

        this.checkZero(y, x - 1, matrix);
        this.checkZero(y, x + 1, matrix);
        this.checkZero(y - 1, x, matrix);
        this.checkZero(y + 1, x, matrix);
    };

    checkZero(y, x, matrix) {
        if (y >= 0 && y <= matrix.length - 1 && x >= 0 && x <= matrix.length - 1) {
            if (!matrix[y][x].show) {
                this.showBLock(y, x, matrix);
            }
        }
    };

    setState() {
        this.matrix = this.createMatrix();
    };
};