'''
Created on Apr 7, 2013

@author: dorisip
'''
import unittest
from sunny_tales.database.connection import DbConnection
from sunny_tales.database.tests.unittest_db_helper import create_in_memory_db_client


class TestConnection(unittest.TestCase):

    @staticmethod
    def setUpClass():
        create_in_memory_db_client()

    def setUp(self):
        self.__conn = DbConnection('testCollection')

    def tearDown(self):
        # Drop rows in collection
        self.__conn.get_client()['sunny']['testCollection'].remove()

    def test_get_client(self):
        client = self.__conn.get_client()
        self.assertIsNotNone(client)

    def test_get_db(self):
        db = self.__conn.get_db()
        self.assertEquals(db.name, 'sunny')

    def test_get_collection(self):
        col = self.__conn.get_collection()
        self.assertEquals(col.name, 'testCollection')

    def test_insert(self):
        result = self.__conn.insert({'_id': 123})
        self.assertEquals(result, 123)
        self.assertEquals(len(self.__conn.find()), 1)

    def test_find_doc_not_exists(self):
        result = self.__conn.find({'not': 'exist'})
        self.assertEquals(result, [])

    def test_find_doc_exists(self):
        doc = {'_id': 1, 'value': 1}
        self.__conn.insert(doc)
        self.__conn.insert({'_id': 2, 'value': 1})
        self.__conn.insert({'_id': 3, 'value': 1})
        result = self.__conn.find({'_id': doc['_id']})
        self.assertIn(doc, result)
        self.assertEquals(len(result), 1)

        result = self.__conn.find({'value': 1})
        self.assertEquals(len(result), 3)

    def test_find_with_no_criteria(self):
        self.__conn.insert({'_id': 2, 'value': 1})
        self.__conn.insert({'_id': 3, 'value': 1})

        result = self.__conn.find()
        self.assertEquals(len(result), 2)

    def test_find_one(self):
        doc = {'_id': 1, 'value': 1}
        self.__conn.insert(doc)
        result = self.__conn.find_one()
        self.assertEquals(doc, result)

    def test_find_one_with_criteria(self):
        doc = {'_id': 1, 'value': 1}
        other_doc = {'_id': 2}
        self.__conn.insert(doc)
        self.__conn.insert(other_doc)

        result = self.__conn.find_one({'_id': 2})
        self.assertEquals(other_doc, result)

        result = self.__conn.find_one({'_id': 1})
        self.assertEquals(doc, result)

    def test_find_one_with_no_results(self):
        result = self.__conn.find_one({'_id': 2})
        self.assertIsNone(result)

    def test_remove(self):
        self.__conn.insert({'_id': 1, 'value': 234})
        self.__conn.remove({'_id': 1})
        result = self.__conn.find_one()
        self.assertIsNone(result)

    def test_remove_all(self):
        self.__conn.insert({'_id': 1, 'value': 234})
        self.__conn.insert({'_id': 2, 'value': 2})
        self.__conn.remove()
        result = self.__conn.find_one()
        self.assertIsNone(result)

    def test_update(self):
        self.__conn.insert({'_id': 1, 'value': 234})
        self.__conn.update({'_id': 1}, {'$set': {'value': 1}})

        result = self.__conn.find_one()
        self.assertEquals(result['value'], 1)

    def test_update_with_upsert(self):
        self.__conn.update({'_id': 1}, {'$set': {'value': 1}}, upsert=True)
        result = self.__conn.find_one()
        self.assertEquals(result['value'], 1)


if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()
