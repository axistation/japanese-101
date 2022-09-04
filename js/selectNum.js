var numArray = [
  "5",
  "10",
  "20",
  "50",
  "100",
];

function selectNum() {
 
  var selectNum = document.getElementById("select-num");
  //Create numArray of options to be added

  //Create and append select list
  var selectList = document.createElement("select");
  selectList.setAttribute("class", "form-select", "onfocus", "this.size=10", "onblur", "this.size=1", "onchange", "this.size=1; this.blur()");
  selectNum.appendChild(selectList);

  //Create and append the options
  for (var i = 0; i < numArray.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", numArray[i]);
    option.text = numArray[i];
    selectList.appendChild(option);
  }
}