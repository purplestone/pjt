{% extends 'common/base.tpl' %}

{%block css%}
	{{ cssLink([
		'/page/demo/demo.css'
	]) }}
{%endblock%}


{%block content%}

	<div class="container"><div class="row"><div class="col-xs-12">data : {{v.msg}}</div></div></div>




	<!-- demo 特有数据 -->
	 {% macro node(v={}) %}
		 {% if v.name %}
			<div class="list-group-item name _triggerShow" {% if v.type == 'dir' %}style="display:none;"{% endif %}><i class="iconfont"></i><span><a target="_blank" {% if v.path %}href="/{{v.path}}"{% endif %}>/{{v.path}}</a></span></div>
		 {% endif %}
		 {% if v.children | length > 0 %}
			 {% for n in v.children %}
				{{node(n)}}
			 {% endfor %}
		 {% endif %}
	 {% endmacro %}
	<div class="container"><div class="row">
		<div class="col-xs-6"><div class="files-tree list-group"><b class="list-group-item">tpl</b>{{node(tplList)}}</div></div>
		<div class="col-xs-6"><ul class="list-group"><b class="list-group-item">hash</b>
		 {% for item in hashList %}
			<li class="list-group-item"><a href="{{item}}" target="_blank">{{item}}</a></li>
		 {% endfor %}
		</ul></div>
	</div></div>
	<!-- /demo 特有数据 -->

	

	

{%endblock%}


 {%block js_end%}
	<script>
		//requirejs(['page/demo/demo'], function ($$p) {$$p();});
	</script>
 {%endblock%}