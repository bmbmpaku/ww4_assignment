import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

db.query(`
    INSERT INTO reviews (reviewer, city, hotel, content,) VALUES
    ('Owen', 'London', ' Hilton', 'The coffee tasted delightful, the fluffy marshmallow-esque whip is to die for'),
    ('Ben', 'New York', 'Moxy ', 'The coffee tasted abysmal, it was such a shame'),
    ('Glen', 'Paris', ' Ibis', 'The coffee tasted delightful, the fluffy marshmallow-esque whip is to die for'),
    ('Cohen', 'Lisboa', ' Sheraton', 'The coffee tasted delightful, the fluffy marshmallow-esque whip is to die for'),
    ('Bowen', 'London', 'Hilton ', 'The coffee tasted delightful, the fluffy marshmallow-esque whip is to die for'),
`);
