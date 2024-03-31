import * as cheerio from 'cheerio';

export async function scrapeContent(pageContent) {
    try {
        const $ = cheerio.load(pageContent);
        const jsonData = {};

        function getTextAndTrim(selector, removeFirstCharacter = false) {
            if(removeFirstCharacter)
                return $(selector).text().substring(1).trim();
            return $(selector).text().trim();
        }

        // 1st card
        const auctionId = $('.card:first span').text().trim().substring(1);
        jsonData.auctionId = auctionId;

        // 2nd card
        const title = $('h1').text().trim();
        jsonData.title = title;

        // 3rd card - bank details
        const bankDetails = {};
        bankDetails['reservedPrice'] = getTextAndTrim('.card:nth-child(3) .card-body div:nth-child(1) div:nth-child(2) span:nth-child(2)');
        bankDetails['bankName'] = getTextAndTrim('.card:nth-child(3) .card-body div:nth-child(2) div:nth-child(1) div:nth-child(2)',true);
        bankDetails['emd'] = getTextAndTrim('.card:nth-child(3) .card-body div:nth-child(2) div:nth-child(1) div:nth-child(4)');
        bankDetails['branchName'] = getTextAndTrim('.card:nth-child(3) .card-body div:nth-child(2) div:nth-child(1) div:nth-child(6)',true);
        bankDetails['serviceProvider'] = getTextAndTrim('.card:nth-child(3) .card-body div:nth-child(2) div:nth-child(1) div:nth-child(8)',true);
        bankDetails['contactDetails'] = getTextAndTrim('.card:nth-child(3) .card-body div:nth-child(2) div:nth-child(2) span:nth-child(2)');
        jsonData.bankDetails = bankDetails;

        // 4th card - descriptions
        const location = {};
        location.description = getTextAndTrim('.card:nth-child(4) p');
        location.stateProvince = getTextAndTrim('.card:nth-child(4) .card-body div:nth-child(3) div:nth-child(1) span:nth-child(2) a');
        location.cityTown = getTextAndTrim('.card:nth-child(4) .card-body div:nth-child(3) div:nth-child(2) span:nth-child(2) a');
        location.areaTown = getTextAndTrim('.card:nth-child(4) .card-body div:nth-child(3) div:nth-child(3) span:nth-child(2)');
        jsonData.location = location;

        // 5th card - property details
        const propertyDetails = {};

        propertyDetails.borrower = getTextAndTrim('.card:nth-child(5) .card-body div:nth-child(2) div:nth-child(1) div div:nth-child(2)',true);
        propertyDetails.assetCategory = getTextAndTrim('.card:nth-child(5) .card-body div:nth-child(2) div:nth-child(1) div div:nth-child(4)',true);
        propertyDetails.propertyType = getTextAndTrim('.card:nth-child(5) .card-body div:nth-child(2) div:nth-child(1) div div:nth-child(6)',true);
        propertyDetails.auctionType = getTextAndTrim('.card:nth-child(5) .card-body div:nth-child(2) div:nth-child(1) div div:nth-child(8)',true);
        propertyDetails.auctionStartTime = getTextAndTrim('.card:nth-child(5) .card-body div:nth-child(2) div:nth-child(2) div div:nth-child(2)',true);
        propertyDetails.auctionEndDate = getTextAndTrim('.card:nth-child(5) .card-body div:nth-child(2) div:nth-child(2) div div:nth-child(4)',true);
        propertyDetails.auctionSubmissionDate = getTextAndTrim('.card:nth-child(5) .card-body div:nth-child(2) div:nth-child(2) div div:nth-child(6)',true);

        jsonData.propertyDetails = propertyDetails;

        // 6th card - downloads
        const downloads = $('.card:nth-child(6) a').attr('href');
        jsonData.downloads = downloads;

        return jsonData;
    } catch (error) {
        console.error("Error scraping content:", error);
    }
}

