# google-sheets-page-generator
Generate static pages from google sheets. Specifically to present thematic inquiries, as lists and detail pages.

Currently it is not possible to access images using the new "Insert Image in cell" Feature through the API (see `generator/index.js` and `generator/google.js`). The easiest workaround for now is to download the spreadsheet as an HTML-Site. After that use the `generator/html.js` script to extract the data and images.