'''
Created on Apr 7, 2013

@author: dorisip
'''
from cloudy_tales.database.connectionManager import DbConnectionManager


class SunnyDbConnection(DbConnectionManager):

    def __init__(self, db_name='sunny'):
        DbConnectionManager.__init__(self, db_name)
