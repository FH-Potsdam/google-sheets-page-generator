/*
 * This script converts a spreadsheet json into a reveal.js compatible markdown file.
 */

module.exports = (json) => {
  let md = '';
  const split = '\n\n\n';
  const title = (item) => item.Name;
  const images = (item) => {
    const images = [];
    for (let i = 1; i <= 4; i += 1) {
      if (item['Bild-' + i] && item['Bild-' + i].length > 0) {
        images.push(item['Bild-' + i]);
      }
    }
    return images;
  };
  const source = (item) => item.Url;

  json.forEach((item, i) => {
    if (i > 0) {
      const img = images(item);
      md += split;
      md += '# ' + title(item) + '\n';
      md += `<div class="cols cols-${img.length}">\n`;
      img.forEach(i => {
        md += ` <div><div style="background-image:url(images/${i}.jpg);"></div></div>\n`;
      });
      md += '</div>\n';
      md += `<p class="source"><a href="${source(item)}">${source(item).substring(0, 50)}${(source(item).length > 50) ? '...' : ''}</a></p>\n`;
    }
  });

  return md;
};