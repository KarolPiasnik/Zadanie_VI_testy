const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    productsRequest:{
      statusCode: 200,
      body: [
        {
            "CreatedAt": "2023-08-05T20:38:24.080023+02:00",
            "UpdatedAt": "2023-08-05T20:38:24.080023+02:00",
            "DeletedAt": null,
            "ID": 1,
            "code": "11",
            "price": 15,
            "name": "tomato",
            "categoryID": 2,
            "Category": {
                "CreatedAt": "2023-08-05T20:34:42.907547+02:00",
                "UpdatedAt": "2023-08-05T20:34:42.907547+02:00",
                "DeletedAt": null,
                "ID": 2,
                "name": "vegetables",
                "Products": null
            }
        },
        {
            "CreatedAt": "2023-08-05T20:38:36.931992+02:00",
            "UpdatedAt": "2023-08-05T20:38:36.931992+02:00",
            "DeletedAt": null,
            "ID": 2,
            "code": "12",
            "price": 40,
            "name": "parsley",
            "categoryID": 2,
            "Category": {
                "CreatedAt": "2023-08-05T20:34:42.907547+02:00",
                "UpdatedAt": "2023-08-05T20:34:42.907547+02:00",
                "DeletedAt": null,
                "ID": 2,
                "name": "vegetables",
                "Products": null
            }
        },
        {
            "CreatedAt": "2023-08-05T20:39:02.467962+02:00",
            "UpdatedAt": "2023-08-05T20:39:02.467962+02:00",
            "DeletedAt": null,
            "ID": 4,
            "code": "21",
            "price": 30,
            "name": "watermelon",
            "categoryID": 1,
            "Category": {
                "CreatedAt": "2023-08-05T20:34:33.727229+02:00",
                "UpdatedAt": "2023-08-05T20:34:33.727229+02:00",
                "DeletedAt": null,
                "ID": 1,
                "name": "fruits",
                "Products": null
            }
        }
    ],
    }
 }
});
