const img = [
    'img/rdesign_rock.png',
    'img/rdesign_scissors.png',
    'img/rdesign_paper.png',
  ];
  
  let changeLoop = false;
  let timer = 20;
  let timerId;
  let winCount = 0;
  let gameActive = false;
  
  const R_Click = p_janken_r => {
    if (!gameActive) return;
    changeLoop = false;
    const janken_r = weightedRandom();
    jankenpon.src= img[janken_r];
    const result = ['あいこ', '負け～', '勝ち！'][(3 + p_janken_r - janken_r) % 3];
    Rejan2.textContent = result;
    if (result === '勝ち！') {
      winCount++;
      document.getElementById('winCount').textContent = winCount;
    }
  };
  
  const re = () => {
    if (gameActive) return;
    gameActive = true;
    winCount = 0;
    document.getElementById('winCount').textContent = winCount;
    picChange();
    Rejan2.textContent = "じゃんけん・・・";
    timer = 20;
    document.getElementById('timer').textContent = timer;
    timerId = setInterval(countDown, 1000);
  };
  

  //Count Down
  const countDown = () => {
    timer--;
    document.getElementById('timer').textContent = timer;

    // Update color based on remaining time
    if (timer >= 15) {
        document.getElementById('timer').style.color = 'black';
    } else if (timer >= 8) {
        document.getElementById('timer').style.color = 'orange';
    } else {
        document.getElementById('timer').style.color = 'red';
    }

    if (timer === 0) {
        clearInterval(timerId);
        gameActive = false;
        document.getElementById('Rejan2').textContent = "時間切れ！";
    }
};


// Random Probability
let highProbHand;
let midProbHand;
let lowProbHand;

const weightedRandom = () => {
    let randomValue = Math.random();

    // Decide which hand has the high probability randomly for each time period
    if (timer === 20 || timer === 15 || timer === 7) {
        highProbHand = Math.floor(Math.random() * 3);
        midProbHand = (highProbHand + 1) % 3;
        lowProbHand = (highProbHand + 2) % 3;
    }

    if (timer >= 15) {
        // All hands have equal probability
        return Math.floor(Math.random() * 3);
    } else if (timer >= 7) {
        if (randomValue < 0.6) {
            return highProbHand;
        } else if (randomValue < 0.8) {
            return midProbHand;
        } else {
            return lowProbHand;
        }
    } else {
        if (randomValue < 0.8) {
            return highProbHand;
        } else if (randomValue < 0.9) {
            return midProbHand;
        } else {
            return lowProbHand;
        }
    }
};


// Pic Change
  const picChange = () => {
    if (changeLoop) return;
    changeLoop = true;
    let count = 0;
    (function loop() {
      if (changeLoop) {
        jankenpon.src = img[++count % 3];
        setTimeout(loop, 100);
      }
    })();
  };
  picChange();
  


//カウントダウンあり
// const img = [
//     'img/rdesign_rock.png',
//     'img/rdesign_scissors.png',
//     'img/rdesign_paper.png',
//   ];
  
//   let changeLoop = false;
//   let timer = 20;
//   let timerId;
//   let winCount = 0;
//   let gameActive = false;
  
//   const R_Click = p_janken_r => {
//     if (!gameActive) return;
//     changeLoop = false;
//     const janken_r = Math.floor( Math.random() * 3);
//     jankenpon.src= img[janken_r];
//     const result = ['あいこ', '負け～', '勝ち！'][(3 + p_janken_r - janken_r) % 3];
//     Rejan2.textContent = result;
//     if (result === '勝ち！') {
//       winCount++;
//       document.getElementById('winCount').textContent = '勝ち数: ' + winCount;
//     }
//   };
  
//   const re = () => {
//     if (gameActive) return;
//     gameActive = true;
//     winCount = 0;
//     document.getElementById('winCount').textContent = '勝ち数: ' + winCount;
//     picChange();
//     Rejan2.textContent = "じゃんけん・・・";
//     timer = 20;
//     document.getElementById('timer').textContent = timer;
//     timerId = setInterval(countDown, 1000);
//   };
  
//   const countDown = () => {
//     timer--;
//     document.getElementById('timer').textContent = timer;
//     if (timer === 0) {
//       clearInterval(timerId);
//       gameActive = false;
//       Rejan2.textContent = "時間切れ！";
//     }
//   };
  
//   const picChange = () => {
//     if (changeLoop) return;
//     changeLoop = true;
//     let count = 0;
//     (function loop() {
//       if (changeLoop) {
//         jankenpon.src = img[++count % 3];
//         setTimeout(loop, 100);
//       }
//     })();
//   };
//   picChange();
  



//シンプルじゃんけん
// const img = [
//   'img/rdesign_rock.png',
//   'img/rdesign_scissors.png',
//   'img/rdesign_paper.png',
// ];

// let changeLoop = false;

// const R_Click = p_janken_r => {
//   changeLoop = false;
//   const janken_r = Math.floor( Math.random() * 3);
//   jankenpon.src= img[janken_r];
//   Rejan2.textContent = ['あいこ', '負け～', '勝ち！'][(3 + p_janken_r - janken_r) % 3];
// };

// const re = () => {
//   picChange();
//   Rejan2.textContent = "じゃんけん・・・";
// };

// const picChange = () => {
//   if (changeLoop) return;
//   changeLoop = true;
//   let count = 0;
//   (function loop() {
//     if (changeLoop) {
//       jankenpon.src = img[++count % 3];
//       setTimeout(loop, 100);
//     }
//   })();
// };
// picChange();
