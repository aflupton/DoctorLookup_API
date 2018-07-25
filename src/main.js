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
    console.log(url);


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
        $("#resultsHeader").text(`Here are the doctors with the following name: ${name} and search query: ${query}.`);
        response.data.forEach(function(info) {
          $("span#resultsList").append(`
            <ul>
              <li><h3>Name: ${info.profile.last_name}, ${info.profile.first_name}, ${info.profile.title}</h3></li>
              <li>Phone number: ${info.practices[0].phones[0].number}</li>
              <li>Address: ${info.practices[0].visit_address.street}, ${info.practices[0].visit_address.city}, ${info.practices[0].visit_address.state}, ${info.practices[0].visit_address.zip}</li>
              <li>Specialties: ${info.specialties[0].name}</li>
              <li>Rating: ${info.ratings[0].rating}</li>
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
