from pyramid.config import Configurator
from pyramid.renderers import JSON
from rangdooncore.swatch import Color


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        enable_cors(config)
        config.include('.routes')
        config.add_renderer('json', color_json_renderer())
        config.scan()
    return config.make_wsgi_app()

def color_json_renderer():
    def adapter(color, request):
        return color.to_dict()

    json_renderer = JSON()
    json_renderer.add_adapter(Color, adapter)
    return json_renderer

def enable_cors(config):
    config.include('.cors')
    config.add_cors_preflight_handler()
    