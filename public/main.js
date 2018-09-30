let timeline = new TimelineMax({ repeat: -1, repeatDelay: 1 });

const storage = window.localStorage;
const socket = io();
const cardList = document.getElementsByClassName("card");
const alertText = document.getElementById("alert-text");
const alertWrapper = document.getElementById("alert");

// ==============
// === UUID Setup
let foundUID = storage.getItem('UID');
if(!foundUID){
} else {
}

socket.on("MESSAGE", function(msg) {
  showAlert(msg);
});

socket.on("SET_PATTERN", function(pattern) {
  showAlert("switching pattern to: " + pattern);

  //Turn all posters off
  TweenLite.to(".card", 0.3, { opacity: 0, ease: Power1.easeIn }).eventCallback(
    "onComplete",
    function() {
      // Execute pattern
      switch (pattern) {
        case "SPOTLIGHT":
          spotlight(timeline, cardList, []);
          break;
        case "PULSE":
          pulse(timeline, cardList);
          break;
      }
    }
  );
});

// Executes appropriate command based on string identifier
socket.on("EXECUTE_COMMAND", executeCommand);
function executeCommand(command, alertUser = true) {
  if (alertUser) {
    showAlert("running command: " + command);
  }
  switch (command) {
    case "OFF":
      off(timeline);
      break;
    case "ON":
      on(timeline);
      break;
    case "REFRESH_BROWSER":
      refreshBrowser();
      break;
  }
}

/**
 * Temporarily displays an alert prompt on the screen with the passed in
 * message
 * @param {string} message - Message to be displayed
 */
function showAlert(message) {
  alertText.innerHTML = message;

  TweenLite.to(alertWrapper, 0.5, { opacity: 1, ease: Power1.easeIn });
  TweenLite.to(alertWrapper, 0.5, {
    opacity: 0,
    ease: Power1.easeIn,
    delay: 3
  });
}

/**
 * Returns a random integer between the min and max values provided
 * @param {number} min - (inclusive)
 * @param {number} max - (inclusive)
 * @return {number} randomNumber
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Turns all poster off and clears timeline
 * @param {TimelineMax} timeline
 */
function off(timeline) {
  timeline.clear();
  TweenLite.to(".card", 0.3, { opacity: 0, ease: Power1.easeIn });
}

/**
 * Turns all poster on and clears timeline
 * @param {TimelineMax} timeline
 */
function on(timeline) {
  timeline.clear();
  TweenLite.to(".card", 0.3, { opacity: 1, ease: Power1.easeIn });
}

/**
 * Refreshes the browser window
 */
function refreshBrowser() {
  window.location.reload(true);
}

// ========= Patterns

function spotlight(timeline, cardList, spotlightedArray) {
  console.log("spotlight");
  timeline.clear();
  timeline.repeat(0);

  let random;
  if (spotlightedArray.length === cardList.length) {
    spotlightedArray = [];
  }
  do {
    random = getRandomInt(0, cardList.length);
  } while (spotlightedArray.includes(random));
  spotlightedArray.push(random);
  console.log(spotlightedArray);
  timeline.add(TweenLite.to(cardList[random], 1, { opacity: 1 }));
  timeline.add(
    TweenLite.to(cardList[random], 1, { opacity: 0, delay: 4 }).eventCallback(
      "onComplete",
      function() {
        spotlight(timeline, cardList, spotlightedArray);
      }
    )
  );
}

function pulse(timeline) {
  console.log("pulse");
  timeline.clear();
  timeline.repeat(-1);
  timeline.yoyo(true);
  timeline.to(".card", 5, { opacity: 1 }).to(".card", 5, { opacity: 0 });
}

function scan(timeline, cardList) {
  timeline.clear();

  const scanSpeed = 30;
  const glowSpeed = 1.3;
  const delaySpeed = 2;
  const preDelayFunc = function(i) {
    return (
      cardList[i].getBoundingClientRect().left *
      0.0001 *
      scanSpeed
    ).toFixed(3);
  };
  let max = preDelayFunc(0);
  for (let i = 0; i < cardList.length; i++) {
    max = Math.max(preDelayFunc(i), max);
  }
  const delayFunc = function(i) {
    return (
      max -
      cardList[i].getBoundingClientRect().left * 0.0001 * scanSpeed
    ).toFixed(3);
  };
  let delayMap = [];
  for (let i = 0; i < cardList.length; i++) {
    delayMap.push(delayFunc(i));
  }

  for (let i = 0; i < cardList.length; i++) {
    let loop = new TimelineMax();
    // let tl = new TimelineLite();
    loop
      .to(cardList[i], glowSpeed, {
        opacity: 1,
        ease: Power1.easeIn,
        delay: delaySpeed
      })
      .to(cardList[i], glowSpeed, { opacity: 0, ease: Power1.easeOut })
      .repeat(-1);

    // tl.from( cardList[i], glowSpeed, { opacity: 1, ease: Power0.easeOut, delay: delayMap[i] })
    //   .add( loop )

    timeline.add(
      new TimelineLite()
        .from(cardList[i], glowSpeed, {
          opacity: 1,
          ease: Power0.easeOut,
          delay: delayMap[i]
        })
        .add(loop)
    );
  }
}
