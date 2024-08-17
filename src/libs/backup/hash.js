import bcrypt from 'bcryptjs';

const password = '12345';
const saltRounds = 10;
const hashedPassword = bcrypt.hashSync(password, saltRounds);

console.log(`Hash para la contraseña '${password}':`, hashedPassword);