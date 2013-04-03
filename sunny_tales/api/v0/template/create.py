'''
Created on Apr 2, 2013

@author: tosako
'''

from pyramid.view import view_config
import uuid
from sunny_tales.utils.element_loader import get_element_json

@view_config(route_name='api.v0.template.create', request_method='GET', renderer='json')
def create(request):
    document={}
    document['id'] = str(uuid.uuid4())
    document['element'] = get_element_json()
    return document
