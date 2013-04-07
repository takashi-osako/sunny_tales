'''
Created on Apr 2, 2013

@author: tosako
'''

from pyramid.view import view_config
from sunny_tales.database.collections.elements import Elements

@view_config(route_name='api.v0.template.new', request_method='GET', renderer='json')
def new_template(request):
    # TODO: static class instead of instance?
    elements = Elements()
    document = elements.find_one()

    # append template to json
    document['template'] = {}
    return document
