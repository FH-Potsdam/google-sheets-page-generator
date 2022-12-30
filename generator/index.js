require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');

const creds = require(process.env.GOOGLE_CREDS_PATH);

// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

(async function() {
  // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]; // get the first sheet

  // check if the folder for output exists and if its empty
  const outputExists = fs.existsSync(process.env.OUTPUT_PATH);
  if (outputExists) {
    const outputFiles = fs.readdirSync(process.env.OUTPUT_PATH);
    if (outputFiles.length > 0 && (!process.env.OVERWRITE || process.env.OVERWRITE !== 'TRUE')) {
      throw('Output path folder is not empty. If you want to overwrite, set environmental variable "OVERWRITE" to "TRUE".');
    }

    // if OVERWRITE is set to TRUE, clean folder beforehand
    if (process.env.OVERWRITE && process.env.OVERWRITE === 'TRUE') {
      fs.rmdirSync(process.env.OUTPUT_PATH, { recursive: true });
    }
  }
  fs.mkdirSync(process.env.OUTPUT_PATH);

  const data = [];

  await sheet.loadCells();
  const cell = await sheet.getCell(1,7);
  
  const rows = await sheet.getRows();
  rows.forEach(r => {

    // if id is missing, the row is skipped
    if(r.ID){
      const row = {
        id: r.ID,
        name: r.Name || 'Unknown',
        tags: r.Stichworte.split(',').map(t => t.trim()),
        url: r.Url || null,
        images: [],
        meta: {}
      };
      // for (let i = 1; i <= 4; i += 1) {
      //   if (r['Bild-'])
      // }
      data.push(row);
    }
  });

}());