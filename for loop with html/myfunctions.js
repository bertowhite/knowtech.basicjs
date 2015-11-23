var documentUtility = {
	addClassToElements: function(selector, className) {
		var elementsWithTextClass = document.querySelectorAll(selector);

		for(var i = 0; i < elementsWithTextClass.length; i++) {
			elementsWithTextClass[i].classList.add(className);
		}
	}
};