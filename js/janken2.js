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
    jankenpon.src = img[janken_r];
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
  
  // カウントダウン
  const countDown = () => {
    timer--;
    document.getElementById('timer').textContent = timer;
  
    // 時間経過と共に時間の色を変更
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
  
      // ユーザー名取得
      let username = document.getElementById('username').value;
  
      // スコアをローカルストレージに追加
      addScore(username, winCount);
  
      // ランキングテーブルを更新
      updateLeaderboard();
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
  
  // ランキングデータをローカルストレージに追加
  const addScore = (username, score) => {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    let date = new Date();
    let formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    scores.push({ username, score, date: formattedDate });
  
    // scoresを勝利数で降順ソートし、上位10位のみを保存
    scores.sort((a, b) => b.score - a.score);
    if (scores.length > 10) scores.length = 10;
  
    localStorage.setItem('scores', JSON.stringify(scores));
  };
  
  // ローカルストレージからランキングデータを取得
  const getScores = () => {
    return JSON.parse(localStorage.getItem('scores')) || [];
  };
  
  // ランキングテーブルを更新
  const updateLeaderboard = () => {
    let scores = getScores();
    let leaderboard = document.getElementById('leaderboard');
  
    // 全行をクリア（ヘッダー行以外）
    while (leaderboard.rows.length > 1) {
      leaderboard.deleteRow(1);
    }
  
    // ランキングデータをテーブルに追加
    for (let i = 0; i < scores.length; i++) {
      let row = leaderboard.insertRow(-1);
      let rankCell = row.insertCell(0);
      let nameCell = row.insertCell(1);
      let scoreCell = row.insertCell(2);
      let dateCell = row.insertCell(3);
  
      rankCell.textContent = i + 1;
      nameCell.textContent = scores[i].username;
      scoreCell.textContent = scores[i].score;
      dateCell.textContent = scores[i].date;
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
