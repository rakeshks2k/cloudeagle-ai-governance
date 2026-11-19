import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('./screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function runVisualQA() {
  console.log('Launching Chrome for Full Screen Views QA...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // 1. Overview Screenshot (Command Center with logo, Rakesh, pastel colors, blue CTA)
  console.log('Capturing Executive Overview...');
  await page.screenshot({ path: path.join(outputDir, '01_fullscreen_overview.png') });
  await page.screenshot({ path: path.join(outputDir, '01_fullscreen_overview_fullpage.png'), fullPage: true });

  // 2. Click Tool Inventory in Left Sidebar
  console.log('Navigating to Tool Inventory via Sidebar...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('aside button'));
    const catBtn = btns.find(b => b.innerText && b.innerText.includes('Tool Inventory'));
    if (catBtn) catBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '02_fullscreen_tool_inventory.png') });

  // 3. Click Security & DLP in Left Sidebar
  console.log('Navigating to Security & DLP via Sidebar...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('aside button'));
    const dlpBtn = btns.find(b => b.innerText && b.innerText.includes('Security & DLP'));
    if (dlpBtn) dlpBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '03_fullscreen_security_dlp.png') });

  // 4. Click Data Sources in Left Sidebar
  console.log('Navigating to Data Sources via Sidebar...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('aside button'));
    const dsBtn = btns.find(b => b.innerText && b.innerText.includes('Data Sources'));
    if (dsBtn) dsBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '04_fullscreen_data_sources.png') });

  // 5. Click Settings in Left Sidebar
  console.log('Navigating to Settings via Sidebar...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('aside button'));
    const setBtn = btns.find(b => b.innerText && b.innerText.includes('Settings'));
    if (setBtn) setBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Trigger a toast in Settings to verify bottom-right toast positioning
  console.log('Triggering toast in Settings...');
  await page.evaluate(() => {
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Save Settings'));
    if (saveBtn) saveBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outputDir, '05_fullscreen_settings_toast.png') });

  // 6. Return to Overview and click Department row to test Department Drawer
  console.log('Returning to Overview to test slide-over drawers...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('aside button'));
    const ovBtn = btns.find(b => b.innerText && b.innerText.includes('Command Center'));
    if (ovBtn) ovBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    const deptRows = document.querySelectorAll('#chart1-dept-budget .group');
    if (deptRows.length > 0) deptRows[0].click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, '06_department_drawer.png') });

  // Close department drawer and test Tool Drawer
  console.log('Testing Tool Drawer...');
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const toolRows = document.querySelectorAll('#chart3-tool-spend .group');
    if (toolRows.length > 3) toolRows[3].click(); // click ChatGPT Plus (Shadow AI)
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, '07_tool_drawer.png') });

  // Close ChatGPT drawer and test Grammarly Drawer in Tool Inventory
  console.log('Testing Grammarly in Tool Inventory...');
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('aside button'));
    const catBtn = btns.find(b => b.innerText && b.innerText.includes('Tool Inventory'));
    if (catBtn) catBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    const grammarlyRow = rows.find(r => r.innerText && r.innerText.includes('Grammarly'));
    if (grammarlyRow) grammarlyRow.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, '08_grammarly_drawer.png') });

  await browser.close();
  console.log('All QA screenshots captured successfully!');
}

runVisualQA().catch(err => {
  console.error('Visual QA error:', err);
  process.exit(1);
});
