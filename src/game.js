import Ball from './ball';
import Wall from './wall';

class Game {
	constructor (canvas) {
		/*this.app = new PIXI.Application({
			width: 800,
			height: 600,
			view: canvas
		});*/
		this.canvas = canvas;
		this.canvas.width = 800;
		this.canvas.height = 600;

		const ball = new Ball(this);
		this.ball = ball;

		const wall = new Wall(this, -350, 500, 1000, 25);

		this.walls = [wall];

		this.keys = {
			up: false,
			down: false,
			left: false,
			right: false
		};

		window.setInterval(() => {
			ball.update();
			wall.update();

			this.render();
		}, 1000/60);

		canvas.addEventListener('keydown', event => {
			if (event.key.startsWith('Arrow')) this.keys[event.key.slice(5).toLowerCase()] = true;
		});
		document.addEventListener('keyup', event => {
			if (event.key.startsWith('Arrow')) this.keys[event.key.slice(5).toLowerCase()] = false;
		});
		canvas.tabIndex = 0;
	}

	render () {
		const ctx = this.canvas.getContext('2d');

		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.save();
		this.ball.draw(ctx);
		for (const wall of this.walls) {
			wall.draw(ctx);
			//wall.polygon.init(this.ball.radius, ctx);
		}
		ctx.restore();
	}
}

export default Game;
