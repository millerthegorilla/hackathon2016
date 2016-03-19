ImportJS.pack('ui.view.button', function(module) 
{
	var button = function (x,y,width,height,gameCtx)
	{
		this._gameCtx = gameCtx;
		this._x = utils.defaultValue(x, 10);
		this._y = utils.defaultValue(y, 10);
		this._width = utils.defaultValue(width, 100);
		this._height = utils.defaultValue(height, 100);
		this._text = null;
		
		this._gameCtx.updates(this, this._update);
		this._gameCtx.draws(this, this._draw);
		
		button.prototype._update = function()
		{
			
		};
		
		button.prototype._draw = function()
		{
			
		};
		
		button.prototype.remove = function()
		{
			this._gameCtx.remove.bind(this)();
		};
		
	}
	
	module.exports = button;
}
