import  { getKeybatches, putKeybatch } from "./api.js";


export function keyBatches(parent) {
  parent.innerHTML = ``
  keyBatchesList().then( element => {
    parent.appendChild(element)
    parent.appendChild(keyBatchUpload())
  })
}

function keyBatchesList() {
  return getKeybatches().then( batches => {
    const element = document.createElement("div")
    batches.forEach( item => {
      element.appendChild(batchElement(item))
    })
    return element
  })
}

function batchElement(batch) {
  const element = document.createElement("div")
  const date = new Date(batch.cre)
  element.innerHTML = `Batch ${batch.sold}&nbsp/&nbsp${batch.qty} &nbsp&nbsp${date.toDateString()}`
  return element
}

function keyBatchUpload() {
  const element = document.createElement("div")
  element.innerHTML = `
    <form>
      <div>
        <input type="file">
      </div>
    </form>
<script>
  `
  element.addEventListener('change', onSelectFile, false);
  return element
}

function onSelectFile(e) {
  putKeybatch(e.target.files[0]).then(
      response => response.json() // if the response is a JSON object
  ).then(
      keyBatches(document.body)
  ).catch( error => {
    console.error(error)
    displayError(error)
  })
}

function displayError(error) {
  document.body.innerHTML = ""
  const title = document.createElement("p")
  title.classList.add("hint")
  title.textContent = `Error`
  document.body.appendChild(title)
  const errorLabel = document.createElement("p")
  errorLabel.classList.add("hint")
  errorLabel.textContent = `${error}`
  document.body.appendChild(errorLabel)
}