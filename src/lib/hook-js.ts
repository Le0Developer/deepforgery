import { log } from "./log";

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
		setPrototypeOf: (target, proto) => {
			log(
				"hook-js",
				`Object.setPrototypeOf called on hooked object ${parent.constructor.name}.${name}`,
			);
			throw new TypeError("Cyclic __proto__ value");
		},
	});
}
