const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const fs = require("fs");

let result;

setInterval(() => {
  fs.readFile("server/data.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    result = JSON.parse(data);
  });
}, 3000);

const schema = buildSchema(`
  type AldoStore {
    store: String
    model: String
    inventory: Int
  }
  type Query {
    store: [AldoStore]
    leastStore: [AldoStore]
    topStore: [AldoStore]
  }
`);

const root = {
  store: () => {
    return result.aldoStore;
  },
  leastStore: () => {
    let topProducts = [];
    for (let i = 0; i < result.aldoStore.length; i++) {
      if (topProducts.length < 5) {
        topProducts.push(result.aldoStore[i]);
      } else {
        for (let j = 0; j < topProducts.length; j++) {
          if (topProducts[j].inventory < result.aldoStore[i].inventory) {
            topProducts.splice(j, 1);
            topProducts.push(result.aldoStore[i]);
            i++;
          } else {
            continue;
          }
        }
      }
    }
    return topProducts;
  },
  topStore: () => {
    let leastProducts = [];
    for (let i = 0; i < result.aldoStore.length; i++) {
      if (leastProducts.length < 5) {
        leastProducts.push(result.aldoStore[i]);
      } else {
        for (let j = 0; j < leastProducts.length; j++) {
          if (leastProducts[j].inventory > result.aldoStore[i].inventory) {
            leastProducts.splice(j, 1);
            leastProducts.push(result.aldoStore[i]);
            i++;
          } else {
            continue;
          }
        }
      }
    }
    return leastProducts;
  },
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Running a GraphQL API server at localhost:4000/graphql");
});
