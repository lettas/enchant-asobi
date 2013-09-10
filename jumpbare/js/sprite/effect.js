var EFFECT_SPRITE_WIDTH = 16;
var EFFECT_SPRITE_HEIGHT = 16;

Resource.pushAssets(['img/effect0.png']);

var Effect = enchant.Class.create(enchant.Sprite, {
    initialize: function () {
      Sprite.call(this, EFFECT_SPRITE_WIDTH, EFFECT_SPRITE_HEIGHT);
      var game = enchant.Core.instance;
      this.image = game.assets['img/effect0.png'];
      this.frame = 0;
    },

    onenterframe: function() {
      this.frame += 1;
      if (this.frame >= 5) {
        this.destroy();
      }
    },

    destroy: function() {
      if (this.parentNode !== null) {
          this.parentNode.removeChild(this);
      }
    },
});

Effect.size = {width: MAPCHIP_SPRITE_WIDTH, height: MAPCHIP_SPRITE_HEIGHT};

