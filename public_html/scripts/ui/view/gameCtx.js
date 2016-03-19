ImportJS.pack('ui.view.gameCtx', function(module) 
{		
		function gameCtx(params)
		{
			this.ctx = (params.context) ? Sketch.augment(params) : Sketch.create(params);
			this.ctx.update_funcs = [];
			this.ctx.draw_funcs = [];
			this.ctx.draws = function(scope, func) { this.draw_funcs.push([scope,func]); };		
			this.ctx.updates = function(scope, func) { this.update_funcs.push([scope,func]); };
		
			this.ctx.update = function () 
			{
				for(var i=0; i<this.update_funcs.length; i++)
				{
					this.update_funcs[i][1].call(this.update_funcs[i][0]);
				}
			};
			
			this.ctx.draw = function () 
			{
				for(var i=0; i<this.draw_funcs.length; i++)
				{
					this.draw_funcs[i][1].call(this.draw_funcs[i][0]);
				}
			};
			
			this.ctx.remove = function()
			{
				var flat = [].concat.apply([], garden.update_funcs);
				var col = flat.indexOf(this) / 2;
				garden.update_funcs.splice(col,1);
				flat = [].concat.apply([], garden.draw_funcs);
				col = flat.indexOf(this) / 2;
				gameCtx.draw_funcs.splice(col,1);
			};
			
			return (this.ctx);
		};
		
		gameCtx.prototype.start = function() { this.ctx.start(); };
		gameCtx.prototype.stop = function() { this.ctx.stop(); };
		
		module.exports = gameCtx;
});
