import mysql from 'serverless-mysql'

const conn = mysql({
  config:{
    host: process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    port:parseInt(process.env.MYSQL_PORT || '3306'),
    database:process.env.MYSQL_DATABASE
  }
})

export async function query(query: string, values?: any[]) {
  try {
    const results = await conn.query(query, values);
    await conn.end();
    return results;
  } catch (error) {
    throw error;
  }
}

export default conn;