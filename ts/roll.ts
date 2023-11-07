import GameComponent from "./game.js";

export default class RollComponent extends HTMLElement {
	public static currentZ = 0;
	public z = 0;
	private root: ShadowRoot;
	constructor() {
		super();
		this.root = this.attachShadow({ mode: 'closed' });
		this.createHTML();
		(this.root.querySelector('.base') as HTMLDivElement).addEventListener('click', this.onClick.bind(this));
		(this.root.querySelector('.roll') as HTMLDivElement).addEventListener('click', this.onClick.bind(this));
	}

	private createHTML() {
		this.root.innerHTML = `
			<style>@import url('../css/roll.css');</style>
			<div class="base" style="background-color: ${this.getAttribute('color')}"></div>
			<div class="roll" style="background-color: ${this.getAttribute('color')}"></div>
		`;
	}

	public enable() {
		this.classList.remove('disabled');
	}

	public disable() {
		this.classList.add('disabled');
	}

	private onClick() {
		if (GameComponent.isGameOver) return;
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
		} else {
			this.classList.add('unrolled');
			GameComponent.nextMove = this.classList.contains('column') ? 'row' : 'column';
			this.z = RollComponent.currentZ++;
			this.style.zIndex = `${this.z}`;
			this.dispatchEvent(new Event('rollchange'));
		}
	}

	public gameOver() {
		this.classList.add('gameover');
	}
}