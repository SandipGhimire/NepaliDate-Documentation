import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Nepali Date",
  description:
    "A comprehensive Nepali (Bikram Sambat) date library for TypeScript and JavaScript",
  outDir: "./build",
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
          "nepali date, bikram sambat, BS date, AD to BS, BS to AD, nepali calendar, nepal, typescript, javascript",
      },
    ],
    ["meta", { name: "author", content: "Sandip Ghimire" }],
  ],
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "Home", link: "/" },
      { text: "NodeJS", link: "/docs/NodeJS/" },
    ],
    sidebar: {
      "/docs/NodeJS/": [
        {
          text: "Introduction",
          items: [
            { text: "Overview", link: "/docs/NodeJS/" },
            {
              text: "Getting Started",
              link: "/docs/NodeJS/getting-started",
            },
          ],
        },
        {
          text: "API Reference",
          items: [
            { text: "Overview", link: "/docs/NodeJS/api/" },
            {
              text: "NepaliDate Class",
              link: "/docs/NodeJS/api/nepali-date-class",
            },
            {
              text: "Conversion Functions",
              link: "/docs/NodeJS/api/conversion-functions",
            },
            {
              text: "Static Methods",
              link: "/docs/NodeJS/api/static-methods",
            },
            { text: "Constants", link: "/docs/NodeJS/api/constants" },
          ],
        },
        {
          text: "Use Cases",
          items: [
            { text: "Overview", link: "/docs/NodeJS/use-cases/" },
            {
              text: "Date Conversion",
              link: "/docs/NodeJS/use-cases/date-conversion",
            },
            {
              text: "Calendar Generation",
              link: "/docs/NodeJS/use-cases/calendar-generation",
            },
            {
              text: "Fiscal Year Operations",
              link: "/docs/NodeJS/use-cases/fiscal-year",
            },
            {
              text: "Date Ranges",
              link: "/docs/NodeJS/use-cases/date-ranges",
            },
          ],
        },
        {
          text: "Examples",
          items: [
            { text: "Overview", link: "/docs/NodeJS/examples/" },
            {
              text: "Code Snippets",
              link: "/docs/NodeJS/examples/code-snippets",
            },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/SandipGhimire/",
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026-present Sandip Ghimire",
    },
    search: {
      provider: "local",
    },
  },
});
