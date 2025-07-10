document.addEventListener('DOMContentLoaded', () => {
    // Game Elements
    const startScreen = document.getElementById('start-screen');
    const gameContainer = document.getElementById('game-container');
    const player = document.getElementById('player');
    const obstaclesContainer = document.getElementById('obstacles-container');
    const coinsContainer = document.getElementById('coins-container');
    const backgroundElements = document.getElementById('background-elements');
    const scoreboard = {
        current: document.getElementById('current-score'),
        high: document.getElementById('high-score'),
        opponentHigh: document.getElementById('opponent-high-score'),
        opponentHighLabel: document.getElementById('opponent-high-score-label'),
        coins: document.getElementById('coin-count'),
    };
    const gameOverMessage = document.getElementById('game-over-message');
    const encouragementMessage = document.getElementById('encouragement-message');
    const restartButton = document.getElementById('restart-button');
    const taunt = {
        container: document.getElementById('taunt-container'),
        character: document.getElementById('taunt-character'),
        bubble: document.getElementById('taunt-bubble'),
    };

    // Character Selection
    const selectYoungmin = document.getElementById('select-youngmin');
    const selectNayoung = document.getElementById('select-nayoung');

    // Game State
    let currentPlayer, opponent;
    let score = 0;
    let highScore = 0;
    let opponentHighScore = 0;
    let coinCount = 0;
    let gameInterval, tauntInterval, obstacleGenerationInterval;
    let isGameOver = false;

    const obstacleTypes = [
        { class: 'obstacle-cactus-tall', width: 30, height: 60, collisionOffset: { top: 20, right: 20, bottom: 20, left: 20 } }, // Increased offset
        { class: 'obstacle-cactus-short', width: 40, height: 40, collisionOffset: { top: 20, right: 20, bottom: 20, left: 20 } }, // Increased offset
        { class: 'obstacle-bird', width: 40, height: 20, top: 280, collisionOffset: { top: 10, right: 10, bottom: 10, left: 10 } } // Increased offset
    ];

    const tauntMessages = {
        youngmin: [
            "이게 PT인의 최선이야?",
            "이런 마음가짐으로 김나영을 가지겠다..?",
            "게임은 아무래도 내가 낫지ㅋㅋ",
            "아직 멀었네ㅋㅋ",
            "그게 최선이야?",
            "좀 더 힘내봐!",
            "나 따라오려면 멀었지?",
            "벌써 지쳤어?",
            "이 정도 가지고는 안 돼!",
            "내 등만 보일걸?",
            "점프 실력 좀 늘려야겠네.",
            "나보다 잘할 수 있을까?",
            "포기하지 마! (비웃음)"
        ],
        nayoung: [
            "아직 멀었네ㅋㅋ",
            "그게 최선이야?",
            "좀 더 힘내봐!",
            "나 따라오려면 멀었지?",
            "벌써 지쳤어?",
            "이 정도 가지고는 안 돼!",
            "내 등만 보일걸?",
            "점프 실력 좀 늘려야겠네.",
            "나보다 잘할 수 있을까?",
            "포기하지 마! (비웃음)"
        ]
    };

    function selectCharacter(selected, other) {
        currentPlayer = selected;
        opponent = other;
        player.className = 'character-preview ' + currentPlayer;
        taunt.character.className = 'character-preview ' + opponent;
        startScreen.style.display = 'none';
        gameContainer.style.display = 'block';

        // Set opponent's high score label
        if (currentPlayer === 'youngmin') {
            scoreboard.opponentHighLabel.textContent = "NY's HIGH SCORE";
        } else {
            scoreboard.opponentHighLabel.textContent = "YM's HIGH SCORE";
        }

        loadHighScore();
        startGame();
    }

    selectYoungmin.addEventListener('click', () => selectCharacter('youngmin', 'nayoung'));
    selectNayoung.addEventListener('click', () => selectCharacter('nayoung', 'youngmin'));

    function loadHighScore() {
        highScore = localStorage.getItem(currentPlayer + '_highscore') || 0;
        scoreboard.high.textContent = highScore;

        opponentHighScore = localStorage.getItem(opponent + '_highscore') || 0; // Load opponent's high score
        scoreboard.opponentHigh.textContent = opponentHighScore;

        console.log(`Loaded High Score for ${currentPlayer}: ${highScore}`);
        console.log(`Loaded High Score for ${opponent}: ${opponentHighScore}`);
    }

    function saveHighScore() {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem(currentPlayer + '_highscore', highScore);
            scoreboard.high.textContent = highScore;
            console.log(`Saved New High Score for ${currentPlayer}: ${highScore}`);
        }
    }

    function startGame() {
        score = 0;
        coinCount = 0;
        scoreboard.current.textContent = score;
        scoreboard.coins.textContent = coinCount;
        isGameOver = false;
        gameOverMessage.style.display = 'none';
        encouragementMessage.style.display = 'none'; // Hide encouragement message on start
        
        clearInterval(gameInterval);
        clearInterval(tauntInterval);
        clearInterval(obstacleGenerationInterval);

        obstaclesContainer.innerHTML = ''; // Clear existing obstacles
        coinsContainer.innerHTML = ''; // Clear existing coins

        resetAnimations();
        updateBackground();

        document.addEventListener('keydown', handleJump);
        gameInterval = setInterval(updateGame, 10);
        tauntInterval = setInterval(showTaunt, 8000);
        obstacleGenerationInterval = setInterval(generateObstacleOrCoin, 2000); // Increased interval to 2 seconds
        console.log("Game Started!");
        console.log("Scoreboard elements:", scoreboard.current, scoreboard.high, scoreboard.coins);
    }

    function resetAnimations() {
        const animatedElements = [...document.querySelectorAll('.cloud, .mountain')];
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth; // Trigger reflow
        });
        // Reapply animations
        document.querySelector('.cloud1').style.animation = `moveCloud 20s linear infinite`;
        document.querySelector('.cloud2').style.animation = `moveCloud 15s linear infinite`;
        document.querySelector('.mountain1').style.animation = `moveMountain 30s linear infinite`;
        document.querySelector('.mountain2').style.animation = `moveMountain 25s linear infinite`;
    }

    function updateBackground() {
        backgroundElements.classList.remove('background-sky', 'background-city', 'background-ocean', 'background-fireworks');
        if (score < 5000) {
            backgroundElements.classList.add('background-sky');
        } else if (score < 10000) {
            backgroundElements.classList.add('background-city');
        } else if (score < 15000) {
            backgroundElements.classList.add('background-ocean');
        } else {
            backgroundElements.classList.add('background-fireworks');
        }
    }

    function generateObstacleOrCoin() {
        if (isGameOver) return;

        const random = Math.random();
        if (random < 0.4) { // 40% chance for obstacle (reduced from 50%)
            createObstacle();
        } else if (random < 0.8) { // 40% chance for coin (increased from 30%)
            createCoin();
        } else { // 20% chance for double obstacle (remains same)
            createObstacle();
            setTimeout(createObstacle, 500); // Create a second obstacle shortly after
        }
    }

    function createObstacle() {
        const obstacleDiv = document.createElement('div');
        obstacleDiv.classList.add('obstacle');
        const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        obstacleDiv.classList.add(type.class);
        obstacleDiv.style.width = type.width + 'px';
        obstacleDiv.style.height = type.height + 'px';
        if (type.top) obstacleDiv.style.top = type.top + 'px';
        obstacleDiv.dataset.collisionOffsetTop = type.collisionOffset.top;
        obstacleDiv.dataset.collisionOffsetRight = type.collisionOffset.right;
        obstacleDiv.dataset.collisionOffsetBottom = type.collisionOffset.bottom;
        obstacleDiv.dataset.collisionOffsetLeft = type.collisionOffset.left;
        
        obstaclesContainer.appendChild(obstacleDiv);

        // Set initial right position for animation
        obstacleDiv.style.right = '-50px'; // Start off-screen to the right
        // Start animation by re-applying it
        obstacleDiv.style.animation = 'none';
        void obstacleDiv.offsetWidth; // Trigger reflow
        obstacleDiv.style.animation = 'moveObstacle 4.5s linear forwards'; // Increased duration
        console.log("Obstacle created:", obstacleDiv);

        // Remove obstacle after it goes off screen
        obstacleDiv.addEventListener('animationend', () => {
            obstacleDiv.remove();
            console.log("Obstacle removed:", obstacleDiv);
        });
    }

    function createCoin() {
        const coinDiv = document.createElement('div');
        coinDiv.classList.add('coin');
        coinDiv.style.bottom = (Math.random() * 100) + 80 + 'px'; // Random height above ground
        coinsContainer.appendChild(coinDiv);

        // Set initial right position for animation
        coinDiv.style.right = '-50px'; // Start off-screen to the right
        // Start animation by re-applying it
        coinDiv.style.animation = 'none';
        void coinDiv.offsetWidth; // Trigger reflow
        coinDiv.style.animation = 'moveCoin 4.5s linear forwards'; // Increased duration
        console.log("Coin created:", coinDiv);

        coinDiv.addEventListener('animationend', () => {
            coinDiv.remove();
            console.log("Coin removed:", coinDiv);
        });
    }

    function handleJump(e) {
        console.log("Key pressed:", e.code);
        console.log("Player is jumping:", player.classList.contains('jump'), "Game Over:", isGameOver);
        if (e.code === 'Space' && !player.classList.contains('jump') && !isGameOver) {
            player.classList.add('jump');
            setTimeout(() => player.classList.remove('jump'), 500); // Increased jump duration
        }
    }

    function updateGame() {
        if (isGameOver) return;
        score++;
        scoreboard.current.textContent = score;
        updateBackground();

        const playerRect = player.getBoundingClientRect();

        // Check obstacle collisions
        document.querySelectorAll('.obstacle').forEach(currentObstacle => {
            const obstacleRect = currentObstacle.getBoundingClientRect();
            const offsetTop = parseInt(currentObstacle.dataset.collisionOffsetTop || 0);
            const offsetRight = parseInt(currentObstacle.dataset.collisionOffsetRight || 0);
            const offsetBottom = parseInt(currentObstacle.dataset.collisionOffsetBottom || 0);
            const offsetLeft = parseInt(currentObstacle.dataset.collisionOffsetLeft || 0);

            if (isColliding(playerRect, obstacleRect, offsetTop, offsetRight, offsetBottom, offsetLeft)) {
                endGame();
            }
        });

        // Check coin collisions
        document.querySelectorAll('.coin').forEach(coin => {
            const coinRect = coin.getBoundingClientRect();
            // Coins have a simpler collision, no specific offset needed for now
            if (isColliding(playerRect, coinRect, 0, 0, 0, 0)) { // Use 0 offsets for coins
                coin.remove();
                coinCount++;
                scoreboard.coins.textContent = coinCount;
                score += 100; // Add score for collecting coin
                console.log(`Coin collected! Total coins: ${coinCount}, Score: ${score}`);
            }
        });
    }

    function isColliding(rect1, rect2, offsetTop = 0, offsetRight = 0, offsetBottom = 0, offsetLeft = 0) {
        return (
            rect1.right > rect2.left + offsetLeft &&
            rect1.left < rect2.right - offsetRight &&
            rect1.bottom > rect2.top + offsetTop &&
            rect1.top < rect2.bottom - offsetBottom
        );
    }

    function showTaunt() {
        if (isGameOver) return;

        let messages = tauntMessages.nayoung; // Default to Nayoung's messages
        let playerNameForTaunt = '나영아';

        if (currentPlayer === 'youngmin') {
            messages = tauntMessages.youngmin;
            playerNameForTaunt = '영민아';
        }

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const personalizedMessage = playerNameForTaunt + ', ' + randomMessage;
        
        taunt.bubble.textContent = personalizedMessage;
        taunt.container.style.display = 'flex';
        taunt.character.className = 'character-preview ' + opponent; // Ensure opponent's character is shown

        setTimeout(() => {
            taunt.container.style.display = 'none';
        }, 4000); // Show for 4 seconds
    }

    function endGame() {
        isGameOver = true;
        clearInterval(gameInterval);
        clearInterval(tauntInterval);
        clearInterval(obstacleGenerationInterval);
        document.removeEventListener('keydown', handleJump);
        saveHighScore();
        
        const animatedElements = [...document.querySelectorAll('.cloud, .mountain, .obstacle, .coin')];
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
        console.log("Attempting to display game over message.");
        gameOverMessage.style.display = 'block';
        encouragementMessage.style.display = 'block'; // Show encouragement message
        console.log("Game over message display style set to:", gameOverMessage.style.display);
        taunt.container.style.display = 'none';
        console.log("Game Over!");
    }

    restartButton.addEventListener('click', startGame);
});