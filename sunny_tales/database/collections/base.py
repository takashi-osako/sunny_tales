'''
Created on Apr 7, 2013

@author: dorisip
'''
from sunny_tales.database.connection import DbConnection


class BaseCollection(object):
    '''
    Base database collection class
    '''

    def __init__(self, name):
        self.__name = name

    def insert(self, *args, **kwargs):
        with DbConnection(self.__name) as conn:
            doc_id = conn.insert(*args, **kwargs)
            # TODO: error check?
            return {'_id': doc_id}

    def remove_by_id(self, doc_id, *args, **kwargs):
        with DbConnection(self.__name) as conn:
            return conn.remove({'_id': doc_id}, *args, **kwargs)

    def remove(self, *args, **kwargs):
        with DbConnection(self.__name) as conn:
            return conn.remove(*args, **kwargs)

    def update_by_id(self, doc_id, doc, upsert=True, *args, **kwargs):
        with DbConnection(self.__name) as conn:
            result = conn.update({'_id': doc_id}, {'$set': doc}, upsert=upsert, *args, **kwargs)
            if result and result['ok']:
                return {'_id': doc_id}
            else:
                return None

    def update(self, *args, **kwargs):
        with DbConnection(self.__name) as conn:
            return conn.update(*args, **kwargs)

    def find_by_id(self, doc_id, *args, **kwargs):
        with DbConnection(self.__name) as conn:
            return conn.find_one({'_id': doc_id}, *args, **kwargs)

    def find(self, *args, **kwargs):
        with DbConnection(self.__name) as conn:
            return conn.find(*args, **kwargs)

    def find_one_by_id(self, doc_id, *args, **kwargs):
        with DbConnection(self.__name) as conn:
            return conn.find_one({'_id': doc_id}, *args, **kwargs)

    def find_one(self, *args, **kwargs):
        with DbConnection(self.__name) as conn:
            return conn.find_one(*args, **kwargs)
