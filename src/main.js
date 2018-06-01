import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { Doctor } from './../js/doctor.js';

$(document).ready(function() {
  $('#form').submit(function() {
    event.preventDefault();
    // store user input data in variables
    let location = $('#location').val();
    let issue = $('#issue').val();

    $('#location').val("");
    $('#issue').val("");

    // instantiate new XML request
    let request = new XMLHttpRequest();
    // store api url in a variable
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${location}&skip=2&limit=10&user_key=process.env.apiKey`;
    // verify request
    request.onreadystatechange = function() {
      if(this.readystate == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState == 4 && this.status != 200) {
        $('#statusError').show();
        $('#statusError').text('There was a problem with your request, refresh and try again.');
      }
    }

    // open a get request
    request.open("GET", url, true);
    request.send();

    // post results to html page
    let getElements = function(response) {
      if(location != "" || issue != "") {
        // show results header and div
        $('#showHeader').text(`Showing doctors from ${location}:`);
        $('#resultsTable').show();
        // api data
        for(let i=0; i<response.___.length; i++) {
          $('#results').append(`<tr><th>${response.doctors[i].id}</th><td>___</td></tr>`)
        }
      } else {
        $('#postError').show();
        $('#postError').text('There was a problem with your input, refresh and try entering new values.');
      }
    }
  });
  $('#refresh').click(function(event) {
    event.preventDefault();
    location.reload();
  });
});
