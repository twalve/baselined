var EVENTS = {
	blanket: function(which) {
		$(which).toggleClass("active");
	},
	events: function() {
		var that = this;

		$('#fetch').click(function(event){
			event.preventDefault();

			that.blanket($(this).closest(".blanket"));
			that.fetch();

			BUILD.grapheme();
		});
	},
	fetch: function() {
		BSLN.WORD = nines[this.random(nines.length - 1)].toLowerCase();
	},
	random: function(which) {
		return Math.floor(Math.random() * (which + 1));
	},
	init: function() {
		this.events();
	}
}