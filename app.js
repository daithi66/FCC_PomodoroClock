var pomodoro = {timerId:""}

$("#clockDisplay").mousedown(function() {
  if (document.getElementById("clockControl").style.visibility == "hidden") {
    clearInterval(pomodoro.timerId);
    $("#clockControl").css("visibility","visible");
  } else {
    $("#clockControl").css("visibility","hidden");
    if ($("#clockSec").html() == "00") {
      var time = $("#clockMin").html();
      time--;
      $("#clockMin").html(time);
      $("#clockSec").html("59");
    } else {
      var time = $("#clockSec").html();
      time--;
      $("#clockSec").html(time);
    }
    pomodoro.timerId = setInterval(updateClock, 1000);
  }
});

function updateClock() {
  var time = $("#clockSec").html();
  time--;
  if (time == 0) {
    time = $("#clockMin").html();
    time--;
    $("#clockMin").html(time);
    if (time == -1) {
      switchClocks();
    }
    time = 59;
  }
  if (time < 10) {
    time = "0" + time.toString();
  }
  $("#clockSec").html(time);
}

function switchClocks() {
  if ($("#clockTitle").html() == "SESSION") {
    var msg = new SpeechSynthesisUtterance('It is time to take a break.');
    window.speechSynthesis.speak(msg);
    $("#clockTitle").html("BREAK");
    var time = $("#breakTime").html();
    time--;
    $("#clockMin").html(time);
  } else {
    var msg = new SpeechSynthesisUtterance('Break is over, so back to work.');
    window.speechSynthesis.speak(msg);
    $("#clockTitle").html("SESSION");
    var time = $("#sessionTime").html();
    time--;
    $("#clockMin").html(time);
  }
}

$("#breakMinus").mousedown(function() {
  clearInterval(pomodoro.timerId);
  $("#clockControl").css("visibility","visible");
  var breakTime = $("#breakTime").html();
  if (breakTime >= 2) {
    $("#breakTime").html(breakTime-1); 
  } 
  resetClock("BREAK", $("#breakTime").html());
});

$("#breakLength > div:nth-child(1)").mousedown(function() {
  clearInterval(pomodoro.timerId);
  $("#clockControl").css("visibility","visible");
  var breakTime = $("#breakTime").html();
  resetClock("BREAK", $("#breakTime").html());
});

$("#breakPlus").mousedown(function() {
  clearInterval(pomodoro.timerId);
  $("#clockControl").css("visibility","visible");
  var breakTime = $("#breakTime").html();
  if (breakTime <= 89) {
    $("#breakTime").html(Number(breakTime)+1); 
  } 
  resetClock("BREAK", $("#breakTime").html());
});

$("#sessionMinus").mousedown(function() {
  clearInterval(pomodoro.timerId);
  $("#clockControl").css("visibility","visible");
  var sessionTime = $("#sessionTime").html();
  if (sessionTime >= 2) {
    $("#sessionTime").html(sessionTime-1); 
  } 
  resetClock("SESSION", $("#sessionTime").html());
});

$("#sessionLength > div:nth-child(1)").mousedown(function() {
  clearInterval(pomodoro.timerId);
  $("#clockControl").css("visibility","visible");
  var sessionTime = $("#sessionTime").html();
  resetClock("SESSION", $("#sessionTime").html());
});

$("#sessionPlus").mousedown(function() {
  clearInterval(pomodoro.timerId);
  $("#clockControl").css("visibility","visible");
  var sessionTime = $("#sessionTime").html();
  if (sessionTime <= 89) {
    $("#sessionTime").html(Number(sessionTime)+1); 
  } 
  resetClock("SESSION", $("#sessionTime").html());
});

function resetClock(mode, time) {
  if (mode == "BREAK" && $("#clockTitle").html() == "SESSION") {
    $("#clockTitle").html("BREAK");
  } else if (mode == "SESSION" && $("#clockTitle").html() == "BREAK") {
    $("#clockTitle").html("SESSION");
  }
  $("#clockMin").html(time);
  $("#clockSec").html("00");
}

$("#breakLength > div:nth-child(1)").mousedown(function() {
  var breakTime = $("#breakTime").html();
  if ($("#clockTitle").html == "SESSION") {
    $("#clockTitle").html = "BREAK";
  } 
  $("#clockMin").html = breakTime;
  $("#clockSec").html = "00";
});

function alarm() {
  var msg = new SpeechSynthesisUtterance('It is time to take a break.');
  window.speechSynthesis.speak(msg);
}