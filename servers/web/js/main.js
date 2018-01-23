let killData = [];
let appCache = [];
let attackersData = [];
let attackersStats = {mens:0,notMens:0};
let realMensShipGroups = [
    {groupID:541, groupName:'Interdictor', typeIDs:[22460,22464,22452,22456], reason:'Real Mens brings bubbles', forced: true}
];
let notMensShipGroups = [
    {groupID:831, groupName:'Interceptors', typeIDs:[], reason:'Very Zoom Not Menly'},
    {groupID:834, groupName:'Stealth Bomber', typeIDs: [12032,12034,12038,11377,45530], reason:'Cloaks are not menly'},
    {groupID:833, groupName:'Force Recon', typeIDs: [11969,33675,44995,11957,33395,11965,45531], reason:'Cloaks AND Ewar? Not Menly'},
    {groupID:898, groupName:'Black Ops', typeIDs: [44996,22440,22428,22430,22436], reason:'Real Mens use gates'}
];
let realMensShips = [
    {typeID:670, typeName:'Capsule', reason:'Real Mens explode'},
    {typeID:28352, typeName:'Rorqual', reason:'Accidentally menly'}
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

const resetApp = () => {
    killData = attackersData = [];
    attackersStats = {mens:0,notMens:0};
    $("#div_zkill_lostship_meter").html('');
    $("#div_zkill_attackers_mens, #div_zkill_attackers_notmens").html('').hide();
    $("#div_zkill_lostship").addClass('hidden');
}

const updateKillReport = data => {
    killData = data;
    document.location.hash = "kill/"+data.killmail_id;
    $('#input_verify_zkillurl').val("https://zkillboard.com/kill/" + data.killmail_id + "/");
    getLostShipData(data)
        .then(lostShipData => {
            
            /* Ship Box */
            $("#div_zkill_lostship_a img").attr('src', 'https://imageserver.eveonline.com/Render/' + lostShipData.shipTypeID + '_256.png');
            $("#div_zkill_lostship_a h3").text(lostShipData.shipTypeName);
            $("#div_zkill_lostship_a p:nth-of-type(1)").html('<small>' + data.zkb.totalValue.formatMoney(2, '.', ',') + ' ISK lost</small>');
            $("#div_zkill_lostship_a p:nth-of-type(2) a:nth-of-type(1)").text("Related").attr('href', 'https://zkillboard.com/related/' + data.solar_system_id + '/' + data.killmail_time.replace(/\-/g, '').replace(':', '').replace('T', '').match(/([0-9a-zA-Z]+)/)[1].substring(0, 10) + '00/');
            $("#div_zkill_lostship_a p:nth-of-type(2) a:nth-of-type(2)").text("Similar").attr('href', 'https://zkillboard.com/ship/' + lostShipData.shipTypeID + '/');
            
            /* Victim Box */
            $("#div_zkill_lostship_b img").attr('src', 'https://imageserver.eveonline.com/Character/' + lostShipData.characterID + '_256.jpg');
            $("#div_zkill_lostship_b h3").text(lostShipData.characterName);
            $("#div_zkill_lostship_b p:nth-of-type(1)").html('<small>More stuff coming soon</small>');
            $("#div_zkill_lostship_b p:nth-of-type(2) a:nth-of-type(1)").text("Profile").attr('href', 'https://evewho.com/pilot/' + lostShipData.characterName);
            $("#div_zkill_lostship_b p:nth-of-type(2) a:nth-of-type(2)").text("Killboard").attr('href', 'https://zkillboard.com/character/' + lostShipData.characterID + '/');
            
            /* Menly Stats Box */
            $("#div_zkill_lostship_c img").attr('src', '#');
            $("#div_zkill_lostship_c h3").text("Menliest Attacker");
            $("#div_zkill_lostship_c p:nth-of-type(1)").html('<small> ( Loading... ) </small>');
            $("#div_zkill_lostship_c p:nth-of-type(2)").hide();
            
            $("#div_zkill_lostship").removeClass('hidden');
            
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
                            displayKillStats();
                        })
                        .catch(error => console.log(error));
                }
                $("#div_confused").removeClass("hidden");
                
            }
            
            
        })
        .catch(error => console.log(error));
}

