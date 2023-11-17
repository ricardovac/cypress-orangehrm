const report = require("multiple-cucumber-html-reporter");

report.generate({
  theme: "bootstrap",
  jsonDir: "cypress/results/json",
  reportPath: "./public/",
  metadata: {
    browser: {
      name: "chrome",
      version: "119.0.6045.123",
    },
    device: "Local test machine",
    platform: {
      name: "fedora",
      version: "38",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "OrangeHRM" },
      { label: "Execution Start Time", value: new Date().toLocaleString() },
    ],
  },
});
