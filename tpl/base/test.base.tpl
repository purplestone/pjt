<!DOCTYPE html>
<html id="{%block html_id%}doc{%endblock%}" class=" {%block html_class%}{%endblock%}" {%block html_info%}{%endblock%}>
<head {%block profile%}{%endblock%}>
 {%block encode%}
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="zh-cn" />
 {%endblock%}
	<title> {%block head_title%}{%block title_suffix%}QUnit {%block title%}{%endblock%}{%endblock%}{%endblock%} </title>
 {%block meta%}
	{%block keywords%}<meta content="site keywords" name="keywords"/>{%endblock%}
	{%block description%}<meta content="site description" name="description"/>{%endblock%}
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
 {%endblock%}
{% set resVer = 'test' %}
 {%block ico%}
	<link href="/favicon.ico" rel="shortcut icon"  type="image/x-icon" />
	<link href="/favicon.ico" rel="icon"  />
 {%endblock%}
 <style type="text/css">.sw {float:left;width:1px;height:1px;text-indent:2px;overflow:hidden;margin:-1px -1px 0 0;}</style>
{% macro cssLink(list=[], resPath=c.resPath, resVer=resVer) %}
 {% for css in list %}
	<link href="{{resPath}}{{css}}{% if resVer != '' %}?ver={{resVer}}{% endif %}" type="text/css" rel="stylesheet" media="all" />
 {% endfor %}
{% endmacro %}
 {%block css_global%}
	{{ cssLink([
		'/lib/qunit/qunit-2.0.1.css'
	]) }}
{%endblock%}
{% macro jsLink(list=[], resPath=c.resPath, resVer=resVer) %}
 {% for js in list %}
	<script src="{{resPath}}{{js}}{% if resVer != '' %}?ver={{resVer}}{% endif %}"></script>
 {% endfor %}
{% endmacro %}
 {%block css%}{%endblock%}
 {%block js_conf%}
	 <script>var __CONF_ = {
		resPath : '{{c.resPath}}',
		resVer : '{{resVer}}'
	 };</script>
 {%endblock%}
 {%block js_global%}
	{{jsLink([
		'/lib/qunit/qunit-2.0.1.js',
		'/lib/requirejs/2.3.2.js'
	])}}
 {%endblock%}
 {%block js%}{%endblock%}
<body id="{%block body_id%}{%endblock%}" class=" {%block body_class%}{%endblock%}" {%block body_info%}{%endblock%}>
	<!--[if IE ]>
		<!--[if lt IE 9]><div class="page __page is-ie lt-ie9"><![endif]-->
		<!--[if gt IE 8]><div class="page __page is-ie"><!--<![endif]-->
	<!--<![endif]-->
	<!--[if ! IE ]><!--><div class="page __page"><!--<![endif]-->
 {%block body_start%}{%endblock%}

 {%block header%}{%endblock%}

 {%block content_start%}{%endblock%}
	<div id="qunit"></div>
	<div id="qunit-fixture"></div>
 {%block content%}{%endblock%}
 {%block content_end%}{%endblock%}

 {%block footer%}{%endblock%}
 {%block footer_end%}{%endblock%}

 {%block counter%}{%endblock%}

 {%block body_end%}{%endblock%}
	</div>

	<div class="js-statistic" style="display:none;">
		{%block js_statistic%}{%endblock%}
	</div>

 {%block js_end%}{%endblock%}
</body>
</html>