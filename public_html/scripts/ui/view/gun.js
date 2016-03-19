ImportJS.pack('ui.view.gun', function(module) 
{
	var button = this.import('ui.view.button');
	var utils = this.import('libs.utils.utils');
	
	var gun = function(x,y,width,height, gameCtx)
	{
		button.call(this);
		this._gameCtx = gameCtx;
		this._x = utils.defaultValue(x, 10);
		this._y = utils.defaultValue(y, 10);
		this._width = utils.defaultValue(width, 100);
		this._height = utils.defaultValue(height, 100);
		
		this._gameCtx.updates(this, this._update);
		this._gameCtx.draws(this, this._draw);
	}
	
	gun.prototype = Object.create(button.prototype);
	gun.prototype.constructor = button;
}
