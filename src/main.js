import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { Doctor } from './doctor.js';

$(document).ready(function() {
  $('#statusError').hide();
  $('#postError').hide();
  $('#resultsTable').hide();
  $('#inputForm').submit(function(event) {
    event.preventDefault();

    // store user input data in variables
    let name = $('#name').val();
    $('#name').val("");
    let doctor = new Doctor(name);

    // // instantiate new XML request
    let request = new XMLHttpRequest();
    // store api url in a variable
    let url = `http://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=47.608%2C-122.335%2C30&sort=rating-desc&skip=0&limit=25&user_key=${process.env.exports.apikey}`;

    // verify request
    request.onreadystatechange = function() {
      if(this.readystate === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState === 4 && this.status != 200) {
        alert("ready state: " + this.readyState + " status: " + this.status);
        $('#statusError').show();
        $('#statusError').text('There was an error with your request, check your API key before trying again.');
      }
    }

    // open a get request
    request.open("GET", url, true);
    request.send();

    // post results to html page
    let getElements = function(response) {
      if(response.data != "") {
        // show results header and div
        $('#resultsHeader').text(`Showing doctor(s) with name ${name} in your area:`);
        $('#resultsTable').show();
        // api data
        for(let i=0; i<response.data.length; i++) {
          response.data[0].practices.forEach(function(practiceInfo) {
            response.data[0].specialties.forEach(function(bio) {
              $('#results').append(`
                <tr>
                <td><img src=${response.data[i].profile.img_url}></img></td>
                <td>${response.data[i].practices.name}</td>
                <td>${response.data[i].profile.first_name}</td>
                <td>${response.data[i].profile.last_name}</td>
                <td>${response.data[i].profile.title}</td>
                <td>${response.data[i].profile.data[i].practices.name}</td>
                <td>${response.data[i].profile.data[i].practices.visit_address.street}
                <br>
                ${response.data[i].profile.data[i].practices.visit_address.city}
                <br>
                ${response.data[i].profile.data[i].practices.visit_address.state}
                <br>
                ${response.data[i].profile.data[i].practices.visit_address.zip}
                </td>
                <td>${response.data[i].practices.website}</td>
                <td>${response.data[i].profile.accepts_new_patients}</td>
                </tr>
                `)
            })
          })

        }
      } else {
        $('#postError').show();
        $('#postError').text('There were no results matching your search criteria, refresh and try entering new values.');
      }
    }
  });
  $('#inputForm').submit(function(event) {
    event.preventDefault();
    let query = $('#query').val();

    $('#query').val("");

    let request = new XMLHttpRequest();
    // store api url in a variable
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;

    request.onreadystatechange = function() {
      if(this.readystate === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState === 4 && this.status != 200) {
        $('#statusError').show();
        $('#statusError').text('There was an error with your request, check your API key before trying again.');
      }
    }

    let getElements = function(response) {
      if(response.data != 0) {
        // show results header and div
        $('#resultsHeader').text(`Showing doctors thattreat ${query}:`);
        $('#resultsTable').show();
        // api data
        for(let i=0; i<response.data.length; i++) {
          $('#results').append(`
            <tr>
            <td><img src=${response.data[i].profile.img_url}></img></td>
            <td>${response.data[i].practices.name}</td>
            <td>${response.data[i].profile.first_name}</td>
            <td>${response.data[i].profile.last_name}</td>
            <td>${response.data[i].profile.title}</td>
            <td>${response.data[i].profile.data[i].practices.name}</td>
            <td>${response.data[i].profile.data[i].practices.visit_address.street}
            <br>
            ${response.data[i].profile.data[i].practices.visit_address.city}
            <br>
            ${response.data[i].profile.data[i].practices.visit_address.state}
            <br>
            ${response.data[i].profile.data[i].practices.visit_address.zip}
            </td>
            <td>${response.data[i].practices.website}</td>
            <td>${response.data[i].profile.accepts_new_patients}</td>
            </tr>
            `)
        }
      } else {
        $('#postError').show();
        $('#postError').text('There were no results matching your search criteria, refresh and try entering new values.');
      }
    }
  });
  $('#refresh').click(function(event) {
    event.preventDefault();
    location.reload();
  });
});
