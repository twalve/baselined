var BSLN = {
	WORD: null,
	LETTERS: [],
	COLORS: [],
	play: function(className) {
		var letter = className.split(" ")[0].split("-")[1];

		$('#solution').prepend(BUILD.create(letter));
	},
	remove: function(target) {
		$(target).remove();
	},
	init: function() {
		BUILD.init();
		EVENTS.init();

		$('#fetch').click();
	}
}

BSLN.init();