from database.connection import create_db_client
def includeme(config):
    config.add_route('api.v0.template.new', '/api/v0/template/new')
    
    # Include database
    config.include('sunny_tales.database')
    # Create mongo client connection
    create_db_client()
    
    config.scan()
