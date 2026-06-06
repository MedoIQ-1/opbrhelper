async function run() {
  try {
    const res = await fetch("http://localhost:3000/api/news");
    console.log(res.status, res.statusText);
    const json = await res.json();
    console.log("Got news:", json.data.news.length);
    if(json.data.news.length > 0) {
      console.log(json.data.news[0]);
    }
    console.log("Got banners:", json.data.banners.length);
    if (json.data.banners.length > 0) {
      console.log(json.data.banners[0]);
    }
  } catch (err) {
    console.error(err);
  }
}
run();
