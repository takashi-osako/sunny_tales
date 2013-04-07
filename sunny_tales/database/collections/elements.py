'''
Created on Apr 7, 2013

@author: dorisip
'''
from sunny_tales.database.collections.base import BaseCollection


class Elements(BaseCollection):

    def __init__(self, name='elements'):
        super(Elements, self).__init__(name)
