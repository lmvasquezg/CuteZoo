""" Module to add a new user --> used when a new user logs in """

from flask import request
from flask_restful import Resource, reqparse

from resources.connect_to_DB import client, db

import json
from bson import json_util

import datetime

import re

# Add expected arguments
parser = reqparse.RequestParser()
parser.add_argument('usuario')
parser.add_argument('product')
parser.add_argument('comment')



collection = db.comments

class AddComment(Resource):
    """ Class to add a new user to the database """
        
    def post(self):  
        # curl http://localhost:5000/add_comment -d "usuario=imurielr&product=45&comment=Me voy a morir de la ternura" -X POST
       
        args = parser.parse_args(strict=True) # Parse the given arguments
        # Create a dicttionary containing the info given in the arguments
        
        products = args['product'][1:-1].split(',')

        new_user = {

                    "usuario":args["usuario"],
                    "product":products,
                    "comment":args["comment"],

                }

        # Add the new user to the database
        try:
            user_id = collection.insert_one(new_user)
            return "Comentario agregado exitosamente"
            new_user = json.dumps(new_user, default=json_util.default)
            result = json.loads(new_user)
            return result
        except:
            return "Commentario fallo"