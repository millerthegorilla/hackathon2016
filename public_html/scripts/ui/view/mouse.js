ImportJS.pack('ui.view.button', function(module) 
{
	var button = function(x,y,width,height)
	{
		this._x = utils.defaultValue(x, 10);
		this._y = utils.defaultValue(y, 10);
		this._width = utils.defaultValue(width, 100);
		this._height = utils.defaultValue(height, 100);
		
	}
	
}
