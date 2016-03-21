ImportJS.pack('ui.ui', function(module) 
{
	var circularQueue = this.import('libs.utils.circularQueue');
	var collection = this.import('libs.utils.collection');
	
	var ui = function(params) 
	{
		var that = this;
		var sound = params.Howler;
		var running = true;
		that.sound = sound;
		var Engine = Matter.Engine,
			World = Matter.World,
			Bodies = Matter.Bodies,
			Body = Matter.Body,
			Common = Matter.Common,
			Composite = Matter.Composite,
			Composites = Matter.Composites,
			Constraint = Matter.Constraint,
			Mouse = Matter.Mouse,
			MouseConstraint = Matter.MouseConstraint,
			Runner = Matter.Runner,
			Vertices = Matter.Vertices,
			Svg = Matter.Svg;
			Events = Matter.Events;
			
		var canvas = document.getElementById("canvas");
		var container = document.getElementById("container");
		var context = canvas.getContext("2d");
		var boundingVertices = Matter.Vertices.create({x:0,y:0},
													  {x:0,y:canvas.clientHeight},
													  {x:canvas.clientWidth,y:0},
													  {x:canvas.clientWidth,y:canvas.clientHeight});
		var renderBounds = Matter.Bounds.create(boundingVertices);
		var render = Matter.Render.create({canvas:canvas, 
										   context:context,
										   options: { 
											   wireframes: false,
											   showShadows: true,
											   height:canvas.clientHeight, 
											   width:canvas.clientWidth }, 
										   element:container,
										   bounds:renderBounds,
										   hasBounds: true
										});
		var engine;
		render.clear = function () {};
		render.world = function (engine) {};
										   
		var grid = Matter.Grid.create();
		var options = {render:render,grid:grid};
		// create a Matter.js engine
		engine = Engine.create(options);
		Matter.Render.setPixelRatio(render,'auto');
		var group = Body.nextGroup(true);
		var groundHeight = 60;
		that.ground = Bodies.rectangle(0, canvas.clientHeight - (groundHeight /2), canvas.clientWidth * 2, groundHeight, { isStatic: true });
		var _index = 0;
		var svgs = [
			'H',
			'A',
			'C',
			'K',
			'A2',
			'T',
			'H2',
			'O',
			'N'
		];
		
		$.get('/scripts/assets/svg/iconmonstr-direction-4-icon.svg').done(function(data) {
            var vertexSets = [],
                color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

        $(data).find('path').each(function(i, path) {
                vertexSets.push(Vertices.scale(Svg.pathToVertices(path, 30),canvas.clientWidth * 0.000106, canvas.clientHeight * 0.000185 ));
            });
			
		World.add(engine.world, Bodies.fromVertices(50, 50, vertexSets, {
                render: {
                    fillStyle: color,
                    strokeStyle: color
                },
				isStatic: true
            }, true));
        });
		
		
		$.get('/scripts/assets/svg/iconmonstr-check-mark-8-icon.svg').done(function(data) {
            var vertexSets = [],
                color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

        $(data).find('path').each(function(i, path) {
                vertexSets.push(Vertices.scale(Svg.pathToVertices(path, 30),canvas.clientWidth * 0.000106, canvas.clientHeight * 0.000185 ));
            });
			that.hand = Bodies.fromVertices(-10, 100, vertexSets, {
                render: {
                    fillStyle: color,
                    strokeStyle: color
                },
				isStatic: true
            }, true);
		World.add(engine.world, that.hand);
        });
		
		that.gui = {hand:that.hand, sound:sound.chiptuneId};
		
		var vertexSuperSet = new circularQueue();
		var letterBridge = Matter.Composite.create();
		var color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);
		for (var i = 0; i < svgs.length; ++i) 
		{
			(function(i) 
			{
				$.get('/scripts/assets/svg/letters/' + svgs[i] + '.svg').done(function(data) {
					var vertexSets = [];
					$(data).find('path').each(function(i, path) {
						var points = Svg.pathToVertices(path);
						vertexSets.push(Vertices.scale(points, canvas.clientWidth * 0.000106, -(canvas.clientHeight * 0.000185)));
					});
					vertexSuperSet.pushOn(vertexSets.slice());
					loaded(that);
				});
			})(i);
		}

		function loaded(that)
		{
			if(_index >= svgs.length - 1)
			{
				vertexSuperSet.index -= 1;
				letterBridge = Composites.stack(150, 250, 9, 1, 15, 0, function(x, y) 
				{
					var body = Bodies.fromVertices(x, y, vertexSuperSet.next, { isStatic: false, isNonColliding: true, collisionFilter: { group: group} }, true);

					return body;
				});

				Composites.chain(letterBridge, 0, 0, 0, 0, { stiffness:0.9});
				var pillarHeight = canvas.clientHeight / 2,
					pillarWidth = canvas.clientWidth / 10;
				var leftpillar = Bodies.rectangle(80, canvas.clientHeight - (pillarHeight/2), pillarWidth, pillarHeight, { isStatic: true });
				var rightpillar = Bodies.rectangle(canvas.clientWidth - 80,  canvas.clientHeight - (pillarHeight/2), pillarWidth, pillarHeight, { isStatic: true });
				World.add(engine.world, [
					letterBridge,
					leftpillar,
					rightpillar,
					Constraint.create({ pointA: { x: pillarWidth, y: pillarHeight}, bodyB: letterBridge.bodies[0], pointB: { x:0, y: 1 }, length: 200 }),
					Constraint.create({ pointA: { x: canvas.clientWidth - pillarWidth, y: pillarHeight}, bodyB: letterBridge.bodies[8], pointB: { x: 0, y: 1 }, length: 200 }),
				]);
				
				var particleOptions = { 
					friction: 0.05,
					frictionStatic: 0.1,
					render: { visible: true } 
				};
				var constraintOptions = {
					isStatic: false, isNonColliding: true, collisionFilter: { group: group}
				}
				var squidgy = Composites.softBody(250, 100, 5, 5, 0, 0, 
															true, 
															9, 
															particleOptions, 
															constraintOptions)

				var mouseConstraint = MouseConstraint.create(engine);
				var mouse = Matter.Mouse.create(container);
					
				var runner = Matter.Runner.create();
				
				// add all of the bodies to the world
				World.add(engine.world, [
										that.ground,
										squidgy,
										mouseConstraint,
										runner]);
				// run the engine
				var pairs = Matter.Pairs.create();
				Matter.Runner.start(runner, engine);
				
				Events.on(mouseConstraint, "mouseup", function(event)
				{
					console.log(event.source);
					
				}.bind(that));
				
				
				Events.on(runner, "beforeRender", function(event) 
				{
					if(running)
					{
						var bods = Matter.Composite.allBodies(squidgy);
						var ticks = 0;
						console.log(this.ground);
						for(var i=0; i < bods.length; ++i)
						{
							if(Matter.Bounds.overlaps(bods[i].bounds, this.ground.bounds))
							{
								if(running){ that.sound.play('gameover'); running = false;};
								ticks++;
							}
						} 
					}
				}.bind(that));
			}
			else
			{
				_index++;
			}
		}	
	}
	
	module.exports = ui;
});
