from sunny_tales.utils.element_loader import get_element_json
import uuid
from sunny_tales.database.collections.toolbox import Toolbox
from sunny_tales.database.client import create_db_client


def includeme(config):
    config.add_route('get_put_template', '/template/{uuid}')
    config.add_route('get_all_templates', '/template')
    config.add_route('get_toolbox', 'toolbox')

    # Create mongo client connection
    create_db_client()

    config.scan()

    # Temp: On startup, insert document if none exists
    toolbox = Toolbox()
    if toolbox.find_one() is None:
        document = {}
        document['_id'] = str(uuid.uuid4())
        document['elements'] = get_element_json()['elements']

        # Save new template to db
        toolbox.insert(document)
