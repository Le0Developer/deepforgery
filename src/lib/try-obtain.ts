export function tryObtain<T>(a: () => T, cb: (x: T) => void) {
	let x;
	try {
		x = a();
	} catch (e) {
		return;
	}
	return cb(x);
}
