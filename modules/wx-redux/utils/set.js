/**
 * 设置目标对象中的属性，如果已存在，则覆盖
 *
 * @param {object} target
 * @param {any} value
 * @param {string} path - 存取路径
 */
export default function set(target, value, path) {
	let i;
	path = path.split('.');
	for (i = 0; i < path.length - 1; i++) {
		const p = path[i]
		if (!target[p]) target[p] = {}
		target = target[p];
	}
	target[path[i]] = value;
}