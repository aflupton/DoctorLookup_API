import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { Doctor } from './doctor.js';

$(document).ready(function() {
  $('#statusError').hide();
  $('#postError').hide();
  // $('#resultsTable').hide();
  $('#inputForm').click(function(event) {
    event.preventDefault();

    // store user input data in variables
    let location = $('#location').val();
    let query = $('#query').val();
    let doctor = new Doctor(location, query);

    $('#location').val("");
    $('#query').val("");

    // // instantiate new XML request
    // let request = new XMLHttpRequest();
    // // store api url in a variable
    // let url = `http://api.betterdoctor.com/2016-03-01/doctors?&query=${query}&location=${location}&sort=rating-desc&skip=0&limit=25&user_key=3b4a4ee331e13503bf566bdda530b283`;
    //--->replace key with ${process.env.exports.apiKey}<---

    // // verify request
    // request.onreadystatechange = function() {
    //   if(this.readystate === 4 && this.status === 200) {
    //     let response = JSON.parse(this.responseText);
    //     getElements(response);
    //   } else if (this.readyState === 4 && this.status != 200) {
    //     alert("ready state: " + this.readyState + " status: " + this.status);
    //     $('#statusError').show();
    //     $('#statusError').text('There was an error with your request, check your API key before trying again.');
    //   }
    // }
    //
    // // open a get request
    // request.open("GET", url, true);
    // request.send();

    // post results to html page
    let getElements = function(response) {
      if(response.data != 0) {
        // show results header and div
        $('#resultsHeader').text(`Showing doctors from ${location}:`);
        $('#resultsTable').show();
        // api data
        for(let i=0; i<response.data.length; i++) {
          alert("hi");
          $('#results').append(`<tr><td><img src=${response.data[i].profile.img_url}></img></td><td>${response.data[i].practices.name}</td><td>${response.data[i].profile.first_name}</td><td>${response.data[i].profile.last_name}</td><td>${response.data[i].profile.title}</td><td>${response.data[i].profile.data[i].practices.name}</td><td>${response.data[i].profile.data[i].practices.visit_address.street}<br>${response.data[i].profile.data[i].practices.visit_address.city}<br>${response.data[i].profile.data[i].practices.visit_address.state}<br>${response.data[i].profile.data[i].practices.visit_address.zip}</td><td>${response.data[i].profile.data[i].practices.phones.number}</td></tr>`)
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
