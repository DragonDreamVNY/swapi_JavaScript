# swapi_JavaScript
Website demonstrating use of JS library to access SWAPI endpoint. Star Wars data FTW
Live at: http://swapi.dragondreamdesign.com/

#Project Contents
── Gruntfile.js
├── LICENSE
├── README.md
├── css
│   ├── bootstrap.min.css
│   └── style.css
├── images
│   ├── rogue-one-star-wars.jpg
│   └── rogue-one-star-wars2.jpg
├── js
│   ├── bootstrap.min.js
│   ├── jquery-3.2.1.min.js
│   └── starwars.js
├── lib
│   ├── swapi.js
│   └── swapi.min.js
├── package.json
├── reference
│   └── starships_data.json
├── test.html
└── tests
    ├── MIT.LICENSE
    ├── SpecRunner.html
    ├── lib
    │   └── jasmine-2.1.3
    │       ├── boot.js
    │       ├── console.js
    │       ├── jasmine-html.js
    │       ├── jasmine.css
    │       ├── jasmine.js
    │       └── jasmine_favicon.png
    └── spec
        └── swapiSpec.js

#Set Up
You may run this application on your own (1)server or (2)local machine
(1) Upload it to your server via FTP. Browse to the location in your web browser.
	-example: A live version is on a Blacknight server at: http://swapi.dragondreamdesign.com/
(2) If using XAMPP (Windows), make sure the project folder "swapi_JavaScript" is in your [httdocs] folder.
	If using MAMP (Mac), you can run it from your local directory, such as the Sites folder at your localhost uri:
		eg. http://localhost:8080/swapi_JavaScript/

#References
Uses SWAPI-Wrapper JavaScript API by Raymond Camden (cfjedimaster)
Available: https://swapi.co/documentation#javascript and https://github.com/cfjedimaster/SWAPI-Wrapper 

Extra reference: on accessing the SWAPI data http://tomadmz.com/SWAPI/page1.html

#Background on what this web application does

1. Get array of Starships[] array from JSON, from SWAPI endpoint.
2. Loop through each Starship in array
	There are 37 Starships on different pages.
    Therefore need to loop through the pages as well.
3. the logic...
    Loop through each Starship in Array
    starship[i].MGLT 
    starship[i].consumables 
        switch cases "days" | "week" | "weeks" | "month" | "months" | "years"
    do math..
    return Table with Answers

	Example calculations...
    MGLT is measured per hour
    eg. Millenium Falcon is 75 MGLT. => 1800 MGLT per day   (24 hours in Earth day)
        Carries 2 months consumables => 60 days             (approx)
        1800 * 60 = 108,000 MGLT per rest stop              (if not carrying cargo)

        Total Distance to travel (input) => 1,000,000 MGLT
        1000000 / 108000 = 9.25 Rest Stops 
4. Type in value 1000000 to input field
5. *Press/Click 'Submit' button
* NOTE: Pressing ENTER key also works.
6. Website Displays Table of data. 
	If you look at Console in web browser, it also displays the same info.


#Issues

1. Better to use a RESTful service (such as Angular or Node version) the next time
2. User Agents header error
3. Documentation for cfjedimaster's SWAPI JavaScript library is 3 years old. 
	SWAPI has moved from http to https. The base url needs to be changed for the API libary to work.
