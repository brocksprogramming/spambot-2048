document.addEventListener("DOMContentLoaded", function () {
  // Paypal donation site redirect
// Define the URL of the webpage that contains your PayPal button code
var paypalUrl = "https://www.omnisection.com/home/spambot-2048";

  // Add an event listener to your extension button that opens the PayPal donation page
  document.getElementById("donate-button").addEventListener("click", function() {
  // Use the chrome.tabs.create() method to open a new tab with the PayPal URL
  chrome.tabs.create({ url: paypalUrl });
});
   // Hide the game over message
   const gameOverElement = document.getElementById("game-over");
   gameOverElement.style.display = "none";
  // Set the frame rate that obstacles generate at
  var frameCount = 0
  // Update the character element with the email address
  const characterElement = document.getElementById("character");
  characterElement.innerText = "@mail";

  // Define variables for player position and movement
  let playerX = 0; // initial X position of the player
  const playerSpeed = 5; // speed of player movement (adjust as needed)
      

  let playerY = 0;
  
  function moveCharacter() {
    playerY = 100;
    characterElement.style.bottom = playerY + "px";
  }
  
  document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
      moveCharacter();
    }
  });
  


 // Call the function to start the game
 startGame();  

  function startGame() {
      // Play the game music
      const gameMusic = document.getElementById("game-music");
      gameMusic.play();

      // Define variables for background layers
      const backgroundLayer1 = document.getElementById("background-layer1");
      const backgroundLayer2 = document.getElementById("background-layer2");
      let layer1Position = 0;
      let layer2Position = 0;
      const layer1Speed = 1; // Adjust the speed of the first background layer
      const layer2Speed = 2; // Adjust the speed of the second background layer
    
      
      // A function to get the width of an element
      function getElementWidth(element) {
        const styles = getComputedStyle(element);
        const width = element.offsetWidth;
        const paddingLeft = parseFloat(styles.paddingLeft);
        const paddingRight = parseFloat(styles.paddingRight);
        const borderLeft = parseFloat(styles.borderLeftWidth);
        const borderRight = parseFloat(styles.borderRightWidth);
      
        const totalWidth = width - paddingLeft - paddingRight - borderLeft - borderRight;
        return totalWidth;
      }
    // Define variables for obstacle generation
    const obstacleContainer = document.getElementById("obstacle-container");

    // Generate a random obstacle
    function generateObstacles() {
      const obstacles = [
        // Define ASCII art for different types of obstacles
        "|_M_|",
        "|_!_|",
        // ...
      ];
      
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      const randomIndex = Math.floor(Math.random() * obstacles.length);
      obstacle.innerText = obstacles[randomIndex];
    
      // Randomly position the obstacle
      const containerWidth = getElementWidth(obstacleContainer);
      const obstacleWidth = getElementWidth(obstacle);
      const maxX = containerWidth - obstacleWidth;
      const randomX = Math.floor(Math.random() * maxX);
      obstacle.style.left = `${randomX}px`;
      obstacleContainer.appendChild(obstacle);
    
    }

    function moveObstacles() {
      const obstacleSpeed = 3;
      const obstacles = document.getElementsByClassName("obstacle");
      const obstaclesArray = Array.from(obstacles);
      obstaclesArray.forEach((obstacle) => {
        let obstaclePosition = parseInt(getComputedStyle(obstacle).left);
        const moveObstacle = () => {
          obstaclePosition -= obstacleSpeed;
          console.log(obstaclePosition);
          obstacle.style.left = obstaclePosition + "px";
          if (obstaclePosition + obstacle.offsetWidth > 0) {
            requestAnimationFrame(moveObstacle);
          } else {
            obstacle.remove();
          }
        };
        requestAnimationFrame(moveObstacle);
      });
    }
    
    // Call debouncedMoveObstacles instead of moveObstacles
    // Define variables for score tracking
    let score = 0;
    const scoreElement = document.getElementById("score");

    // Increment the score and update the score display
    function incrementScore() {
      score++;
      scoreElement.innerText = "Score: " + score;
    }

    // Define variables for collision detection
    const character = document.getElementById("character");
    const obstacles = document.getElementsByClassName("obstacle");

    // Check for collision between the character and obstacles
    function checkCollision(fc) {
      const characterRect = character.getBoundingClientRect();

      // Loop through each obstacle
      for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        const obstacleRect = obstacle.getBoundingClientRect();

        // Check for overlap between the character and obstacle
        if (
          characterRect.left < obstacleRect.right &&
          characterRect.right > obstacleRect.left &&
          characterRect.top < obstacleRect.bottom &&
          characterRect.bottom > obstacleRect.top
        ) {
          // Collision detected, define the actions to take
          handleGameOver()
          break; // Exit the loop after the first collision
        }
        else {
          if(fc % 120 === 0){
            // Increase the score by 1
            incrementScore();
          }
        }
      }
    }

    // Call the checkCollision function repeatedly
    setInterval(checkCollision, 100);

    // Call the incrementScore function whenever the character successfully avoids an obstacle
    // Modify this logic based on your game rules

    // Define the actions to take on collision or game over
    function handleGameOver() {
      // Display the game over message
      const gameOverElement = document.getElementById("game-over");
      gameOverElement.style.display = "block";

      // Perform any other necessary actions, such as stopping the game loop, disabling controls, etc.
      // Stop the game music
      const gameMusic = document.getElementById("game-music");
      gameMusic.pause();

      // Close the window 
      window.close();
    }
    // Call move obstacles once outside of the gameLoop function
    function gameLoop(){
      if(frameCount % 120 === 0){
        generateObstacles(); // Example: Generate obstacles
      }
      moveObstacles(); // Move the obstacles to the left of the screen toward the player
      checkCollision(frameCount); // Example: Check for collisions
      if(frameCount % 120 === 0){
        characterElement.style.bottom = 30 + "px";
        frameCount = 0;
      }
      // Increment the frame count
      frameCount++;
      requestAnimationFrame(gameLoop); // Call the game loop function recursively for continuous updates.
    }
    gameLoop();
}
}); 

