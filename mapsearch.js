var placeSearch, autocomplete, geocoder;

  function initAutocomplete() {
    geocoder = new google.maps.Geocoder();
    autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('mapsearch')), {
        types: ['geocode']
      });

    autocomplete.addListener('place_changed', fillInAddress);
  }

  function codeAddress(address) {
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status == 'OK') {
        // This is the lat and lng results[0].geometry.location
        console.log(results[0].geometry.location);
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  function fillInAddress() {
    var place = autocomplete.getPlace();

    codeAddress(document.getElementById('mapsearch').value);
  }