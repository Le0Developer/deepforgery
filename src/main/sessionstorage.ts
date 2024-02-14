import { hookFunction } from "../lib/hook-js";

const original = sessionStorage.setItem;
hookFunction(sessionStorage, "setItem", function () {
	if (arguments[0].startsWith("@fpjs@")) return null;
	return original.apply(this, arguments);
});
