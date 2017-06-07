[![Stories in Ready](https://badge.waffle.io/kohlbrr/threads.png?label=ready&title=Ready)](https://waffle.io/kohlbrr/threads?utm_source=badge)

***Threads***
==
__

*What is Threads?*

  **A:** Threads is an e-commerce site specializing in the sale of graphic tees. This is being built as an MVP of an e-commerce site.

*How can I run this awesome e-commerce site locally?*

  **A:** In order to run our site yourself,

- Clone this repo and run `npm install` within the root of the dir

- You'll need to create a postgres database named `threads` and `threads-test`

- You'll also need a `secrets.js` file inside of  pointing to the `threads` db with an env variable called `DATABASE_URL` pointing to the `threads` database URL

(You can run `npm run seed` to populate the DB with some test data)

- Once set, kick off the app with `npm run start-dev` (`npm start` should be used when deploying the app)
