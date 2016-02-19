/* parser generated by jison 0.4.15 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[7,40],$V1=[2,40],$V2=[1,7],$V3=[5,7,9,10,15,17,22,29,30,35,36,40],$V4=[2,39],$V5=[1,14],$V6=[1,15],$V7=[1,19],$V8=[1,20],$V9=[1,21],$Va=[9,15,17,22,35,36,40],$Vb=[5,40],$Vc=[5,22,29,35,40],$Vd=[5,9,40],$Ve=[1,61],$Vf=[1,63],$Vg=[1,60],$Vh=[1,64],$Vi=[9,40];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"protocol":3,"PROTOCOL":4,"NAME":5,"eol":6,"{":7,"nodes":8,"}":9,"EOF":10,"node":11,"states":12,"flow":13,"type":14,"STATES":15,"names":16,"FLOW":17,"=>":18,"record":19,"any":20,"case":21,"RECORD":22,"fields":23,"params":24,"(":25,")":26,"field":27,"one_eol":28,"TYPE":29,"NUMBER":30,":":31,"[":32,"]":33,"anonymous":34,"ANY":35,"CASE":36,"OF":37,"cases":38,".":39,"EOL":40,"$accept":0,"$end":1},
terminals_: {2:"error",4:"PROTOCOL",5:"NAME",7:"{",9:"}",10:"EOF",15:"STATES",17:"FLOW",18:"=>",22:"RECORD",25:"(",26:")",29:"TYPE",30:"NUMBER",31:":",32:"[",33:"]",35:"ANY",36:"CASE",37:"OF",39:".",40:"EOL"},
productions_: [0,[3,10],[8,3],[8,1],[11,1],[11,1],[11,1],[12,7],[16,1],[16,3],[13,10],[13,9],[14,1],[14,1],[14,1],[19,8],[24,0],[24,4],[23,1],[23,3],[27,2],[27,4],[27,2],[27,5],[27,5],[27,5],[27,4],[27,2],[27,1],[27,2],[27,5],[27,5],[34,7],[34,7],[20,8],[21,10],[38,5],[38,3],[38,7],[6,1],[6,0],[28,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = { type:'protocol', name:$$[$0-8], nodes:$$[$0-4] }; generator.eval(this.$); 
break;
case 2: case 19:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 3: case 8: case 18:
 this.$ = [$$[$0]]; 
break;
case 4: case 5: case 6:
 this.$ = $$[$0]; 
break;
case 7:
 this.$ = {type:'states', names:$$[$0-2]}; 
break;
case 9:
 $$[$0-2].push($$[$0]);this.$ = $$[$0-2]; 
break;
case 10:
 this.$ = { type:'flow', state:$$[$0-8], request:$$[$0-4], response:$$[$0-2] }; 
break;
case 11:
 this.$ = { type:'flow', request:$$[$0-4], response:$$[$0-2] } 
break;
case 12: case 13: case 14:
 this.$ = {type:'type', def:$$[$0]}; 
break;
case 15:
 this.$ = {subtype:'record', name:$$[$0-6], fields:$$[$0-2]}; 
break;
case 16:
 this.$ = null; 
break;
case 17:
 this.$ = {type:$$[$0-2], arg:$$[$0-1]}; 
break;
case 20:
 this.$ = {type:$$[$0-1], value:$$[$0]}; 
break;
case 21:
 this.$ = {type:$$[$0-3], value:$$[$0-2], name:$$[$0]}; 
break;
case 22:
 this.$ = {type:$$[$0-1], name:$$[$0]}; 
break;
case 23: case 24:
 this.$ = {type:$$[$0-4], name:$$[$0-3], n:$$[$0-1]}; 
break;
case 25:
 this.$ = {user_type:$$[$0-4], name:$$[$0-3], param:$$[$0-1]}; 
break;
case 26:
 this.$ = {user_type:$$[$0-3], param:$$[$0-1]}; 
break;
case 27:
 this.$ = {user_type:$$[$0-1], name:$$[$0]}; 
break;
case 28:
 this.$ = {user_type:$$[$0]}; 
break;
case 29:
 this.$ = { anonymous:$$[$0-1], name:$$[$0] }; 
break;
case 30: case 31:
 this.$ = { anonymous:$$[$0-4], name:$$[$0-3], n:$$[$0-1] }; 
break;
case 32:
 this.$ = { record:$$[$0-2] }; 
break;
case 33:
 this.$ = { any:$$[$0-2] }; 
break;
case 34:
 this.$ = {subtype:'any', name:$$[$0-6], fields:$$[$0-2]}; 
break;
case 35:
 this.$ = {subtype:'case', name:$$[$0-8], params:$$[$0-7], cases:$$[$0-2] }; 
break;
case 36:
 this.$ = [ {type_name:$$[$0-4], field_name:$$[$0-2], result_field: $$[$0]} ]; 
break;
case 37:
 this.$ = [ {n:$$[$0-2], result_field:$$[$0]} ] 
break;
case 38:
 $$[$0-6].push( {type_name:$$[$0-4], field_name:$$[$0-2], result_field: $$[$0]} ); this.$ = $$[$0-6]; 
break;
}
},
table: [{3:1,4:[1,2]},{1:[3]},{5:[1,3]},o($V0,$V1,{6:4,28:5}),{7:[1,6],40:$V2},o($V3,$V4),o([15,17,22,35,36,40],$V1,{28:5,6:8}),o($V3,[2,41]),{8:9,11:10,12:11,13:12,14:13,15:$V5,17:$V6,19:16,20:17,21:18,22:$V7,35:$V8,36:$V9,40:$V2},o($Va,$V1,{28:5,6:22}),o($Va,[2,3]),o($Va,[2,4]),o($Va,[2,5]),o($Va,[2,6]),o($V0,$V1,{28:5,6:23}),o($V0,$V1,{28:5,6:25,5:[1,24]}),o($Va,[2,12]),o($Va,[2,13]),o($Va,[2,14]),{5:[1,26]},{5:[1,27]},{5:[1,28]},{9:[1,29],11:30,12:11,13:12,14:13,15:$V5,17:$V6,19:16,20:17,21:18,22:$V7,35:$V8,36:$V9,40:$V2},{7:[1,31],40:$V2},o($V0,$V1,{28:5,6:32}),{7:[1,33],40:$V2},o($V0,$V1,{28:5,6:34}),o($V0,$V1,{28:5,6:35}),{24:36,25:[1,37],37:[2,16]},o([10,40],$V1,{28:5,6:38}),o($Va,[2,2]),o($Vb,$V1,{28:5,6:39}),{7:[1,40],40:$V2},o($Vb,$V1,{28:5,6:41}),{7:[1,42],40:$V2},{7:[1,43],40:$V2},{37:[1,44]},{5:[1,45]},{10:[1,46],40:$V2},{5:[1,48],16:47,40:$V2},o($Vb,$V1,{28:5,6:49}),{5:[1,50],40:$V2},o($Vc,$V1,{28:5,6:51}),o($Vc,$V1,{28:5,6:52}),o($V0,$V1,{28:5,6:53}),{5:[1,54]},{1:[2,1]},o($Vd,$V1,{28:5,6:55}),o($Vd,[2,8]),{5:[1,56],40:$V2},{18:[1,57]},{5:$Ve,22:$Vf,23:58,27:59,29:$Vg,34:62,35:$Vh,40:$V2},{5:$Ve,22:$Vf,23:65,27:59,29:$Vg,34:62,35:$Vh,40:$V2},{7:[1,66],40:$V2},{26:[1,67]},{5:[1,69],9:[1,68],40:$V2},{18:[1,70]},{5:[1,71]},o($Vi,$V1,{6:72,28:73}),o($Vi,[2,18]),{5:[1,75],30:[1,74]},o($Vi,[2,28],{5:[1,76],25:[1,77]}),{5:[1,78]},o($V0,$V1,{28:5,6:79}),o($V0,$V1,{28:5,6:80}),o($Vi,$V1,{28:73,6:81}),o([5,30,40],$V1,{28:5,6:82}),{37:[2,17]},o($Va,[2,7]),o($Vd,[2,9]),{5:[1,83]},o($Vi,$V1,{28:5,6:84}),{9:[1,85],40:$V2},o($Vi,$V4,{34:62,27:86,5:$Ve,22:$Vf,29:$Vg,35:$Vh}),o($Vi,[2,20],{31:[1,87]}),o($Vi,[2,22],{32:[1,88]}),o($Vi,[2,27],{25:[1,89]}),{5:[1,90]},o($Vi,[2,29],{32:[1,91]}),{7:[1,92],40:$V2},{7:[1,93],40:$V2},{9:[1,94],40:$V2},{5:[1,96],30:[1,97],38:95,40:$V2},o($Vi,$V1,{28:5,6:98}),{9:[1,99],40:$V2},o($Va,[2,15]),o($Vi,[2,19]),{5:[1,100]},{5:[1,102],30:[1,101]},{5:[1,103]},{26:[1,104]},{5:[1,106],30:[1,105]},o($Vc,$V1,{28:5,6:107}),o($Vc,$V1,{28:5,6:108}),o($Va,[2,34]),o($Vi,$V1,{6:109,28:110}),{39:[1,111]},{18:[1,112]},{9:[1,113],40:$V2},o($Va,[2,11]),o($Vi,[2,21]),{33:[1,114]},{33:[1,115]},{26:[1,116]},o($Vi,[2,26]),{33:[1,117]},{33:[1,118]},{5:$Ve,22:$Vf,23:119,27:59,29:$Vg,34:62,35:$Vh,40:$V2},{5:$Ve,22:$Vf,23:120,27:59,29:$Vg,34:62,35:$Vh,40:$V2},{9:[1,121],40:$V2},o($Vi,$V4,{5:[1,122]}),{5:[1,123]},{5:$Ve,22:$Vf,27:124,29:$Vg,34:62,35:$Vh},o($Va,[2,10]),o($Vi,[2,23]),o($Vi,[2,24]),o($Vi,[2,25]),o($Vi,[2,30]),o($Vi,[2,31]),o($Vi,$V1,{28:73,6:125}),o($Vi,$V1,{28:73,6:126}),o($Va,[2,35]),{39:[1,127]},{18:[1,128]},o($Vi,[2,37]),{9:[1,129],40:$V2},{9:[1,130],40:$V2},{5:[1,131]},{5:$Ve,22:$Vf,27:132,29:$Vg,34:62,35:$Vh},{5:[2,32]},{5:[2,33]},{18:[1,133]},o($Vi,[2,36]),{5:$Ve,22:$Vf,27:134,29:$Vg,34:62,35:$Vh},o($Vi,[2,38])],
defaultActions: {46:[2,1],67:[2,17],129:[2,32],130:[2,33]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};


var generator = require("./Generator");

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 40;
break;
case 1:;
break;
case 2:;
break;
case 3:return 4;
break;
case 4:return 15;
break;
case 5:return 17;
break;
case 6:return 22;
break;
case 7:return 35;
break;
case 8:return 36;
break;
case 9:return 37;
break;
case 10:return 18;
break;
case 11:return 25;
break;
case 12:return 26;
break;
case 13:return 7;
break;
case 14:return 9;
break;
case 15:return 32;
break;
case 16:return 33;
break;
case 17:return 39;
break;
case 18:return 31;
break;
case 19:return 29;
break;
case 20:return 29;
break;
case 21:return 29;
break;
case 22:return 29;
break;
case 23: yy_.yytext = parseInt(yy_.yytext); return 30; 
break;
case 24: yy_.yytext = parseInt(yy_.yytext); return 30; 
break;
case 25:return 5;
break;
case 26:return 10;
break;
}
},
rules: [/^(?:\n)/,/^(?:[^\S\n]+)/,/^(?:\/\/.*)/,/^(?:Protocol\b)/,/^(?:states\b)/,/^(?:flow\b)/,/^(?:record\b)/,/^(?:any\b)/,/^(?:case\b)/,/^(?:of\b)/,/^(?:=>)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:\.)/,/^(?::)/,/^(?:uint[0-9]+_t\b)/,/^(?:int[0-9]+_t\b)/,/^(?:char\b)/,/^(?:wchar_t\b)/,/^(?:0x[0-9A-F]+)/,/^(?:[0-9]+)/,/^(?:[_A-Za-z][_A-Za-z0-9]*)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}