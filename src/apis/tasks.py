from flask_jwt_extended import jwt_required
from flask_restx import Namespace, Resource, fields, Model
from flask import request, jsonify
from apis.auth import authorizations

def create_api_tasks(db_manager):

    api: Namespace = Namespace("tasks", description="task namespace", authorizations=authorizations)

    task_model: Model = api.model("Tasks", {'name': fields.String(required=True, description="Name of the task"),
                                                    'description': fields.String(required=True, description="Description of the task"),
                                                    'due_date': fields.String(required=True, description="Due date of the task"),
                                                    'is_done': fields.String(required=True, description="Is the task done?"),
                                                    'ID': fields.Integer(required=True, description="The task ID")})
    
    delete_task_model: Model = api.model("Delete task", {'ID': fields.Integer(required=True, description="The task ID")})

    @api.route("/")
    class Tasks(Resource):

        @api.doc("Get all tasks")
        def get(self):
            tasks = db_manager.tasks.GetAll()
            return tasks, 200
        
        @jwt_required()
        @api.doc("Add new task", security="jsonWebToken")
        @api.expect(task_model)
        def post(self):
            name = api.payload['name']
            description = api.payload['description']
            due_date = api.payload['due_date']
            is_done = api.payload['is_done']
            tasks = db_manager.tasks.Create(name, description, due_date, is_done)
            return tasks, 200
        
        @jwt_required()
        @api.doc("Update tasks", security="jsonWebToken")
        @api.expect(task_model)
        def put(self):
            ID = api.payload['ID']
            name = api.payload['name']
            description = api.payload['description']
            due_date = api.payload['due_date']
            is_done = api.payload['is_done']
            tasks = db_manager.tasks.Update(ID, name, description, due_date, is_done)
            return tasks, 200
        
        @jwt_required()
        @api.doc("Delete tasks", security="jsonWebToken")
        @api.expect(delete_task_model)
        def delete(self):
            ID = api.payload['ID']
            tasks = db_manager.tasks.Delete(ID)
            return tasks, 200

    @api.route("/<int:ID>")
    class Task(Resource):

        @api.doc("Get task by ID")
        def get(self, ID):
            task = db_manager.tasks.GetByID(ID)
            if task:
                return task, 200
            else:
                return {"message": "Task not found"}, 404
        
    return api

