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
header_text = '''
    <html>\n<head> <title>EB Flask Test</title> </head>\n<body>'''
instructions = '''
    <p><em>Hint</em>: This is a RESTful web service! Append a username
    to the URL (for example: <code>/Thelonious</code>) to say hello to
    someone specific.</p>\n'''
home_link = '<p><a href="/">Back</a></p>\n'
footer_text = '</body>\n</html>'
print('Ejecutando servidor')
# Create the app and define it as a rest api.
app = Flask(__name__)
app.add_url_rule('/', 'index', (lambda: header_text +
    instructions + footer_text))
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