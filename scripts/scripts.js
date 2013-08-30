var BSLN = {
	SLOTS: 7,
	NINE: null,
	WORD: null,
	LETTERS: [],
	COLORS: [],
	PLAYED: [],
	play: function(className, index) {
		var letter = className.split(" ")[0].split("-")[1];

		$('#cursor').before(BUILD.create(letter, index));
		this.PLAYED.push(letter);
		this.WORD = this.word();
	},
	remove: function(target) {
		var $target = $(target);
		var source = parseInt($target.find("span").attr("class").split("grid-")[1], 10);

		this.PLAYED.pop();
		$target.remove();
		this.WORD = this.word();

		$('#grid').find("li").eq(source).removeClass("played").
			find("span").addClass("racked");
	},
	word: function() {
		var word = [];
		$('#solution').find('span').each(function(){
			word.push($(this).text());
		});
		word.pop(); // remove _

		return word.join("");
	},
	init: function() {
		BUILD.init();
		EVENTS.init();

		// $('#fetch').click();
	}
}

BSLN.init();