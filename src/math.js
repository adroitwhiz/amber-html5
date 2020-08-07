const dot = (x1, y1, x2, y2) => {
	return (x1 * x2) + (y1 * y2);
};

const pnpoly = (px, py, verts) => {
	let c = false;
	for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
		if (
			(verts[i][1] > py) !== (verts[j][1] > py) &&
			(px < (verts[j][0] - verts[i][0]) * (py - verts[i][1]) / (verts[j][1] - verts[i][1]) + verts[i][0])
		) {
			c = !c;
		}
	}

	return c;
};

const magnitude = vec => {
	return Math.sqrt((vec[0] * vec[0]) + (vec[1] * vec[1]));
};

const isClockwise = (vec1, vec2, vec3) => {
	return ((vec1[1] - vec2[1]) * (vec3[0] - vec2[0])) - ((vec2[0] - vec1[0]) * (vec2[1] - vec3[1])) > 0;
};

const circleLineCollides = (cx, cy, radius, x1, y1, x2, y2) => {
	const paX = cx - x1;
	const paY = cy - y1;
	const baX = x2 - x1;
	const baY = y2 - y1;

	const h = Math.max(0.0, Math.min(dot(paX, paY, baX, baY) / dot(baX, baY, baX, baY), 1.0));
	return Math.hypot(paX - (baX * h), paY - (baY * h)) < radius;
};

const normalize = vec => {
	const length = magnitude(vec);
	return [vec[0] / length, vec[1] / length];
};

export {dot, circleLineCollides, magnitude, isClockwise, pnpoly, normalize};
