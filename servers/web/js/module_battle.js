const module_story_reset = () => {};
const module_story_init = () => {
    appFetch("/modules/battle.html")
        .then(response => response.text().then(htmlData => $("#app").html(htmlData)) )
};