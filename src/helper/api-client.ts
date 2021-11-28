const fetchQuery = (query: string) => {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  })
}
export const getLatestSales = () => {
  return fetchQuery("{ store {model store inventory} }")
    .then((res) => res.json())
    .then((data) => data?.data?.store)
}

export const getTopProducts = () => {
  return fetchQuery("{ highInventoryStores {model store inventory} }")
    .then((res) => res.json())
    .then((data) => data?.data?.highInventoryStores)
}

export const getLeastProducts = () => {
  return fetchQuery("{ lowInventoryStores {model store inventory} }")
    .then((res) => res.json())
    .then((data) => data?.data?.lowInventoryStores)
}

export const latestSaleCompleted = () => {
  return fetchQuery("{ latestSaleCompleted {model store inventory} }")
    .then((res) => res.json())
    .then((data) => data?.data?.latestSaleCompleted)
}
