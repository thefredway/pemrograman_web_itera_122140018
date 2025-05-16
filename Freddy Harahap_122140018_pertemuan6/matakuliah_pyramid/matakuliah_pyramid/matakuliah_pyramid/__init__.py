from pyramid.config import Configurator
from . import db

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('pyramid_tm')
        config.include('.routes')
        config.include(db.includeme)        # Add API routes
        config.add_route('get_all_matakuliah', '/api/matakuliah', request_method='GET')
        config.add_route('get_matakuliah', '/api/matakuliah/{id}', request_method='GET')
        config.add_route('create_matakuliah', '/api/matakuliah', request_method='POST')
        config.add_route('update_matakuliah', '/api/matakuliah/{id}', request_method='PUT')
        config.add_route('delete_matakuliah', '/api/matakuliah/{id}', request_method='DELETE')
        
        config.scan('.views.matakuliah')
    return config.make_wsgi_app()
