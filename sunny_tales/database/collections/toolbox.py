'''
Created on Apr 7, 2013

@author: dorisip
'''
from cloudy_tales.database.collections.base import BaseCollection
from cloudy_tales.database.MongoOperationManager import MongoOperationManager


class Toolbox(BaseCollection):

    def __init__(self, connection, name='toolbox'):
        super(Toolbox, self).__init__(MongoOperationManager(connection), name)

    def find_one(self, *args, **kwargs):
        results = super(Toolbox, self).find_one(*args, **kwargs)
        if results is None:
            results = {}
        return results
