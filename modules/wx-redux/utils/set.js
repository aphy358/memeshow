export default function set(obj, value, path) {
	let i;
	path = path.split('.');
	for (i = 0; i < path.length - 1; i++) {
		const p = path[i]
		if (!obj[p]) obj[p] = {}
		obj = obj[p];
	}
	obj[path[i]] = value;
}