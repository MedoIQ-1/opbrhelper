async function run() {
  try {
    const res = await fetch("https://web-bounty-rush.com/en/webview/webinfo/allinfo_and/entries.txt");
    const text = await res.text();
    let fixedText = text.replace(/,\s*(?=\])/g, '');
    try {
      const data = JSON.parse(fixedText);
      console.log("Parsed valid JSON, length:", data.news.length);
    } catch(e) {
      console.log("JSON parse error:", e.message);
    }
  } catch (err) {
    console.error(err);
  }
}
run();
