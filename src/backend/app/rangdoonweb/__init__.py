from pyramid.config import Configurator
from pyramid.renderers import JSON
from rangdooncore.swatch import Color


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.routes')
        config.add_renderer('json', color_json_renderer())
        config.scan()
    enable_cors(config)
    return config.make_wsgi_app()

def color_json_renderer():
    def adapter(color, request):
        return color.to_dict()

    json_renderer = JSON()
    json_renderer.add_adapter(Color, adapter)
    return json_renderer

def enable_cors(config):
    from pyramid.request import Request
    from pyramid.request import Response

    def request_factory(environ):
        request = Request(environ)
        if True:#request.is_xhr:
            request.response = Response()
            request.response.headerlist = []
            request.response.headerlist.extend(
                (
                    ('Access-Control-Allow-Origin', '*'),
                    ('Content-Type', 'application/json')
                )
            )
        return request

    config.set_request_factory(request_factory)

    