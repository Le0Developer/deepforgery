import { hookFunction } from "../lib/hook-js";

const original = localStorage.setItem;
hookFunction(localStorage, "setItem", function () {
	if (arguments[0] === "_vid_t" || arguments[0] === "_vid_lr") return null;
	// this is so the fingerprinting demo on the page works
	else if (
		location.hostname === "fingerprint.com" &&
		arguments[0].startsWith("AMP_")
	)
		return null;
	return original.apply(this, arguments);
});
