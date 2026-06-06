async function run() {
  try {
    const res = await fetch("https://web-bounty-rush.com/en/webview/image/img-newicon.png");
    console.log(res.status);
  } catch (err) {
    console.error(err);
  }
}
run();
