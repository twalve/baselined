var BSLN = {
	WORD: null,
	LETTERS: [],
	COLORS: [],
	play: function(className) {
		var letter = className.split(" ")[0].split("-")[1];


		alert("className => " + letter)
	},
	init: function() {
		BUILD.init();
		EVENTS.init();

		$('#fetch').click();
	}
}

BSLN.init();