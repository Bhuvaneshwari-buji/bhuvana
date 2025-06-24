const format = require("date-fns/format");
module.exports = function (config) {
  // config.addPassthroughCopy({ "./src/_includes/assets": "assets" });
  config.addFilter("date", function (date, dateFormat) {
    return format(date, dateFormat);
  });
  config.addFilter("stripQuery", function(url) {
    return url.split("?")[0]; // This will return the URL before the "?"
  });
  config.addNunjucksFilter("json", function(value) {
    return JSON.stringify(value);
  });
  return {
    pathPrefix: "/",
    includes: "",
    dir: {
      input: "./src",
      output: "../"
    }
  };
};