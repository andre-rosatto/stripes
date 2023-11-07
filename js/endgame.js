export default class EndGameComponent extends HTMLElement {
    root;
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.createHTML();
    }
    createHTML() {
        this.root.innerHTML = `
			<style>@import url('../css/endgame.css');</style>
			<p>😃</p>
		`;
    }
    show() {
        this.classList.add('show');
    }
    hide() {
        this.classList.remove('show');
    }
}
