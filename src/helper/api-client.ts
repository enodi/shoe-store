export const getAllProducts = () => {
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
    body: JSON.stringify({ query: "{ topStore {model store inventory} }" }),
  })
    .then((res) => res.json())
    .then((data) => data?.data?.topStore)
}

export const getLeastProducts = () => {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: "{ leastStore {model store inventory} }" }),
  })
    .then((res) => res.json())
    .then((data) => data?.data?.leastStore)
}
