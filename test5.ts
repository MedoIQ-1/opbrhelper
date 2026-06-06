async function run() {
  try {
    const res = await fetch("https://web-bounty-rush.com/en/webview/webinfo/allinfo_and/entries.txt");
    const text = await res.text();
    console.log(text.substring(0, 1000));
  } catch (err) {
    console.error(err);
  }
}
run();
