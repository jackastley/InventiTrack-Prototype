# InventiTrack
## A full stack data collection and visualisation web application

This prototype application was created to enable staff to track their productivity and wellbeing day-by-day to gain insights into the factors that influence how they feel at work. Note: this is an early proof-of-concept version of the application.

It uses React and Bootstrap for the frontend functionality and design, NodeJS and Express for the API, PostgreSQL for the database, and Docker for containerisation and deployment.

Skills demonstrated by this application include:
* Full stack architecture
* Front-end design with CSS
* Back-end development
* Token-based authentication
* Password encryption
* API design
* Containerisation
* Database configuration and querying

### To view the application, simply:
* Clone this repository
* If you do not have docker installed, install it and ensure it is running on your machine.
* Run the following in your command line:
```
docker compose up
```
* Open your browser and go to localhost:3000
* Login with the following credentials: username: jack@inventium.com.au , password: testtest
* Once here, you will see there is some data pre-populated in the dashboard. To add some new data, click on 'Track' and fill out the daily survey.
* This data will be automatically stored in the database and populated in the dashboard.
* Feel free to use this for as long as you like to keep track of your productivity and wellbeing from day-to-day!

* To stop the containers running on your machine run:
```
docker compose down
```

* To delete the images run:
```
docker images
```
* Copy the image IDs and run:
```
docker rmi [image ID 1] [image ID 2] [image ID 3]

