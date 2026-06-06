async function run() {
  try {
    const res = await fetch("https://web-bounty-rush.com/en/webview/webinfo/all_and/");
    console.log(res.status, res.statusText);
    const text = await res.text();
    console.log("HTML length:", text.length);
    console.log(text.substring(0, 500));
  } catch (err) {
    console.error(err);
  }
}
run();
