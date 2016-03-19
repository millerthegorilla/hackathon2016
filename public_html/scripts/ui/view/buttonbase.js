ImportJS.pack('ui.view.button', function(module) 
{
	var buttonbase = function (x,y,width,height,gameCtx,text)
	{
		this._gameCtx = gameCtx;
		this._x = utils.defaultValue(x, 10);
		this._y = utils.defaultValue(y, 10);
		this._width = utils.defaultValue(width, 100);
		this._height = utils.defaultValue(height, 100);
		
		this._gameCtx.updates(this, this._update);
		this._gameCtx.draws(this, this._draw);
		
		Object.defineProperty(this, 
					  "background", 
					  { get: function() {
											return _background;
										},
						set: function(val) {
												_text = background;
										   }
					  });
					  
		Object.defineProperty(this, 
					  "text", 
					  { get: function() {
											return _text;
										},
						set: function(val) {
												_text = val;
										   }
					  });
	}
	module.exports = buttonbase;
}
