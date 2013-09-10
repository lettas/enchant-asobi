var MAPCHIP_GROUND = 7;
var MAPCHIP_WALL = 3;
var MAPCHIP_SPRITE_WIDTH = 16;
var MAPCHIP_SPRITE_HEIGHT = 16;

Resource.pushAssets(['img/map0.png']);

var MapChip = enchant.Class.create(enchant.box2d.PhyBoxSprite, {
    initialize: function (n) {
      PhyBoxSprite.call(this, MAPCHIP_SPRITE_WIDTH, MAPCHIP_SPRITE_HEIGHT, enchant.box2d.STATIC_SPRITE, 0.0, 0.5, 0, true);
      var game = enchant.Core.instance;
      this.image = game.assets['img/map0.png'];
      this.frame = n;
    },
});

MapChip.size = {width: MAPCHIP_SPRITE_WIDTH, height: MAPCHIP_SPRITE_HEIGHT};
MapChip.frames = {
  wall:   3, // 壁
  ground: 7, // 地面
};

