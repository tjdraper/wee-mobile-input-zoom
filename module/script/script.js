Wee.fn.make('mobileInputZoom', {
	_construct: function() {
		var scope = this;

		Wee.screen.map([
			{
				init: true,
				watch: false,
				callback: function() {
					scope.$private('init');
				},
				max: 3
			}
		]);
	}
}, {
	init: function() {
		var scope = this;

		$('input, textarea, select').on({
			touchstart: function() {
				$('meta[name=viewport]').attr(
					'content',
					'width=device-width, initial-scale=1, user-scalable=0'
				);

				scope.disengageTimer = setTimeout(function() {
					scope.disengage();
				}, 800);
			},
			focusin: function() {
				if (scope.disengageTimer) {
					clearTimeout(scope.disengageTimer);
				}
				if (scope.disengageTimer2) {
					clearTimeout(scope.disengageTimer2);
				}
			},
			focusout: function() {
				scope.disengageTimer2 = setTimeout(function() {
					scope.disengage();
				}, 800);
			}
		}, {
			delegate: 'body'
		});
	},
	disengage: function() {
		$('meta[name=viewport]').attr(
			'content',
			'width=device-width, initial-scale=1, user-scalable=1'
		);
	}
});