var GameScene = enchant.Class.create(enchant.Scene, {
  initialize: function() {
    enchant.Scene.call(this);
    var game = enchant.Core.instance;
    this.physicsWorld = new PhysicsWorld(0.0, 9.8);
    this.initializePlayer(game);
    this.initializeMap(game);
    this.backgroundColor = '#99AAFF';
  },

  initializePlayer: function(game) {
    this.player = new Player();
    this.player.position = {x: game.width / 2, y: game.height / 2};
    this.addChild(this.player);
  },

  initializeMap: function(game) {
    for (var i = 0; i < game.width / MapChip.size.width; i++) {
      var ground = new MapChip(MapChip.frames.ground);
      ground.position = {x: i * MapChip.size.width + MapChip.size.width / 2, y: game.height - MapChip.size.height + MapChip.size.height / 2};
      this.addChild(ground);
    }

    for (var i = 0; i < (game.height/ MapChip.size.height) - 1; i++) {
      var wall = new MapChip(MapChip.frames.wall);
      wall.position = {x: MapChip.size.width / 2, y: i * MapChip.size.height + MapChip.size.height / 2};
      this.addChild(wall);

      var wall = new MapChip(MapChip.frames.wall);
      wall.position = {x: game.width - MapChip.size.width / 2, y: i * MapChip.size.height + MapChip.size.height / 2};
      this.addChild(wall);
    }
  },

  ontouchstart: function(e) {
    var vx = (e.x > 160) ? 25 : -25;
    this.player.jump(vx);
    if (this.player.sleep) {
      this.player.setAwake(true);
    }

    var effect = new Effect();
    effect.x = this.player.x + Effect.size.width / 2;
    effect.y = this.player.y + this.player.height;
    this.addChild(effect);
  },

  onenterframe: function(e) {
    var game = enchant.Core.instance;
    this.physicsWorld.step(game.fps);
  },
});
