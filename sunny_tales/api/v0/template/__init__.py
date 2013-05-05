from sunny_tales.utils.element_loader import get_element_json
import uuid
from sunny_tales.database.collections.toolbox import Toolbox
from cloudy_tales.database.client import create_db_client


def includeme(config):
    config.add_route('individual_template', '/templates/{uuid}')
    config.add_route('templates', '/templates')
    config.add_route('toolbox', 'toolbox')

    # Create mongo client connection
    create_db_client()

    config.scan()

    # Temp: On startup, insert document if none exists
    toolbox = Toolbox()
    toolbox.remove()
    document = {}
    document = get_element_json()
    document['_id'] = str(uuid.uuid4())

    # Save new template to db
    toolbox.insert(document)
