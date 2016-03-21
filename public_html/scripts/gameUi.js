ImportJS.preload({ 
    baseUrl: 'scripts',
    packages: ['ui/ui.js'],
    libs: [
    'libs/sketch.js',
    'libs/jquery/jquery-1.9.0.min.js',
    'libs/jquery/jquery-ui.min.js',
    'libs/jquery/jquery.address-1.6.min.js',
    'libs/matter-dev.js',
    'libs/matter.js',
    'libs/howler.min.js',
    'libs/pixi.js',
    'libs/decomp.js',
    'libs/utils/pathseg.js',
    'libs/mattertools/matter-tools.js',
    'libs/utils/pointer_events_polyfill.js'],
    autoCompile: false,
    ready: function(filesArr) {
		PointerEventsPolyfill.initialize({});
        console.log("done, loaded files: ", filesArr);
        ImportJS.compile();
        var ui = ImportJS.unpack('ui.ui');
        var sound = new Howl({
			urls: ['/scripts/assets/sounds/tunes.mp3'],
			sprite: {
				gameover: [0, 4000, false],
				chiptune: [4000, 10000, true]
			},
			preload: true,
			onload: function() 
			{
				this.chiptuneId = this.play('chiptune');
				new ui({Howler:sound});
			},
			onloaderror: function(error)
			{
				console.log(error);
			}
			
		});
        
 
    },
    error: function(filesArr) {
        console.log("error on files: ", filesArr);
    }
});


