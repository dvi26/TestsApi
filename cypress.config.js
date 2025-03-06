const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      //baseUrl:'https://fernexus-api.azurewebsites.net/',
      baseUrl:'https://localhost:7002/',// implement node event listeners her,
  },
});
