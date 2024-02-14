let sheet: CSSStyleSheet | null = null,
	pendingRules: Array<string> = [];

export function injectCSSRule(rule: string) {
	if (sheet) {
		sheet.insertRule(rule);
	} else {
		pendingRules.push(rule);
	}
}

window.addEventListener("load", () => {
	const style = document.createElement("style");
	document.head.appendChild(style);
	sheet = style.sheet;

	for (const rule of pendingRules) {
		sheet.insertRule(rule);
	}
});
