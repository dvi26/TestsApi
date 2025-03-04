const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
        baseUrl:'https://localhost:7002',
      // implement node event listeners her,
  },
});
