var DBConfig = {
        user: 'egaviria',
        password: 'medellin2015+',
        server: '172.17.27.185\\chc_bd', // You can use 'localhost\\instance' to connect to named instance
        database: 'MaxTimeCHC',

        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
};

module.exports = DBConfig;

