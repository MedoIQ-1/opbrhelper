async function run() {
  try {
    const res = await fetch("https://web-bounty-rush.com/en/webview/webinfo/allinfo_and/entries.txt");
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      console.log("Parsed valid JSON, length:", data.news.length);
    } catch(e) {
      console.log("JSON parse error:", e.message);
      console.log("Trying evaluating...");
      const fixed = text.replace(/\]\s*\}\s*;/g, "]}").replace(/\n/g," ").trim();
      const data = new Function("return " + text + ";")();
      console.log("Evaluated valid data, length:", data.news.length);
      console.log(data.news[0]);
    }
  } catch (err) {
    console.error(err);
  }
}
run();
