const cheerio = require('cheerio');
const json2md = require('./json2md');
const copyAssets = require('./copyassets');
require('dotenv').config();
const fs = require('fs');
const https = require('https');
const html = fs.readFileSync(process.env.HTML_PATH, 'utf8');
const $ = cheerio.load(html);
const data = [];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', err => {
        console.log(err);
        reject();
      });
    }).on('error', err => {
      console.log(err);
      reject();
    });
  })
};

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
fs.mkdirSync(process.env.OUTPUT_PATH + '/images');

const columnTitles = [];
$('table tbody tr:first-child td').each((ci, c) => { columnTitles.push($(c).text().trim()); });

const downloads = [];

$('table tbody tr').each((ri, r) => {
  if (ri > 0) { // ignore header row
    if ($(r).find('.freezebar-cell').length === 0) { // ignore horizontal freezebar
      const row = {};
      $(r).find('td').each((ci, c) => {
        if (columnTitles[ci] && columnTitles[ci] !== '') { // only include columns with a header definition
          if ($(c).find('img').length > 0) {
            const imgUrl = $(c).find('img').attr('src');
            const imgNameSplit = imgUrl.split('/');
            const imgName = imgNameSplit[imgNameSplit.length - 1];
            row[columnTitles[ci]] = imgName;
            if (!fs.existsSync(process.env.OUTPUT_PATH + '/images/' + imgName + '.jpg')) {
              downloads.push([imgUrl.replace(/=w[\d]*-h[\d]*/gm, '=w2000-h2000'), process.env.OUTPUT_PATH + '/images/' + imgName + '.jpg'])
            }
          } else {
            row[columnTitles[ci]] = $(c).text().trim().replace(/\n/g,'').replace(/\s\s+/g, ' ');
          }
        }
      });
      data.push(row);
    }
  }
});

(async () => {
  for (let d = 0; d < downloads.length; d++) {
    await download(downloads[d][0], downloads[d][1]);
  }
})();


fs.writeFileSync(process.env.OUTPUT_PATH + '/data.json', JSON.stringify(data), 'utf8');

const md = json2md(data);
fs.writeFileSync(process.env.OUTPUT_PATH + '/data.md', md, 'utf8');

copyAssets(process.env.OUTPUT_PATH);
