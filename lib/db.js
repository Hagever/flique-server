var Neo4j = require('node-neo4j');
var db = new Neo4j(process.env.NEO4J_SERVER || 'http://localhost:7474');
module.exports = db;