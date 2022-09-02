$(document).ready(function() {

  var questionBank = new Array;
  var currentQuestionNumber;
  var currentAnswer;
  var numberOfQuestions;
  var gamePosition;
  var score;

  var instruction;
  selectMenu();
  $("#selectMenu")
    .change(function() {
      var str = "";
      $("select option:selected").each(function() {
        str += $(this).text() + ".json";
      });
      str = str.replace(/\s+/g, '-').toLowerCase();

      $.getJSON(`./data/${str}`, function(data) {
        instruction = data.instruction;
        questionBank = [];
        typeArray = [];
        numberOfQuestions = data.qlist.length;
        for (i = 0; i < data.qlist.length; i++) {
          typeArray = [];
          typeArray[0] = data.qlist[i].q;
          typeArray[1] = data.qlist[i].a;
          questionBank[i] = typeArray;
        }
        gamePosition = 1;
        resetGame();
        updateQuestion();
      })//getJSON
    })
    .change();




  function resetGame() {
    scrambleQuestions();
    currentQuestionNumber = 0;
    score = 0;
    $("#gameArea").empty();
    $("#gameArea").append(`<p>${instruction}</p>`);
    $("#gameArea").append('<p id="wordBox">Sentence 1</p>');
    $("#gameArea").append('<input type="text" id="inputBox" autocomplete="off">');
    $("#gameArea").append('<div id="feedback"></div>');
    $("#gameArea").append('<p id="message"></p>');
  };//resetGame


  function scrambleQuestions() {
    var tempArray = new Array;
    for (i = 0; i < numberOfQuestions * 2; i++) {
      rnd1 = Math.floor(Math.random() * numberOfQuestions);
      rnd2 = Math.floor(Math.random() * numberOfQuestions);
      tempArray = questionBank[rnd1];
      questionBank[rnd1] = questionBank[rnd2];
      questionBank[rnd2] = tempArray;
    }
  }//scramble questions


  function updateQuestion() {
    $('#wordBox').empty();
    $('#wordBox').append(questionBank[currentQuestionNumber][0]);
    $('#message').empty();
    $('#feedback').empty();
    $('#inputBox').empty();
    $('#inputBox').prop("disabled", false);
    $('#inputBox').val('');
    $('#inputBox').css("background-color", "white");
    $('#inputBox').css("color", "black");
    $('#inputBox').focus();
    currentAnswer = questionBank[currentQuestionNumber][1];
    currentQuestionNumber++;
    gamePosition = 1;
  }//updateQuestion

  $(document).on("keyup", function(e) {
    if (e.which == 13) { gameControl(); };
  });

  // $(document).on("click tap",function(){
  // 	gameControl();
  // });//tap

  $("#btn").click(function() {
    gameControl();
  });

  function gameControl() {
    switch (gamePosition) {
      case 1:
        checkAnswer();
        break;
      case 2:
        updateQuestion();
        break;
      case 3:
        scorePage();
        break;
      case 4:
        resetGame();
        updateQuestion();
        break;
    }//switch	
  }//gamecontrol

  function checkAnswer() {
    myAnswer = $('#inputBox').val();
    if (myAnswer.slice(myAnswer.length - 1, myAnswer.length) == " ") {
      myAnswer = myAnswer.slice(0, myAnswer.length - 1);
    }
    if (currentAnswer.toLowerCase() == myAnswer.toLowerCase()) {
      score++;
      $('#feedback').append('<img src="tick.png">');
      $('#inputBox').css("background-color", "green");
      $('#inputBox').css("color", "white");
    }
    else {
      $('#feedback').append('<img src="cross.png">');
      $('#inputBox').css("background-color", "red");
      $('#inputBox').css("color", "white");
      $('#inputBox').val($('#inputBox').val() + " (ans = " + currentAnswer + ")");
    }
    $('#message').append('Press <b>ENTER</b> or <b>SUBMIT</b> button to continue.');
    $("#inputBox").prop('disabled', true);
    $("#gameArea").focus();
    gamePosition = 2;
    if (currentQuestionNumber == numberOfQuestions) { gamePosition = 3; }
  }//checkAnswer

  function scorePage() {
    $("#gameArea").empty();
    $("#gameArea").append("<h1>You have finished the test.</h1><br><br>");
    $("#gameArea").append("Final score: <b>" + score + '</b> out of <b>' + numberOfQuestions + '</><br><br>');
    $("#gameArea").append("Press <b>ENTER</b> or <b>SUBMIT</b> button to continue.");
    gamePosition = 4;
  }//scorePage


});//doc ready