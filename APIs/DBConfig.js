var DBConfig = {
        user: '',
        password: '+',
        server: '', // You can use 'localhost\\instance' to connect to named instance
        database: '',

        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
};

module.exports = DBConfig;

