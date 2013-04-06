'''
Created on Apr 5, 2013

@author: dorisip
'''
from pymongo.mongo_client import MongoClient
from zope import interface


class IDbClient(interface.Interface):
    pass


class DbClient:
    interface.implements(IDbClient)

    def __init__(self, host, port, db_name='sunny', col_name='test'):
        self.__client = MongoClient(host, port)
        self.__db_name = db_name
        self.__col_name = col_name

    def get_client(self):
        return self.__client

    def get_db(self):
        return self.get_client()[self.__db_name]

    def get_collection(self, col_name=None):
        if col_name is None:
            col_name = self.__col_name
        return self.get_db()[col_name]

    def __del__(self):
        self.__client.close()

    def insert(self, doc, col_name=None):
        '''
        Given a collection name, and a python dictionary, insert it
        '''
        col = self.get_collection(col_name)
        _id = col.insert(doc)
        return _id

    def find(self, doc_id=None, col_name=None):
        '''
        Find based on _id
        Returns a list of json objects
        '''
        col = self.get_collection(col_name)
        criteria = {}
        if doc_id is not None:
            criteria = {'_id': doc_id}
        results = col.find(criteria)
        return list(results)

    def findOne(self, doc_id=None, col_name=None):
        '''
        FindOne in collection
        '''
        col = self.get_collection(col_name)
        criteria = {}
        if doc_id is not None:
            criteria = {'_id': doc_id}
        result = col.find_one(criteria)
        return result

    def remove(self, doc_id, col_name=None):
        '''
        Remove document from mongo
        '''
        col = self.get_collection(col_name)
        return col.remove(spec_or_id=doc_id)

    def update(self, doc_id, doc, col_name=None, upsert=False):
        '''
        Update a document with doc
        doc is a python dictionary
        '''
        col = self.get_collection(col_name)
        return col.update({'_id': doc_id}, {'$set': doc}, upsert=upsert)
