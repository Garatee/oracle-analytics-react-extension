var zillowHardcodedData = "[[[1725000],4,3,1421],[[369000],3,2,1650],[[1399000],3,2,1047],[[2399000],4,4,2439],[[529888],1,1,564],[[299000],3,2,1693],[[1439000],3,2,1262],[[899000],2,2,1083]]"

////////////////////////////////// helper functions //////////////////////////////////
/**
 * 
 * @param filename 
 *  ex. table.csv
 * @param csvTwoDimensionalArray 
 *  ex. [
 *         ["id", "fruit"],
 *         ["1",  "apple"],
 *         ["2",  "orange"]
 *      ]
 */
function csvDownloadHelper(filename, csvTwoDimensionalArray) {
  // map to a csv string
  const csv = csvTwoDimensionalArray.map(arr => arr.join(",")).join("\r\n");

  // add csv file extension if necessary
  if(!filename.endsWith(".csv")) {
      filename = filename + ".csv";
  }

  // initiate the download
  let downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(new Blob([csv], {type: "text/csv"}));
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // add hidden element
  addHiddenCvsTag(filename);
}

function tableDownloadHelper(tableDOM) {
  table = tableDOM.cloneNode(true);
  let csv = [];
  let rows = table.rows;				
  for (let i = 0; i < rows.length; i++) {
      let row = [], cols = rows[i].querySelectorAll("td, th");	
      for (let j = 0; j < cols.length; j++) {
          let columnItem = cols[j].innerText.replace(/"/g, "\"\""); //as per rfc4180
          columnItem = columnItem.replace(/(\r\n\t|\n|\r\t)/gm," ").trim(); //New lines are nothing but trouble										
          cols[j].querySelectorAll("img").forEach(function(ele){ columnItem = columnItem + (columnItem.length > 0 ? " " : "") + ele.src; });
          cols[j].querySelectorAll("input, textarea").forEach(function(ele){ columnItem = columnItem + (columnItem.length > 0 ? " " : "") + ele.value + " (i)"; });
          row.push("\"" + columnItem + "\"");
          for(let a = 1; a < cols[j].colSpan; a++){
              row.push("\"\""); //keep alignment by adding empty cells for colSpan
          }
          for(let a = 1; a < cols[j].rowSpan; a++){
              rows[i+a].insertBefore(document.createElement("td"), rows[i+a].children[j]); //keep alignment by adding empty cells for rowSpan
          }
      }
      csv.push(row);  				
  }
  
  // // disable prompt because it affects selenium
  // let filename = prompt("File name: ", (table.id || table.id.length > 0) ? table.id : "table");
  const filename = (table.id || table.id.length > 0) ? table.id : "table";
  csvDownloadHelper(filename, csv);
}


// adds a hidden <div> tag with a special id for selenium to pick up
function addHiddenCvsTag(info) {
  const hiddenElement = document.createElement("div"); 
  hiddenElement.setAttribute("id", "hidden_element_for_selenium");
  hiddenElement.style.display = "none";
  document.body.appendChild(hiddenElement); 
  hiddenElement.innerText = info;
}

function startDownloadRightClick() {
  if(document.getSelection().focusNode == null)return;
  let clickedEl = document.getSelection().focusNode.parentElement;
  let table = clickedEl.closest("table");		
  if(table === null){
      alert("No HTML table was found");
      return;
  }
  tableDownloadHelper(table);
}

function startZillow(){
  // Zillow data download
  let prices = document.getElementsByClassName('list-card-price');
  let infos = document.getElementsByClassName('list-card-details');
  if(prices.length != infos.length){
    alert("lengths do not match");
    return;
  }
  let csv = [];
  for(let i = 0; i < prices.length; i++){
      let row = [];
      let price = prices[i].innerText.replace(/,/g,'').match(/\d+/g).map(Number);
      row.push(price);
      let info = infos[i].innerText.replace(/,/g,'').match(/\d+/g).map(Number);
      for (let j = 0; j< info.length; j++){
          row.push(info[j]);
      }
      csv.push(row);
  }
  csvDownloadHelper("zillow_table", csv);
}


//////////////////////////////////////  main /////////////////////////////////////

// get current url
try {
  if(window.hasOwnProperty("dltcsvRightClick") && dltcsvRightClick)
  {
    dltcsvRightClick = false;
    startDownloadRightClick();
  }
  else if(window.hasOwnProperty("tableIdToDownload") && tableIdToDownload.length > 0) {
    const tableToDownload = document.getElementById(tableIdToDownload);
    tableIdToDownload = "";
    tableDownloadHelper(tableToDownload)
  }
  else if(window.hasOwnProperty("downloadZillow") && downloadZillow.length > 0) {
    csvDownloadHelper("zillow_table_94035", JSON.parse(zillowHardcodedData))
  }
  else if(window.hasOwnProperty("downloadCurrentZillow") && downloadCurrentZillow.length > 0) {
    downloadCurrentZillow = "";
    startZillow();
  }
  
}
catch(err) {
  alert(err);
}