export function hookFunction(
	parent: { [key: string]: any },
	name: string,
	fn: Function,
) {
	parent[name] = new Proxy(parent[name], {
		apply(target, thisArg, argArray) {
			return fn.apply(thisArg, argArray);
		},
		get(target, p, receiver) {
			const method = Reflect.get(target, p, receiver);
			if (p === "toString") {
				Object.defineProperty(method, "toString", {
					value: String.prototype.toString.bind(String.toString),
					enumerable: false,
				});
			}
			return method;
		},
	});
}
