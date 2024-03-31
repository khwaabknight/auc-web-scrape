import puppeteer from "puppeteer";
import { scrapeContent } from "../utils/scraper.js";

export async function scrape(req,res) {
    try {
        const {productId} = req.params;

        // console.log("productId",productId);
        // console.log("reqbody",req.body);
        const url = `https://www.eauctionsindia.com/properties/${productId}`;
        // const url = `https://study-notion-ed-tech-eosin.vercel.app`;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const pageContent = await page.content();
        await browser.close();

        const jsonData = await scrapeContent(pageContent);

        console.log(jsonData);

        return res.send(jsonData);
    } catch (error) {
        console.error("Error scraping content:", error);
        return res.status(500).send({
            message: "Error scraping content",
        });
    }
}