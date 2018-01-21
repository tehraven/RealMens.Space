let killData = [];
let attackersData = [];
let notMenShipGroups = [
    {groupID:834, groupName:'Stealth Bomber', typeIDs: [12032,12034,12038,11377,45530]},
    {groupID:833, groupName:'Force Recon', typeIDs: [11969,33675,44995,11957,33395,11965,45531]},
    {groupID:898, groupName:'Black Ops', typeIDs: [44996,22440,22428,22430,22436]},
    {groupID:834, groupName:'Stealth Bomber', typeIDs: [11188,11192,42246,11182,33397,11172,44993]}
];

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
            damageDone: attacker.damage_done
        };
        
        fetch("https://crest-tq.eveonline.com/inventory/types/" + data.shipTypeID + "/")
            .then(
                function(response) {
                    if (response.status !== 200) {
                        reject('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }

                    response.json().then(function(crestData) {
                        data.shipTypeName = crestData.name;                    
                        $.get("https://crest-tq.eveonline.com/characters/" + data.characterID + "/", function(crestData) {
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
        
    });
}

const isAttackerMens = attacker => {
    
    // If you did no damage, you are not mens
    if(attacker.damageDone < 1) return false;
    
    // If you didn't do at least 1% damage, you are not mens
    var total = 0;
    for(var i in killData.attackers) {
        total += killData.attackers[i].damage_done;
    }
    if(attacker.damageDone < (total / 33)) return false;
    
    // If you are in a cloaky ship, you are not mens
    for(var i in notMenShipGroups) {
        if(notMenShipGroups[i].typeIDs.includes(attacker.shipTypeID)) { return false; }
    }
    
    // If you have no fun in Eve, you are real mens.
    return true;
}

const updateKillReport = data => {
    killData = data;
    $("#div_zkill_attackers_mens_label, div_zkill_attackers_notmens_label").hide();
    $('#div_zkill_attackers_mens, #div_zkill_attackers_notmens').html('').show();
    if(data.attackers && data.attackers.length) {
        for(var attacker in data.attackers) {
            getAttackerData(data.attackers[attacker])
                .then(attackerData => {
                    var target = isAttackerMens(attackerData) ? 'div_zkill_attackers_mens' : 'div_zkill_attackers_notmens';
                    var html = buildAttackerRow(attackerData);
                    $('#'+target).append(html);
                    $('#'+target+'_label').show();
                })
                .catch(error => console.log(error));
        }
    }
}

const resortKillReport = () => {
    $("#div_zkill_attackers_mens_label, div_zkill_attackers_notmens_label").hide();
    $('#div_zkill_attackers_mens, #div_zkill_attackers_notmens').html('').show();
    for(var i in attackersData) {
        var target = isAttackerMens(attackersData[i]) ? 'div_zkill_attackers_mens' : 'div_zkill_attackers_notmens';
        var html = buildAttackerRow(attackersData[i]);
        $('#'+target).append(html);
    }
}

const buildAttackerRow = attackerData => '<div class="media col-lg-4 col-md-6 col-sm-12"><div class="media-left"><a href="#" class="thumbnail"><img alt="64x64" class="media-object" data-src="" src="https://imageserver.eveonline.com/Type/' + attackerData.shipTypeID + '_64.png" style="width: 64px; height: 64px;"></a></div><div class="media-body"><h4 class="media-heading">' + attackerData.characterName + '</h4>' + attackerData.damageDone + ' HP with a ' + attackerData.shipTypeName + '</div></div>';

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