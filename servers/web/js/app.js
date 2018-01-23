
const getKillData = killID => {
    resetApp();
    return new Promise((resolve, reject) => {            
        appFetch("https://zkillboard.com/api/killID/" + killID + "/")
            .then(response => { response.json().then(posts => resolve(posts[0])) })
            .catch(error => reject(error));
    });
};

const getLostShipData = lossmail => {
    
    return new Promise((resolve, reject) => {
        
        var data = {
            characterID: lossmail.victim.character_id,
            characterName: 'Unknown',
            shipTypeID: lossmail.victim.ship_type_id,
            shipTypeName: 'Unknown',
            damageDone: lossmail.victim.damage_taken,
            items: []
        };
        
        if(isCached('types', data.shipTypeID) && isCached('characters', data.characterID)) {
            data.shipTypeName = readFromCache('types', data.shipTypeID).name;
            data.characterName = readFromCache('characters', data.characterID).name;
            return resolve(data);
        }
        else if(isCached('types', data.shipTypeID)) {
            
            setTimeout(function() {
            
                data.shipTypeName = readFromCache('types', data.shipTypeID).name;
                appFetch("https://crest-tq.eveonline.com/characters/" + data.characterID + "/")
                    .then(response => {
                        response.json().then(crestData => {
                            setToCache('characters', data.characterID, {name: crestData.name});
                            data.characterName = crestData.name;
                            attackersData.push(data);
                            return resolve(data);
                        })
                    })
                    .catch(error => console.warn(error));
                
            }, (readFromCache('types', data.shipTypeID).name === "") ? 2000 : 1);
            
        }
        else {
            setToCache('types', data.shipTypeID, "");
            appFetch("https://crest-tq.eveonline.com/inventory/types/" + data.shipTypeID + "/")
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

                            appFetch("https://crest-tq.eveonline.com/characters/" + data.characterID + "/")
                                .then(response => {
                                    response.json().then(crestData => {
                                        setToCache('characters', data.characterID, {name: crestData.name});
                                        data.characterName = crestData.name;
                                        attackersData.push(data);
                                        return resolve(data);
                                    })
                                })
                                .catch(error => reject(error));
                            
                        });
                    }
                )
                .catch(function(err) {
                    reject('Fetch Error :-S', err);
                });
        }
        
    });
}

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
            
            var found = false;
            for(var i in attackersData) {
                if(attackersData[i].characterID == data.characterID) {
                    found = true;
                    break;
                }
            }
            if(found === false) {
                attackersData.push(data);
            }
            
            return resolve(data);
        }
        else if(isCached('types', data.shipTypeID)) {
            
            setTimeout(function() {
            
                data.shipTypeName = readFromCache('types', data.shipTypeID).name;
                
                appFetch("https://crest-tq.eveonline.com/characters/" + data.characterID + "/")
                    .then(response => {
                        response.json().then(crestData => {
                            setToCache('characters', data.characterID, {name: crestData.name});
                            data.characterName = crestData.name;
                            attackersData.push(data);
                            return resolve(data);
                        })
                    })
                    .catch(error => reject(error));
                
            }, (readFromCache('types', data.shipTypeID).name === "") ? 2000 : 1);
            
        }
        else {
            setToCache('types', data.shipTypeID, "");
            appFetch("https://crest-tq.eveonline.com/inventory/types/" + data.shipTypeID + "/")
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
                            appFetch("https://crest-tq.eveonline.com/characters/" + data.characterID + "/")
                                .then(response => {
                                    response.json().then(crestData => {
                                        setToCache('characters', data.characterID, {name: crestData.name});
                                        data.characterName = crestData.name;
                                        attackersData.push(data);
                                        return resolve(data);
                                    })
                                })
                                .catch(error => reject(error));
                            
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
    if(attacker.damageDone < (total / (killData.attackers.length > 20 ? 75 : 33))) {
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

const validateKillURL = url => url.match(/https\:\/\/zkillboard.com\/kill\/([0-9]+)/) && url.match(/https\:\/\/zkillboard.com\/kill\/([0-9]+)/).length > 1;
const extractKillID = url => url.match(/https\:\/\/zkillboard.com\/kill\/([0-9]+)/)[1];