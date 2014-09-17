import logging
import ckan.plugins as p
import ckan.plugins.toolkit as toolkit


log = logging.getLogger(__name__)


class WidgetsPlugin(p.SingletonPlugin):
    p.implements(p.IRoutes, inherit=True)
    p.implements(p.IConfigurer, inherit=True)

    def before_map(self, map):
        print(dir(toolkit.c))
        #This is a reference to the controller.
        widgets_controller = 'ckanext.widgets.controller:WidgetsController'
	
        map.connect('/dataset/{id}/widget', controller=widgets_controller,
		 action='view_widget')

	map.connect('/dataset/{id}/test_widget', controller=widgets_controller, 
		action='view_test_widget')

        return map

    def update_config(self, config):
        #This plugin's templates.
        toolkit.add_template_directory(config, 'templates')

        #This plugin public files.
        toolkit.add_public_directory(config, 'public')

        #This plugin fanstatic  files.
        toolkit.add_resource('fanstatic', 'widget')
