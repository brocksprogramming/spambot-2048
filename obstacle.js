// obstacles.js

class Obstacle {
    constructor(x, y, type, asciiArt) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.asciiArt = asciiArt;
    }
  }

  const obstacleTypes = [
    {
      type: 'type1',
      asciiArt: 'Type 1 ASCII Art',
    },
    {
      type: 'type2',
      asciiArt: 'Type 2 ASCII Art',
    },
    // Add more obstacle types as needed
  ];
  
  function generateRandomObstacles() {
    const obstacles = [];
  
    const numObstacles = 10; // Adjust the number of obstacles as needed
  
    for (let i = 0; i < numObstacles; i++) {
      const typeIndex = Math.floor(Math.random() * obstacleTypes.length);
      const { type, asciiArt } = obstacleTypes[typeIndex];
  
      const x = Math.random() * window.innerWidth; // Adjust the position based on the screen size
      const y = Math.random() * window.innerHeight; // Adjust the position based on the screen size
  
      const obstacle = new Obstacle(x, y, type, asciiArt);
      obstacles.push(obstacle);
    }
  
    return obstacles;
  }