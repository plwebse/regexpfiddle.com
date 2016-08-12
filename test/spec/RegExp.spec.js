var regExpObj = new com.regexpfiddle();

describe("namespace test", function(){
	it("should not destory any globle scope vars only append", function(){
		net = new com.regexpfiddle();
		expect(com.minlinuxserver.object).toEqual(true);
		expect(com.regexpfiddle).toBeDefined();
	});
});



describe("RegExp", function() {
	it("should be able to find test with no caps and only no caps", function() {

		regExpObj.makeRegExpObj("test", "");
	    expect(regExpObj.runRegExpTest("test")).toEqual(true);
	    expect(regExpObj.runRegExpTest("TEST")).toEqual(false);

	});
	
	it("should be able to find test with caps and without caps", function() {

		regExpObj.makeRegExpObj("test", "i");
	    expect(regExpObj.runRegExpTest("test")).toEqual(true);
	    expect(regExpObj.runRegExpTest("TEST")).toEqual(true);

	});
	

	it("should be able to match numbers", function() {

		regExpObj.makeRegExpObj("[0-9]", "");
		
	    expect(regExpObj.runRegExpTest("123456789")).toEqual(true);
	    
	    expect(regExpObj.runRegExpTest("abcdef")).toEqual(false);

	});


	it("should be able to match letters with no caps", function() {

		regExpObj.makeRegExpObj("[a-z]", "");
		
		expect(regExpObj.runRegExpTest("abcdefz")).toEqual(true);
	    expect(regExpObj.runRegExpTest("123456789")).toEqual(false);
	    expect(regExpObj.runRegExpTest("ABCDEFZ")).toEqual(false);
	    

	});

	it("should be able to match letters with all caps", function() {

		regExpObj.makeRegExpObj("[A-Z]", "");
		
		expect(regExpObj.runRegExpTest("abcdefz")).toEqual(false);
	    expect(regExpObj.runRegExpTest("123456789")).toEqual(false);
	    expect(regExpObj.runRegExpTest("ABCDEFZ")).toEqual(true);
	    

	});

	it("should be able to use runRegExpExec 1", function() {

		regExpObj.makeRegExpObj("[A-Z]", "igm");
		
		expect(regExpObj.runRegExpExec("abcdefg")).toContain({startPos : 0, endPos : 1, content : 'a'});
		
	});
	
	it("should be able to use runRegExpExec 2", function() {

		regExpObj.makeRegExpObj("a|b|c", "igm");
		
		var res = regExpObj.runRegExpExec("abcdefg"); 
		
		expect(res).toContain({startPos : 0, endPos : 1, content : 'a'});
		expect(res).toContain({startPos : 1, endPos : 2, content : 'b'});
		expect(res).toContain({startPos : 2, endPos : 3, content : 'c'});
		expect(res).toNotContain({startPos : 3, endPos : 4, content : 'd'});
		expect(res).toNotContain({startPos : 4, endPos : 5, content : 'f'});
		
	});
	
	it("should be able to use runRegExpExec 3", function() {

		regExpObj.makeRegExpObj("a|b|c", "igm");
		
		var res = regExpObj.runRegExpExec("abcdefg"); 
		
		expect(res).toContain({startPos : 0, endPos : 1, content : 'a'});
		expect(res).toContain({startPos : 1, endPos : 2, content : 'b'});
		expect(res).toContain({startPos : 2, endPos : 3, content : 'c'});
		expect(res).toNotContain({startPos : 3, endPos : 4, content : 'd'});
		expect(res).toNotContain({startPos : 4, endPos : 5, content : 'f'});
		
	});
			
	it("should be able to use runRegExpExec 2", function() {

		regExpObj.makeRegExpObj("a|b|c", "igm");
		
		var res = regExpObj.runRegExpExec("abcdefg"); 
		
		expect(res).toContain({startPos : 0, endPos : 1, content : 'a'});
		expect(res).toContain({startPos : 1, endPos : 2, content : 'b'});
		expect(res).toContain({startPos : 2, endPos : 3, content : 'c'});
		
	});

	
	it("should be able to use runRegExpExec", function() {

		regExpObj.makeRegExpObj("[0-9].", "igm");
		expect(regExpObj.runRegExpExec("abcdefg33fafsd33")).toContain({startPos : 7, endPos : 9, content : '33'});
		
		regExpObj.makeRegExpObj("[0-9].", "igm");
		expect(regExpObj.runRegExpExec("abcdefg33fafsd33")).toContain({startPos : 14, endPos : 16, content : '33'});		
	});
	
	it("should be able to find first match at startPos 0", function() {
		
		regExpObj.makeRegExpObj("hello", "");
		expect(regExpObj.runRegExpExec("hello hello hello")).toContain({startPos : 0, endPos : 5, content : 'hello'});
		
		regExpObj.makeRegExpObj("hello", "g");
		expect(regExpObj.runRegExpExec("hello hello hello")).toContain({startPos : 12, endPos : 17, content : 'hello'});		
	});
	
	it("should be able to mark all occurrences", function() {
		
		var text = "hello hello hello";
		var start = "start";
		var end = "end";
		regExpObj.makeRegExpObj("hello", "");
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 0, endPos : 5, content : 'hello'});
		
		var result = regExpObj.markOccurrences(text, regExpObj.runRegExpExec(text), start, end);
		
		expect(result).toEqual(start+"hello"+end+" hello hello");		
	});
	
	it("should be able to mark all occurrences", function() {
		
		var text = "hello hello hello";
		var start = "start";
		var end = "end";
		regExpObj.makeRegExpObj("hello", "g");
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 0, endPos : 5, content : 'hello'});
		
		var result = regExpObj.markOccurrences(text, regExpObj.runRegExpExec(text), start, end);
		
		expect(result).toEqual(start+"hello"+end+" "+start+"hello"+end+" "+start+"hello"+end);		
	});
	
	it("should be able to mark all occurrences", function() {
		
		var text = "hello12hello34hello56";
		var start = "start";
		var end = "end";
		regExpObj.makeRegExpObj("[0-9].", "g");
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 5, endPos : 7, content : '12'});
		
		var result = regExpObj.markOccurrences(text, regExpObj.runRegExpExec(text), start, end);
		
		expect(result).toEqual("hello"+start+"12"+end+"hello"+start+"34"+end+"hello"+start+"56"+end);		
	});
	
	it("should be able to mark all occurrences", function() {
		
		var text = "hello\nhello\nhello";
		var start = "start";
		var end = "end";
		regExpObj.makeRegExpObj("^(.*)$", "gm");
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 6, endPos : 11, content : 'hello'});
		
		var result = regExpObj.markOccurrences(text, regExpObj.runRegExpExec(text), start, end);
		
		expect(result).toEqual(start+"hello"+end+"\n"+start+"hello"+end+"\n"+start+"hello"+end);		
	});
	
	it("should be able to mark all occurrences", function() {
		
		var text = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
		var start = "start";
		var end = "end";
		regExpObj.makeRegExpObj("^a*$", "gm");
		var contentText = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 0, endPos : contentText.length, content : contentText});
		
		var result = regExpObj.markOccurrences(text, regExpObj.runRegExpExec(text), start, end);
		
		expect(result).toEqual(start+contentText+end+"\nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");		
	});
	
	it("should be able to mark groups ", function() {
		
		var text = "abbbbc";
		var start = "start";
		var end = "end";
		regExpObj.makeRegExpObj("^a(.*)c$", "gm");
		var contentText = 'abbbbc';
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 0, endPos : contentText.length, content : contentText, groups:[{startPos: 1, endPos: 5, content:"bbbb"}]});
		
		
		var result = regExpObj.markOccurrences(text, [{startPos: 1, endPos: 5, content:"bbbb"}], start, end);
		
		expect(result).toEqual("a"+start+"bbbb"+end+"c");		
	});
	
	it("should be able to detect errors", function() {
		var regExpObj = new com.regexpfiddle;
		regExpObj.makeRegExpObj("*", "g");
		
		var result = regExpObj.getErrorMessage();
		
		expect((result.length > 0)).toEqual( true );		
	});
	
	
});

