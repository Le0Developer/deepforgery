import { INTERFERE_WITH_COOKIES } from "../settings";

if (INTERFERE_WITH_COOKIES) {
	const originalDocumentCookie = Object.getOwnPropertyDescriptors(
		Document.prototype,
	).cookie;
	Object.defineProperty(document, "cookie", {
		get: () => originalDocumentCookie.get.bind(document)(),
		set: (value: string) => {
			const cookies = value.split(";").map((cookie) => cookie.trim());
			for (const cookie of cookies) {
				const [name] = cookie.split("=");
				if (name === "_vid_t" || name === "_iidt") {
					return;
				}
			}
			originalDocumentCookie.set.bind(document)(value);
		},
	});
}
