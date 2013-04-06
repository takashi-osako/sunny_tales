'''
Created on Apr 2, 2013

@author: tosako
'''

from pyramid.view import view_config
import uuid
from utils.element_loader import get_element_json
from database.connection import insert

@view_config(route_name='api.v0.template.new', request_method='GET', renderer='json')
def new_template(request):
    document={}
    document['_id'] = str(uuid.uuid4())
    document['elements'] = get_element_json()['elements']
    document['template'] = {}
    
    # Save new template to db
    insert(document)
    
    return document
