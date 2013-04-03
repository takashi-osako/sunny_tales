def includeme(config):
    config.add_route('api.v0.template.new', '/api/v0/template/new')
    config.scan()
