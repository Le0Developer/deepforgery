import { hookFunction } from "../lib/hook-js";

const originalSupportedExtensions =
	WebGLRenderingContext.prototype.getSupportedExtensions;
hookFunction(
	WebGLRenderingContext.prototype,
	"getSupportedExtensions",
	function () {
		const result = originalSupportedExtensions.apply(this, arguments);
		return result.filter(() => Math.random() > 0.8);
	},
);

const originalContextAttributes =
	WebGLRenderingContext.prototype.getContextAttributes;
hookFunction(
	WebGLRenderingContext.prototype,
	"getContextAttributes",
	function () {
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
	},
);

const VENDOR = 0x1f00;
const RENDERER = 0x1f01;
const VERSION = 0x1f02;
const UNMASKED_VENDOR_WEBGL = 0x9245;
const UNMASKED_RENDERER_WEBGL = 0x9246;
const SHADING_LANGUAGE_VERSION = 0x8b8c;

const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
hookFunction(WebGLRenderingContext.prototype, "getParameter", function () {
	if (
		arguments[0] === VENDOR ||
		arguments[0] === UNMASKED_VENDOR_WEBGL ||
		arguments[0] === VERSION ||
		arguments[0] === RENDERER ||
		arguments[0] === UNMASKED_RENDERER_WEBGL ||
		arguments[0] === SHADING_LANGUAGE_VERSION
	) {
		return Array(20)
			.fill("")
			.map(() => String.fromCharCode((97 + Math.random() * 26) | 0))
			.join("");
	}
	const result = originalGetParameter.apply(this, arguments);
	return result;
});
