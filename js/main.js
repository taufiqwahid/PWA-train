var _url = "https://my-json-server.typicode.com/taufiqwahid/fakeAPI/cars"

var dataResult = ''
var carsResult = ''
var color = []

$.get(_url, function(data){
	$.each(data, function(key, items){
		
		var _cars = items.color;

		dataResult += "<div>"
		+"<h3>"+items.name+"</h3>"
		+"<p>"+_cars+"</p>"
		+"</div>";
		if ($.inArray(_cars, color)== -1) {
			color.push(_cars)
			carsResult += "<option value='"+_cars+"''>"+_cars+"</option>"
		}
	})
	$('#cars').html(dataResult)
	$('#cars_select').html("<option value='all'>Semua</option>"+carsResult)

	// fungsi filter
	$("#cars_select").on('change', function(){
		updateCars($(this).val())
	})

	function updateCars(car){
		var dataResult = ''
		var _newUrl = _url
		if (car != 'all') {
			_newUrl = _url+"?color="+car
		}
		$.get(_newUrl, function(data){
		$.each(data, function(key, items){
			
			_car = items.color;

			dataResult += "<div>"
			+"<h3>"+items.name+"</h3>"
			+"<p>"+_car+"</p>"
			+"</div>";
		})

		$('#cars').html(dataResult)

		})
	}
})
// END JQUERY


// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/PWA/serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}