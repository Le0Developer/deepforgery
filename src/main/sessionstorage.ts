import { hookFunction } from "../lib/hook-js";
import { tryObtain } from "../lib/try-obtain";
import { INTERFERE_WITH_COOKIES } from "../settings";

if (INTERFERE_WITH_COOKIES)
	tryObtain(
		() => sessionStorage,
		(session) => {
			const original = session.setItem;
			hookFunction(session, "setItem", function () {
				// the clients have caching using sessionStorage, so we just prevent them from doing it
				if (arguments[0].startsWith("@fpjs@")) return null;
				return original.apply(this, arguments);
			});
		},
	);
