# 4qtrack Rest Api Node and Mysql

## Description
This is an Restful API for Node.js and Mysql. Designed after PHP's beautiful Laravel. This is in the MVC format,
except because it is an API there are no views, just models and controllers.

##### Routing         : Express
##### ORM Database    : Sequelize
##### Authentication  : Passport, JWT

## Installation

#### Third Party Requirements

##### nvm

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

###### node v11.13.0  via nvm
```
$ nvm install v11.13.0
```

##### yarn
```
$ curl -o- -L https://yarnpkg.com/install.sh | bash
```


#### Download Code | Clone the Repo

```
$ git clone git@github.com:IMPBox/impbox-services-api.git
```

#### Install Node Modules

```
$ yarn install
```

#### Create .env File

You will find a example.env file in the home directory. Paste the contents of that into a file named .env in the same directory. 
Fill in the variables to fit your application

#### Run

```
$ nvm use   //This will select version 11.3 of node
$ yarn run start
```

#### Test APIs

```
 $ curl  -X GET  --header "Content-Type: application/json"  --data '{ "user_id" : "1" }' http://localhost:4000/v1/users
 
 $ curl  -X GET  --header "Content-Type: application/json"  --data '{ "user_id" : "1" }' http://localhost:4000/v1/companies
```



