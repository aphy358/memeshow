export default function at(object, path) {
	const props = path.split(".");
	for (let i = 0; i < props.length; i++) {
		const p = props[i];
		if (object && object.hasOwnProperty(p)) {
			object = object[p];
		} else {
			return undefined;
		}
	}
	return object;
}