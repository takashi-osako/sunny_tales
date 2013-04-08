from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_static_view('templates', 'templates')
    config.add_route('home', '/')
    config.include('sunny_tales.api.v0.template', route_prefix='/api/v0')
    config.scan()
    return config.make_wsgi_app()
