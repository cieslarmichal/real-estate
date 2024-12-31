set -e

mongosh <<EOF

var rootUser = 'root';
var rootPassword = 'root';

var admin = db.getSiblingDB('admin');

admin.auth(rootUser, rootPassword);

var databaseName = 'real-estate';

var applicationDatabase = db.getSiblingDB(databaseName);

var username = 'local';
var password = 'local';

applicationDatabase.createUser({ user: username, pwd: password, roles: [
       { role: "userAdminAnyDatabase", db: "admin" },
       { role: "readWriteAnyDatabase", db: "admin" }
     ] });
EOF

mongoimport --db real-estate --collection listings --file /data/resources/listings.json --jsonArray
mongoimport --db real-estate --collection cities --file /data/resources/cities.json --jsonArray
mongoimport --db real-estate --collection users --file /data/resources/users.json --jsonArray
