import mysql from 'serverless-mysql'

const db = mysql({
  config:{
    host: process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    port:parseInt(process.env.MYSQL_PORT || '3306'),
    database:process.env.MYSQL_DATABASE
  }
})

export default db;