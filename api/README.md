# MongoDB-Stack Setup

## Setup

### 1. Install MongoDB locally with Compass (https://www.mongodb.com/try/download/community)

### 2. Start replica Daemons

First you need to create the Folders: C:\data\rsX.  X={1,2,3}. Execute the following on 3 seperate Shells:
```
$ mongod --replSet testSet --dbpath=c:\data\rsX --port 270YZ
```
for rs1 use port 27018. rs2 -> 27019. rs3 -> 27020.

(You can ignore the Error: "Cannot use non-local read concern until replica set is finished initializing.", because you haven't init. your testSet yet.)

### 3. init replica set

Open another Shell (or use the mongodb compass) and connect to one of your damons e.g. the one with port 27018: 
```
$ mongosh --port 27018
```
now create the following var:
```
rsconfig = {
  _id: "testSet",
  members: [
      {_id: 0, host: "localhost:27018"},
      {_id: 1, host: "localhost:27019"},
      {_id: 2, host: "localhost:27020"}
  ]
}
```
Now init the replica set (rs):
```
$ rs.initiate(rsconfig)
```

# Docker
Because the developers of prisma are unwilling to support MongoDB with replica Set as optional (https://github.com/prisma/prisma/issues/8266#:~:text=MongoDB%20only%20allows%20you%20to%20start%20a%20transaction,the%20requirement%20of%20needing%20a%20replica%20set%20configured.), you are forced to create a replica Set (Cluster) to start a transaction. To avoid unnecessary complexity, you can just deploy your MongoDB with only one Replica-Set:
```docker-compose.yml```
```
version: '3'

services:
  mongo:
    container_name: mongo
    image: mongo:4
    command: --replSet rs0
    ports:
      - '27017:27017'
      - '28017:28017'
    volumes:
      - ./data/mongo:/data/db
```

Now execute: ```$ docker-compose exec mongo mongo --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'mongo:27017'}]});"```

