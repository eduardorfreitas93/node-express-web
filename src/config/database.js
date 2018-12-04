module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  operatorsAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
}
