/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 5000
	},
	testIgnore: 'scr/**/*',
	testDir: 'tests'
};

export default config;
