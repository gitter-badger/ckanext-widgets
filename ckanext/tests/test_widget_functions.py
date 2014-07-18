'''Tests for the ckanext.widgets extension.'''

import paste.fixture
import pylons.test
import webtest

import ckan.model as model
import ckan.tests as tests
import ckan.plugins
import ckan.new_tests.factories as factories

class TestWidgetsVisualization(object):
  """Tests for the Widgets Visualization of datasets.
  """

  def test_package_load_which_exists(self):
    pass

  def test_package_load_without_id(self):
    pass

  def test_package_load_which_does_not_exists(self):
    pass

  def test_package_load_which_is_private(self):
    pass
