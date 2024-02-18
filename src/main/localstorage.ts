import { hookFunction } from "../lib/hook-js";
import { tryObtain } from "../lib/try-obtain";

// localStorage is unavailable in some iframes (eg data: URLs)
tryObtain(
	() => localStorage,
	(local) => {
		const original = local.setItem;
		hookFunction(local, "setItem", function () {
			if (arguments[0] === "_vid_t" || arguments[0] === "_vid_lr") return null;
			// this is so the fingerprinting demo on the page works
			else if (
				location.hostname === "fingerprint.com" &&
				arguments[0].startsWith("AMP_")
			)
				return null;
			return original.apply(this, arguments);
		});
	},
);
