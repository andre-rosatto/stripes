import GameComponent from "./game.js";
export default class RollComponent extends HTMLElement {
    static currentZ = 0;
    z = 0;
    root;
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.createHTML();
        this.root.querySelector('.base').addEventListener('click', this.onClick.bind(this));
        this.root.querySelector('.roll').addEventListener('click', this.onClick.bind(this));
    }
    createHTML() {
        this.root.innerHTML = `
			<style>@import url('../css/roll.css');</style>
			<div class="base" style="background-color: ${this.getAttribute('color')}"></div>
			<div class="roll" style="background-color: ${this.getAttribute('color')}"></div>
		`;
    }
    enable() {
        this.classList.remove('disabled');
    }
    disable() {
        this.classList.add('disabled');
    }
    onClick() {
        if (GameComponent.isGameOver)
            return;
        if (this.classList.contains('unrolled')) {
            if (this.z === RollComponent.currentZ - 1) {
                this.classList.remove('unrolled');
                RollComponent.currentZ--;
                GameComponent.nextMove = this.classList.contains('column') ? 'column' : 'row';
                if (RollComponent.currentZ === 0) {
                    GameComponent.nextMove = null;
                }
                this.z = 0;
                this.dispatchEvent(new Event('rollchange'));
            }
        }
        else {
            this.classList.add('unrolled');
            GameComponent.nextMove = this.classList.contains('column') ? 'row' : 'column';
            this.z = RollComponent.currentZ++;
            this.style.zIndex = `${this.z}`;
            this.dispatchEvent(new Event('rollchange'));
        }
    }
    gameOver() {
        this.classList.add('gameover');
    }
}
