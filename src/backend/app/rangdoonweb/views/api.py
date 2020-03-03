import pyramid.httpexceptions as exp
from pyramid.view import view_config, view_defaults
from pyramid.response import Response
from rangdooncore.appservice import swatchservice
from rangdooncore.exceptions import SwatchException


@view_defaults(route_name='files', renderer="json")
class FileApiView:
    def __init__(self, request):
        self.request = request
        self.user_id = int(request.matchdict['user_id'])

    @view_config(request_method="GET")
    def get_files(self):
        return swatchservice.get_files(self.user_id)

    @view_config(route_name='file', request_method="GET")
    def get_file(self):
        return swatchservice.get_file(self.user_id, self.request.matchdict['file_name'])

    @view_config(route_name='file', request_method="DELETE")
    def delete_file(self):
        try:
            swatchservice.delete_file(
                self.user_id, self.request.matchdict['file_name'])
            return exp.HTTPOk()
        except:
            return exp.HTTPInternalServerError()

    @view_config(request_method="POST", accept='text/html')
    def post_file(self):
        if (body:= self.request.body) != b'':
            try:
                file = swatchservice.extract_from_adobe_color(body, self.user_id)
                return exp.HTTPCreated(body=file)
            except SwatchException:
                return exp.HTTPBadRequest()
            except:
                return exp.HTTPInternalServerError()
        return exp.HTTPBadRequest()
