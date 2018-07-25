# Doctor Lookup
#### _Doctor Lookup App, 6/1/18_
#### _By Andrew Lupton_

## Description

An app that assists in finding a doctor within a hard coded search area. The user enters a name and medical issue and the app returns a list of the specified doctors.

## Setup
1. Clone this repository (DoctorLookup_API) from Github.
2. Go to https://developer.betterdoctor.com/ and generate a unique API Key.
3. Once you have obtained your API key, open the project directory in Atom.
4. Create an .env file in the root directory with the key stored as a variable: "apiKey=[API key here]".
5. Run `npm install` in the terminal to install webpack.
6. Run `npm run start` in the terminal and wait for the application to launch in your browser.
  * If your API request is not successful and you receive an "Origin is not allowed by Access-Control-Allow-Origin" error in your console, try installing the Allow-Control-Allow-Origin: * Chrome extension.
  * Once installed repeat step 6.

## Specifications
1. The program takes a location input from the user.
2. The program takes an ailment input from the user.
3. The program returns a table of the relevant doctors in the search area.
4. If the API request is unsuccessful, the program returns an error message.

## Known Bugs

None to date.

## Support and contact details

If you have any questions, email Andrew at mailto:aflupton@gmail.com 
## Technologies Used

  * _ES6_
  * _Karma_
  * _Jasmine_
  * _Babel_
  * _jQuery_
  * _HTML5_
  * _CSS3_

### License
* Published under the MIT License.

Copyright (c) 2018 **_Andrew Lupton_**
