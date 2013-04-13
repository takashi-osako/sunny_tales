'''
Created on Apr 7, 2013

@author: dorisip
'''
from sunny_tales.database.collections.base import BaseCollection


class Toolbox(BaseCollection):

    def __init__(self, name='toolbox'):
        super(Toolbox, self).__init__(name)
