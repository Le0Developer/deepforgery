// this is the best I can do currently
// there is still a way to detect this with the following method:
//   Object.setPrototypeOf(target, Object.create(target));
// not hooked functions throw a TypeError due to cyclic prototype,
// but it works just fine on a hooked function
export function hookFunction(
	parent: { [key: string]: any },
	name: string,
	fn: Function,
) {
	const original = parent[name];
	parent[name] = new Proxy(original, {
		apply(target, thisArg, argArray) {
			return fn.apply(thisArg, argArray);
		},
		get(target, p, receiver) {
			const method = Reflect.get(target, p, receiver);
			if (typeof method === "function") {
				return new Proxy(method, {
					apply(target, thisArg, argArray) {
						return method.apply(original, argArray);
					},
				});
			}
			return method;
		},
	});
}
