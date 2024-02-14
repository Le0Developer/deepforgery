import { hookFunction } from "../lib/hook-js";

const original = Intl.DateTimeFormat.prototype.resolvedOptions;
hookFunction(Intl.DateTimeFormat.prototype, "resolvedOptions", function () {
	const result = original.apply(this, arguments);
	result.timeZone = "UTC";
	return result;
});
