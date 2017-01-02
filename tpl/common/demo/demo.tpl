{% extends 'base/base.tpl' %}

{%block css%}
	<link href="{{c.resPath}}/pjt/developer/page/demo/demo.css" type="text/css" rel="stylesheet" media="all" />
{%endblock%}


 {%block content%}
 demo page : {{v.msg}}
 {%endblock%}