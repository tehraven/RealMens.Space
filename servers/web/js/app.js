let url_data = {};

class router {
    
    constructor() {
        router.updateApp();
    }
    
    static parseURL() {
        
        var data = {
            type: 'module',
            name: 'kill',
            filter: ''
        };
        
        if(document.location.hash) {
			
			/* Check for old version to migrate */
			var typeRegex = new RegExp("^#kill\/([0-9]+)");
			if(document.location.hash.match(typeRegex)) {
				data.type = 'module';
				data.name = 'kill';
				data.filter = document.location.hash.match(typeRegex)[1];
			} else {
				
				var typeRegex = new RegExp("^#([a-zA-Z]+)\/");
				
				if(document.location.hash.match(typeRegex))
					data.type = document.location.hash.match(typeRegex)[1];
				
				var nameRegex = new RegExp("^#" + data.type + "\/([a-zA-Z]+)");
				
				if(document.location.hash.match(nameRegex))
					data.name = document.location.hash.match(nameRegex)[1];
				
				var filterRegex = new RegExp("^#" + data.type + "\/" + data.name + "\/([0-9]+)");
				
				if(document.location.hash.match(filterRegex))
					data.filter = document.location.hash.match(filterRegex)[1];
				
			}
            
        }
        
        return data;
    }
    
    static updateURL() {
        document.location.hash = router.getHash();
    }
    
    static getCurrentURL() {
        return router.createURL(url_data.type, url_data.name, url_data.filter);
    }
    
    static getHash() {
        
        if(url_data.type && url_data.name && url_data.filter)
            return url_data.type + "/" + url_data.name + "/" + url_data.filter;
        else if(url_data.type && url_data.name)
            return url_data.type + "/" + url_data.name;
        else if(url_data.type)
            return url_data.type;
        return "";
        
    }
    
    static createURL(type, name, filter) {
        
        if(type && name && filter)
            return "/#" + type + "/" + name + "/" + filter;
        else if(type && name)
            return "/#" + type + "/" + name;
        else if(type)
            return "/#" + type;
        return "/";
        
    }
    
    static redirect(type, name, filter, autoroute) {
        
        url_data.type = type || 'module';
		url_data.name = name || 'kill';
		url_data.filter = filter || '';
		
		if(autoroute)
			router.route();
        
    }
    
    static route() {
    
        if(url_data.type) {
            try {
                if(window.hasOwnProperty(url_data.type + '_' + url_data.name + '_reset(true)'))
                    eval(url_data.type + '_' + url_data.name + '_reset(true)')
            }
            catch(error) {}
        }
        
		showLoading(true).then(() => {
			router.updateURL();
			eval(url_data.type + '_' + url_data.name + '_init()');
		});
        
    }

}

document.addEventListener("DOMContentLoaded", () => {
    
    url_data = router.parseURL();
    router.route();
    
});
$('*[data-tool]').on('click', function(event) { router.redirect('module', $(this).data('tool')); });