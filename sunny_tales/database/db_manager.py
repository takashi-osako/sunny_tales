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
    client.insert(doc, col_name=col_name)


def remove(doc_id, col_name=None):
    client = component.queryUtility(IDbClient)
    client.remove(doc_id, col_name=col_name)


def update(doc_id, doc, col_name=None, upsert=False):
    client = component.queryUtility(IDbClient)
    client.update(doc_id, doc, col_name=col_name, upsert=upsert)


def find(doc_id=None, col_name=None):
    client = component.queryUtility(IDbClient)
    client.find(doc_id=doc_id, col_name=col_name)


def findOne(doc_id=None, col_name=None):
    client = component.queryUtility(IDbClient)
    client.findOne(doc_id=doc_id, col_name=col_name)
