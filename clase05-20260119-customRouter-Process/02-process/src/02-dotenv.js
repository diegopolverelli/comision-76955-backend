process.loadEnvFile("./.env")

const PORT=process.env.PORT

console.log(`Server on line in port ${PORT}`)
console.log(process.env.SECRET)
console.log(process.env.DB_NAME)
