enchant();
var CANVAS_WIDTH = 320;
var CANVAS_HEIGHT = 320;

window.onload = function() {
  var game = new Core(CANVAS_WIDTH, CANVAS_HEIGHT);
  game.fps = 30;
  game.preload(Resource.assets);
  game.onload = function() {
    var scene = new GameScene();
    game.replaceScene(scene);
  };
  game.start();
};

