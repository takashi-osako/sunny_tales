'''
Created on Apr 5, 2013

@author: dorisip
'''
from pymongo.mongo_client import MongoClient
from zope import interface, component


def create_db_client(host='localhost', port=27017):
    '''
    Register mongoClient in zope
    '''
    connector = DbClient(host, port)
    component.provideUtility(connector, IDbClient)


class IDbClient(interface.Interface):
    pass


class DbClient:
    interface.implements(IDbClient)

    def __init__(self, host, port, max_pool_size=10):
        self.__client = MongoClient(host, port, max_pool_size)

    def get_client(self):
        return self.__client
