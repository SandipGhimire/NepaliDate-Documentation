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
      { text: "NepaliDate Library", link: "/docs/NepaliDate/" },
    ],
    sidebar: {
      "/docs/NepaliDate/": [
        {
          text: "Introduction",
          items: [
            { text: "Overview", link: "/docs/NepaliDate/" },
            {
              text: "Getting Started",
              link: "/docs/NepaliDate/getting-started",
            },
          ],
        },
        {
          text: "API Reference",
          items: [
            { text: "Overview", link: "/docs/NepaliDate/api/" },
            {
              text: "NepaliDate Class",
              link: "/docs/NepaliDate/api/nepali-date-class",
            },
            {
              text: "Conversion Functions",
              link: "/docs/NepaliDate/api/conversion-functions",
            },
            {
              text: "Static Methods",
              link: "/docs/NepaliDate/api/static-methods",
            },
            { text: "Constants", link: "/docs/NepaliDate/api/constants" },
          ],
        },
        {
          text: "Use Cases",
          items: [
            { text: "Overview", link: "/docs/NepaliDate/use-cases/" },
            {
              text: "Date Conversion",
              link: "/docs/NepaliDate/use-cases/date-conversion",
            },
            {
              text: "Calendar Generation",
              link: "/docs/NepaliDate/use-cases/calendar-generation",
            },
            {
              text: "Fiscal Year Operations",
              link: "/docs/NepaliDate/use-cases/fiscal-year",
            },
            {
              text: "Date Ranges",
              link: "/docs/NepaliDate/use-cases/date-ranges",
            },
          ],
        },
        {
          text: "Examples",
          items: [
            { text: "Overview", link: "/docs/NepaliDate/examples/" },
            {
              text: "Code Snippets",
              link: "/docs/NepaliDate/examples/code-snippets",
            },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/SandipGhimire/nepali-date-library",
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present Sandip Ghimire",
    },
    search: {
      provider: "local",
    },
  },
});
