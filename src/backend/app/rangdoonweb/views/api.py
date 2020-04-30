import pyramid.httpexceptions as exp
from pyramid.view import view_config, view_defaults
from pyramid.response import Response
from rangdooncore.appservice import swatchservice
from rangdooncore.exceptions import SwatchException


@view_defaults(route_name='swatches', renderer="json")
class SwatchApiView:
    def __init__(self, request):
        self.request = request
        self.user_id = int(request.matchdict['user_id'])

    @view_config(request_method="GET")
    def get_swatches(self):
        return swatchservice.get_swatch_names(self.user_id)

    @view_config(route_name='swatch', request_method="GET")
    def get_swatch(self):
        swatch = swatchservice.get_swatch(
            self.user_id, self.request.matchdict['swatch_name'])
        return swatch if swatch != None else exp.HTTPNotFound

    @view_config(route_name='swatch', request_method="DELETE")
    def delete_swatch(self):
        try:
            deleted = swatchservice.delete_swatch(
                self.user_id,
                self.request.matchdict['swatch_name'])
            return exp.HTTPOk() if deleted else exp.HTTPNotFound()
        except:
            return exp.HTTPInternalServerError()

    @view_config(route_name='swatch_rename', request_method="PUT")
    def rename_swatch(self):
        if (self.request.body) != b'':
            renamed = swatchservice.rename_swatch(
                self.user_id,
                self.request.matchdict['swatch_name'],
                self.request.json_body['new_name']
            )
        else:
            return exp.HTTPBadRequest()    


    @view_config(request_method="POST", accept='text/html')
    def post_swatch(self):
        if (body:= self.request.body) != b'':
            try:
                file = swatchservice.extract_from_adobe_color(
                    body, self.user_id)
                return exp.HTTPCreated(body=file)
            except SwatchException:
                return exp.HTTPBadRequest()
            except:
                return exp.HTTPInternalServerError()
        return exp.HTTPBadRequest()
