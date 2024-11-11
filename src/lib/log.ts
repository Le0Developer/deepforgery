import { LOG_ACCESS } from "../settings";

export function log(module: string, message: string) {
	if (!LOG_ACCESS) return;

	console.log(`[${module}] ${message}`);
}
