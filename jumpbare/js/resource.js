var Resource = function() {};

Resource.pushAssets = function(assets) {
  if (!this.assets) {
    this.assets = [];
  }

  if (Array.isArray(assets)) {
    Array.prototype.push.apply(this.assets, assets);
  }
  else {
    this.assets.push(assets);
  }
};

