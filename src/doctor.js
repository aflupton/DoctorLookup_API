export class Doctor {
  constructor (location, query) {
    this.location = location;
    this.query = query;
  }
  // // store a new xml request in a variable
  // search(elements) {
  //   let request = new XMLHttpRequest();
  //   let url = `http://api.betterdoctor.ccom/2016-03-01/doctors?query=${this.query}&location=${this.location}&sort=rating-desc&skip=0&limit=25&user_key=3b4a4ee331e13503bf566bdda530b283`;
  //   // replace key with ${process.env.exports.apiKey}
  //   //check connection to the api
  //   request.onreadystatechange = function() {
  //     if(this.readyState === 4 && this.status === 200) {
  //       let response = JSON.parse(this.responseText);
  //       getElements(response);
  //     } else if (this.readyState == 4 && this.status != 200) {
  //       $('#statusError').show();
  //       $('#statusError').text('There was a problem with your request, refresh and try again.');
  //     }
  //   }
  //   // open and send request
  //   request.open("GET", url, true);
  //   request.send();
  // }
}
