def includeme(config):
    config.add_route('api.v0.template.create', '/api/v0/template/create')
    config.scan()
