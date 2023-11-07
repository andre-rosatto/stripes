import EndGameComponent from "./endgame.js";
import GameComponent from "./game.js";
import HelpComponent from "./help.js";
import RollComponent from "./roll.js";
import SolutionComponent from "./solution.js";

window.customElements.define('help-component', HelpComponent);
window.customElements.define('endgame-component', EndGameComponent);
window.customElements.define('solution-component', SolutionComponent);
window.customElements.define('roll-component', RollComponent);
window.customElements.define('game-component', GameComponent);