// first we create an object to act as a namespace
// namespaces help us keep the global object space clean
// and prevent collisions between variable names

var myApp = {};  // this is my namespace.  I just called it "myApp"

myApp.id = 'd5be0403';
myApp.key = 'c4721154c0dc39762cd6864374767818';

// we define an init function to kick off our app
// later we will be able to run it with myApp.init();

$('#down1Button').click(function(){
	$('html,body').animate({
	  scrollTop: $('#down1').offset().top
	}, 1000);
});

$('#down2Button').click(function(){
	$('html,body').animate({
	  scrollTop: $('#down2').offset().top
	}, 1000);
});

$('#logoButton').click(function(){
	$('html,body').animate({
	  scrollTop: $('#down1').offset().top
	}, 1000);
});

$('.yesMartha').fadeOut();
$('#Marthasubmit').click(function(){
	$('.yesMartha').fadeIn();
});

// overlay for hover
  $(document).ready(function() { 
      $('#demo3').click(function() { 
          $.blockUI({ overlayCSS: { backgroundColor: '#00f' } }); 
   
          setTimeout($.unblockUI, 2000); 
      }); 
  }); 

myApp.init = function() {  //code to kick off app goes here - we are also defining it
  	$('#submit').on('click', function(e) {
  		e.preventDefault
  		console.log("The first part is working...!");
  		var include = convertTextBox('.include');
			var exclude = convertTextBox('.exclude');
			console.log(exclude);
			console.log(include);

  		// var include = $('#include').val();
  			// console.log('include; ' + include);
  		// var includeArray = include.split(',');
  			// console.log('includeArray; ' + includeArray);
  			console.log('include: ' + include);
				console.log('exclude: ' + exclude);
				myApp.getRecipes(include,exclude);

				if (include == '') {
					$('#error').text('= Please enter an ingredient by scrolling back up =');
				}
				$('html,body').animate({
		      scrollTop: $('.returnedRecipes').offset().top
		    }, 1000);

// define the variable
// get the jquery selector $('');
// then call the method .val()
  	});
} // end init function

function convertTextBox(given) {
	var temp = $(given).val();
	return temp.split(',');
}

// define a function that will go and get the pieces from the API
// when we want to get recipes, we will call myApp.getRecipes();
myApp.getRecipes = function(include,exclude) {
		if (exclude == '') {
			$.ajax({
				url : 'http://api.yummly.com/v1/api/recipes',
				dataType : 'jsonp',
				type : 'GET',
		// in the following data property, we provide all of the params that need to go along with the request.
		// for possible params, visit the docs: https://developer.yummly.com/documentation
				data : {
					_app_id : myApp.id,
					_app_key : myApp.key,
					format : 'jsonp',
					allowedIngredient : include,
					allowedCourse : ["Lunch and Snacks"]
				},
					success : function(result) {
					console.log("Success function called");
					// now that the data has come back, let's display it with another function.
					myApp.displayRecipe(result);
					// shows us that the function is working - must put the same name in cl as in the function
				}
		});
		} else {
			$.ajax({
				url : 'http://api.yummly.com/v1/api/recipes',
				dataType : 'jsonp',
				type : 'GET',
				// in the following data property, we provide all of the params that need to go along with the request.
				// for possible params, visit the docs: https://developer.yummly.com/documentation
			data : {
				_app_id : myApp.id,
				_app_key : myApp.key,
				format : 'jsonp',
				allowedIngredient : include,
				excludedIngredient : exclude,
				allowedCourse : ["Lunch and Snacks"]
			},
				success : function(result) {
				console.log("Success function called");
				// now that the data has come back, let's display it with another function.
				myApp.displayRecipe(result);
				// shows us that the function is working - must put the same name in cl as in the function
			}
		});
	}
}  // end getRecipe()

// define a function that will be used to display the pieces in the html
myApp.displayRecipe = function(result) {
	// $('#results').html(''); // keeping the .html string empty will replace the append 
	// you can put any name in the function.  But the result from myApp.displayPieces(result); will be passed into this function.
	// console.log("Ready to display the recipe with this data: ", result);
	var recipes = result.matches; // this is an array of all the recipes
	console.log(recipes.length);
	console.log(recipes);
	// now we loop through each one
	for(var i = 0; i < recipes.length; i++) {	
		// console.log('recipes[i] ' + recipes[i]);

		var recipeContainer = $('<li>').addClass('recipeWrapper');
		var marthaContainer = $('<li>').addClass('recipeWrapper');
		var title = $('<h4>').text(recipes[i].recipeName);
		var div = $('<div>')
		div.append(title);
		var link = $('<a>').attr('href','http://www.yummly.com/recipe/' + recipes[i].id).html(div);
		if(recipes[i].smallImageUrls.length > 0){
			if (recipes[i].sourceDisplayName == "Martha Stewart") {
				marthaContainer.attr("style", "background-image: url('" +recipes[i].smallImageUrls[0] +"')"); 
				marthaContainer.append(link);
				$('.yesMartha').append(marthaContainer);
			} else {
				recipeContainer.attr("style", "background-image: url('" +recipes[i].smallImageUrls[0] +"')"); 
				recipeContainer.append(link);
				$('.noMartha').append(recipeContainer);
			}
		}

	} // end for loop
}  // end myApp.displayPieces()

$(function() {
	myApp.init();
});


