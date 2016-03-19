ImportJS.preload({ 
    baseUrl: 'scripts',
    packages: ['ui/ui.js'],
    libs: [
    'libs/sketch.js',
    'libs/jquery/jquery-1.9.0.min.js',
    'libs/jquery/jquery-ui.min.js',
    'libs/jquery/jquery.address-1.6.min.js',
    'utils/pointer_events_polyfill.js']
    autoCompile: false,
    ready: function(filesArr) {
		PointerEventsPolyfill.initialize({});
        console.log("done, loaded files: ", filesArr);
        ImportJS.compile();
        var ui = ImportJS.unpack('ui.ui');
        new ui({branchChance:60,
				  }); 
    },
    error: function(filesArr) {
        console.log("error on files: ", filesArr);
    }
});


