(function() {
	let topics = ["Pokemon", "Tom", "Jerry", "Mickey Mouse", "Minnie  Mouse"];

	function displayGifs(response) {
		let results = $("#results").empty();
		if(response && response.data) {
			response.data.forEach(function(result){
				let listElement = $(`<li class="col-md-3 col-sm-6 image-container"><h4>Rating: <span class="label label-info">${result.rating}</span></h4></li>`);
				let imageSrc = {
					still: result.images.fixed_width_still.url,
					gif: result.images.fixed_width.url,
					sourceGif: false
				}
				let imgElement = $(`<img class="gif-image" src="${imageSrc.still}" />`);
				imgElement.on('click', toggleImages.bind(imgElement, imageSrc));
				listElement.append(imgElement);
				results.append(listElement);
			});
			return;
		}

		let listElement = $('<li class="col-md-3 col-sm-6"><span class="label label-warning">There are no GIFs for your Character!!</span></li>');
		results.append(listElement);
	}

	function toggleImages(imageSrc) {
		if(imageSrc.sourceGif) {
			$(this).attr({src: imageSrc.still});
			imageSrc.sourceGif = false;
		} else {
			$(this).attr({src: imageSrc.gif});
			imageSrc.sourceGif = true;
		}
	}

	function displayErrors() {
		let listElement = $('<li class="col-md-3 col-sm-6"><span class="label label-danger">Something went Wrong!!</span></li>');
		$("#results").empty().append(listElement);
	}

	function callAPI(character) {
		var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=FaVXq0SP86FKh8FYOgjpP6OzIcY5wMyg&limit=12&q=${character}`;
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			displayGifs(response);
		}).fail(function(){
			displayErrors();
		});
	}

	function renderButtons() {
		$('#topics').empty();
		topics.forEach(function(character) {
			renderButton(character);
		});
	}

	function renderButton(character) {
		let characterButton = $('<input type="button" class="btn btn-primary btn-lg">');
		characterButton.val(character);
		characterButton.on('click', callAPI.bind(this, character));
		$('#topics').append(characterButton);
	}

	$('#add-character').on('submit', function(event){
		event.preventDefault();
		let character = $(this).find('input[name="character"]').val();
		if(character) {
			renderButton(character);
		}
		$(this).find('input[name="character"]').val('');
	});

	renderButtons();

})();