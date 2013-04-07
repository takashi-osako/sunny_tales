'''
Created on Apr 7, 2013

@author: dorisip
'''
from sunny_tales.database.collections.base import BaseCollection


class Templates(BaseCollection):

    def __init__(self, name='templates'):
        super(Templates, self).__init__(name)
