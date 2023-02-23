import Matrix from "./src/matrix.js";
import View from "./src/view.js";
import Controller from "./src/controller.js";

const root = document.querySelector("#root");

const matrix = new Matrix(9, 9, 10);
const view = new View(root, 45, 425, 600);
const controller = new Controller(matrix, view);

window.matrix = matrix;
window.view = view;
window.controller = controller;