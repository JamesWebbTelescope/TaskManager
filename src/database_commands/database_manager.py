import mysql.connector
from database_commands.admin import AdminModel
from database_commands.students import StudentModel
from database_commands.tutorials import TutorialModel

class DatabaseManager:
    def __init__(self, host, user, password, dbname):

        '''
        Docstring for __init__
        
        :param host: IP address of the server running 
        :param user: Username for the database system
        :param password: Password for the database
        :param dbname: name of the database
        '''
        self.host = host 
        self.user = user
        self.password = password
        self.dbname = dbname

        self.mydb = None

        self.admin = AdminModel(self)
        self.students = StudentModel(self)
        self.tutorials = TutorialModel(self)

        try:
            self.get_connection() #Try ot open a connection

        except Exception as e: #If anything goes wrong, print the error
            print(f"Could not connect to database: {dbname}")
            print(f"Error: {e}")

    def get_connection(self):
        try:
            if not self.mydb or not self.mydb.is_connected(): #If no connection has been established
                self.mydb = mysql.connector.connect( #Connect to to the database
                    host=self.host,
                    user=self.user,
                    password=self.password,
                    database=self.dbname,
                    auth_plugin='mysql_native_password',
                )
            return self.mydb
        except Exception as e: #If anything goes wrong, print the error.
            print(f"Could not get sql connection: {e}")
            return None