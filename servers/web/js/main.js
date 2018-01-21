let killData = [];
let appCache = [];
let attackersData = [];
let realMensShipGroups = [
    {groupID:541, groupName:'Interdictor', typeIDs:[22460,22464,22452,22456], reason:'Real Mens brings bubbles'}
];
let notMensShipGroups = [
    {groupID:834, groupName:'Stealth Bomber', typeIDs: [12032,12034,12038,11377,45530]},
    {groupID:833, groupName:'Force Recon', typeIDs: [11969,33675,44995,11957,33395,11965,45531]},
    {groupID:898, groupName:'Black Ops', typeIDs: [44996,22440,22428,22430,22436]},
    {groupID:834, groupName:'Stealth Bomber', typeIDs: [11188,11192,42246,11182,33397,11172,44993]}
];
let realMensShips = [
    {typeID:670, typeName:'Capsule', reason:'Real Mens explode'}
];
let notMenShips = [
    {typeID:632, typeName:'Blackbird', reason:'Real Mens do not use ewar. -Farmstink'},
    {typeID:584, typeName:'Griffin', reason:'Real Mens do not use ewar. -Farmstink'},
    {typeID:11194, typeName:'Kitsune', reason:'Real Mens do not use ewar. -Farmstink'},
    {typeID:11959, typeName:'Rook', reason:'Real Mens do not use ewar. -Farmstink'},
    {typeID:11957, typeName:'Falcon', reason:'Real Mens do not use ewar. -Farmstink'},
    {typeID:640, typeName:'Scorpion', reason:'Real Mens do not use ewar. -Farmstink'}
];
let notMenWeaponTypes = [
    {typeID:23705, typeName:'Hornet EC-600', reason:'Real Mens do not use ewar. -Farmstink'},
    {typeID:23473, typeName:'Hornet EC-900', reason:'Real Mens do not use ewar. -Farmstink'},
    {typeID:23707, typeName:'Hornet EC-300', reason:'Real Mens do not use ewar. -Farmstink'}
];

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

const getKillData = killID => {
    return new Promise((resolve, reject) => {
        $.get("https://zkillboard.com/api/killID/" + killID + "/")
            .done(posts => resolve(posts[0]))
            .fail(err => reject(err));
    });
};

const getAttackerData = attacker => {
    
    return new Promise((resolve, reject) => {
        
        var data = {
            characterID: attacker.character_id,
            characterName: 'Unknown',
            shipTypeID: attacker.ship_type_id,
            shipTypeName: 'Unknown',
            damageDone: attacker.damage_done,
            weaponTypeID: attacker.weapon_type_id
        };
        
        if(isCached('types', data.shipTypeID) && isCached('characters', data.characterID)) {
            data.shipTypeName = readFromCache('types', data.shipTypeID).name;
            data.characterName = readFromCache('characters', data.characterID).name;
            return resolve(data);
        }
        else if(isCached('types', data.shipTypeID)) {
            
            setTimeout(function() {
            
                data.shipTypeName = readFromCache('types', data.shipTypeID).name;
                $.get("https://crest-tq.eveonline.com/characters/" + data.characterID + "/", function(crestData) {
                    setToCache('characters', data.characterID, {name: crestData.name});
                    data.characterName = crestData.name;
                    attackersData.push(data);
                    return resolve(data);
                });
                
            }, (readFromCache('types', data.shipTypeID).name === "") ? 2000 : 1);
            
        }
        else {
            setToCache('types', data.shipTypeID, "");
            fetch("https://crest-tq.eveonline.com/inventory/types/" + data.shipTypeID + "/")
                .then(
                    function(response) {
                        if (response.status !== 200) {
                            reject('Looks like there was a problem. Status Code: ' + response.status);
                            return;
                        }

                        response.json().then(function(crestData) {
                            setToCache('types', data.shipTypeID, {name: crestData.name});
                            data.shipTypeName = crestData.name;
                            setToCache('characters', data.characterID, "");                            
                            $.get("https://crest-tq.eveonline.com/characters/" + data.characterID + "/", function(crestData) {
                                setToCache('characters', data.characterID, {name: crestData.name});
                                data.characterName = crestData.name;
                                attackersData.push(data);
                                resolve(data);
                            });
                            
                        });
                    }
                )
                .catch(function(err) {
                    reject('Fetch Error :-S', err);
                });
        }
        
    });
}

