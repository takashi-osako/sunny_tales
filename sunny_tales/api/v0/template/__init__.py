from database.db_manager import create_db_client


def includeme(config):
    config.add_route('api.v0.template.new', '/api/v0/template/new')
    
    # Create mongo client connection
    create_db_client()
    
    config.scan()
