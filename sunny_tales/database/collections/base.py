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

    def insert(self, doc_id):
        with DbConnection(self.__name) as conn:
            return conn.insert(doc_id)

    def remove(self, doc_id):
        with DbConnection(self.__name) as conn:
            return conn.remove(doc_id)

    def update(self, doc_id, doc, upsert=False):
        with DbConnection(self.__name) as conn:
            return conn.update(doc_id, doc, upsert=upsert)

    def find(self, doc_id=None):
        with DbConnection(self.__name) as conn:
            return conn.find(doc_id=doc_id)

    def find_one(self, doc_id=None):
        with DbConnection(self.__name) as conn:
            return conn.find_one(doc_id=doc_id)
