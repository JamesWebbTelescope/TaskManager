import mysql.connector
import requests
from requests_html import HTMLSession

class TutorialModel:

    def __init__(self, db):
        self.db = db
    '''
    This is for getting the text from blog posts, websites etc.
    '''
    def GetExternal(self, url):
        try:
            print("Accessing external tutorial")
            print(url)
            self.is_valid_url(url) #Check that it is a valid link.
            session = HTMLSession() #Start a new website session
            response = session.get(url) #Get the response from the website
            print(response.status_code)
            response = response.html.find('html') #Find the body of the response
            print(response[0])
            #soup = BeautifulSoup(response.text, "html.parser")
            #text_content = soup.get_text(separator="\n", strip=True)
            session.close()
            return response[0].text.encode('UTF-8') #Return it as a text string
        except Exception as e: #If anything goes wrong
            print("Error getting tutorial:", e) #Print the error
            return False
    
    '''
    This is for getting all tutorials from the database
    '''

    def GetAll(self):
        try:
            conn = self.db.get_connection() #Open a connection to the database
            with conn.cursor() as cursor: #Open a cursor for the connection
                cursor.execute("SELECT * FROM tutorials") #Find all tutorials
                myresult = cursor.fetchall() #Get the response
                results = [] 
                for u in myresult:
                    results.append(TutorialModel._TupleToDict(u)) #Return the response as a tuple
                return results
        except Exception as e:
            print("Error getting all tutorials", e) #If anything goes wrong, print the error
            return False
        
    def Create(self, name, link):
        '''
        Docstring for Create
        
        :param name: Name of the tutorial that you want to add
        :param link: Link for the tutorial that you want to add
        '''
        try:
            response = self.is_valid_url(link) #Check that the link is valid
            if(response == True): #If it is
                conn = self.db.get_connection() #Open a connection to the database
                with conn.cursor() as cursor: #Get a cursor
                    cursor.execute(f"INSERT INTO tutorials.tutorials (name, link) VALUES('{name}', '{link}')") #Add the new tutorial
                    myresult = cursor.fetchall()
                conn.commit() #Commit the connection
                return True
            else:
                return False #If it doesn't work, return False
        
        except Exception as e: #If anything goes wrong, print the error
            print("Error adding tutorial", e)
            return False
    
    def Update(self, ID, name, link):
        '''
        Docstring for Update
        
        :param ID: ID of the tutorial that you wnat to update
        :param name: New name for the tutorial
        :param link: New link for the tutorial
        '''
        try:
            response = self.is_valid_url(link) #Check that the link is valid
            if(response == True):
                conn = self.db.get_connection() #Open a connection to the database
                with conn.cursor() as cursor: #Open a cursor
                    cursor.execute(f"UPDATE tutorials SET name = '{name}', link = '{link}' WHERE tutorialID = {ID}") #Update the desired tutorial with the given name and link
                    myresult = cursor.fetchall() #Get the response
                conn.commit() #Close the connection
                return True
            else:
                return False
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
                cursor.execute(f"UPDATE tutorials SET name = '', link = '' WHERE tutorialID = {ID}") #Delete name and link for the tutorial
                myresult = cursor.fetchall()
            conn.commit() #Close the connection
            return True
        except Exception as e: #If anything goes wrong, print the error
            print("Error updating student", e)
            return False
        
    def is_valid_url(self, link):
        try:
            response = requests.head(link, allow_redirects=True, timeout=5) #Any valid URL will have a head, so if the website returns a head, that means that it is valid
            return True
        except requests.exceptions.MissingSchema:
            # Raised if the URL is malformed (e.g., missing http/https)
            print("Invalid URL: Missing schema (e.g., http or https).")
            return False
        except requests.exceptions.ConnectionError:
            # Raised if the URL's domain is unreachable
            print("Invalid URL: Unable to connect to the server.")
            return False
        except requests.exceptions.Timeout:
            # Raised if the request times out
            print("Invalid URL: Request timed out.")
            return False
        except requests.exceptions.RequestException as e:
            # Catch-all for other request-related exceptions
            print(f"Invalid URL: {e}")
            return False
        except requests.exceptions.HTTPError as e:
            print(f"Something went wrong: {e}")
            return False
    
    def _TupleToDict(tuple):
        return {
                "ID": tuple[0],
                "name": tuple[1],
                "link": tuple[2]
            }