'''
Created on Apr 19, 2013

@author: dorisip
'''
import json
from bson import json_util
import os
import errno

def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc:
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else: 
            raise

def export(data, tar_dir='/tmp/sunny'):
    file_name = os.path.join(tar_dir, data['_id'] + '.json')
    mkdir_p(tar_dir)
    with open(file_name, 'w') as f:
        content = json.dumps(data, default=json_util.default)
        f.write(content)
