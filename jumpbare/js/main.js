enchant();
var CANVAS_WIDTH = 320;
var CANVAS_HEIGHT = 320;

// NOTE: tesiting Resource

window.onload = function() {
  var game = new Core(CANVAS_WIDTH, CANVAS_HEIGHT);
  game.fps = 30;
  game.preload(Resource.assets);
  game.rootScene.backgroundColor = '#99AAFF';
  game.onload = function() {
    var physicsWorld = new PhysicsWorld(0.0, 9.8);

    var scene = game.rootScene;

    var player = new Player();
    player.position = {x: game.width / 2, y: game.height / 2};
    scene.addChild(player);

    for (var i = 0; i < game.width / MapChip.size.width; i++) {
      var ground = new MapChip(MapChip.frames.ground);
      ground.position = {x: i * MapChip.size.width + MapChip.size.width / 2, y: game.height - MapChip.size.height + MapChip.size.height / 2};
      scene.addChild(ground);
    }

    for (var i = 0; i < (game.height/ MapChip.size.height) - 1; i++) {
      var wall = new MapChip(MapChip.frames.wall);
      wall.position = {x: MapChip.size.width / 2, y: i * MapChip.size.height + MapChip.size.height / 2};
      scene.addChild(wall);

      var wall = new MapChip(MapChip.frames.wall);
      wall.position = {x: game.width - MapChip.size.width / 2, y: i * MapChip.size.height + MapChip.size.height / 2};
      scene.addChild(wall);
    }

    scene.ontouchstart = function(e) {
      var vx = (e.x > 160) ? 25 : -25;
      player.jump(vx);
      player.setAwake(true);

      var effect = new Effect();
      effect.x = player.x + Effect.size.width / 2;
      effect.y = player.y + player.height;
      scene.addChild(effect);
    }

    scene.onenterframe = function(e) {
      physicsWorld.step(game.fps);
    };
  };
  game.start();
};

