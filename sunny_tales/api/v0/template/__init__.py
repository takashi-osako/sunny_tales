from sunny_tales.utils.element_loader import get_element_json
import uuid
from sunny_tales.database.collections.elements import Elements
from sunny_tales.database.client import create_db_client


def includeme(config):
    config.add_route('get_put_template', '/template/{uuid}')
    config.add_route('get_all_templates', '/template')
    
    # Create mongo client connection
    create_db_client()
    
    config.scan()

    # Temp: On startup, insert document if none exists
    elements = Elements()
    if elements.find_one() is None:
        document={}
        document['_id'] = str(uuid.uuid4())
        document['elements'] = get_element_json()['elements']
        
        # Save new template to db
        elements.insert(document)