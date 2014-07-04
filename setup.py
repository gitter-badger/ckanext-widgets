from setuptools import setup, find_packages
import sys, os

version = '0.1'

setup(
    name='ckanext-widgets',
    version=version,
    description="This is a CKAN extension to create embedabble responsive widgets in other sites",
    long_description='''
    ''',
    classifiers=[], # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
    keywords='',
    author='Noe Dominguez Porras',
    author_email='noe@codeandomexico.org',
    url='http://codeandomexico.org',
    license='AGPL 3.0',
    packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
    namespace_packages=['ckanext', 'ckanext.widgets'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        # -*- Extra requirements: -*-
    ],
    entry_points='''
        [ckan.plugins]
        ckanext-widgets=ckanext.plugin:WidgetsPlugin
        widgets_controller=ckanext.widgets.controller:WidgetsController
    ''',
)
