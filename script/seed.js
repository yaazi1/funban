'use strict'

const { db, models: { User, Task } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  // Creating Tasks 
  const tasks = await Promise.all([
    Task.create({ userId: 2, title: "Finish Stackathon", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", status: "in progress" }),
    Task.create({ userId: 2, title: "Become a Pilot", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }),
    Task.create({ userId: 2, title: "Become a Developer", description: "finish stackathon, captone, and graduate", status: "in progress" }),
    Task.create({ userId: 2, title: "Become a firefigher", description: "Not possible but sure", status: "todo" }),
    Task.create({ userId: 2, title: "Example of Finished Task", description: "Not possible but sure", status: "completed" }),

    Task.create({ userId: 1, title: "Finish Stackathon Cody", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", status: "in progress" }),
    Task.create({ userId: 1, title: "Become a Pilot Cody", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }),
    Task.create({ userId: 1, title: "Become a Developer Cody", description: "finish stackathon, captone, and graduate", status: "in progress" }),
    Task.create({ userId: 1, title: "Become a firefigher Cody", description: "Not possible but sure", status: "todo" })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    tasks: {
      cody: tasks[0],
      murphy: tasks[1]
    },
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
