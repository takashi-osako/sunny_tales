'''
Created on Apr 7, 2013

@author: dorisip
'''
from zope import component
from sunny_tales.database.client import IDbClient
from pymongo.mongo_client import MongoClient


class DbConnection(object):

    def __init__(self, collection, db_name='sunny'):
        self.__client = component.queryUtility(IDbClient).get_client()
        self.__db_name = db_name
        self.__collection = collection

    def __enter__(self):
        return self

    def __exit__(self, type, value, traceback):
        # In memory mongo connection doesn't support close()
        if isinstance(self.__client, MongoClient):
            self.__client.close()

    def get_client(self):
        return self.__client

    def get_db(self):
        return self.get_client()[self.__db_name]

    def get_collection(self):
        return self.get_db()[self.__collection]

    def insert(self, *args, **kwargs):
        '''
        Given a collection name, and a python dictionary, insert it
        '''
        col = self.get_collection()
        _id = col.insert(*args, **kwargs)
        return _id

    def find(self, *args, **kwargs):
        '''
        Find based on _id
        Returns a list of json objects
        '''
        col = self.get_collection()
        results = col.find(*args, **kwargs)
        return list(results)

    def find_one(self, *args, **kwargs):
        '''
        Find_one in collection
        '''
        col = self.get_collection()
        result = col.find_one(*args, **kwargs)
        return result

    def remove(self, *args, **kwargs):
        '''
        Remove document from mongo
        '''
        col = self.get_collection()
        return col.remove(*args, **kwargs)

    def update(self, *args, **kwargs):
        '''
        Update a document with doc
        doc is a python dictionary
        '''
        col = self.get_collection()
        return col.update(*args, **kwargs)
