'''
Created on Apr 7, 2013

@author: dorisip
'''
from zope import component
from sunny_tales.database.client import IDbClient


class DbConnection(object):

    def __init__(self, collection, db_name='sunny'):
        self.__client = component.queryUtility(IDbClient).get_client()
        self.__db_name = db_name
        self.__collection = collection

    def __enter__(self):
        return self

    def __exit__(self, type, value, traceback):
        self.__client.close()

    def get_client(self):
        return self.__client

    def get_db(self):
        return self.get_client()[self.__db_name]

    def get_collection(self):
        return self.get_db()[self.__collection]

    def insert(self, doc):
        '''
        Given a collection name, and a python dictionary, insert it
        '''
        col = self.get_collection()
        _id = col.insert(doc)
        return _id

    def find(self, doc_id=None):
        '''
        Find based on _id
        Returns a list of json objects
        '''
        col = self.get_collection()
        criteria = {}
        if doc_id is not None:
            criteria = {'_id': doc_id}
        results = col.find(criteria)
        return list(results)

    def find_one(self, doc_id=None):
        '''
        Find_one in collection
        '''
        col = self.get_collection()
        criteria = {}
        if doc_id is not None:
            criteria = {'_id': doc_id}
        result = col.find_one(criteria)
        return result

    def remove(self, doc_id):
        '''
        Remove document from mongo
        '''
        col = self.get_collection()
        return col.remove(spec_or_id=doc_id)

    def update(self, doc_id, doc, upsert=False):
        '''
        Update a document with doc
        doc is a python dictionary
        '''
        col = self.get_collection()
        return col.update({'_id': doc_id}, {'$set': doc}, upsert=upsert)
