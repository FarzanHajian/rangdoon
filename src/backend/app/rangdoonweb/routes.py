def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    include_api_routes(config)


def include_api_routes(config):
    config.add_route('swatches', '/users/{user_id:\d+}/swatches')
    config.add_route('swatch', '/users/{user_id:\d+}/swatches/{swatch_name}')
    config.add_route('swatch_rename', '/users/{user_id:\d+}/swatches/{swatch_name}/rename')
