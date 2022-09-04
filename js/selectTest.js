var testArray = [
  "Select a Test",
  "The Writing System Hiragana",
  "The Writing System Katakana",
  "Basic Grammar State of Being 1",
  "Basic Grammar State of Being 2",
];


function selectTest() {
  var selectTest = document.getElementById("select-test");
  //Create testArray of options to be added

  //Create and append select list
  var selectList = document.createElement("select");
  selectList.setAttribute("class", "form-select", "onfocus", "this.size=10", "onblur", "this.size=1", "onchange", "this.size=1; this.blur()");
  selectTest.appendChild(selectList);

  //Create and append the options
  for (var i = 0; i < testArray.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", testArray[i]);
    option.text = testArray[i];
    selectList.appendChild(option);
  }
}