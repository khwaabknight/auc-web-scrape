import * as fs from 'fs';
import puppeteer from 'puppeteer';

export async function loadFile(url) {
    
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto();

        const pageContent = await page.content();
        const filePath = "output.html";  // Replace with your desired file path


        fs.writeFile(filePath, pageContent, (err) => {
            if (err) {
            console.error("Error writing file:", err);
            } else {
            console.log("File written successfully!");
            }
        });

        await browser.close();
        return stringData;
        
    } catch (error) {
        console.error("Error writing file:", error);
    }    
}

