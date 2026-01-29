import mysql.connector

class StudentModel:

    def __init__(self, db):
        self.db = db
    
    def GetAll(self):
        '''
        Docstring for GetAll
        
        Get all students
        '''
        try:
            conn = self.db.get_connection() #Open a connection to the database
            with conn.cursor() as cursor: #Open a cursor
                cursor.execute("SELECT * FROM students") #Get all students
                myresult = cursor.fetchall() #Get the result
                results = [] 
                for u in myresult:
                    results.append(StudentModel._TupleToDict(u)) #Convert the result to tuples
                return results
        except Exception as e: #If anything goes wrong, print the error
            print("Error getting all students", e)
            return False
        
    def Create(self, firstname, lastname, status):
        '''
        Docstring for Create
        
        :param firstname: First name of the student that you want to add
        :param lastname: Last name of the student that you want to add
        :param status: Status of the student (active or inactive)
        '''
        try:
            conn = self.db.get_connection() #Open a connection to the database
            with conn.cursor() as cursor: #Get a cursor
                cursor.execute(f"INSERT INTO tutorials.students (firstname, lastname, status) VALUES('{firstname}', '{lastname}', '{status}')") #Add the student
                myresult = cursor.fetchall()
            conn.commit() #Close the connection
            return True
        except Exception as e: #If anything goes wrong, print the error.
            print("Error creating new student", e)
            return False
    
    def Update(self, ID, firstname, lastname, status):
        '''
        Docstring for Update
    
        :param ID: ID of the student you want to update
        :param firstname: New first name for the student
        :param lastname: New last name for the student you want to update
        :param status: New status for the student (active or inactive)
        '''
        try:
            conn = self.db.get_connection() #Open a connection to the database
            with conn.cursor() as cursor: #Get a cursor
                cursor.execute(f"UPDATE students SET firstname = '{firstname}', lastname = '{lastname}', status = '{status}' WHERE studentID = {ID}") #Update the student based on the ID of the student
                myresult = cursor.fetchall() #Get the result
            conn.commit() #Close the connection
            return True
        except Exception as e: #If anything goes wrong, print the error
            print("Error updating student", e)
            return False
        
    def Delete(self, ID):
        '''
        Docstring for Delete
        
        :param ID: ID of the student you want to remove
        '''
        try:
            conn = self.db.get_connection() #Open the connection to the database
            with conn.cursor() as cursor: #Get a cursor
                cursor.execute(f"UPDATE students SET firstname = '', lastname = '', status = 'Inactive' WHERE studentID = {ID}") #Remove the name of the student and set status to Inactive
                myresult = cursor.fetchall()
            conn.commit() #Close the connection
            return True
        except Exception as e: #If anything goes wrong, print the error.
            print("Error deleting student", e)
            return False
        
    def _TupleToDict(tuple): #Convert the result from the database to a tuple
        return {
                "ID": tuple[0],
                "firstname": tuple[1],
                "lastname": tuple[2],
                "status": tuple[3]
            }