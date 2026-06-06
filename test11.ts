async function run() {
  try {
    const res = await fetch("http://localhost:3000/api/news/detail?url=https://web-bounty-rush.com/en/webview/webinfo/detail/024031WgaHWaBi.html");
    const json = await res.json();
    console.log(json.data.header);
  } catch (err) {
    console.error(err);
  }
}
run();
