""" Module to add a new user --> used when a new user logs in """

from flask import request
from flask_restful import Resource, reqparse

from resources.connect_to_DB import client, db

import json
from bson import json_util

import datetime

# Add expected arguments
parser = reqparse.RequestParser()
parser.add_argument('nombre')
parser.add_argument('edad')
parser.add_argument('ciudad')
parser.add_argument('pais')
parser.add_argument('direccion')
parser.add_argument('correo')
parser.add_argument('genero')
parser.add_argument('contrasena')
parser.add_argument('usuario')



collection = db.users

class AddUser(Resource):
    """ Class to add a new user to the database """
        
    def post(self):  
        # curl http://localhost:5000/add_user -d "nombre=<nombre>&edad=<edad>&ciudad=<ciudad>&pais=<pais>&direccion=<direccio>&correo=<correo>&genero=<genero>&contrasena=AmoAMiJJ" -X POST
       
        args = parser.parse_args(strict=True) # Parse the given arguments
        # Create a dicttionary containing the info given in the arguments
        new_user = {
                    "nombre": args["nombre"],
                    "edad": int(args["edad"]),
                    "ciudad": args["ciudad"],
                    "pais":args["pais"],
                    "direccion":args["direccion"],
                    "correo":args["correo"],
                    "genero":args["genero"],
                    "contrasena":args["contrasena"],
                    "usuario":args["usuario"],

                }

        # Add the new user to the database
        try:
            user_id = collection.insert_one(new_user)
            return "Usuario agregado exitosamente"
            new_user = json.dumps(new_user, default=json_util.default)
            result = json.loads(new_user)
            return result
        except:
            return "El usuario ya existe"