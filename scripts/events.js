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

		$('#grid').on('click', 'span', function(){
			BSLN.play($(this).attr("class"));
		});

		$('#solution').on('click', 'span', function(){
			BSLN.remove($(this).closest("li"));
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