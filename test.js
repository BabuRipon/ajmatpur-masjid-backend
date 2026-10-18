import pool from './src/config/db.js'

async function fun(name, email) {
   const result = await pool.query(`
        insert into users(name,email) values($1,$2) returning *;
    `,[name, email])

    console.log(result.rows[0]);
}

for(let i=0;i<10;i++){
    fun(`ripon${i+1}`,`ripon${i+1}@gmail.com`);
}
