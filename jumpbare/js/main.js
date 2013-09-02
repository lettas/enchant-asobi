enchant();

var game;
var physicsWorld;

window.onload = function() {
  game = new Core(320, 480);
  game.fps = 30;
  game.preload(['img/chara1.png']);
  game.rootScene.backgroundColor = '#000000';
  game.onload = function() {
    physicsWorld = new PhysicsWorld(0.0, 9.8);

    var scene = game.rootScene;
    scene.onenterframe = function(e) {
      physicsWorld.step(game.fps);
    };

    var player = new Player();
    player.position = {x:160, y:240};
    scene.addChild(player);

    scene.ontouchstart = function(e) {
      var vx = (e.x > 160) ? 25 : -25;
      player.jump(vx);
    }
  };
  game.start();
};

var Player = Class.create(PhyBoxSprite, {
    initialize: function () {
      PhyBoxSprite.call(this, 32, 32, enchant.box2d.DYNAMIC_SPRITE, 1.0, 0.9, 0.3, true);
      this.image = game.assets['img/chara1.png'];
      this.frame = 0;
    },

    onenterframe: function() {
      this.scaleX = (this.vx == 0) ? this.scaleX : (this.vx > 0) ? 1 : -1;
      this.frame  = (this.vy == 0) ? 0 : (this.vy > 0) ? 3 : 1;
    },

    jump: function(vx) {
      this.vx = vx;
      this.vy = -200;
    }
});

