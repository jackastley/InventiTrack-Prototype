
require('dotenv').config();

setTimeout(() => {

    const knex = require('knex')({
        client: 'pg',
        connection: {
            host: process.env.PG_HOST,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_USER
        }
    });


    async function createTables(callback) {
        try {
            await knex.schema.dropTableIfExists('users');
            await knex.schema.withSchema('public').createTable('users', table => {
                table.increments("userID");
                table.string("email");
                table.string("password");
                table.string("firstname");
                table.string("lastname");
                table.string("token");
            });
            await knex.schema.dropTableIfExists('tracking_data');
            await knex.schema.withSchema('public').createTable('tracking_data', table => {
                table.integer("userID");
                table.string("date");
                table.string("time");
                table.string("sleep");
                table.string("work_time");
                table.string("exercise");
                table.string("healthy_food");
                table.string("productivity");
                table.string("stress");
                table.string("happy");
            });
            callback();
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
    }

    async function seedTables() {
        try {
            await knex('users').insert({
                email: "jack@inventium.com.au",
                password: "$2b$10$z5/BJIa6WFxeI/Chk1RWY.rpc7nVglgrigBKb4ujd5p8P97TPkPj.",
                firstname: "Jack",
                lastname: "Astley",
                token: "c9wj56i0idmyuwd55ykcsa"
            });
            await knex('tracking_data').insert([{
                userID: 1,
                date: "19/8/22",
                time: "3:25:00 PM",
                sleep: "5",
                work_time: "8",
                exercise: "100",
                healthy_food: "3",
                productivity: "4",
                stress: "7",
                happy: "3"
            },
            {
                userID: 1,
                date: "20/8/22",
                time: "3:25:00 PM",
                sleep: "8",
                work_time: "5",
                exercise: "40",
                healthy_food: "5",
                productivity: "7",
                stress: "3",
                happy: "5"
            }]);
            console.log("Database seeded");
            process.exit(0);
        }
        catch (err) {
            if (i === 4) {
                console.log(err);
                process.exit(1);
            }
        }
    }

    createTables(seedTables);

}, 500)



