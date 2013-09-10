var PLAYER_SPRITE_WIDTH = 32;
var PLAYER_SPRITE_HEIGHT = 32;

Resource.pushAssets(['img/chara1.png']);

var Player = enchant.Class.create(enchant.box2d.PhyBoxSprite, {
    initialize: function () {
      PhyBoxSprite.call(this, PLAYER_SPRITE_WIDTH, PLAYER_SPRITE_HEIGHT, enchant.box2d.DYNAMIC_SPRITE, 0.0, 0.5, 0, true);
      var game = enchant.Core.instance;
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

Player.size = {width: PLAYER_SPRITE_WIDTH, height: PLAYER_SPRITE_HEIGHT};

