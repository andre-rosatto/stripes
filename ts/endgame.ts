export default class EndGameComponent extends HTMLElement {
	private root: ShadowRoot;
	constructor() {
		super();
		this.root = this.attachShadow({ mode: 'closed' });
		this.createHTML();
	}

	private createHTML() {
		this.root.innerHTML = `
			<style>@import url('../css/endgame.css');</style>
			<p>😃</p>
		`;
	}

	public show() {
		this.classList.add('show');
	}

	public hide() {
		this.classList.remove('show');
	}
}