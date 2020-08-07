import {dot, normalize} from './math';
import CollisionPolygon from './collision-polygon';
import {DAMPING} from './physics-constants';

class Wall {
	constructor (game, x, y, width, height) {
		this.game = game;
		this.position = [x, y];
		this.size = [width, height];

		this.polygon = new CollisionPolygon([
			[this.position[0], this.position[1]],
			[this.position[0] + this.size[0], this.position[1]],
			[this.position[0] + this.size[0], this.position[1] + this.size[1]],
			[this.position[0], this.position[1] + this.size[1]]
		]);

		this.polygon.init(this.game.ball.radius);

		//this.sprite = PIXI.Sprite.from('src/wall.png');
	}

	update () {
		const ball = this.game.ball;

		const polytest = this.polygon.test(ball.position[0], ball.position[1], ball.radius);
		if (polytest !== null) {
			const normal = normalize([polytest[1][1] - polytest[0][1], polytest[0][0] - polytest[1][0]]);
			const d = dot(ball.velocity[0], ball.velocity[1], normal[0], normal[1]);
			ball.velocity[0] = (ball.velocity[0] - (2 * d * normal[0])) * DAMPING;
			ball.velocity[1] = (ball.velocity[1] - (2 * d * normal[1])) * DAMPING;
			ball.update();
		}
	}

	draw (ctx) {
		this.polygon.draw(ctx);
	}
}

export default Wall;