describe("ReExp Replace", function() {
	
	it("should be able to add text into string", function() {
		var value = "<p><i>i</i></p>";
		
		expect(regExpObj.replace(value, "replaceme", 6, 7)).toEqual("<p><i>replaceme</i></p>");
		
	});
	
	it("should be able to add text into string", function() {
		var value = "<p><i>i</i></p>";
		
		expect(regExpObj.replace(value, "replaceme", 0, 0)).toEqual("replaceme<p><i>i</i></p>");
		
	});
	
	it("should be able to add text into string", function() {
		
		
		var value = "<p><i>i</i></p>";
		var value2 = regExpObj.replace(value, "replaceme", 6, 7);
		
		expect(value2).toEqual("<p><i>replaceme</i></p>");
		
		expect(value.indexOf("<i>", 0)).toEqual(3);
		
		expect(value2.indexOf("<i>", 0)).toEqual(3);
		
		expect(value.indexOf("</i>", 0)).toEqual(7);
		
		expect(value2.indexOf("</i>", 0)).toEqual(15);
		
	});
	
	it("should be able to append text to a string", function() {
		
		
		var value = "<p><i>i</i></p>";
		var value2 = regExpObj.replace(value, "replaceme", 14, 15);
		
		expect(value2).toEqual("<p><i>i</i></preplaceme");
		
		expect(value2.length).toEqual("<p><i>i</i></preplaceme".length);
	});
});

