enchant();
var CANVAS_WIDTH = 320;
var CANVAS_HEIGHT = 320;
var MAPCHIP_GROUND = 7;
var MAPCHIP_WALL = 3;
var PLAYER_SPRITE_WIDTH = 32;
var PLAYER_SPRITE_HEIGHT = 32;
var MAPCHIP_SPRITE_WIDTH = 16;
var MAPCHIP_SPRITE_HEIGHT = 16;
var EFFECT_SPRITE_WIDTH = 16;
var EFFECT_SPRITE_HEIGHT = 16;

var game;
var physicsWorld;

window.onload = function() {
  game = new Core(CANVAS_WIDTH, CANVAS_HEIGHT);
  game.fps = 30;
  game.preload(['img/chara1.png', 'img/map0.png', 'img/effect0.png']);
  game.rootScene.backgroundColor = '#99AAFF';
  game.onload = function() {
    physicsWorld = new PhysicsWorld(0.0, 9.8);

    var scene = game.rootScene;

    var player = new Player();
    player.position = {x: game.width / 2, y: game.height / 2};
    scene.addChild(player);

    for (var i = 0; i < game.width / MAPCHIP_SPRITE_WIDTH; i++) {
      var ground = new MapChip(MAPCHIP_GROUND);
      ground.position = {x: i * MAPCHIP_SPRITE_WIDTH + MAPCHIP_SPRITE_WIDTH / 2, y: game.height - MAPCHIP_SPRITE_HEIGHT + MAPCHIP_SPRITE_HEIGHT / 2};
      scene.addChild(ground);
    }

    for (var i = 0; i < (game.height/ MAPCHIP_SPRITE_HEIGHT) - 1; i++) {
      var wall = new MapChip(MAPCHIP_WALL);
      wall.position = {x: MAPCHIP_SPRITE_WIDTH / 2, y: i * MAPCHIP_SPRITE_HEIGHT + MAPCHIP_SPRITE_HEIGHT / 2};
      scene.addChild(wall);

      var wall = new MapChip(MAPCHIP_WALL);
      wall.position = {x: game.width - MAPCHIP_SPRITE_WIDTH / 2, y: i * MAPCHIP_SPRITE_HEIGHT + MAPCHIP_SPRITE_HEIGHT / 2};
      scene.addChild(wall);
    }

    scene.ontouchstart = function(e) {
      var vx = (e.x > 160) ? 25 : -25;
      player.jump(vx);
      player.setAwake(true);

      var effect = new Effect();
      effect.x = player.x + EFFECT_SPRITE_WIDTH;
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
      PhyBoxSprite.call(this, PLAYER_SPRITE_WIDTH, PLAYER_SPRITE_HEIGHT, enchant.box2d.DYNAMIC_SPRITE, 0.0, 0.5, 0, true);
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
      PhyBoxSprite.call(this, MAPCHIP_SPRITE_WIDTH, MAPCHIP_SPRITE_HEIGHT, enchant.box2d.STATIC_SPRITE, 0.0, 0.5, 0, true);
      this.image = game.assets['img/map0.png'];
      this.frame = n;
    },
});

var Effect = Class.create(Sprite, {
    initialize: function () {
      Sprite.call(this, EFFECT_SPRITE_WIDTH, EFFECT_SPRITE_HEIGHT);
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

