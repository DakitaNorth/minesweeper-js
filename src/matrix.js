export default class Matrix {

    constructor(width, height, bombCount) {
        this.width = width;
        this.height = height;
        this.bombCount = bombCount;

        this.reset();
    };

    generateRandom = (min = 0, max = 100) => {
        let difference = max - min;
    
        let rand = Math.random();
    
        rand = Math.floor(rand * difference);
    
        rand = rand + min;
    
        return rand;
    };

    addBombs() {
        let currentBombCount = this.bombCount;

        let matrixWidth = this.matrix[0].length;
        let matrixHeight = this.matrix.length;

        while (currentBombCount) {
            const x = this.generateRandom(0, matrixWidth - 1);
            const y = this.generateRandom(0, matrixHeight - 1);

            const matrixElem = this.matrix[y][x];

            if (!matrixElem.number) {
                this.matrix[y][x] = {number: 9, show: 0, isFlag: 0 };
                currentBombCount -= 1;
            }
        }
    };

    plusOne(y, x) {
        if (y >= 0 && y <= this.matrix.length - 1 && x >= 0 && x <= this.matrix.length - 1) {
            if (this.matrix[y][x].number !== 9) {
                this.matrix[y][x].number += 1;
            }
        }
    };

    addNumbers() {
        for (let y = 0; y < this.matrix.length ; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                if (this.matrix[y][x].number === 9) {
                    this.plusOne(y, x - 1);
                    this.plusOne(y, x + 1);

                    this.plusOne(y - 1, x);
                    this.plusOne(y + 1, x);

                    this.plusOne(y - 1, x - 1);
                    this.plusOne(y + 1, x + 1);

                    this.plusOne(y - 1, x + 1);
                    this.plusOne(y + 1, x - 1);
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

        return matrix;
    };

    openAllBombs() {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                if (this.matrix[y][x].number === 9 && this.matrix[y][x].isFlag !== 1) {
                    this.matrix[y][x].show = 1;
                };
            }
        };
    };

    showBLock(y, x) {
        this.matrix[y][x].show = 1;

        if (this.matrix[y][x].number !== 0) {
            return;
        }

        this.checkZero(y, x - 1);
        this.checkZero(y, x + 1);
        this.checkZero(y - 1, x);
        this.checkZero(y + 1, x);
    };

    checkZero(y, x) {
        if (y >= 0 && y <= this.matrix.length - 1 && x >= 0 && x <= this.matrix.length - 1) {
            if (!this.matrix[y][x].show && !this.matrix[y][x].isFlag) {
                this.showBLock(y, x);
            }
        }
    };

    setFlag(y, x) {
        if (!this.matrix[y][x].isFlag && !this.matrix[y][x].show) {
            this.matrix[y][x].isFlag = 1;
        }
        else {
            this.matrix[y][x].isFlag = 0;
        }
    };

    isAllBombsGuessed() {
        let bombsCount = 0;

        for (let y = 0; y < this.matrix.length ; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                if (this.matrix[y][x].isFlag === 1 && this.matrix[y][x].number === 9) {
                    bombsCount += 1;
                }
            }
        };

        return bombsCount;
    };

    reset() {
        this.matrix = this.createMatrix();
        this.addBombs();
        this.addNumbers();
        
        this.guessBombCount = this.isAllBombsGuessed();

        console.log(this.matrix);
    };

    getState() {
        return {
            matrix: this.createMatrix(),
            bombCount: this.bombCount,
        }
    };
};