import { hookFunction } from "../lib/hook-js";
import { PCG } from "random-seedable";
import { log } from "../lib/log";

const INSTANCE_SEED = (Math.random() * 0xffffffff) | 0;

const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
hookFunction(HTMLCanvasElement.prototype, "toDataURL", function () {
	log("canvas fingerprint", "HTMLCanvasElement.prototype.toDataURL");
	// const rng = new PCG(INSTANCE_SEED);
	// console.log("modifying canvas data", INSTANCE_SEED);
	//
	// const context = this.getContext("2d") as CanvasRenderingContext2D;
	//
	// const backup = context.getImageData(0, 0, this.width, 1);
	// const fakePixels = new Uint8ClampedArray(this.width * 4);
	// for(let i = 0; i < fakePixels.length; i++) {
	// 	fakePixels[i] = rng.int() % 256;
	// }
	//
	// const fakeData = new ImageData(fakePixels, this.width, 1);
	// context.putImageData(fakeData, 0, 0);
	//
	// const dataUrl = originalToDataURL.apply(this, arguments);
	// context.putImageData(backup, 0, 0);
	//
	// return dataUrl;
	const rawDataUrl = originalToDataURL.apply(this, arguments) as string;
	const rng = new PCG(INSTANCE_SEED);

	const dataUrl = rawDataUrl.split("");
	// this is NOT safe, and creates an INVALID data url, but we dont care
	for (let i = 0; i < dataUrl.length * 0.01; i++) {
		dataUrl[(rng.int() % (dataUrl.length - 40)) + 40] = /a-z/.test(dataUrl[i])
			? dataUrl[i].toUpperCase()
			: dataUrl[i].toLowerCase();
	}

	return dataUrl.join("");
});
