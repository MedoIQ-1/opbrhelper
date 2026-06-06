async function run() {
  try {
    const res = await fetch("https://web-bounty-rush.com/en/webview/webinfo/all_and/");
    const text = await res.text();
    console.log("HTML length:", text.length);
    console.log("IndexOf info-mainbox:", text.indexOf("info-mainbox"));
    console.log("IndexOf newslist:", text.indexOf("newslist"));
    console.log(text.substring(text.length - 1500));
  } catch (err) {
    console.error(err);
  }
}
run();
