import mysql.connector
import requests
from requests_html import HTMLSession

class TaskModel:

    def __init__(self, db):
        self.db = db
    
    '''
    This is for getting all tutorials from the database
    '''

    def GetAll(self):
        try:
            conn = self.db.get_connection() #Open a connection to the database
            with conn.cursor() as cursor: #Open a cursor for the connection
                cursor.execute("SELECT * FROM tasks") #Find all tutorials
                myresult = cursor.fetchall() #Get the response
                results = [] 
                for u in myresult:
                    results.append(TaskModel._TupleToDict(u)) #Return the response as a tuple
                return results
        except Exception as e:
            print("Error getting all tasks", e) #If anything goes wrong, print the error
            return False
        
    def Create(self, name, description, due_date, is_done):
        '''
        Docstring for Create
        
        :param name: Name of the tutorial that you want to add
        :param description: Description of the task that you want to add
        '''
        try:
            conn = self.db.get_connection() #Open a connection to the database
            with conn.cursor() as cursor: #Get a cursor
                cursor.execute(f"INSERT INTO tasks.tasks (name, description, due_date, is_done) VALUES('{name}', '{description}', '{due_date}', '{is_done}')") #Add the new tutorial
                myresult = cursor.fetchall()
            conn.commit() #Commit the connection
            return True
        
        except Exception as e: #If anything goes wrong, print the error
            print("Error adding task", e)
            return False
    
    def Update(self, ID, name, description, due_date, is_done):
        '''
        Docstring for Update
        
        :param ID: ID of the task that you wnat to update
        :param name: New name for the task
        :param description: New description for the task
        :param due_date: New due date for the task
        :param status: New status for the task
        '''
        try:
            conn = self.db.get_connection() #Open a connection to the database
            with conn.cursor() as cursor: #Open a cursor
                cursor.execute(f"UPDATE tasks.tasks SET name = '{name}', description = '{description}', due_date = '{due_date}', is_done = '{is_done}' WHERE id = {ID}") #Update the desired task with the given name and link
                myresult = cursor.fetchall() #Get the response
            conn.commit() #Close the connection
            return True
        except Exception as e: #If anything goes wrong, print the error
            print("Error updating tutorial", e)
            return False
        
    def Delete(self, ID):
        '''
        Docstring for Delete
        
        :param ID: ID of the tutorial that you want to remove
        '''
        try:
            conn = self.db.get_connection() #Open a connection to the database
            with conn.cursor() as cursor: #Open a cursor
                cursor.execute(f"UPDATE tasks.tasks SET name = '', description = '', due_date = '', is_done = '' WHERE id = {ID}") #Delete name and link for the task
                myresult = cursor.fetchall()
            conn.commit() #Close the connection
            return True
        except Exception as e: #If anything goes wrong, print the error
            print("Error deleting task", e)
            return False
        
    
    
    def _TupleToDict(tuple):
        return {
                "name": tuple[0],
                "description": tuple[1],
                "due_date": tuple[2],
                "is_done": tuple[3],
                "ID": tuple[4]
            }