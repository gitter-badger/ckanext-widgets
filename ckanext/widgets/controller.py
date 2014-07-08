import ckan.plugins as p
import logging

_ = p.toolkit._

class WidgetsController(p.toolkit.BaseController):
    controller = 'ckanext.widgets.controller.WidgetsController'

    def view_widget(self, id):
        '''
        Embeded page for  widget visualization.
        '''
        # We need to investigate more about context
        context = {
            #'model': model, 'session': model.Session,
            #'user': c.user or c.author, 'auth_user_obj': c.userobj
        }
        
        try:
            c.package = get_action('package_show')(context, {'id': id})
            data_dict = {'resource': c.resource, 'package': c.package}
        except NotFound:
            abort(404, _('Resource not found'))
        except NotAuthorized:
            abort(401, _('Unauthorized to read resource %s') % id)
        
        return p.toolkit.render('widget.html', data_dict)

