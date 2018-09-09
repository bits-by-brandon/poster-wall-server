let timeline = new TimelineMax({ repeat: -1, repeatDelay: 1 });

const socket = io();
const cardList = document.getElementsByClassName("card");
const alertText = document.getElementById("alert-text");
const alertWrapper = document.getElementById("alert");

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
        case "spotlight":
          spotlight(timeline, cardList, []);
          break;
        case "pulse":
          pulse(timeline, cardList);
          break;
      }
    }
  );
});

socket.on("COMMAND", function(command) {
  showAlert("running command: " + command);

  switch (command) {
    case "off":
      off();
    case "off":
  }
});

function showAlert(msg) {
  alertText.innerHTML = msg;

  TweenLite.to(alertWrapper, 0.5, { opacity: 1, ease: Power1.easeIn });
  TweenLite.to(alertWrapper, 0.5, {
    opacity: 0,
    ease: Power1.easeIn,
    delay: 3
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function off() {
  timeline.clear();
  TweenLite.to(".card", 0.3, { opacity: 0, ease: Power1.easeIn });
}

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

// spotlight(cardList, []);
//  chase(cardList, 0);
//  scan(timeline, cardList);
// pulse(timeline);
//  gScan(cardList, false);
