from database.db_manager import create_db_client, find_one, insert
from utils.element_loader import get_element_json
import uuid


def includeme(config):
    config.add_route('api.v0.template.new', '/api/v0/template/new')
    
    # Create mongo client connection
    create_db_client()
    
    config.scan()

    # Temp: On startup, insert document if none exists
    if find_one() is None:
        document={}
        document['_id'] = str(uuid.uuid4())
        document['elements'] = get_element_json()['elements']
        document['template'] = {}
        
        # Save new template to db
        insert(document)