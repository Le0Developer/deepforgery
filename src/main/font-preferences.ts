import { hookFunction } from "../lib/hook-js";

const original = HTMLElement.prototype.getBoundingClientRect;
hookFunction(HTMLElement.prototype, "getBoundingClientRect", function () {
	const result = original.apply(this, arguments);

	if (isFontPreferencesSpan(this)) {
		result.width += Math.random();
	}
	return result;
});

function isFontPreferencesSpan(span: HTMLSpanElement) {
	return (
		span.style.whiteSpace === "nowrap" &&
		span.textContent === "mmMwWLliI0fiflO&1"
	);
}
