const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'advanced_node_test_db',
    password: 'saumya010',
    port: 5432
});

module.exports = pool;