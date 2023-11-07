import EndGameComponent from "./endgame.js";
import HelpComponent from "./help.js";
import RollComponent from "./roll.js";
import SolutionComponent from "./solution.js";

export default class GameComponent extends HTMLElement {
	private root: ShadowRoot;
	public static colors = ['#f44', '#8f8', '#88f', '#ff4', '#8ff', '#f8f', '#ff9', '#f2f', '#aaa', '#f88', '#fff', '#f90'];
	private static MIN_SIZE = 3;
	private static MAX_SIZE = Math.floor(GameComponent.colors.length / 2);
	public static size: number;
	public static solution: Array<number>;
	public static isGameOver = false;
	public static nextMove: null | 'row' | 'column' = null;
	constructor() {
		super();
		this.root = this.attachShadow({ mode: 'closed' });
		this.setSize();
		this.createHTML();
		this.startGame();
	}

	private createHTML() {
		this.root.innerHTML = `
			<style>@import url('../css/game.css');</style>
			<div id="config">
				<div id="solution-wrapper">
					<p>Objetivo</p>
					<solution-component></solution-component>
				</div>
				<div id="config-form">
					<label>
						Tamanho:
						<input type='number' value=${GameComponent.size} min="${GameComponent.MIN_SIZE}" max="${GameComponent.MAX_SIZE}" step="1">
					</label>
					<button id="new-game">Novo jogo</button>
					<button id="help">Instruções</button>
				</div>
			</div>
			<div id="rolls-container">
			</div>
			<endgame-component></endgame-component>
			<help-component></help-component>
		`;
		this.createRolls();
		(this.root.querySelector('#new-game') as HTMLButtonElement).addEventListener('click', this.onGenerateGameClick.bind(this));
		(this.root.querySelector('#help') as HTMLButtonElement).addEventListener('click', this.onHelpClick.bind(this));
	}

	private setSize() {
		GameComponent.size = Math.max(Math.min(parseInt(this.getAttribute('size') || `${GameComponent.MIN_SIZE}`), GameComponent.MAX_SIZE), GameComponent.MIN_SIZE);
	}

	private startGame() {
		(this.root.querySelector('endgame-component') as EndGameComponent).hide();
		this.setSize();
		GameComponent.nextMove = null;
		this.createRolls();
		this.makeSolution();
		(this.root.querySelector('solution-component') as SolutionComponent).update();
		GameComponent.isGameOver = false;
		RollComponent.currentZ = 0;

	}

	private makeSolution() {
		const isRow = Math.random() < 0.5;
		GameComponent.solution = Array(GameComponent.size * 2).fill(-1);
		const rows = Array(GameComponent.size).fill(0).map((_, idx) => idx);
		const cols = Array(GameComponent.size).fill(0).map((_, idx) => GameComponent.size + idx);
		for (let i = 0; i < GameComponent.size * 2; i += 2) {
			const rowIdx = rows.splice(Math.floor(Math.random() * rows.length), 1)[0];
			const colIdx = cols.splice(Math.floor(Math.random() * cols.length), 1)[0];
			GameComponent.solution[rowIdx] = isRow ? i : i + 1;
			GameComponent.solution[colIdx] = isRow ? i + 1 : i;
		}
	}

	private createRolls() {
		const container = this.root.querySelector('#rolls-container') as HTMLDivElement;
		container.innerHTML = '';
		const width = 90 / GameComponent.size;
		const height = 90 / GameComponent.size;
		for (let i = 0; i < GameComponent.size; i++) {
			container.innerHTML += `
				<roll-component color="${GameComponent.colors[i]}" id="roll-${i}" class="column" style="right: ${i * width}%; width: ${width - 3}%;"></roll-component>
				<roll-component color="${GameComponent.colors[GameComponent.size + i]}" id="roll-${GameComponent.size + i}" class="row" style="bottom: ${i * height}%; height: ${height - 3}%;"></roll-component>
			`;
		}
		this.root.querySelectorAll('roll-component').forEach(roll => {
			(roll as RollComponent).addEventListener('rollchange', this.onRollChange.bind(this));
		});
	}

	private onGenerateGameClick() {
		this.setAttribute('size', (this.root.querySelector('#config-form input') as HTMLInputElement).value);
		this.startGame();
	}

	private onHelpClick() {
		(this.root.querySelector('help-component') as HelpComponent).show();
	}

	private onRollChange() {
		this.updateEnabledRolls();
		for (const i in GameComponent.solution) {
			const roll = this.root.querySelector(`#roll-${i}`) as RollComponent;
			if (!roll.classList.contains('unrolled')) return;
			if (roll.z !== GameComponent.solution[i]) return;
		}
		this.endGame();
	}

	private updateEnabledRolls() {
		for (const r of this.root.querySelectorAll('roll-component')) {
			const roll = r as RollComponent;
			roll.disable();
			if (GameComponent.isGameOver) {
				roll.gameOver();
				continue;
			}
			if (!GameComponent.nextMove) {
				roll.enable();
				continue;
			}
			if (roll.classList.contains(GameComponent.nextMove) && !roll.classList.contains('unrolled')) {
				roll.enable();
				continue;
			}
			if (!roll.classList.contains(GameComponent.nextMove) && roll.classList.contains('unrolled') && roll.z === RollComponent.currentZ - 1) {
				roll.enable();
			}
		};
	}

	private endGame() {
		GameComponent.isGameOver = true;
		this.updateEnabledRolls();
		(this.root.querySelector('endgame-component') as EndGameComponent).show();
	}
}