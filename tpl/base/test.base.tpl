{% extends 'base/base.tpl' %}

 {%block css_global%}
	{{ super() }}
	{{ cssLink([
		'/lib/qunit/qunit-2.0.1.css'
	]) }}
{%endblock%}

 {%block js_global%}
	{{jsLink([
		'/lib/qunit/qunit-2.0.1.js'
	])}}
	{{ super() }}
 {%endblock%}

 {%block content_start%}
	<div id="qunit"></div>
	<div id="qunit-fixture"></div>
{%endblock%}