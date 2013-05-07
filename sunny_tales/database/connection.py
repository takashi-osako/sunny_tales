'''
Created on Apr 7, 2013

@author: dorisip
'''
from cloudy_tales.database.connection import DbConnection

class SunnyDbConnection(DbConnection):

    def __init__(self, db_name='sunny'):
        DbConnection.__init__(self, db_name)
