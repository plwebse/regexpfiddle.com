/* 
 * Made by Peter Lindblom
 * http://plweb.se
 * */

if (!com){ var com = {}; }
if (!com.regexpfiddle) {
	com.regexpfiddle = function () {
		"use strict";
		this.regExpObj = null;
		this.errorMsg = "";
		this.makeRegExpObj = function (regexpstr, flags) {
			try {
				this.regExpObj = new RegExp(regexpstr, flags);
				this.errorMsg = "";
			} catch (e) {	
				this.errorMsg = e.message;
				this.regExpObj = null;
			}		
		};
		
		this.runRegExpTest = function (inputstr) {		
			if (this.regExpObj) {
				return this.regExpObj.test(inputstr);
			}
			return false;
		};		

		this.runRegExpExec = function (inputstr) {
			var matches = [], 
				count = 0, 
				match = false;
			
			if (this.regExpObj) {
				this.regExpObj.lastIndex = 0;				
				if (this.regExpObj.global) {
					while ((match = this.regExpObj.exec(inputstr)) !== null) {
						if (count > 10000) {
							return [];
						}
						
						matches = this.makeMatches(matches, match);
						
						count = count + 1;
					}
				} else {					
					this.regExpObj.lastIndex = 0;
					match = this.regExpObj.exec(inputstr);					
					if (match) {
						matches = this.makeMatches(matches, match);
					}					
				}
			}

			return matches;
		};

		this.makeMatches = function (matches, match) {
			var	i,
				startPosFromMatch = 0,
				endPosFromMatch = 0,
				currentMatch = {};
			if (match) {
				for (i = 0; i < match.length; i = i + 1) {	
					if (i === 0) {					
						if (match[0].indexOf(match[i], i) > -1) {
							startPosFromMatch = match.index + match[0].indexOf(match[i], i);
							endPosFromMatch = startPosFromMatch + match[i].length;
							currentMatch = {startPos: startPosFromMatch, endPos: endPosFromMatch, content: match[i]};
						}
					} else {
						
						if (match[0].indexOf(match[i], i) > -1) {
							if (i === 1) {
								currentMatch.groups = [];
							}							
							startPosFromMatch = match.index + match[0].indexOf(match[i], i);
							endPosFromMatch = startPosFromMatch + match[i].length;
							currentMatch.groups.push({startPos: startPosFromMatch, endPos: endPosFromMatch, content: match[i]});
						}						
					}
				}
				matches.push(currentMatch);
			}
			
			return matches;
		};
		
		this.markOccurrences = function (orginalText, matches, startTag, endTag, escapeHtml) {
			var output = orginalText, 
				startOffset = 0,
				match = "",
				matchWithStartTagAndEndTag = "", 
				startPos = 0, 
				endPos = 0, 
				m = 0;
			
			if (matches.length < 100000) { //slow
				
				for (m = 0; m < matches.length; m = m + 1) {
					
					startPos = (startOffset + matches[m].startPos);
					endPos = (startOffset + matches[m].endPos);					
					match = output.slice(startPos, endPos); 

					matchWithStartTagAndEndTag = startTag + match + endTag;

					output = this.replace(output, matchWithStartTagAndEndTag, startPos, endPos);

					startOffset = output.length - orginalText.length;					
				}
				
			} else {
				this.errorMsg += "slow reqexp"; 
			}
			return escapeHtml ? this.escape(output, startTag, endTag) : output; 
		};

		this.getErrorMessage = function () {
			return this.errorMsg;
		};

		this.replace = function (text, replaceMent, replaceMentStartPos, replaceMentEndPos) {
			
			var output = text,
				start = output.slice(0, replaceMentStartPos),
				end = output.slice(replaceMentEndPos, output.length);
			
			return start + replaceMent + end; 
		};
		
		this.escape = function (input, startTag, endTag) {
			var output = input,
				startOffset = 0,						
				lt = "&lt;",
				gt = "&gt;";

			while (startOffset <= output.length) {

				//skip starttags
				if ((output.length >= (startOffset + startTag.length)) && (output.substr(startOffset, startTag.length) === startTag)) {
					startOffset = startOffset + startTag.length;
				} else if ((output.length >= (startOffset + endTag.length)) && (output.substr(startOffset, endTag.length) === endTag)) {	
					startOffset = startOffset + endTag.length;
				} else if (output.charAt(startOffset) === "<") {					
					output = this.replace(output, lt, startOffset, startOffset + 1);
					startOffset = startOffset + lt.length;
				} else if (output.charAt(startOffset) === ">") {					
					output = this.replace(output, gt, startOffset, startOffset + 1);
					startOffset = startOffset + gt.length;
				} else {					
					startOffset = startOffset + 1;
				}
			}

			return output;
		};

	};
}