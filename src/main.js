import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
// import { Doctor } from './doctor.js';

$(document).ready(function() {
  $('#postError').hide();
  $('#results').hide();
  $('#inputForm').submit(function(event) {
    event.preventDefault();

    let name = $("#name").val();
    let query = $("#query").val();
    $("#name").val("");
    $("#query").val("");

    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${query}&location=47.6062%2C-122.3321%2C100&sort=rating-desc&skip=0&limit=50&user_key=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState === 4 && this.status !== 200) {
        $("#statusError").text('There is a problem with your request, please try again.');
      } else {
        $("#statusError").text('Please wait, request is processing.');
      }
    }

    // open get request
    request.open("GET", url, true);
    request.send();

    // post response
    let getElements = function(response) {
      if (response.data != "") {
        $("#results").show();
        $("#resultsHeader").text(`Here are the doctors with the following name: ${name} and search criteria ${query}.`);
        response.data.forEach(function(practices) {
          $("span#resultsList").append(`
            <ul>
              <li><h3>${practices.profile.last_name}, ${practices.profile.first_name}</h3></li>
              <li>${practices.phones.number}</li>
              <li>${practices.visit_address.street}, ${practices.visit_address.city}, ${practices.visit_address.state}, ${practices.visit_address.zip}</li>
            </ul>
            `);
        });
      } else {
        $("#postError").show();
        $("#postError").text("Your query did not return any doctors. Refresh and try again with a new search parameter.");
      }
    };
  });
});
