'''
Created on Apr 2, 2013

@author: tosako
'''

from pyramid.view import view_config
from sunny_tales.database.collections.toolbox import Toolbox
from sunny_tales.database.collections.templates import Templates
import uuid
import datetime
from bson import json_util
import json


@view_config(route_name='toolbox', request_method='GET', renderer='json')
def get_toolbox(request):
    toolbox = Toolbox()
    results = toolbox.find_one()

    return results


@view_config(route_name='individual_template', request_method='GET', renderer='json')
def get_template(request):
    '''
    Handles get requests for a template
    Special case is when the id is 'new', that's when we read from elements collection to get default
    '''
    uuid = request.matchdict['uuid']

    # TODO: static class instead of instance?
    templates = Templates()
    results = templates.find_one_by_id(uuid)
    if results is None:
        results = {'template': {}}

    # We need this because of date formmating in mongo is not in json
    json_str = json.dumps(results, default=json_util.default)
    return json.loads(json_str)


@view_config(route_name='individual_template', request_method='PUT', renderer='json')
def save_custom_template(request):
    '''
    Handles put requests to save new and overwrite existing custom template into template collection
    '''
    __id = request.matchdict['uuid']
    document = {}
    document['template'] = __get_payload(request)
    document['metadata'] = __generate_metadata(__id)
    
    templates = Templates()
    results = templates.find_one_by_id(__id)
    if results is None:
        return templates.update_by_id(__id, document, upsert=True)
    else:
        # Need to archive if uuid exists in db
        # Current concept:  add metaData with timestamp and save 'parend_id'
        # To get current revision, look for parent_id = uuid with latest timestamp
        # To revert, delete/pop the latest timestamp
        # Idea 2:  swap content, so document with _id is always the most uptodate
        new_id = str(uuid.uuid4())
        return templates.update_by_id(new_id, document)


@view_config(route_name='templates', request_method='GET', renderer='json')
def get_all_templates(request):
    '''
    Returns all custom templates' id
    '''
    templates = Templates()
    results = templates.find()
    ids = []
    for result in results:
        ids.append(result['_id'])
    return ids


@view_config(route_name='templates', request_method='POST', renderer='json')
def create_new_template(request):
    document = {}
    __id =  str(uuid.uuid4())
    
    document['_id'] = __id
    document['template'] = __get_payload(request)
    document['metadata'] = __generate_metadata(__id)
    
    templates = Templates()
    return templates.insert(document)


def __get_payload(request):
    '''
    Request python dictionary of request payload
    '''
    try:
        # pyramid tests if the payload is json format, throws exception if it isn't
        body = request.json_body
    except ValueError:
        # TODO: raise some error exception
        body = {'error': 'invalid json'}
    return body


def __generate_metadata(parent_id):
    '''
    Generate metadata for a template
    '''
    return {'parent_id': parent_id, 'timestamp': datetime.datetime.utcnow()}
