import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Table from "./Table";
import { array, final } from "./Array";

// Generate random starting index
var index1 = Math.floor(Math.random() * 6);
var index2 = Math.floor(Math.random() * 6);
if (index1 === index2) location.reload();

var rows, setRows;

var current = [];

// Compare two arrays
function compare(a, b) {
  if (a.length != b.length) return false;
  for (let i = 0; i < b.length; i++)
    for (let j = 0; j < b[i].length; j++) if (a[i][j] !== b[i][j]) return false;
  return true;
}

// Remove duplicates and similar duplicates
// duplicate is for example [1,1] and [1,1]
// similar duplicate is for example [2,3] and [3,2]
// keep element with smaller starting index value [2,3]
function makeUnique(arr) {
  var items = {};
  for (var i = 0; i < arr.length; i++) {
    let [a, b] = arr[i];
    const hashKey = [Math.min(a, b), Math.max(a, b)];
    var stringified = JSON.stringify(hashKey);

    if (stringified in items) {
      let previous = items[stringified];
      if (previous[0] > arr[i][0]) items[stringified] = arr[i];
    } else items[stringified] = arr[i];
  }

  return Object.values(items);
}

// Update everything on submit
const update = () => {
  // Input values
  let a = document.getElementById("input1").value;
  let b = document.getElementById("input2").value;
  if (a === "" || b == "") {
    document.getElementById("empty").innerHTML = "Value cannot be empty";
    return;
  } else if (a === b) {
    document.getElementById("empty").innerHTML = "Values cannot be equal";
    return;
  } else document.getElementById("empty").innerHTML = "";

  // Increasing by one, sorting and updating
  let newArr = [...array];
  if (a > b) newArr[index1].score++;
  else newArr[index2].score++;
  newArr.sort((a, b) => b.score - a.score);
  for (let i = 0; i < 6; i++) newArr[i].position = i + 1;
  setRows(newArr);

  // previous index
  let c = index1;
  let d = index2;

  // new index1 and index2 must be different
  // new index1 and index must be different from previous
  // everything must be unique
  while (1) {
    index1 = Math.floor(Math.random() * 6);
    index2 = Math.floor(Math.random() * 6);
    for (let i = 0; i < current.length; i++)
      if (
        (current[i][0] === index1 && current[i][1] === index2) ||
        (current[i][0] === index2 && current[i][1] === index1)
      )
        continue;
    if (
      index1 !== index2 &&
      index1 !== c &&
      index2 !== d &&
      index1 !== d &&
      index2 !== c
    )
      break;
  }

  // Push current pair, sort current array, make everything unique
  current.push([c, d]);
  current.sort((c, d) => c[0] + c[1] - d[0] - d[1]);
  current = makeUnique(current);
  current.filter((x) => x !== undefined);
  current.sort((c, d) => c[0] + c[1] - d[0] - d[1]);

  // testing
  document.getElementById("write").innerHTML =
    "Indexes of compared: " + JSON.stringify(current);
  document.getElementById("len").innerHTML =
    "Number of compared: " + current.length;

  document.getElementById("name1").innerHTML = rows[index1].name + ": ";
  document.getElementById("name2").innerHTML = rows[index2].name + ": ";
  document.getElementById("input1").value = "";
  document.getElementById("input2").value = "";

  // every item value is compared to every other item value
  // scoring is over
  // duplicate or similar duplicate is not possible
  // final array has 15 unique elements
  if (current.length === 15) {
    document.getElementById("empty").innerHTML =
      "Everything compared. SCORING FINISHED!";
    document.getElementById("reset").innerHTML = "Reset";
    return;
  }
};

const handleReset=()=>location.reload();

const Form = () => {
  return (
    <form id="myForm" className="table" action="javascript:return 0">
      <label id="name1" for="input1">
        {rows[index1].name}:{" "}
      </label>
      <input type="number" name="a" id="input1"></input>
      <br />
      <label id="name2" for="input1">
        {rows[index2].name}:{" "}
      </label>
      <input type="number" name="b" id="input2"></input>
      <br />
      <br />
      <button type="submit" className="btn-s" onClick={update}>
        SUBMIT
      </button>
      <p id="empty"></p>
      <a onClick={handleReset} id="reset"></a>
      <p id="len"></p>
      <p id="write"></p>
    </form>
  );
};

const App = () => {
  [rows, setRows] = useState(array);
  const [isShown, setIsShown] = useState(false);

  const toggleForm = () => setIsShown((current) => !current);

  return (
    <div className="container">
      <h1>SCORING</h1>
      <Table data={rows} />
      <br />
      <button className="btn" onClick={toggleForm}>
        TOGGLE FORM
      </button>
    
	<a class="btn-p" href="#popup1">INFO</a>

      <div id="popup1" class="overlay">
	<div class="popup">
		<h2>Information</h2>
		<a class="close" href="#">&times;</a>
		<div class="content">
    <p>Application is built using React.js.</p>
    <p>List items have pre-defined names and score attributes that start at 0. </p>
    <p>The position attribute represents the position within the list.</p>
    <p>TOGLLE FORM button randomly generates form with items from list, inputs, and submit button.</p> 
    <p>SUBMIT button enables list item with higher value to have its score attribute value increased by one.</p>
    <p>List is after that sorted by the value of the score attribute. </p>
    <p>This process continues until every item is compared with every other item in the list.</p>
    <a id="portfolio" href="https://amarhusika.netlify.app">Developer: Amar Husika</a>
		</div>
	</div>
</div>
      <br />
      {isShown && <Form />}
    </div>
  );
};

export default App;
