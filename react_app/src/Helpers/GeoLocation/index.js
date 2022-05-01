const getStreetAddress = (latitude, longitude) => {
    const coordinates = new google.maps.LatLng(latitude, longitude);
    const addressArr = [];
    const errorArr = [];

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({'latLng': coordinates},  (results, status) => {

        status !== google.maps.GeocoderStatus.OK ?
        errorArr.push(`Error: ${status}`)
        :
        addressArr.push(results[0].formatted_address);
    });

    if(errorArr.length > 0) {
        return errorArr;
    } else {
        return addressArr;
    }
};

export const getGeoLocation = () => {
    const addressArr = [];
    const errorArr = [];

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const success = (pos) => {
        const coord = pos.coords;
        const resultArr = getStreetAddress(coord.latitude, coord.longitude);
        resultArr[0].includes('Error') ? errorArr.push(resultArr[0]) : addressArr.push(resultArr[0]);
    };

    const error = (err) => {
        errorArr.push(`Error(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    if(errorArr.length > 0) {
        return errorArr;
    } else {
        return addressArr;
    }
}
