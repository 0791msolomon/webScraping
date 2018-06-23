const cheerio = require("cheerio");
const axios = require("axios");

const options = {
  method: "GET"
};
axios("https://www.petfinder.com/pet-adoption/dog-adoption/")
  .then(result => {
    const $ = cheerio.load(result.data);
    const articles = [];
    const articleWidgets = $(".card-section").each((i, elem) => {
      const articleElement = $(elem);
      const article = {
        title: articleElement.find("a").attr("title"),
        description: articleElement.find("p").text(),
        url: articleElement.find("a").attr("href")
      };
      articles.push(article);
    });

    console.log(JSON.stringify(articles, null, 2));
  })
  .catch(err => {
    console.log(err);
  });
