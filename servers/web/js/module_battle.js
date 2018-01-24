const module_battle_reset = () => {};
const module_battle_init = () => {
    appFetch("/modules/battle.html")
        .then(response => response.text().then(htmlData => $("#app").html(htmlData)) )
};