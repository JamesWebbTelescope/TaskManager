from flask_restx import Namespace, Resource, fields, Model
from flask import request, jsonify
from apis.auth import authorizations

def create_api_tutorials(db_manager):

    api: Namespace = Namespace("tasks", description="task namespace", authorizations=authorizations)

    task_model: Model = api.model("Tasks", {'ID': fields.Integer(required=True, description="The task ID"),
                                                    'name': fields.String(required=True, description="Name of the task"),
                                                    'description': fields.String(required=True, description="Description of the task"),
                                                    'due_date': fields.String(required=True, description="Due date of the task"),
                                                    'status': fields.String(required=True, description="Status of the task")})
    
    delete_task_model: Model = api.model("Delete task", {'ID': fields.Integer(required=True, description="The task ID")})

    @api.route("/")
    class Tasks(Resource):

        @api.doc("Get all tasks")
        def get(self):
            tasks = db_manager.tasks.GetAll()
            return tasks, 200
        
        @api.doc("Add new task")
        @api.expect(task_model)
        def post(self):
            name = api.payload['name']
            description = api.payload['description']
            due_date = api.payload['due_date']
            status = api.payload['status']
            tutorials = db_manager.tasks.Create(name, description, due_date, status)
            return tutorials, 200
        
        @api.doc("Update tasks")
        @api.expect(task_model)
        def put(self):
            ID = api.payload['ID']
            name = api.payload['name']
            description = api.payload['description']
            due_date = api.payload['due_date']
            status = api.payload['status']
            tutorials = db_manager.tasks.Update(ID, name, description, due_date, status)
            return tutorials, 200
        
        @api.doc("Delete tasks")
        @api.expect(delete_task_model)
        def delete(self):
            ID = api.payload['ID']
            tutorials = db_manager.tasks.Delete(ID)
            return tutorials, 200

        
    return api

