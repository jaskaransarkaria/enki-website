import { chromium } from '@playwright/test';
const exe = '/home/jaskaran/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome';
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on('pageerror', e => console.log('PAGEERROR', e.message.slice(0,160)));

const slow = async (route) => { await new Promise(r => setTimeout(r, 1500)); await route.continue(); };
await page.route('**/category?id=*', slow);
await page.route('**/products-by-category*', slow);

await page.goto('http://localhost:5000/shop', { waitUntil: 'networkidle' });
await page.waitForSelector('[data-testid="hex-link"]');
const spinner = page.locator('[data-testid="navigation-spinner"]');
console.log('spinner before click:', await spinner.isVisible().catch(() => false));

await page.locator('[data-testid="hex-link"]').first().click({ noWaitAfter: true });
await page.waitForTimeout(400);
console.log('spinner during nav (400ms):', await spinner.isVisible().catch(() => false));
await page.waitForTimeout(2000);
console.log('spinner after nav:', await spinner.isVisible().catch(() => false));
console.log('url:', page.url());
await browser.close();
