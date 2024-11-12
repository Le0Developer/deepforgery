import { log } from "./log";

// TODO: fix the error stack to remove our code from it
// Object.setPrototypeOf(hooked, Object.create(hooked)) will throw an error
// which includes our code in the stack trace

export function hookFunction(
	parent: { [key: string]: any },
	name: string,
	fn: Function,
) {
	const original = parent[name];
	const methodCache = new Map();
	const proxy = new Proxy(original, {
		apply(target, thisArg, argArray) {
			return fn.apply(thisArg, argArray);
		},
		get(target, p, receiver) {
			const method = Reflect.get(target, p, receiver);
			if (typeof method === "function") {
				if (methodCache.has(p)) {
					return methodCache.get(p);
				}
				let methodProxy = new Proxy(method, {
					apply(target, thisArg, argArray) {
						// fixes Object.create(hooked).toString() error to include the correct prototype
						// so the error message is correct
						let proto = original;
						if (thisArg !== proxy) {
							const thisProto = Object.getPrototypeOf(thisArg);
							// fixes Object.create(new Proxy(hooked, {})).toString() error
							// without proxy, the error should be thrown by Function.toString
							// with proxy, the error should be thrown by Object.toString
							proto = thisProto === proxy ? Object.create(original) : {};
							log(
								"hook-js",
								`Object.create(${parent.constructor.name}.${name}).${String(
									p,
								)} called`,
							);
						}
						return method.apply(proto, argArray);
					},
				});
				methodCache.set(p, methodProxy);
				return methodProxy;
			}
			return method;
		},
		setPrototypeOf: (target, proto) => {
			log(
				"hook-js",
				`Object.setPrototypeOf called on hooked object ${parent.constructor.name}.${name}`,
			);
			// fixes Object.setPrototypeOf(hooked, Object.create(hooked)) error
			if (Object.getPrototypeOf(proto) === proxy) {
				log("hook-js", "Cyclic __proto__ value detection attempted");
				throw new TypeError("Cyclic __proto__ value");
			}
			// this is used for detection, so lets log it
			if (proto === null) {
				log("hook-js", "null __proto__ value detection attempted");
			}
			return Reflect.setPrototypeOf(original, proto);
		},
	});
	parent[name] = proxy;
}

export function hookProperty(
	parent: { [key: string]: any },
	name: string,
	descriptor: PropertyDescriptor,
) {
	const originalDescriptor = Object.getOwnPropertyDescriptor(parent, name);
	const originalGet = originalDescriptor.get;

	hookFunction(originalDescriptor, "get", function () {
		return originalGet?.call(this), descriptor.get?.call(this);
	});

	Object.defineProperty(parent, name, originalDescriptor);
}
