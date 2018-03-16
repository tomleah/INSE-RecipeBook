Recipe Book
===========

A recipe book application created for Introduction to Software Engineering (INSE) Coursework.
The following works with university supplied Virtual Machines.

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

Build and Populate Database with Test Data
------------------------------------------
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
Testing
-------

For testing run the files in the test folder, when any of this files is run you will be prompted to write the url or IP where you are hosting this website.

In order to run the tests properly you will need to have python, chrome and helium web testing tool in the machine whereyou run the tests from.

Contributors
------------

| UP-Number | Github Username(s)       |
| --------- | ------------------------:|
| 810928    | tomleah                  |
| 820346    | jvaque & Jesus Vaquerizo |
| 750834    | Kerrjgan                 |
| 814572    | UP814572                 |
