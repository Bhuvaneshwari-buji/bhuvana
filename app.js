const express = require("express");
const app = express();
const port = 9010;
const { exec } = require("child_process");
const SitemapGenerator = require("sitemap-generator");
const environment = "production";

const options = {
  maxBuffer: 5 * 1024 * 1000 // Adjust the buffer size limit as needed
};

if (environment === "production") {
  app.listen(port, function (err, res) {
    if (err) console.log("port error", err);
    console.log("Running on port " + port + "...");
  });

  // create generator

  app.get("/", function (req, res) {
    res.send({ message: "Welcome to hindustan" });
  });

  app.post("/restart", function (req, res) {
    console.log("process start")
    exec("npm start", options, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    setTimeout(() => {
      const generator = SitemapGenerator("https://hindustanuniv.ac.in/", {
        stripQuerystring: false,
        filepath: "../sitemap.xml",
        ignore: (url) => {
          let index2 = url.indexOf("/index.html");
          if (index2 != -1) {
            return true;
          }
          // return url.indexOf("https://yourstore.io/login/") != -1;
        },
      });

      generator.on("ignore", (url) => {
        // console.log(url);
      });

      // register event listeners
      generator.on("done", () => {
        console.log("sitemap created");
        // sitemaps created
      });

      // start the crawler
      generator.start();
      // res.send({ message : 'sitemap success' });
    }, 5000);

    res.send({ message: "success" });
  });
} else {
  app.listen(port, function (err, res) {
    if (err) console.log("port error", err);
    console.log("Running on port " + port + "...");
  });
}
