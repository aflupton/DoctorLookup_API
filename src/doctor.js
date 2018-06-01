export class Doctor {
  constructor (location, query) {
    this.location = location;
    this.query = query;
  }

  search(getElements) {
    let request = new XMLHttpRequest();
    let url = `http://api.betterdoctor.ccom/2016-03-01/doctors?query=${this.query}&location=${this.location}&sort=rating-desc&skip=0&limit=25&user_key=3b4a4ee331e13503bf566bdda530b283`;
    request.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState == 4 && this.status != 200) {
        $('#statusError').show();
        $('#statusError').text('There was a problem with your request, refresh and try again.');
      }
    }
    request.open("GET",url,true);
    request.send();
  }
  // let getElements = function(response) {
  //   if(response.data != 0) {
  //     // show results header and div
  //
  //     $('#resultsHeader').text(`Showing doctors from ${location}:`);
  //     $('#resultsTable').show();
  //     // api data
  //     for(let i=0; i<response.data.length; i++) {
  //       $('#results').append(`<tr><td><img src=${response.data[i].profile.img_url}></img></td><td>${response.data[i].practices.name}</td><td>${response.data[i].profile.first_name}</td><td>${response.data[i].profile.last_name}</td><td>${response.data[i].profile.title}</td><td>${response.data[i].profile.data[i].practices.name}</td><td>${response.data[i].profile.data[i].practices.visit_address.street}<br>${response.data[i].profile.data[i].practices.visit_address.city}<br>${response.data[i].profile.data[i].practices.visit_address.state}<br>${response.data[i].profile.data[i].practices.visit_address.zip}</td><td>${response.data[i].profile.data[i].practices.phones.number}</td></tr>`)
  //     }
  //   } else {
  //     $('#postError').show();
  //     $('#postError').text('There was a problem with your input, refresh and try entering new values.');
  //   }
  // }
}
