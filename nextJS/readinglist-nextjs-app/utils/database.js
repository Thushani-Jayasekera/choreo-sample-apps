import mysql from 'mysql2/promise';

let isConnected = false;
let connection = null;

export const connectToDB = async () => {
    isConnected = false;
    if (isConnected) {
        console.log('Database is already connected');
        return connection;
    }

    try {
        connection = await mysql.createConnection({
            uri: "mysql://avnadmin:AVNS_i05J3zCryqS971Ucr-c@mysql-next-wso2-projects.aivencloud.com:10386/defaultdb?ssl-mode=REQUIRED"
        });

        isConnected = true;
        console.log('Connected to the database');
        return connection;
    } catch (error) {
        console.log(error);
    }
};
