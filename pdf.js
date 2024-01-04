/**
 * This script generates a PDF from an HTML file using Puppeteer.
 * It prompts the user for a filename, launches a headless browser, navigates to the specified HTML file, and generates a PDF.
 */

const puppeteer = require("puppeteer");
const readline = require("readline");

/**
 * Default viewport dimensions for the browser.
 */
const DEFAULT_VIEWPORT_WIDTH = 600;
const DEFAULT_VIEWPORT_HEIGHT = 800;

(async () => {
	/**
	 * FilePath of the HTML file to convert to PDF.
	 * @type {string}
	 */
	let filePath;

	if (process.argv.length < 3) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		console.log("Please enter a filename from HTML folder");
		filePath = await new Promise((resolve) => rl.once("line", resolve));
		rl.close();
	} else {
		filePath = process.argv[2];
	}

	const browser = await puppeteer.launch({
		headless: "new",
		defaultViewport: {
			width: DEFAULT_VIEWPORT_WIDTH,
			height: DEFAULT_VIEWPORT_HEIGHT,
		},
	});
	const page = await browser.newPage();
	try {
		url = `file://${__dirname}/HTML/${filePath}`;

		if (filePath.endsWith(".html")) {
			await page.goto(url);
		} else {
			await page.goto(`${url}.html`);
		}
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
	const scrollDimension = await page.evaluate(() => {
		return {
			width: document.scrollingElement.scrollWidth,
			height: document.scrollingElement.scrollHeight,
		};
	});

	await page.setViewport({
		width: scrollDimension.width,
		height: scrollDimension.height,
	});

	const fileName = filePath.endsWith(".html")
		? filePath.slice(0, -5)
		: filePath;

	await page.pdf({
		path: `./PDF/${fileName}.pdf`,
		printBackground: true,
		width: scrollDimension.width,
		height: scrollDimension.height,
	});
	console.log(`${filePath}.pdf successfully generated! See PDF folder.`);
	const exit = await browser.close();
})();
