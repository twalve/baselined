var BSLN = {
	WORD: null,
	LETTERS: [],
	COLORS: [],
	init: function() {
		BUILD.init();
		EVENTS.init();

		$('#fetch').click();
	}
}

BSLN.init();