describe("ReExp Escape", function() {

	it("should be able to escape html chars 1", function() {
		
		var text = "<i>http://www.plweb.se/</i>";
		var start = "<span>";
		var end = "</span>";
		regExpObj.makeRegExpObj(".*", "");
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 0, endPos : text.length, content : text});
		
		var result = regExpObj.markOccurrences(text, regExpObj.runRegExpExec(text), start, end, true);
		
		expect(result).toEqual(start+"&lt;i&gt;http://www.plweb.se/&lt;/i&gt;"+end);		
	});
	
	it("should be able to escape html chars 2", function() {
		
		var text = "<a href=\"http://www.plweb.se/\">http://www.plweb.se/</a>";
		var start = "<span>";
		var end = "</span>";
		regExpObj.makeRegExpObj(".*", "");
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 0, endPos : text.length, content : text});
		
		var result = regExpObj.markOccurrences(text, regExpObj.runRegExpExec(text), start, end, true);
		
		expect(result).toEqual(start+"&lt;a href=\"http://www.plweb.se/\"&gt;http://www.plweb.se/&lt;/a&gt;"+end);		
	});
	
	
	
	it("should be able to escape html chars 3.1", function() {
		
		var text = "<i>html</i><i>html</i>";
		var start = "<span>";
		var end = "</span>";
		regExpObj.makeRegExpObj("html", "g");
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 3, endPos : "html".length +3, content : "html"});
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 14, endPos : "html".length +14, content : "html"});
		expect(regExpObj.runRegExpExec(text).length).toEqual(2);
		
		var result = regExpObj.markOccurrences(text, regExpObj.runRegExpExec(text), start, end, true);
		
		expect(result).toEqual("&lt;i&gt;<span>html</span>&lt;/i&gt;&lt;i&gt;<span>html</span>&lt;/i&gt;");		
	});
	
	it("should be able to escape html chars 3", function() {
		
		var text = "<p><i>html</i></p><p><i>html</i></p>";
		var start = "<span>";
		var end = "</span>";
		regExpObj.makeRegExpObj("html", "g");
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 6, endPos : "html".length +6, content : "html"});
		
		var result = regExpObj.markOccurrences(text, regExpObj.runRegExpExec(text), start, end, true);
		
		expect(result).toEqual("&lt;p&gt;&lt;i&gt;<span>html</span>&lt;/i&gt;&lt;/p&gt;&lt;p&gt;&lt;i&gt;<span>html</span>&lt;/i&gt;&lt;/p&gt;");		
	});
	
	it("should be able to escape html chars 4", function() {
		
		var text = "<a href=\"http://www.plweb.se/\">http://www.plweb.se/</a> <a href=\"http://www.plweb.se/\">http://www.plweb.se/</a>";
		var start = "<span>";
		var end = "</span>";
		var searchForText = "http://www.plweb.se/";
		regExpObj.makeRegExpObj(searchForText, "g");
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 9, endPos : searchForText.length + 9, content : searchForText});
		expect(regExpObj.runRegExpExec(text)).toContain({startPos : 87, endPos : 87 + searchForText.length, content : searchForText});
		
		
		var result = regExpObj.markOccurrences(text, regExpObj.runRegExpExec(text), start, end, true);
		
		expect(result).toEqual("&lt;a href=\"<span>http://www.plweb.se/</span>\"&gt;<span>http://www.plweb.se/</span>&lt;/a&gt; &lt;a href=\"<span>http://www.plweb.se/</span>\"&gt;<span>http://www.plweb.se/</span>&lt;/a&gt;");		
	});
	
});


