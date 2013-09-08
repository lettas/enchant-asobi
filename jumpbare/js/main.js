enchant();

var game;
var physicsWorld;

window.onload = function() {
  game = new Core(320, 480);
  game.fps = 30;
  game.preload(['img/chara1.png', 'img/map0.png', 'img/effect0.png']);
  game.rootScene.backgroundColor = '#99AAFF';
  game.onload = function() {
    physicsWorld = new PhysicsWorld(0.0, 9.8);

    var scene = game.rootScene;

    var player = new Player();
    player.position = {x: 160, y: 240};
    scene.addChild(player);

    for (var i = 0; i < 320 / 16; i++) {
      var ground = new MapChip(7);
      ground.position = {x: i * 16 + 8, y: 480 - 16 + 8};
      scene.addChild(ground);
    }

    for (var i = 0; i < (480 / 16) - 1; i++) {
      var wall = new MapChip(3);
      wall.position = {x: 8, y: i * 16 + 8};
      scene.addChild(wall);

      var wall = new MapChip(3);
      wall.position = {x: 320 - 8, y: i * 16 + 8};
      scene.addChild(wall);
    }

    scene.ontouchstart = function(e) {
      var vx = (e.x > 160) ? 25 : -25;
      player.jump(vx);
      player.setAwake(true);

      var effect = new Effect();
      effect.x = player.x + 8;
      effect.y = player.y + player.height;
      scene.addChild(effect);
    }

    scene.onenterframe = function(e) {
      physicsWorld.step(game.fps);
    };
  };
  game.start();
};

var Player = Class.create(PhyBoxSprite, {
    initialize: function () {
      PhyBoxSprite.call(this, 32, 32, enchant.box2d.DYNAMIC_SPRITE, 0.0, 0.5, 0, true);
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

var MapChip = Class.create(PhyBoxSprite, {
    initialize: function (n) {
      PhyBoxSprite.call(this, 16, 16, enchant.box2d.STATIC_SPRITE, 0.0, 0.5, 0, true);
      this.image = game.assets['img/map0.png'];
      this.frame = n;
    },
});

var Effect = Class.create(Sprite, {
    initialize: function () {
      Sprite.call(this, 16, 16);
      this.image = game.assets['img/effect0.png'];
      this.frame = 0;
    },

    onenterframe: function() {
      this.frame += 1;
      if (this.frame >= 5) {
        game.rootScene.removeChild(this);
      }
    },
});

