async function run() {
  try {
    const res = await fetch("https://web-bounty-rush.com/en/webview/webinfo/all_and/createNews_and.js");
    const text = await res.text();
    console.log(text.substring(0, 500));
    console.log(text.substring(text.length - 1000));
  } catch (err) {
    console.error(err);
  }
}
run();
