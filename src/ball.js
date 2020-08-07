import {GRAVITY} from './physics-constants';

class Ball {
	constructor (game) {
		this.game = game;

		/*this.sprite = PIXI.Sprite.from('src/ball.png');
		this.sprite.anchor.set(0.5);*/
		this.radius = 12;

		this.velocity = [0, 1];
		this.position = [400, 300];
	}

	update () {
		if (this.game.keys.left) {
			this.velocity[0] -= 0.5;
		}

		if (this.game.keys.right) {
			this.velocity[0] += 0.5;
		}

		this.velocity[0] = Math.min(5, Math.max(this.velocity[0], -5));

		this.position[0] += this.velocity[0];
		this.position[1] += this.velocity[1];

		this.velocity[1] += GRAVITY;

		//this.sprite.position.x = this.position[0];
		//this.sprite.position.y = this.position[1];
	}

	draw (ctx) {
		ctx.beginPath();
		ctx.arc(this.position[0], this.position[1], this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'yellow';
		ctx.fill();
	}
}

export default Ball;
