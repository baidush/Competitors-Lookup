import { IConfig } from "../common/models/config.model";

// A dynamic config sample
const config: IConfig = {
  name: "RESTool App",
  favicon: "https://www.commoninja.com/public/favicon.ico",
  baseUrl: "https://restool-sample-app.herokuapp.com/api",
  pages: [
    {
      name: "Competitors",
      id: "competitors",
      description: "Competitors list",
      methods: {
        getAll: {
          dataPath: "items",
          url: "/competitors",
          queryParams: [
            {
              name: "search",
              value: "",
              label: "Search",
              type: "text",
            },
          ],
          display: {
            type: "table",
          },
          fields: [
            {
              name: "id",
              type: "text",
              label: "ID",
            },
            {
              name: "name",
              type: "text",
              label: "Name",
            },
            {
              name: "description",
              type: "text",
              label: "Description",
            },
            {
              name: "createdAt",
              type: "text",
              label: "Created At",
            },
          ],
        },
        getSingle: {
          url: "/competitors/:id",
          queryParams: [],
          requestHeaders: {},
        },
        put: {
          url: "/competitors/:id",
          fields: [
            {
              name: "name",
              label: "Name",
              type: "text",
            },
            {
              name: "description",
              type: "text",
              label: "Description",
            },
          ],
        },
        post: {
          url: "/competitors",
          fields: [
            {
              name: "name",
              label: "Name",
              type: "text",
            },
            {
              name: "description",
              type: "text",
              label: "Description",
            },
          ],
        },
        delete: {
          url: "/competitors/:id",
        },
      },
    },
    {
      name: "Custom Link",
      id: "customLink",
      description: "External custom link to the page",
      customLink: ''
    }
  ],
};

export default config;
