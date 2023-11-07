export default class HelpComponent extends HTMLElement {
	private root: ShadowRoot;
	constructor() {
		super();
		this.root = this.attachShadow({ mode: 'closed' });
		this.createHTML();
	}

	private createHTML() {
		this.root.innerHTML = `
			<style>@import url('../css/help.css');</style>
			<div id="frame">
				<h2>Como jogar</h2>
				<p>O objetivo do jogo é reproduzir a figura mostrada no "<strong>OBJETIVO</strong>".</p>
				<p>As regras são simples:</p>
				<ul>
					<li>Clique nas faixas para esticar ou encolher.</li>
					<li>As linhas e colunas devem sempre se alternar.</li>
					<li>Apenas a faixa que estiver no topo pode ser encolhida.</li>
				</ul>
				<button>Ok</button>
			</div>
		`;
		this.root.querySelector('button')!.addEventListener('click', this.onOkClick.bind(this));
	}

	public show() {
		this.classList.add('show');
	}

	private onOkClick() {
		this.classList.remove('show');
	}
}