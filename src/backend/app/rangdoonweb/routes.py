def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    include_api_routes(config)


def include_api_routes(config):
    config.add_route('files', '/users/{user_id:\d+}/files')
    config.add_route('file', '/users/{user_id:\d+}/files/{file_name}')
