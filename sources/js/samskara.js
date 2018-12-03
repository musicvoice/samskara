function initialize() {
	var adminInfo = document.getElementById('admin_info');

	if (document.contains(adminInfo) === true) {
		// Check and enable the admin-info partial
		if (typeof(admin_info) == 'object') {
			// Set the name of the admin
			document.getElementById('admin_name').innerHTML = admin_info.name;

			// If profile image is not disclared then, hide the profile image
			// else set the profile image src
			if (typeof(admin_info.profile) != 'string') {
				document.getElementById('profile_image').style.display = 'none';
			} else {
				document.getElementById('profile_image').style.backgroundImage = "url('" + admin_info.profile + "')";
			}

			// Set the admin_description values
			var adminDescription = document.getElementById('admin_description');

			// Create a text node for admin_description
			adminDescription.appendChild(document.createTextNode(admin_info.description));

			// Create a br element and append it
			adminDescription.appendChild(document.createElement('br'));

			if (typeof(admin_info.address) == 'string') {
				// Create a small HTML element
				var smallE = document.createElement('small');

				// Create the innerHTML that should go with small tag
				smallE.innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + admin_info.address;

				// Add the smallE element to our adminDescription object
				adminDescription.appendChild(smallE);
			}

			// Enable the social icons accordingly
			if (typeof(admin_info.social) == 'object') {
				if (typeof(admin_info.social.email) == 'string') {
					document.getElementById('admin_email').href = "mailto:" + admin_info.social.email;
				} else {
					document.getElementById('admin_email').style.display = 'none';
				}
				if (typeof(admin_info.social.twitter) == 'string') {
					document.getElementById('admin_twitter').href = admin_info.social.twitter;
				} else {
					document.getElementById('admin_twitter').style.display = 'none';
				}
				if (typeof(admin_info.social.facebook) == 'string') {
					document.getElementById('admin_facebook').href = admin_info.social.facebook;
				} else {
					document.getElementById('admin_facebook').style.display = 'none';
				}
			} else {
				document.getElementById('admin_social').style.display = 'none';
			}

			if (typeof(showAdmin) == 'boolean') {
				if (showAdmin === true) {
					// Finally, show the admin panel
					adminInfo.style.display = 'inherit';
				}
			}
		}
	}
	
	// If showTweets is true then show the twitter card else nothing
	if (typeof(showTweets) == 'boolean') {
		if (showTweets === true) {
			document.getElementById('twitter_timeline').href = admin_info.social.twitter;
			var scriptE = document.createElement('script');
			scriptE.src = "https://platform.twitter.com/widgets.js";
			scriptE.charset = "UTF-8";
			document.getElementById('twitter_card_container').appendChild(scriptE);
			document.getElementById('twitter_card').style.display = 'block';
		}
	}
}