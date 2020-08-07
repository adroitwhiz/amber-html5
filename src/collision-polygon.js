import {normalize, isClockwise, circleLineCollides, pnpoly} from './math';

class CollisionPolygon {
	constructor (points) {
		this.points = points;

		this.testPolygons = null;
	}

	draw (ctx) {
		ctx.beginPath();
		ctx.moveTo(this.points[0][0], this.points[0][1]);

		for (let i = 0; i < this.points.length; i++) {
			let point = this.points[i];
			ctx.lineTo(point[0], point[1]);
		}
		ctx.closePath();
		ctx.fillStyle = '#888';
		ctx.fill();

		// debug code: see the wall's collision polygons
		let hue = 0;
		for (const p of this.testPolygons) {
			ctx.fillStyle = `hsla(${hue}deg, 100%, 50%, 0.25)`;
			ctx.beginPath();
			ctx.moveTo(p[0][0], p[0][1]);
			ctx.lineTo(p[1][0], p[1][1]);
			ctx.lineTo(p[2][0], p[2][1]);
			ctx.lineTo(p[3][0], p[3][1]);
			ctx.closePath();
			ctx.fill();
			hue += 25;
		}
	}

	init (radius, ctx) {
		this.testPolygons = [];

		const testPolyPoints = [];

		for (let i = 0; i < this.points.length; i++) {
			const centerPoint = this.points[i];
			const leftPoint = (i === 0) ? this.points[this.points.length - 1] : this.points[i - 1];
			const rightPoint = this.points[(i + 1) % this.points.length];

			const leftTangent = normalize([
				centerPoint[0] - leftPoint[0],
				centerPoint[1] - leftPoint[1]
			]);

			const rightTangent = normalize([
				centerPoint[0] - rightPoint[0],
				centerPoint[1] - rightPoint[1]
			]);

			const vertexNormal = normalize([
				leftTangent[0] + rightTangent[0],
				leftTangent[1] + rightTangent[1]
			]);
			// TODO: calculate this correctly
			vertexNormal[0] *= radius * 100;
			vertexNormal[1] *= radius * 100;

			if (!isClockwise(leftPoint, centerPoint, rightPoint)) {
				vertexNormal[0] *= -1;
				vertexNormal[1] *= -1;
			}

			if (ctx) {
				ctx.save();
				ctx.translate(centerPoint[0], centerPoint[1]);
				ctx.beginPath();
				/*ctx.moveTo(leftTangent[0] * 8, leftTangent[1] * 8);
				ctx.lineTo(0, 0);
				ctx.lineTo(rightTangent[0] * 8, rightTangent[1] * 8);*/
				ctx.moveTo(0, 0);
				ctx.lineTo(vertexNormal[0], vertexNormal[1]);
				ctx.strokeStyle = 'black';
				ctx.stroke();
				ctx.restore();
			}

			vertexNormal[0] += centerPoint[0];
			vertexNormal[1] += centerPoint[1];
			testPolyPoints.push(vertexNormal);
		}

		for (let i = 0; i < testPolyPoints.length; i++) {
			const j = (i + 1) % testPolyPoints.length;

			this.testPolygons.push([
				this.points[i],
				testPolyPoints[i],
				testPolyPoints[j],
				this.points[j]
			]);
		}
	}

	test (cx, cy, radius) {
		for (let i = 0; i < this.points.length; i++) {
			const pointL = this.points[i];
			const pointR = this.points[(i + 1) % this.points.length];

			const collides = circleLineCollides(cx, cy, radius, pointL[0], pointL[1], pointR[0], pointR[1]);
			if (collides && pnpoly(cx, cy, this.testPolygons[i])) {
				return [pointL, pointR];
			}
		}
		return null;
	}
}

export default CollisionPolygon;
