var zillowHardcodedData = `[["No. of Bedrooms","No. of Bathrooms","Square Feet","Zipcode","City","House Type","Housing Price"],[3,2,1248,"94089","Sunnyvale","Home",[188000]],[3,2,1693,"94043","Mountain View","House",[1999950]],[3,2,2025,"94089","Sunnyvale","Home",[350000]],[5,4,2103,"94089","Sunnyvale","House",[1888888]],[2,3,1410,"94041","Mountain View","Townhouse",[1249999]],[2,3,1206,"94043","Mountain View","Townhouse",[1169000]],[2,2,1193,"94043","Mountain View","Townhouse",[1180000]],[3,2,1056,"94085","Sunnyvale","House",[1268000]]]`

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
  let addresses = document.getElementsByClassName('list-card-addr');
  let housetype = document.getElementsByClassName('list-card-statusText');
  if(prices.length != infos.length){
    alert("lengths do not match");
    return;
  }
  let csv = [];
  columnname = ['No. of Bedrooms','No. of Bathrooms','Square Feet','Zipcode','City','House Type','Housing Price'];
  csv.push(columnname);
  for(let i = 0; i < prices.length; i++){
      let row = [];
      let price = prices[i].innerText.replace(/,/g,'').match(/\d+/g).map(Number);
      let info = infos[i].innerText.replace(/,/g,'').match(/\d+/g).map(Number);
      for (let j = 0; j< info.length; j++){
          row.push(info[j]);
      }
      let address = addresses[i].innerText;
      let zip = address.substr(address.length-5);
      let city= address.split(',')[1].substr(1);
      let type = housetype[i].innerText.substr(2).split(' ')[0];
      row.push(zip);
      row.push(city);
      row.push(type);
      row.push(price);
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