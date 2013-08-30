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

		$('#grid').on('click', 'span.racked', function(){
			var $this = $(this);
			var index = $('#grid').find('span').index($this);
		
			if (BSLN.PLAYED.length < BSLN.SLOTS) {
				BSLN.play($this.attr("class"), index);

				$this.removeClass("racked").closest("li").addClass("played");
			}
			else {
				alert("You can only play " + BSLN.SLOTS + " letters");
			}
		});

		$('#solution').on('click', 'span', function(){
			var $this = $(this);

			if (!$this.hasClass("blink")) BSLN.remove($this.closest("li"));
		});
	},
	fetch: function() {
		BSLN.NINE = nines[this.random(nines.length - 1)].toLowerCase();
	},
	random: function(which) {
		return Math.floor(Math.random() * (which + 1));
	},
	init: function() {
		this.events();
	}
}