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
    lowInventoryStores: [AldoStore]
    highInventoryStores: [AldoStore]
    latestSaleCompleted: [AldoStore]
  }
`);

const root = {
  store: () => {
    const storeValue = result.aldoStore.slice(-50);
    const uniqueResult = storeValue.reduce((accumulator, current) => {
      if (itemExists(current)) {
        return accumulator;
      } else {
        return [...accumulator, current];
      }

      function itemExists(currentVal) {
        return accumulator.some((item) => {
          return (
            item.model === currentVal.model && item.store === currentVal.store
          );
        });
      }
    }, []);

    return uniqueResult;
  },
  lowInventoryStores: () => {
    let leastSoldItems = [];
    for (let i = 0; i < result.aldoStore.length; i++) {
      if (leastSoldItems.length < 5) {
        leastSoldItems.push(result.aldoStore[i]);
      } else {
        for (let j = 0; j < leastSoldItems.length; j++) {
          if (leastSoldItems[j].inventory < result.aldoStore[i].inventory) {
            leastSoldItems.splice(j, 1);
            leastSoldItems.push(result.aldoStore[i]);
            i++;
          } else {
            continue;
          }
        }
      }
    }
    return leastSoldItems;
  },
  highInventoryStores: () => {
    let topSoldItems = [];
    for (let i = 0; i < result.aldoStore.length; i++) {
      if (topSoldItems.length < 5) {
        topSoldItems.push(result.aldoStore[i]);
      } else {
        for (let j = 0; j < topSoldItems.length; j++) {
          if (topSoldItems[j].inventory > result.aldoStore[i].inventory) {
            topSoldItems.splice(j, 1);
            topSoldItems.push(result.aldoStore[i]);
            i++;
          } else {
            continue;
          }
        }
      }
    }
    return topSoldItems;
  },
  latestSaleCompleted: () => {
    return result.aldoStore.slice(-1);
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
