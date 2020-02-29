import pyramid.httpexceptions as exp
from pyramid.view import view_config, view_defaults
from pyramid.response import Response
from rangdooncore.appservice import swatchservice
from rangdooncore.exceptions import SwatchException


@view_defaults(route_name='files', renderer="json")
class FileApiView:
    def __init__(self, request):
        self.request = request
        self.user_id = 1

    @view_config(request_method="GET")
    def get_files(self):
        return swatchservice.get_files(self.user_id)

    # @view_config(request_method="GET")
    # def get_file(self):
    #     return swatchservice.get_files(self.user_id)

    @view_config(request_method="POST")
    def post_file(self):
        if (body := self.request.body) != b'':
            try:
                file = swatchservice.extract_from_adobe_color(body, self.user_id)
                return exp.HTTPCreated(body=file)
            except SwatchException:
                return exp.HTTPBadRequest()
            except:
                return exp.HTTPInternalServerError()
        return exp.HTTPBadRequest()
