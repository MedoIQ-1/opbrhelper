async function run() {
  try {
    const res = await fetch("https://web-bounty-rush.com/en/webview/webinfo/detail/024031WgaHWaBi.html");
    const html = await res.text();
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
    const content = $('.newsdetail-cont').html() || '';
    console.log(content.substring(0, 500));
  } catch (err) {
    console.error(err);
  }
}
run();
