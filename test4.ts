async function run() {
  try {
    const res = await fetch("https://web-bounty-rush.com/en/webview/webinfo/all_and/createNews_and.js");
    const text = await res.text();
    const urls = text.match(/url:\s*['"]([^'"]+)['"]/g);
    console.log("URLs found in JS:", urls);
  } catch (err) {
    console.error(err);
  }
}
run();
