let battleData = {};
let battleAttackersStats = {mens:0,notMens:0};

const module_battle_reset = (unload) => {
    battleData = {};
    battleAttackersStats = {mens:0,notMens:0};
    $("#div_zkill_lostship_meter, #div_zkill_attackers_mens, #div_zkill_attackers_notmens").html('');
    $("#div_zkill_attackers").hide();
    if(unload) {
        $('#btn_verify_zkillurl').off('click');
        $('#form_verify_zkillurl').off('click');
    }
}

const module_battle_init = () => {
	
    appFetch("/modules/battle.html")
		.then(response => {
			response.text().then(htmlData => {
				
				$("#app").html(htmlData);
				router.updateURL();
				
				$('#btn_verify_zkillurl').off('click').on('click', function() {
					var url = $('#input_verify_zkillurl').val();
					if(validateKillURL(url)) {
						getBattleData(extractKillID(url))
							.then(data => updateBattleReport(data))
							.catch(error => console.log(error));
					}
				});
				$('#form_verify_zkillurl').on('submit', function(ev) {
					ev.preventDefault();
					$('#btn_verify_zkillurl').click();
					return false;
				});
				
				if(url_data.filter)
					getBattleData(url_data.filter)
						.then(data => updateBattleReport(data))
						.catch(error => console.log(error));
				
			})
		})
		.catch(error => console.error(error));
}

const getBattleData = killID => {
    module_battle_reset();
    router.redirect('module', 'battle', killID);
    router.updateURL();
    return new Promise((resolve, reject) => {
		getKillData(killID)
			.then(data => {
				battleData.killmail_id = killID;
				appFetch("https://zkillboard.com/api/solarSystemID/" + data.solar_system_id + "/startTime/" + parseInt(data.killmail_time.replace(/\-/g, '').replace(':', '').replace('T', '').match(/([0-9a-zA-Z]+)/)[1].substring(0, 10)) + "00/endTime/" + (parseInt(data.killmail_time.replace(/\-/g, '').replace(':', '').replace('T', '').match(/([0-9a-zA-Z]+)/)[1].substring(0, 10))+1) + '00/')
					.then(response => {
						response.json().then(posts => resolve(posts));
					})
					.catch(error => reject(error));
			})
			.catch(error => reject(error));
    });
};

const updateBattleReport = (losses) => {
    battleData.losses = losses;
	battleData.attackers = [];
	
	battleData.participants = [];
	
    $('#input_verify_zkillurl').val("https://zkillboard.com/kill/" + battleData.killmail_id  + "/");
	$('#div_zkill_attackers_mens, #div_zkill_attackers_notmens').html('');
	
	// Add all losers
	for(var i = 0; i < losses.length; i++) {
		
		var data = losses[i];
		
		// Add all killers
		for(var e in data.attackers) {
			var attacker = data.attackers[e];
			if(!attacker.hasOwnProperty('character_id')) continue;
			addBattleParticipant({character_id: attacker.character_id, ship_type_id: attacker.ship_type_id, damage_done: attacker.damage_done, weapon_type_id: attacker.weapon_type_id, lossmail_id: 0}, false, true);
		}
		
		if(!data.victim.hasOwnProperty('character_id')) continue;
		addBattleParticipant({character_id: data.victim.character_id, ship_type_id: data.victim.ship_type_id, damage_done: 0, weapon_type_id: 0, lossmail_id: data.killmail_id}, true, false);
		
	}
	
	var filtered = [];
	for(var i in battleData.participants) { filtered.push(battleData.participants[i]); }
	for(var i in filtered) {
		var participant = filtered[i];
		getAttackerData(participant)
			.then(data => {
				var isMens = (data.source.killer === true && data.source.loser === true);
				var mensData = [isMens, isMens === true ? "Killed and Died" : ""];
				var target = mensData[0] ? 'div_zkill_attackers_mens' : 'div_zkill_attackers_notmens';
				var html = buildBattleRow(data, mensData);
				$('#'+target).append(html);
				$('#'+target+'_label').removeClass('hidden').fadeIn();
			});
	}
	
	$("#div_zkill_attackers").removeClass('hidden').fadeIn();
	
}

const addBattleParticipant = (data, loser, killer) => {
	if(!battleData.participants.hasOwnProperty(data.character_id)) {
		data['loser'] = loser;
		data['killer'] = killer;
		battleData.participants[data.character_id] = data;
	} else {
		battleData.participants[data.character_id].loser = battleData.participants[data.character_id].loser || loser;
		battleData.participants[data.character_id].killer = battleData.participants[data.character_id].killer || killer;
		battleData.participants[data.character_id].damage_done += data.damage_done;
		if(battleData.participants[data.character_id].weapon_type_id == 0)
			battleData.participants[data.character_id].weapon_type_id = data.weapon_type_id;
		if(battleData.participants[data.character_id].lossmail_id == 0)
			battleData.participants[data.character_id].lossmail_id = data.lossmail_id;
	}
}

const buildBattleRow = (attackerData, mensData) => {
    var html = '<div class="col-lg-6 col-sm-12">';
	if(mensData[0] === true)
		html += '<div class="media-left"><a href="javascript:router.redirect(\'module\', \'kill\', ' + attackerData.source.lossmail_id + ', true);" target="_blank" class="thumbnail"><img alt="64x64" class="media-object" data-src="" src="https://imageserver.eveonline.com/Type/' + attackerData.shipTypeID + '_64.png" style="width: 64px; height: 64px;"></a></div>';
    else
		html += '<div class="media-left"><a href="https://evewho.com/pilot/' + attackerData.characterName + '" target="_blank" class="thumbnail"><img alt="64x64" class="media-object" data-src="" src="https://imageserver.eveonline.com/Type/' + attackerData.shipTypeID + '_64.png" style="width: 64px; height: 64px;"></a></div>';
    html += '<div class="media-body"><h4 class="media-heading">' + attackerData.characterName + '</h4>' + attackerData.damageDone + ' HP with a ' + attackerData.shipTypeName;
    if(mensData[1].length > 0) { html += '<br /><strong>' + mensData[1] + '</strong>'}
    html += '</div></div>';
    return html;
};

const displayBattleStats = () => {}