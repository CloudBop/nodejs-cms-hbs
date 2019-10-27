 monngo shell cmds

> Catalina Warning
> catalina does NOT allow anything to be written to the root folder.
> old Dbs have been moved to home directory
> start mongo with...
mongod --dbpath ~/data/db

> mongo
> show dbs
admin          0.000GB
cms            0.000GB
config         0.000GB
learn-node-js  0.000GB
local          0.000GB
> use cms
switched to db cms
> show collections
posts
> show tables
posts
>db.posts.find()
{ "_id" : ObjectId("5d38d2d4a853571d1982e71f"), "status" : "private", "title" : "testinng", "allowComments" : true, "body" : "ytcuktcrtrc", "__v" : 0 }