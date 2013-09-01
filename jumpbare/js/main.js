enchant();

var GRAVITY = 1;
var game;

window.onload = function() {
  game = new Core(320, 480);
  game.fps = 15;
  game.preload(['img/chara1.png']);
  game.rootScene.backgroundColor = '#000000';
  game.onload = function() {
    var scene = game.rootScene;

    var player = new Player();
    player.moveTo(160, 240);
    scene.addChild(player);

    scene.ontouchstart = function(e) {
      var vx = (e.x > 160) ? 2.5 : -2.5;
      player.jump(vx);
    }
  };
  game.start();
};

var Player = Class.create(Sprite, {
    initialize: function () {
      Sprite.call(this, 32, 32);
      this.image = game.assets['img/chara1.png'];
      this.frame = 0;
      this.vx = 0;
      this.vy = 0;
    },

    onenterframe: function() {
      this.vy += GRAVITY;
      this.x += this.vx;
      this.y += this.vy;
      this.scaleX = (this.vx == 0) ? this.scaleX : (this.vx > 0) ? 1 : -1;
      this.frame  = (this.vy == 0) ? 0 : (this.vy > 0) ? 3 : 1;
    },

    jump: function(vx) {
      this.vy = -10;
      this.vx = vx;
    }
});