const buildAttackerRow = (attackerData, mensData) => {
    var html = '<div class="col-lg-4 col-md-6 col-sm-12">';
    html += '<div class="media-left"><a href="https://evewho.com/pilot/' + attackerData.characterName + '" target="_blank" class="thumbnail"><img alt="64x64" class="media-object" data-src="" src="https://imageserver.eveonline.com/Type/' + attackerData.shipTypeID + '_64.png" style="width: 64px; height: 64px;"></a></div>';
    html += '<div class="media-body"><h4 class="media-heading">' + attackerData.characterName + '</h4>' + attackerData.damageDone + ' HP with a ' + attackerData.shipTypeName;
    if(mensData[1].length > 0) { html += '<br /><strong>' + mensData[1] + '</strong>'}
    html += '</div></div>';
    return html;
};

const displayKillStats = () => {
    
    attackersStats.mens = attackersStats.notMens = 0;
    var mostMenly = {damageDone:0};
    for(var i in attackersData) {
        var mensData = isAttackerMens(attackersData[i]);
        if(mensData[0]) {
            attackersStats.mens++;
            if(attackersData[i].characterID != killData.victim.character_id && attackersData[i].damageDone > mostMenly.damageDone) {
                mostMenly = attackersData[i];
            }
        }
        else {
            attackersStats.notMens++;
        }
    }    
    var menlyDeathRating = (attackersStats.mens / (attackersStats.mens+attackersStats.notMens));
    
    var ratingHtml = '';
    if(menlyDeathRating < 0.2) {
        ratingHtml += '<p>Not Mens. These attackers should be ashamed.</p>';
    }
    else {
        ratingHtml += '<div class="progress">';
        var ratingVerbose = '';
        ratingHtml += '<div class="progress-bar progress-bar-';
        if(menlyDeathRating >= 0.8) { ratingVerbose = 'Real Mens Death'; ratingHtml += 'danger'; }
        else if(menlyDeathRating >= 0.6) { ratingVerbose = 'Very Menly'; ratingHtml += 'warning'; }
        else if(menlyDeathRating >= 0.4) { ratingVerbose = 'Menly'; ratingHtml += 'success'; }
        else { ratingVerbose = 'Unmenly'; ratingHtml += 'info'; }
        ratingHtml += '" role="progressbar" aria-valuenow="' + (Math.floor(menlyDeathRating*100)) + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + (Math.floor(menlyDeathRating*100)) + '%">';
        ratingHtml += '<span>' + ratingVerbose + '</span></div></div>';
        ratingHtml += '<small>This is a ' + ratingVerbose + ' because ';
        if(menlyDeathRating <= 0.5) ratingHtml += ' only ';
        ratingHtml += (Math.floor(menlyDeathRating*100)) + '% of the attackers were Menly</small>';
    }
    $("#div_zkill_lostship_meter").html(ratingHtml);
    
    $("#div_zkill_lostship_c img").attr('src', 'https://imageserver.eveonline.com/Character/' + mostMenly.characterID + '_256.jpg');
    $("#div_zkill_lostship_c h3").text(mostMenly.characterName);
    $("#div_zkill_lostship_c p:nth-of-type(1)").html("Most Menly Attacker");
    $("#div_zkill_lostship_c p:nth-of-type(2) a:nth-of-type(1)").text("Profile").attr('href', 'https://evewho.com/pilot/' + mostMenly.characterName);
    $("#div_zkill_lostship_c p:nth-of-type(2) a:nth-of-type(2)").text("Killboard").attr('href', 'https://zkillboard.com/character/' + mostMenly.characterID + '/');
    $("#div_zkill_lostship_c p:nth-of-type(2)").show();
}

$('#btn_verify_zkillurl').on('click', function() {
    var url = $('#input_verify_zkillurl').val();
    if(validateKillURL(url)) {
        getKillData(extractKillID(url))
            .then(data => updateKillReport(data))
            .catch(error => console.log(error));
    }
});
$('#form_verify_zkillurl').on('submit', function(ev) {
    ev.preventDefault();
    $('#btn_verify_zkillurl').click();
    return false;
});

document.addEventListener("DOMContentLoaded",function() {
    resetApp();
    if(document.location.hash && document.location.hash.match(/kill\/([0-9]+)/)) {
        getKillData(document.location.hash.match(/kill\/([0-9]+)/)[1])
            .then(data => updateKillReport(data))
            .catch(error => console.log(error));
    }
});