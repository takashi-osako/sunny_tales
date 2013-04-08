'''
Created on Apr 2, 2013

@author: tosako
'''

from pyramid.view import view_config
from sunny_tales.database.collections.elements import Elements
from sunny_tales.database.collections.templates import Templates
import uuid
import datetime


@view_config(route_name='get_put_template', request_method='GET', renderer='json')
def get_template(request):
    '''
    Handles get requests for a template
    Special case is when the id is 'new', that's when we read from elements collection to get default
    '''
    uuid = request.matchdict['uuid']
    if uuid.lower() == 'new':
        elements = Elements()
        results = elements.find_one()
        # append empty template to json
        results['template'] = {}
    else:
        # TODO: static class instead of instance?
        templates = Templates()
        results = templates.find_one_by_id(uuid)
    
    return results

@view_config(route_name='get_put_template', request_method='PUT', renderer='json')
def save_custom_template(request):
    '''
    Handles put requests to save new and overwrite existing custom template into template collection
    '''
    document = {}
    # TODO: disallow uuid of 'new' or create a new endpoint for default element
    _id = request.matchdict['uuid']
    
    try:
        # pyramid tests if the payload is json format, throws exception if it isn't
        body = request.json_body
    except ValueError:
        # TODO: raise some error exception
        return {'error': 'invalid json'}
    
    document['template'] = body
    templates = Templates()
    metadata = { 'parent_id': _id, 'timestamp': datetime.datetime.utcnow()}
    document['metadata'] = metadata
    
    results = templates.find_one_by_id(_id)
    if results is None:
        return templates.update_by_id(_id, document, upsert=True)
    else:
        # Need to archive if uuid exists in db
        # Current concept:  add metaData with timestamp and save 'parend_id'
        # To get current revision, look for parent_id = uuid with latest timestamp
        # To revert, delete/pop the latest timestamp
        # Idea 2:  swap content, so document with _id is always the most uptodate
        new_id = str(uuid.uuid4())
        return templates.update_by_id(new_id, document)


@view_config(route_name='get_all_templates', request_method='GET', renderer='json')
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
    
    