Number.prototype.formatMoney = function(c, d, t) {
    var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

let appFetchProgressTimer = null;
const appFetch = (url) => {
	$("#top_loading").slideDown();
    var currentKillID = killData.killmail_id;
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
				if(appFetchProgressTimer) clearTimeout(appFetchProgressTimer);
				appFetchProgressTimer = setTimeout(function() {
					$("#top_loading").slideUp();
				}, 2000);
				if(currentKillID != killData.killmail_id) {
					return console.log("Ignoring old Fetch");
				}
				return resolve(response);
			})
            .catch(function(err) {
                reject(err);
            });
    });
}

const storageAvailable = type => {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

const isCached = (cache, key) => {
    try {
        var out = readFromCache(cache, key);
        return true;
    }
    catch(e) {
        return false;
    }
}

const readFromCache = (cache, key) => {
    if(storageAvailable('localStorage')) {
        var cachedObject = localStorage.getItem(cache);
        if(!cachedObject) { throw "No such cache to read from"; }
        cachedObject = JSON.parse(cachedObject);
        if(!cachedObject.hasOwnProperty(key)) { throw "No such key within cache"; }
        return cachedObject[key];
    }
    else {
        if(!appCache.hasOwnProperty(cache) || !appCache[cache].hasOwnProperty(key)) {
            throw "No such cache-key combination";
        }
        return appCache[cache][key];
    }
}

const setToCache = (cache, key, value) => {
    if(storageAvailable('localStorage')) {
        var cachedObject = localStorage.getItem(cache);
        if(!cachedObject) {
            cachedObject = {};
        }
        else {
            cachedObject = JSON.parse(cachedObject);
        }
        cachedObject[key] = value;
        return localStorage.setItem(cache, JSON.stringify(cachedObject));
    }
    else {
        if(!appCache.hasOwnProperty(cache)) {
            throw "No such cache";
        }
        appCache[cache][key] = value;
        return (appCache[cache][key] == value);
    }
}

let loadingPercent = 0;
const showLoading = (autoprogress) => {
	
    return new Promise((resolve, reject) => {
		return resolve(); //fuck waiting
		var loadingHtml = '<div class="container"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">';
		loadingHtml += '<span class="sr-only">Loading 0% Complete</span></div></div></div>';
		$("#app").html(loadingHtml);
		
		if(autoprogress) {
			var i = 0, iHold = setInterval(() => {
				if(i >= 2000) {
					clearInterval(iHold);
					resolve();
				}
				i += 300;
				loadingPercent = Math.floor((i/2000)*100);
				$("#app div.progress-bar").attr('aria-valuenow', loadingPercent).css('width', loadingPercent + '%').find('span').text('Loading ' + loadingPercent + '% Complete');
			}, 100);
		}
	});
	
}

const pushLoading = (percentage, callbackIfDone) => {
	loadingPercent += percentage;
	if(loadingPercent >= 100) {
		loadingPercent = 0;
		$("#app").html("");
		if(callbackIfDone) callbackIfDone();
	}
}
