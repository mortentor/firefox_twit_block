setInterval ( ()=>{
	$('span:contains("Promoted")').parent().parent().parent().parent().parent().parent().css('display', 'none');
}, 1000 );

let init_ok = false;
addEventListener ( "load", ()=>{

	if ( !init_ok ) {

		const targetNode = document.getElementsByTagName ("body");
		if ( !targetNode || targetNode.length == 0 ) {
			return;
		} 

		const config = { attributes: false, childList: true, subtree: true };

		const callback = (mutationList, observer) => {

			// we're in articles being added to the timeline
			
			for (const mutation of mutationList) {
		
				if (mutation.type === "childList") {


					mutation.addedNodes.forEach ( (item)=>{

						if ( item.tagName == "IMG" ) {

							let alt = item.getAttribute ( "alt");
							if ( alt && alt.startsWith ("--") ) {
								
								alt = alt.substr( 2 );
								
								console.log("added ", item.tagName);
								console.log( item );
								console.log ( "alt:", alt );
								
								let text = document.createTextNode ( alt );
								let text_div = document.createElement ( "DIV");
								text_div.appendChild ( text );
								text_div.classList = "css-16my406 r-vlxjld r-37j5jr";
								text_div.style.whiteSpace = "pre-wrap";

								item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild ( text_div );

//								item.closest ( "[role='button']" ).style.display = "none";
//								item.closest ( "[role='button']" ).style.border = "1px solid red";
							}
						}

					});

				} else if (mutation.type === "attributes") {
					console.log(`The ${mutation.attributeName} attribute was modified.`);
				}
		
			}
		
		};

		const observer = new MutationObserver(callback);
		observer.observe(targetNode[0], config);

		init_ok = true;

	}

})
