<?php

if($_SERVER["SERVER_NAME"] != "regexpfiddle.com" && $_SERVER["SERVER_NAME"] != "localhost"){
        header("location: http://regexpfiddle.com", TRUE, 301);
}

function mdate($file){
	$res="?mod=0";
	if(file_exists(realpath($file))){
		$res = "?mod=".filemtime(realpath($file));
	}
	
	return $res;
}

ob_start();

?>
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="Regular Expression RegExp " />
    <meta name="description" content="RegExpFiddle.com is a simple web service for you to try out some of your regular expression." />    
    <title>RegExpFiddle.com</title>
    <link href="css/regexpfiddle.css<?php echo mdate("css/regexpfiddle.css");?>" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="js/regexpfiddle.js<?php echo mdate("js/regexpfiddle.js");?>"></script>
    <script type="text/javascript" src="js/ls.js<?php echo mdate("js/ls.js");?>"></script>
    <script type="text/javascript">

var regExpId = "regexp",
	testValueId = "testvalue",
	testResultId = "testresult",
	errorsId = "errors",
	documentTitle = "RegExpFiddle.com",
	mailId="mailId";

function profileStart(){
	"use strict";
	
	if(window && window.console && window.profileOn){
		window.console.profile();		
	}
}

function profileEnd(){
	"use strict";
	
	if(window && window.console && window.profileOn){
		window.console.profileEnd();
	}
}

function getElementById(id) {
	"use strict";
    if (document.getElementById(id)) {
        
		return document.getElementById(id);
	}
	return undefined;
}
    
function getFormValueById(id) {
	"use strict";
	if (getElementById(id)) {
		return getElementById(id).value;
	}
	return "";
}

function setFormValueById(id, iValue) {
	"use strict";
	if (getElementById(id)) {
		getElementById(id).value = iValue;
	}	
}
    
function clearAndWriteResult(id, value) {
	"use strict";	
	getElementById(id).innerHTML = value;
}

function clearAndWriteResults(id, values) {
	"use strict";
	var output = "", 
		i = 0;

	for (i=0; i < values.length; i = i + 1) {
		output = output + ((i===0) ? "<b>Main match</b><br/>" : "<b>Group number:"+i+" </b><br/>") + values[i].replace(/\n/g,"<br />") + "<br /><hr />"; 
	}

	clearAndWriteResult(id, output);
}

function loadDataFromLocalStorage() {
	"use strict";
	if (ls.get(regExpId) && ls.get(regExpId).length > 0) {
		clearAndWriteResult(regExpId, ls.get(regExpId));	
	}
	
	if (ls.get(testValueId) && ls.get(testValueId).length > 0) {
		clearAndWriteResult(testValueId, ls.get(testValueId));	
	} 
}

function saveDataToLocalStorage() {
	"use strict";
	ls.set(regExpId, getFormValueById(regExpId));
	ls.set(testValueId, getFormValueById(testValueId));
}

function runRegExp() {
	"use strict";

	profileStart();
	var regExpFiddle = new com.regexpfiddle(),	
		options = [{id: 'ignoreCase', value: 'i'}, {id: 'global', value: 'g'}, {id: 'multiline', value: 'm'}],
		flags = "",
		i = 0,
		m = 0,
		matches = [],
		results = [],
		testValue = getFormValueById(testValueId),
		startTag = "<span>",
		endTag = "</span>",
		escapeHtml = true;
    	
	for (i=0; i < options.length; i = i + 1) {
		if (getElementById(options[i].id).checked) {
			flags = flags + options[i].value;
		}
	}

	regExpFiddle.makeRegExpObj(getFormValueById(regExpId), flags);

	matches = regExpFiddle.runRegExpExec(testValue);
	
	results.push(regExpFiddle.markOccurrences(testValue, matches, startTag, endTag, escapeHtml)); 

	for (m=0; m < matches.length; m = m + 1) {
		if (matches[m].groups && matches[m].groups.length > 0) {
			results.push(regExpFiddle.markOccurrences(testValue, matches[m].groups, startTag, endTag, escapeHtml));
		}
	}

	updateTitle(matches.length);
	
	clearAndWriteResult(errorsId, regExpFiddle.getErrorMessage());
	clearAndWriteResults(testResultId, results);
	
	saveDataToLocalStorage();
	profileEnd();
}

