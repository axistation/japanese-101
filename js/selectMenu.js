var array = [
  "Select a Test",
  "The Writing System Hiragana",
  "The Writing System Katakana",
  "Basic Grammar State of Being 1",
  "Basic Grammar State of Being 2",
];


function selectMenu() {
  var selectMenu = document.getElementById("selectMenu");
  //Create array of options to be added

  //Create and append select list
  var selectList = document.createElement("select");
  selectList.setAttribute("class", "form-select", "onfocus", "this.size=10", "onblur", "this.size=1", "onchange", "this.size=1; this.blur()");
  selectMenu.appendChild(selectList);

  //Create and append the options
  for (var i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", array[i]);
    option.text = array[i];
    selectList.appendChild(option);
  }
}