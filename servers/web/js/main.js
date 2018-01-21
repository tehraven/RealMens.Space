let killData = {};

const getKillData = killID => {
    return new Promise((resolve, reject) => {
        $.get("https://zkillboard.com/api/killID/" + killID + "/")
            .done(posts => resolve(posts[0]))
            .fail(err => reject(err));
    });
};

const validateKillURL = url => url.match(/https\:\/\/zkillboard.com\/kill\/([0-9]+)/) && url.match(/https\:\/\/zkillboard.com\/kill\/([0-9]+)/).length > 1;
const extractKillID = url => url.match(/https\:\/\/zkillboard.com\/kill\/([0-9]+)/)[1];

$('#btn_verify_zkillurl').on('click', function() {
    var url = $('#input_verify_zkillurl').val();
    if(validateKillURL(url)) {
        getKillData(extractKillID(url))
            .then(data => { killData = data; })
            .catch(error => console.log(error));
    }
});