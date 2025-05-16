from pyramid.view import view_config


@view_config(route_name='home', renderer='matakuliah_pyramid:templates/mytemplate.jinja2')
def my_view(request):
    return {'project': 'matakuliah_pyramid'}
