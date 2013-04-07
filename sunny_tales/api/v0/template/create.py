'''
Created on Apr 2, 2013

@author: tosako
'''

from pyramid.view import view_config
from database.db_manager import find_one

@view_config(route_name='api.v0.template.new', request_method='GET', renderer='json')
def new_template(request):
    # executes mongo.find_one() against default collection
    document = find_one()
    return document
