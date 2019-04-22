window.addEventListener("load",function() {

  //constants
  var GAME_WIDTH = 660;
  var GAME_HEIGHT = 390;

  var gameLive = true;

  var enemies = [
    {
      x: 95, //x coord
      y: 95, //y coord
      speedY: 2.1, //speed
      w: 45,
      h: 45
    },
    {
      x: 200,
      y: 0,
      speedY: 2.5,
      w: 45,
      h: 45
    },
    {
      x: 330,
      y: 100,
      speedY: 3,
      w: 45,
      h: 45
    },
    {
      x: 450,
      y: 100,
      speedY: 4.5,
      w: 45,
      h: 45
    },
    {
      x: 400,
      y: 100,
      speedY: 1.5,
      w: 45,
      h: 45
    },
    {
      x: 140,
      y: 300,
      speedY: 1.2,
      w: 45,
      h: 45
    }
  ];

  //player data
  var player = {
    x: 5,
    y: 160,
    speedX: 2.5,
    isMoving: 0,
    w: 45,
    h: 45
  };

  //the endpoint
  var endpoint = {
    x: 585,
    y: 170,
    w: 50,
    h: 30
  }

  var elem = {};

  var movePlayer = function() {
    player.isMoving = true;
  }

  var stopPlayer = function() {
    player.isMoving = false;
  }


  //grab the canvas and context
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");

  //event listeners to move player
  canvas.addEventListener('touchstart', movePlayer);
  canvas.addEventListener('touchend', stopPlayer);
  canvas.addEventListener('mousedown', movePlayer);
  canvas.addEventListener('mouseup', stopPlayer);


  var load = function() {
    elem.player = new Image();
    elem.player.src = 'images/player.png';

    elem.background = new Image();
    elem.background.src = 'images/thewall.png';

    elem.enemy = new Image();
    elem.enemy.src = 'images/enemy.png';


    elem.endpoint = new Image();
    elem.endpoint.src = 'images/mcd.png';
  };

  //update the logic
  var update = function() {

    //check for winning
    if(checkCollision(player, endpoint)) {
      //stop the game
        gameLive = false;

        alert('You won!!!');

        //reload page
        window.location = "";
    }

    //update player
    if(player.isMoving) {
      player.x = player.x + player.speedX;
    }

    //update enemies
    var i = 0;
    var n = enemies.length;

    enemies.forEach(function(element, index){
      ctx.rotate(element.enemies)
      //check for collision with player
      if(checkCollision(player, element)) {
        //stop the game
        gameLive = false;

        alert('Well...You lost!');

        //reload page
        window.location = "";
      }

      //move enemy
      element.y += element.speedY;

      //check borders
      if(element.y <= 10) {
        element.y = 10;
        //element.speedY = element.speedY * -1;
        element.speedY *= -1;
      }
      else if(element.y >= GAME_HEIGHT - 50) {
        element.y = GAME_HEIGHT - 50;
        element.speedY *= -1;
      }
    });
  };

  //show the game on the screen
  var draw = function() {
    //clear the canvas
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    //draw background
    ctx.drawImage(elem.background, 0, 0);

    //draw player
    ctx.drawImage(elem.player, player.x, player.y);

    //draw enemies
    enemies.forEach(function(element, index){
      ctx.drawImage(elem.enemy, element.x, element.y);
    });

    //draw endpoint
    ctx.drawImage(elem.endpoint, endpoint.x, endpoint.y);
  };

  //gets executed multiple times per second
  var step = function() {

    update();
    draw();

    if(gameLive) {
      window.requestAnimationFrame(step);
    }
  };

  //check if player and enemy touch
  var checkCollision = function(rect1, rect2) {

    var closeOnWidth = Math.abs(rect1.x - rect2.x) < Math.max(rect1.w, rect2.w);
    var closeOnHeight = Math.abs(rect1.y - rect2.y) < Math.max(rect1.h, rect2.h);
    return closeOnWidth && closeOnHeight;
  }



  //initiation
  load();
  step();

});
