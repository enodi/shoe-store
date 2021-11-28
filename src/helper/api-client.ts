export const getLatestSales = () => {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: "{ store {model store inventory} }" }),
  })
    .then((res) => res.json())
    .then((data) => data?.data?.store)
}

export const getTopProducts = () => {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: "{ highInventoryStores {model store inventory} }" }),
  })
    .then((res) => res.json())
    .then((data) => data?.data?.highInventoryStores)
}

export const getLeastProducts = () => {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: "{ lowInventoryStores {model store inventory} }" }),
  })
    .then((res) => res.json())
    .then((data) => data?.data?.lowInventoryStores)
}

export const latestSaleCompleted = () => {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: "{ latestSaleCompleted {model store inventory} }" }),
  })
    .then((res) => res.json())
    .then((data) => data?.data?.latestSaleCompleted)
}
