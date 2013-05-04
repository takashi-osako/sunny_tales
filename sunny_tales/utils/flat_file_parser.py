'''
Created on May 2, 2013

@author: dorisip
'''
import os
from pycparser import parse_file
from pycparser.c_ast import NodeVisitor


def parse_flat_file():
    os.environ['PATH'] += os.pathsep + '/usr/bin'
    here = os.path.abspath(os.path.dirname(__file__))
    f = os.path.join(here, '..', 'resources', 'test.h')
    ast = parse_file(f, use_cpp=True, cpp_path='/usr/bin/cpp-4.2')
    # Prints out parsed file structure
    ast.show(attrnames=True)

    for child in ast.ext:
        translator = Translator()
        cv = SunnyVisitor(translator)
        cv.visit(child)
        print(translator.stack)


# Visits nodes of AST
class SunnyVisitor(NodeVisitor):
    def __init__(self, translator):
        self.translator = translator

    def visit_Decl(self, node):
        if node.name is not None:
            self.translator.add_decl(node.name)
        NodeVisitor.generic_visit(self, node)

    def visit_Struct(self, node):
        self.translator.add_struct(node.name)
        NodeVisitor.generic_visit(self, node)

    def visit_ArrayDecl(self, node):
        self.translator.mark_array()
        NodeVisitor.generic_visit(self, node)
        self.translator.mark_end_of_array()

    def visit_TypeDecl(self, node):
        #self.translator.add_variable(node.declname)
        NodeVisitor.generic_visit(self, node)

    def visit_IdentifierType(self, node):
        self.translator.add_type(node.names)
        NodeVisitor.generic_visit(self, node)

    def visit_Constant(self, node):
        self.translator.add_size(node.value)


class Translator():
    def __init__(self):
        self.stack = []

    def add_struct(self, name):
        self.stack.append(name)

    def add_decl(self, name):
        self.stack.append(name)

    def mark_array(self):
        pass
#        arr = self.stack.pop()
#        self.stack.append({'name': arr, 'type': 'array'})

    def mark_end_of_array(self):
        pass

    def add_variable(self, name):
        self.stack.append(name)

    def add_type(self, type_name):
        self.stack.append(type_name[0])

    def add_size(self, value):
        self.stack.append(value)
