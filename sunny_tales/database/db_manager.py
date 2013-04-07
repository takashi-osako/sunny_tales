from zope import component
from client import DbClient, IDbClient


def create_db_client(host='localhost', port=27017):
    '''
    Register mongoClient in zope
    '''
    connector = DbClient(host, port)
    component.provideUtility(connector, IDbClient)


def insert(doc, col_name=None):
    client = component.queryUtility(IDbClient)
    return client.insert(doc, col_name=col_name)


def remove(doc_id, col_name=None):
    client = component.queryUtility(IDbClient)
    return client.remove(doc_id, col_name=col_name)


def update(doc_id, doc, col_name=None, upsert=False):
    client = component.queryUtility(IDbClient)
    return client.update(doc_id, doc, col_name=col_name, upsert=upsert)


def find(doc_id=None, col_name=None):
    client = component.queryUtility(IDbClient)
    return client.find(doc_id=doc_id, col_name=col_name)


def find_one(doc_id=None, col_name=None):
    client = component.queryUtility(IDbClient)
    return client.findOne(doc_id=doc_id, col_name=col_name)
