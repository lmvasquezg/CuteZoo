#Learn more or give us feedback
from pymongo import MongoClient

# Connect to the database host given by MongoDB URI
client = MongoClient('mongodb://lmvasquezg:admin@cutezoo-shard-00-00-bxu9d.mongodb.net:27017,cutezoo-shard-00-01-bxu9d.mongodb.net:27017,cutezoo-shard-00-02-bxu9d.mongodb.net:27017/test?ssl=true&replicaSet=CuteZoo-shard-0&authSource=admin&retryWrites=true&w=majority')
# Access to the specific database
db = client.CuteZoo
