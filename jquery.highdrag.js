;(function () {
  var $body = $('body');

	$body.on('dragenter dragleave', function (e) {
		e.preventDefault();

		var $hierarchy = $(e.target).parents().add(e.target),
				$droppables = $hierarchy.filter('.droppable'),
				countOffset = e.type === 'dragenter' ? 1 : -1;

		$droppables.add($body).each(function () {
			var dragCount = ($(this).data('dragCount') || 0) + countOffset;

			$(this)
				.data('dragCount', dragCount)
				.toggleClass('dragging', dragCount > 0);
		});
	});

	$body.on('dragover', function (e) {
		e.preventDefault();

		var isDroppable = false;
		$('.droppable').each(function () {
			if($(this).data('dragCount') > 0)
				isDroppable = true;
		});

		e.originalEvent.dataTransfer.dropEffect = isDroppable ? 'copy' : 'none';
	});

	$body.on('drop', function (e) {
		e.preventDefault();
		$('.droppable').add($body).removeClass('dragging').removeData('dragCount');
	});
})();
