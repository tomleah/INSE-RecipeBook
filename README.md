Recipe Book 
===========

A recipe book application created for Introduction to Software Engineering (INSE) Coursework.

Installation
------------

1. Download code using git:

  ```bash
  git clone https://github.com/tomleah/INSE-RecipeBook.git
  ```
  
2. Download required packages

  ```bash
  npm install
  ```
  
Populating Database with Test Data
--------------------------------
You must have mysql on your system for the following to work.

```bash
npm run initdb
```

Run Server
----------

To start up the server run the following:

  ```bash
  npm start
  ```

Default PORT is 8080. Use env variable to change this

  ```bash
  PORT=XXXX npm start
  ```
