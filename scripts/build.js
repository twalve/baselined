var BUILD = {
	chances: [12, 6, 3, 2, 1, 1, 1],// 80, 75, 66, 50, 40, 33, 25, 20, 
	characters: {
		option: ["ascenders", "descenders", "others", "vowels"],
		ascenders: ["b", "d", "f", "h", "k", "l", "t"],
		descenders: ["g", "j", "p", "q", "y"],
		others: ["c", "m", "n", "r", "s", "v", "w", "x", "z"],
		vowels: ["a", "e", "i", "o", "u"]
	},
	strings: {
		alphabet: ["abcdefghijklmnopqrstuvwxyz"],
		ascenders: ["bdfhklt"],
		descenders: ["gjpqy"],
		standard: ["aceimnorsuvwxz"]
	},
	colors: {
		optionsafe: [
			"#FF0000", "#CC0099", "#990099", "#660099", 
			"#0033FF", "#006600", "#009900", "#66CC00", 
			"#FFFF00", "#FFCC00", "#FF9900", "#FF6600",
			"#AAAAAA", "#CCCCCC", "#000000"
		],
		option: [
			"#7EF083", "#4CD3FF", "#FFE742", "#DF89FB",
			"#FA6AA0", "#FF8C40", "#7383FA", "#9640B2",
			"#F74F4F", "#4067E6", "#63F2F2", "#E3F73B",
			"#AAAAAA", "#CCCCCC", "#000000"
		],
		ascenders: [],
		descenders: [],
		standard: []
	},
	options: null,
	colorize: function() {
		var that = this;
		var colors = this.colors.option;
		var length = colors.length - 1;
		var sheet = document.createElement("style");
		var letters = this.strings["alphabet"].toString().split("");
		var letter;
		var style = "";

		var array = function() {
			var start = EVENTS.random(length);
			var before = colors.slice(0, start);
			var after = colors.slice(start);
			var array = after.concat(before);

			return array;
		};

		var styles = function(letter) {
			var lettercase = that.lettercase(letter);
			var index = that.strings[lettercase].toString().indexOf(letter);
			var color = that.colors[lettercase][index];

			return [".color-", letter, "::before {background-color:", color, ";color:", color, ";}\n"].join("");
		};

		this.colors.ascenders = array();
		this.colors.descenders = array();
		this.colors.standard = array();

		for (letter in letters) {
			style += styles(letters[letter]);
		}

		sheet.id = "color";
		sheet.innerHTML = style;
		document.getElementsByTagName("head")[0].appendChild(sheet);
	},
	create: function(letter) {
		var lettername;
		var classname;
		var colorname;
		var $item;
		var $span;

		lettername = "letter-" + letter;
		colorname = "color-" + letter;
		classname = [lettername, colorname, BUILD.lettercase(letter)].join(" ");

		$span = $("<span>").html(letter).addClass(classname);
		$item = $("<li>").append($span);

		return $item;
	},
	fill: function() {
		var that = this;
		var $list = $('#grid');
		var $shadow = $('<ul>');
		var length = this.options.tiles;
		var i = 0;
		var letter;

		console.log(BSLN.WORD)
		console.log(BSLN.LETTERS)

		for (; i < length; i += 1) {
			letter = BSLN.LETTERS[i];

			$shadow.append(this.create(letter));
		}

		$list.html($shadow.html());
	},
	lettercase: function(character) {
		return (this.strings["ascenders"].toString().indexOf(character) !== -1 ) ? "ascenders" : 
		(this.strings["descenders"].toString().indexOf(character) !== -1 ) ? "descenders" : "standard";
	},
	grapheme: function() {
		var word = BSLN.WORD;
		var letters = word.split("");
		var extras = 7; //7 + 9 = 16
		var chars = [];
		var options = this.characters.option.length - 1;
		var chance;
		var which;
		var array;
		var length;

		while (extras) {
			chance = this.chances[7 - extras];

			if (EVENTS.random(100) < chance) {
				chars.push(letters[extras]);
			}
			else {
				which = this.characters.option[EVENTS.random(options)];
				array = this.characters[which];
				length = array.length - 1;

				chars.push(array[EVENTS.random(length)]);
			}

			extras -= 1;
		}

		this.randomize(letters, chars);
	},
	randomize: function(letters, chars) {
		var shuffle = function() {
			return 0.5 - Math.random();
		};

		BSLN.LETTERS = letters.concat(chars);
		BSLN.LETTERS.sort(shuffle);
		BSLN.LETTERS.sort(shuffle);
		
		this.fill();
	},
	search: function() {
		var querystring = window.location.search.toString().substring(1).replace(/\&amp;/gi, "&");
		var queries = querystring.split("&");
		var options = {};
		var query;
		var pair;
		
		for (query in queries) {
			pair = queries[query].split("=");
			
			options[pair[0]] = pair[1];
		}

		this.options = options;
		// return options;
	},
	view: function() {
		$(document.body).attr("id", "section-" + this.options.view)
	},
	init: function() {
		this.colorize();
		this.search();
		this.view();
	}
}