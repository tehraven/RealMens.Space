const module_changelog_reset = (unload) => {};
const module_changelog_init = () => {
    appFetch("/modules/changelog.html")
        .then(response => response.text().then(htmlData => {
			$("#app").html(htmlData);
			
			jQuery.getFeed({
				url: "https://github.com/tehraven/RealMens.Space/commits/develop.atom",
				success: function(feed) {
					console.log(feed);
					console.log('feed type: ' + feed.type);
					console.log('feed version: ' + feed.version);
					console.log('feed title: ' + feed.title);
					console.log('feed link: ' + feed.link);
					console.log('feed description: ' + feed.description);
					console.log('feed language: ' + feed.language);
					console.log('feed updated: ' + feed.updated);
					console.log('feed items: ' + feed.items.length);
				
					for(var j = 0; j < feed.items.length; j++) {
					
						console.log('item ' + j + ' title: ' + feed.items[j].title);
						console.log('item ' + j + ' link: ' + feed.items[j].link);
						console.log('item ' + j + ' description: '
						+ feed.items[j].description);
						console.log('item ' + j + ' updated: ' + feed.items[j].updated);
						console.log('item ' + j + ' id: ' + feed.items[j].id);
					}
				}
			});
			
			fetch("https://github.com/tehraven/RealMens.Space/commits/develop.atom", {mode: 'no-cors'})
				.then(response => response.text())
				.then(xmlString => $.parseXML(xmlString))
				.then(data => console.log(data))
				.then(out => {
					console.log(data);
					
					$("#atom_title").text(title.text());
					
					$(entries).each(function() {
						var html = "<div git-id='" + $(this).find("id").text() + "' class='row'>";
						html += "</div>";
						$("#atom_out").append(html);
					});
				})
				.catch(function(err) {
					console.error(err);
				});
		}))
};
const module_changelog_parseXml = ( data ) => {
	var xml, tmp;
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data , "application/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
}