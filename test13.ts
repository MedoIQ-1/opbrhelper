async function run() {
  const urls = [
    "https://web-bounty-rush.com/en/webview/webinfo/image/img-newicon.png",
    "https://web-bounty-rush.com/en/webview/image/img-newicon.png",
    "https://web-bounty-rush.com/image/img-newicon.png"
  ];
  for (const u of urls) {
    const res = await fetch(u);
    console.log(u, res.status);
  }
}
run();
