import Game from "./src/game.js";
import View from "./src/view.js";
import Controller from "./src/controller.js";

const root = document.querySelector("#root");

const game = new Game(9, 9, 10);
const view = new View(root, 45, 425);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;