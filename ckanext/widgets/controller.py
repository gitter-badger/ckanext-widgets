import ckan.plugins as p
import logging

_ = p.toolkit._

class WidgetsController(p.toolkit.BaseController):
    controller = 'ckanext.widgets.controller.WidgetsController'

    #@p.toolkit.auth_allow_anonymous_access
    def view_widget(self):
        return p.toolkit.render('widget.html')
