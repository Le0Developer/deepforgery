import { hookFunction } from "../lib/hook-js";
import { log } from "../lib/log";

const original = Intl.DateTimeFormat.prototype.resolvedOptions;
hookFunction(Intl.DateTimeFormat.prototype, "resolvedOptions", function () {
	log("timezone fingerprint", "Intl.DateTimeFormat.prototype.resolvedOptions");
	const result = original.apply(this, arguments);
	result.timeZone = "UTC";
	return result;
});
