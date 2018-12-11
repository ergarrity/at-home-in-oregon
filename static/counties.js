
function initMap() {

    //specifies center of map
    let myLatLng = {lat: 44.321603, lng: -120.678400};

    // Create a map object and specify the DOM element for display.
    let map = new google.maps.Map(document.getElementById('counties-map'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 6.6,
        zoomControl: true,
        panControl: true,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // --------------------------------------------------------------//
    // --------------------------------------------------------------//
    // If you want to create a StyledMapType to make a map type control
    // create it like this:

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    // let styledMap = new google.maps.StyledMapType(
    //     MAPSTYLES,
    //     {name: "Custom Style"}
    // );
    // You would then set 'styles' in the mapoptions to 'styledMap'

    // Associate the styled map with the MapTypeId and set it to display.
    // map.mapTypes.set('map_style', styledMap);
    // map.setMapTypeId('map_style');
    // --------------------------------------------------------------//
    // --------------------------------------------------------------//


    // Define global infoWindow
    let infoWindow = new google.maps.InfoWindow({
        width: 250
    });


    // Retrieving the information with AJAX
    $.get('/counties.json', function (counties) {

      let county, marker, html;

      for (let key in counties) {
        county = counties[key];
        
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(county.latitude, county.longitude),
          map: map,
          title: county.county_name,
        });

        html = (
          '<div class="window-content">' +
                '<img src="/static/img/marker-charts/'+ county.county_name_lower +'.png" style="width:350px;" class="thumbnail">' +
                '<p> </p>' +
                '<a href="/' + county.county_name_lower + '">' + county.county_name + ' County Detailed Statistics</a>' +
          '</div>');

        bindInfoWindow(marker, map, infoWindow, html);
      }

    });

      function bindInfoWindow(marker, map, infoWindow, html) {
        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.close();
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
        });
      }
}

google.maps.event.addDomListener(window, 'load', initMap);