function clearAndReset() {
	"use strict";

	setFormValueById(regExpId, "");
	clearAndWriteResult(errorsId, "");
	setFormValueById(testValueId, "");
	clearAndWriteResult(testResultId, "");
	
	ls.clear();
}

function updateTitle(numberOfMatches){
	"use strict"
	if(document.title){		
		document.title = documentTitle + " ( matches: " + numberOfMatches+ " )";
	}
}

function displayEmail(){
	"use strict"
	var mailElement = getElementById(mailId) 
	
	mailElement.href = "mailto:";
	mailElement.href += "info";
	mailElement.href += "@regexpfiddle";
	mailElement.href += ".com";

	mailElement.innerHTML += "info";
	mailElement.innerHTML += "@regexpfiddle";
	mailElement.innerHTML += ".com";
	
}

    </script>
    <script type="text/javascript">

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-25155117-1']);
      _gaq.push(['_trackPageview']);
      _gaq.push(['_trackPageLoadTime']);

      (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

    </script>
  </head>
<body onload="loadDataFromLocalStorage();displayEmail();">
<form action="#donotdoit" method="get" onsubmit="return false;">
  <div class="main">

    <h1 class="center">RegExpFiddle.com</h1>
    <p class="center">
      RegExpFiddle.com is a simple web service for you to try out some of your regular expression.
    </p>

    <div id="regexpContainer" class="container">
      <h3><label for="regexp">Regular Expression</label></h3>
      <textarea name="regexp" id="regexp" cols="40" rows="3">L\w*</textarea>
      <input type="checkbox" id="global" name="global" value="g" /><label for="global">Global</label> 
      <input type="checkbox" id="ignoreCase" name="ignoreCase" value="i" /><label for="ignoreCase">Ignore case</label>
      <input type="checkbox" id="multiline" name="multiline" value="m" /><label for="multiline">Multiline</label>
    </div>
    <p id="errors" class="center"></p>
    <p class="center">
    	<input type="button" id="runit" value="Run it" onclick="runRegExp();" />    	
    </p>
    <p class="center">
    	<input type="button" id="reset" value="Reset and clear" onclick="clearAndReset();" />    	
    </p>
    <div class="container">
      <h3><label for="testvalue">Text to find matches in</label></h3>
      <textarea name="testvalue" id="testvalue" cols="40" rows="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lectus sem, accumsan ac cursus vitae, interdum ac magna. Donec turpis dolor, ornare quis dignissim non, mattis eget est. Sed non risus quis dolor cursus luctus. Donec tristique, orci sit amet commodo consequat, diam ligula tristique arcu, a ultricies massa libero ac dolor. Aenean metus dolor, blandit at semper ac, feugiat quis mauris. Nulla bibendum leo scelerisque urna lobortis sagittis. Duis egestas varius lorem, sit amet lacinia justo iaculis non.</textarea>
    </div>
    <div id="resultContainer" class="container">
      <h3><label for="runit">Matches</label></h3>
      <div id="testresult"></div>
    </div>
    
    <p class="left">
    	<small>
      		Thanks to Foad who inspired me. <br />
      		<a href="test/SpecRunner.html" target="_blank">Run jasmine tests</a><br />
      		Made by me <a href="http://plweb.se">Peter Lindblom @ 2011</a> <br /> 
      		<a id="mailId" href=""></a>      
      	</small> 
    </p>
    
  </div>
</form>

</body>
</html>

<?php 
ob_end_flush();

?>
