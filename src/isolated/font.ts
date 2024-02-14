// confuse font checks using CSS

import { injectCSSRule } from "../lib/inject-css";

// from: https://github.com/fingerprintjs/fingerprintjs/blob/master/src/sources/fonts.ts#L15
const fontList = [
	"sans-serif-thin",
	"ARNO PRO",
	"Agency FB",
	"Arabic Typesetting",
	"Arial Unicode MS",
	"AvantGarde Bk BT",
	"BankGothic Md BT",
	"Batang",
	"Bitstream Vera Sans Mono",
	"Calibri",
	"Century",
	"Century Gothic",
	"Clarendon",
	"EUROSTILE",
	"Franklin Gothic",
	"Futura Bk BT",
	"Futura Md BT",
	"GOTHAM",
	"Gill Sans",
	"HELV",
	"Haettenschweiler",
	"Helvetica Neue",
	"Humanst521 BT",
	"Leelawadee",
	"Letter Gothic",
	"Levenim MT",
	"Lucida Bright",
	"Lucida Sans",
	"Menlo",
	"MS Mincho",
	"MS Outlook",
	"MS Reference Specialty",
	"MS UI Gothic",
	"MT Extra",
	"MYRIAD PRO",
	"Marlett",
	"Meiryo UI",
	"Microsoft Uighur",
	"Minion Pro",
	"Monotype Corsiva",
	"PMingLiU",
	"Pristina",
	"SCRIPTINA",
	"Segoe UI Light",
	"Serifa",
	"SimHei",
	"Small Fonts",
	"Staccato222 BT",
	"TRAJAN PRO",
	"Univers CE 55 Medium",
	"Vrinda",
	"ZWAdobeF",
] as const;

for (const font of fontList) {
	if (Math.random() > 0.1) continue;
	const rule = `span[style*="${font}"]{padding: ${Math.random()}px}`;
	injectCSSRule(rule);
}
