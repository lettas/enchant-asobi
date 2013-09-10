var MAPCHIP_GROUND = 7;
var MAPCHIP_WALL = 3;
var MAPCHIP_SPRITE_WIDTH = 16;
var MAPCHIP_SPRITE_HEIGHT = 16;

Resource.pushAssets(['img/map0.png']);

var MapChip = enchant.Class.create(enchant.box2d.PhyBoxSprite, {
    initialize: function (n, width, height) {
      PhyBoxSprite.call(this, width, height, enchant.box2d.STATIC_SPRITE, 0.0, 0.5, 0, true);
      var game = enchant.Core.instance;
      this.image = new enchant.Surface(MAPCHIP_SPRITE_WIDTH, MAPCHIP_SPRITE_HEIGHT);

      var asset = game.assets['img/map0.png'];
      var sx = (MAPCHIP_SPRITE_WIDTH * n) % asset.width;
      var sy = Math.floor((MAPCHIP_SPRITE_WIDTH * n) / asset.width);
      var sw = MAPCHIP_SPRITE_WIDTH;
      var sh = MAPCHIP_SPRITE_HEIGHT;
      var dx = 0;
      var dy = 0;
      var dw = MAPCHIP_SPRITE_WIDTH;
      var dh = MAPCHIP_SPRITE_HEIGHT;
      this.image.draw(asset, sx, sy, sw, sh, dx, dy, dw, dh);
    },
});

MapChip.size = {width: MAPCHIP_SPRITE_WIDTH, height: MAPCHIP_SPRITE_HEIGHT};
MapChip.frames = {
  wall:   3, // 壁
  ground: 7, // 地面
};

