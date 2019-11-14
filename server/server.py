import os

# Import dependecies from flask and flask-restful 
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

# Import all the resources to be used in the server
from resources.add_user import AddUser
from resources.get_password import GetPassword
from resources.add_comment import AddComment
#from resources.get_search import GetSearch

print('Ejecutando servidor')
# Create the app and define it as a rest api.
app = Flask(__name__)
api = Api(app)
CORS(app)  # Allow all domains to access the server

# add every resource to a specific url endpoint
api.add_resource(AddUser, "/add_user")
api.add_resource(GetPassword, "/password/<string:user_id>")
#api.add_resource(GetSearch,"/search/<string:nombre>/<string:area>/<string:solucion>/<string:proceso>")
api.add_resource(AddComment, "/add_comment")


# Main --> run the server
if __name__ == "__main__":
    app.run(debug=True)