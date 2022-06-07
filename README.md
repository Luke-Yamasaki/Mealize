<img src="./react-app/public/Mealize-banner.png"/>   &nbsp;
# Mealize is a React and Flask app that aims to reduce food scarcity and waste by connecting businesses to nonprofits.
![home](https://user-images.githubusercontent.com/89368363/172500968-3b3ac765-2c9f-42ae-8ba7-529f1294664e.png)

## Link to Live Site

[https://mealize.herokuapp.com](https://mealize.herokuapp.com/)

## Features

### - Light mode, dark mode and background customization
![dark mode](https://user-images.githubusercontent.com/89368363/172501703-5bb7eba2-025c-42bd-b553-459344914014.png)
<br>

### - Post a request as a nonprofit manager.
![request](https://user-images.githubusercontent.com/89368363/172500624-66a3949e-bf92-4e9c-a49e-929bba504e70.png)
<br>

### - Post surplus food as a business manager.
![item](https://user-images.githubusercontent.com/89368363/172500706-96ac7d6d-74f0-492a-87d5-fe7a6a8bee69.png)
<br>

### - Add posts to favorites list.
![favorites](https://user-images.githubusercontent.com/89368363/172501469-8b97ea15-d6c2-44ac-8e96-ba73c55ba06e.png)
<br>

### - Notify managers about good items you find.
![notify](https://user-images.githubusercontent.com/89368363/172501491-9dedb0e0-6804-434a-a2b6-c3b1cba9d4e0.png)
<br>

### - Send pick up request to business owners (limited to nonprofit managers).
![requestForm](https://user-images.githubusercontent.com/89368363/172501581-885299bd-f8a1-40e6-be37-2b2d2e7a846f.png)
<br>

### - Accept or decline pick up requests (limited to business managers).
![validate](https://user-images.githubusercontent.com/89368363/172501589-a996fc67-569e-4ee1-8ae0-2007a4f04a30.png)
<br>

### - Check pending and accepted deliveries.
![pending](https://user-images.githubusercontent.com/89368363/172501609-3b5e7349-c17d-4929-95e1-52d4f31e5b43.png)
<br>

### - Filter by category and search items by keywords!
![filter](https://user-images.githubusercontent.com/89368363/172502192-dd145fb9-88bc-4ead-bba2-19b9e4e05e9f.png)
![search](https://user-images.githubusercontent.com/89368363/172502081-ce828236-6441-42f1-9a75-b556c10c6df2.png)
<br>

## Getting Started

1. Clone this repository

   ```bash
   git clone git@github.com:Luke-Yamasaki/Mealize.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the .env.example file with credentials of your choice. I recommend creating a UUID for secrets.
If you do not know how to do so, here are the commands in JavaScript:

    const crypto = require('crypto')

    console.log(crypto.randomUUID({disableEntropyCache : true}));

    The images you see in the homepage were seeded from my S3 bucket. However, you will need to create your own AWS account, create a bucket and acquire credentials if you want to allow users to upload local files. There is a storage limit that builds up fast, so please be careful of data usage.

    If you are unfamiliar with AWS, here is an excellent walkthrough courtesy of James Robertson:
[AWS walkthrough](https://github.com/jamesurobertson/aws-s3-pern-demo#create-your-aws-user-and-bucket).
<br></br>

4. Create a PostgreSQL user, password and database to match your chosen credentials in the .env file.

    If you forgot commands, type 'psql' in your terminal to open up the PostgreSQL interface.

    Next, enter CREATE USER (your chosen username) WITH PASSWORD 'your password.' CREATEDB login;

    Then, type CREATE DATABASE (your chosen database name) WITH OWNER (the username from above);
<br></br>
<br></br>
5. Enter your shell environment, upgrade and seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App, go inside the `react-app` directory, `npm install` and `npm start`. This should open your browser automatically but if not, you may navigate to `localhost:3000` to access the application.

<br>
<br>

## Technologies

<br>
<p float="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://user-images.githubusercontent.com/89368363/167771425-89a9cad0-820f-40db-a628-6ba23931da55.png" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" style="width:75px;"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-line.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-line.svg" style="width:75px;" />
  &nbsp;
</p>

<br>
