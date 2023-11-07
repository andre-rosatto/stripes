import GameComponent from "./game.js";
export default class SolutionComponent extends HTMLElement {
    root;
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.createHTML();
    }
    createHTML() {
        this.root.innerHTML = `
			<style>@import url('../css/solution.css');</style>
		`;
    }
    update() {
        this.createHTML();
        const height = 90 / GameComponent.size;
        const width = 90 / GameComponent.size;
        for (let i = 0; i < GameComponent.size; i++) {
            this.root.innerHTML += `
				<div class="roll column" style="right: ${i * width}%; width: ${width - 3}%; background-color: ${GameComponent.colors[i]};"></div>
				<div class="roll row" style="bottom: ${i * height}%; height: ${height - 3}%; background-color: ${GameComponent.colors[GameComponent.size + i]};"></div>
			`;
        }
        this.root.querySelectorAll('.roll.column').forEach((roll, idx) => {
            roll.style.zIndex = `${GameComponent.solution[idx]}`;
        });
        this.root.querySelectorAll('.roll.row').forEach((roll, idx) => {
            roll.style.zIndex = `${GameComponent.solution[GameComponent.size + idx]}`;
        });
    }
}
