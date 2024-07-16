const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  logging:false,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});


const syncDatabase = async () => {
  try {
    await sequelize.authenticate().then(() => { console.log("DB Authenticated") });

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync(/* { force: true } */);
      console.log('Base de datos y tablas sincronizadas');
    } else {
      await sequelize.sync();
      console.log('Base de datos y tablas sincronizadas');
    }
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};


module.exports = {
  syncDatabase,
  sequelize
};


//Sin Sequelize
/*const { Pool } = require('pg');

const PoolConfig = new Pool ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
      }
})

//module.exports = PoolConfig;
module.exports = {
  query: (text, params) => PoolConfig.query(text, params),
  getClient: () => PoolConfig.connect()
};*/