const keys = Object.keys(Object.getPrototypeOf(screen));

for (const key of keys) {
	if (key === "orientation" || key === "onchange" || key === "isExtended")
		continue;
	Object.defineProperty(screen, key, {
		get: () => (Math.random() * 10000) | 0,
	});
}
