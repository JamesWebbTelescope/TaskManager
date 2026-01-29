from dataclasses import dataclass
import json

@dataclass
class Config:
    """Class containing config data
    """
    db_name: str
    db_host: str
    db_user: str
    db_password: str
    #jwt_token: str
    debug: bool
    swagger_ui: bool
    api_host: str
    api_port: int



def ReadConfigFile(filename): #Get the configuration from the configuration file
    with open(filename) as f:
        try:
            data = json.load(f) #Get the file
            conf =Config( #Get all settings
                db_name=data['db_name'],
                db_host=data['db_host'],
                db_password=data['db_password'],
                db_user=data['db_user'],
                #jwt_token=data['jwt_token'],
                debug=data['debug'],
                swagger_ui=data['swagger_ui'],
                api_host=data['api_host'],
                api_port=data['api_port']
            )
        except Exception as e: #If anything goes wrong, print the error.
            print(f"Cannot read file \"{filename}\". Exception {e}")            
            conf = None

    return conf