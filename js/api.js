import {apiEndpoint, isTest} from "../config.js";


let tgWebAppData = null

let testKeyBatches = [
  {
    sold: 1,
    qty: 1,
    cre: Date.now()
  },
  {
    sold: 2,
    qty: 2,
    cre: Date.now()
  },
]

export function initTgWebAppData(data) {
  if (data !== "" && data !== undefined && data !== null)
    tgWebAppData = data
}

export function getKeybatches() {
  if (isTest) return Promise.resolve(testKeyBatches)
  else {
    return fetch(`${apiEndpoint}/api/v1/keybatches`, {
      headers: {"X-WebAppData": tgWebAppData},
      mode: "cors"
    }).then (response => response.json())
  }
}

export function putKeybatch(file) {
  return fetch(`${apiEndpoint}/api/v1/keybatch`, {
    headers: {
      "X-WebAppData": tgWebAppData,
      // Content-Type may need to be completely **omitted**
      // or you may need something
      //"Content-Type": "You will perhaps need to define a content-type here"
    },
    mode: "cors",
    method: "POST",
    body: file
  })
}