import { hookFunction } from "../lib/hook-js";
import { log } from "../lib/log";

const originalSupportedExtensions =
	WebGLRenderingContext.prototype.getSupportedExtensions;
hookFunction(
	WebGLRenderingContext.prototype,
	"getSupportedExtensions",
	function () {
		log(
			"webgl fingerprint",
			"WebGLRenderingContext.prototype.getSupportedExtensions",
		);
		const result = originalSupportedExtensions.apply(this, arguments);
		return result.filter(() => Math.random() > 0.8);
	},
);

for (const context of [WebGLRenderingContext, WebGL2RenderingContext]) {
	const originalContextAttributes = context.prototype.getContextAttributes;
	hookFunction(context.prototype, "getContextAttributes", function () {
		log(
			"webgl fingerprint",
			"WebGLRenderingContext.prototype.getContextAttributes",
		);
		const result = originalContextAttributes.apply(
			this,
			arguments,
		) as CanvasRenderingContext2DSettings;
		for (const key in result) {
			if (typeof result[key] === "boolean") {
				(result as any)[key] = Math.random() > 0.5;
			}
		}
		return result;
	});

	const VENDOR = 0x1f00;
	const RENDERER = 0x1f01;
	const VERSION = 0x1f02;
	const UNMASKED_VENDOR_WEBGL = 0x9245;
	const UNMASKED_RENDERER_WEBGL = 0x9246;
	const SHADING_LANGUAGE_VERSION = 0x8b8c;

	const cache = {};

	const originalGetParameter = context.prototype.getParameter;
	hookFunction(context.prototype, "getParameter", function () {
		log(
			"webgl fingerprint",
			`WebGLRenderingContext.prototype.getParameter(${arguments[0]})`,
		);
		const parameter = arguments[0];
		if (
			parameter === VENDOR ||
			parameter === UNMASKED_VENDOR_WEBGL ||
			parameter === VERSION ||
			parameter === RENDERER ||
			parameter === UNMASKED_RENDERER_WEBGL ||
			parameter === SHADING_LANGUAGE_VERSION
		) {
			if (!cache[parameter])
				cache[parameter] = Array(20)
					.fill("")
					.map(() => String.fromCharCode((97 + Math.random() * 26) | 0))
					.join("");
			console.log(cache[parameter]);
			return cache[parameter];
		}
		const result = originalGetParameter.apply(this, arguments);
		return result;
	});
}
