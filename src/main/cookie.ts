const originalDocumentCookie = Object.getOwnPropertyDescriptor(
	document,
	"cookie",
);
Object.defineProperty(document, "cookie", {
	get: () => originalDocumentCookie.get(),
	set: (value: string) => {
		const cookies = value.split(";").map((cookie) => cookie.trim());
		for (const cookie of cookies) {
			const [name] = cookie.split("=");
			if (name === "_vid_t" || name === "_iidt") {
				return;
			}
		}
		originalDocumentCookie.set(value);
	},
});