const isAttackerMens = attacker => {
    
    var mensData = [true, ""];
    
    for(var i in realMensShipGroups) {
        if(realMensShipGroups[i].typeIDs.includes(attacker.shipTypeID)) {
            mensData = [true, (realMensShipGroups[i].hasOwnProperty('reason') ? realMensShipGroups[i].reason : "")];
            return mensData;
        }
    }
    
    for(var i in realMensShips) {
        if(realMensShips[i].typeID === attacker.shipTypeID) {
            mensData = [true, (realMensShips[i].hasOwnProperty('reason') ? realMensShips[i].reason : "")];
            return mensData;
        }
    }
    
    // If you did no damage, you are not mens
    if(attacker.damageDone < 1) {
        mensData = [false, "Not Menly Damage"];
    }
    
    // If you didn't do at least 1% damage, you are not mens
    var total = 0;
    for(var i in killData.attackers) {
        total += killData.attackers[i].damage_done;
    }
    if(attacker.damageDone < (total / 33)) {
        mensData = [false, "Not Menly Damage"];
    }
    
    for(var i in notMensShipGroups) {
        if(notMensShipGroups[i].typeIDs.includes(attacker.shipTypeID)) {
            mensData = [false, (notMensShipGroups[i].hasOwnProperty('reason') ? notMensShipGroups[i].reason : "Not Menly Ship Type")];
        }
    }
    
    for(var i in notMenShips) {
        if(notMenShips[i].typeID === attacker.shipTypeID) {
            mensData = [false, (notMenShips[i].hasOwnProperty('reason') ? notMenShips[i].reason : "Not Menly Ship")];
        }
    }
    
    for(var i in notMenWeaponTypes) {
        if(notMenWeaponTypes[i].typeID === attacker.weaponTypeID) {
            mensData = [false, (notMenWeaponTypes[i].hasOwnProperty('reason') ? notMenWeaponTypes[i].reason : "Not Menly Weapon")];
        }
    }
    
    return mensData;
}

const updateKillReport = data => {
    killData = data;
    $("#div_zkill_attackers_mens_label, div_zkill_attackers_notmens_label").hide();
    $('#div_zkill_attackers_mens, #div_zkill_attackers_notmens').html('').show();
    if(data.attackers && data.attackers.length) {
        for(var attacker in data.attackers) {
            getAttackerData(data.attackers[attacker])
                .then(attackerData => {
                    var mensData = isAttackerMens(attackerData);
                    var target = mensData[0] ? 'div_zkill_attackers_mens' : 'div_zkill_attackers_notmens';
                    var html = buildAttackerRow(attackerData, mensData);
                    $('#'+target).append(html);
                    $('#'+target+'_label').show();
                })
                .catch(error => console.log(error));
        }
        $("#div_confused").removeClass("hidden");
    }
}

const buildAttackerRow = (attackerData, mensData) => {
    var html = '<div class="media col-lg-4 col-md-6 col-sm-12">';
    html += '<div class="media-left"><a href="#" class="thumbnail"><img alt="64x64" class="media-object" data-src="" src="https://imageserver.eveonline.com/Type/' + attackerData.shipTypeID + '_64.png" style="width: 64px; height: 64px;"></a></div>';
    html += '<div class="media-body"><h4 class="media-heading">' + attackerData.characterName + '</h4>' + attackerData.damageDone + ' HP with a ' + attackerData.shipTypeName;
    if(mensData[1].length > 0) { html += '<br /><strong>' + mensData[1] + '</strong>'}
    html += '</div></div>';
    return html;
};

const validateKillURL = url => url.match(/https\:\/\/zkillboard.com\/kill\/([0-9]+)/) && url.match(/https\:\/\/zkillboard.com\/kill\/([0-9]+)/).length > 1;
const extractKillID = url => url.match(/https\:\/\/zkillboard.com\/kill\/([0-9]+)/)[1];

$('#btn_verify_zkillurl').on('click', function() {
    var url = $('#input_verify_zkillurl').val();
    if(validateKillURL(url)) {
        getKillData(extractKillID(url))
            .then(data => updateKillReport(data))
            .catch(error => console.log(error));
    }
});