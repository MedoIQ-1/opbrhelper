async function run() {
  try {
    const res = await fetch("https://web-bounty-rush.com/en/webview/webinfo/all_and/");
    const html = await res.text();
    console.log(html.substring(html.indexOf("banner-box"), html.indexOf("banner-box") + 2000));
  } catch (err) {
    console.error(err);
  }
}
run();
