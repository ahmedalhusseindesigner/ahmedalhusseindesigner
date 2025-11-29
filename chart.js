// Animate skill bars on scroll
document.addEventListener('DOMContentLoaded', function () {
					// Radar chart pulse animation on scroll
                    function animateRadarCharts() {
                        document.querySelectorAll('.radar-chart').forEach(chart => {
                            if (chart.classList.contains('animated')) return; // already animated once
                            const rect = chart.getBoundingClientRect();
                            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                            if (isVisible) {
                                chart.classList.add('pulse', 'animated');
                                setTimeout(() => chart.classList.remove('pulse'), 1200);
                            }
                        });
                    }
					window.addEventListener('scroll', animateRadarCharts);
					animateRadarCharts();
				// Animate SVG circle progress on scroll
				function animateSvgCircle(circleBar, percent, textEl) {
					circleBar.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0.2, 0.2, 1)';
					circleBar.style.strokeDashoffset = 100 - percent;
					if (textEl) textEl.textContent = percent + '%';
				}

				function handleSvgCircleProgress() {
					document.querySelectorAll('.circle-progress-svg').forEach(svg => {
						const circleBar = svg.querySelector('.circle-bar');
						const textEl = svg.querySelector('.circle-text-svg');
						let percent = parseInt(textEl.textContent);
						if (isNaN(percent)) percent = 0;
						const rect = svg.getBoundingClientRect();
						const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
						if (isVisible && !svg.classList.contains('animated')) {
							animateSvgCircle(circleBar, percent, textEl);
							svg.classList.add('animated');
						}
					});
				}

				window.addEventListener('scroll', handleSvgCircleProgress);
				handleSvgCircleProgress();
			// Animate stars on scroll
			const stars = document.querySelectorAll('.star');

			// Set initial state for stars
			stars.forEach(star => {
				star.classList.remove('animated');
			});

			function animateStars() {
				stars.forEach(star => {
					const rect = star.getBoundingClientRect();
					const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
					if (isVisible && !star.classList.contains('animated')) {
						star.classList.add('animated');
					}
				});
			}

			window.addEventListener('scroll', animateStars);
			animateStars();
		// Animate language circles on scroll
		const circles = document.querySelectorAll('.circle-progress');

		circles.forEach(circle => {
			// Extract the numeric value from the --progress-deg style
			let targetDeg = circle.style.getPropertyValue('--progress-deg');
			if (targetDeg.endsWith('deg')) {
				targetDeg = parseFloat(targetDeg);
			} else {
				targetDeg = 0;
			}
			circle.dataset.targetDeg = targetDeg;
			circle.style.setProperty('--progress-deg', '0deg');
			circle.classList.remove('animated');
		});

		function animateCircleProgress(circle, targetDeg, duration = 1200) {
			let start = null;
			function step(ts) {
				if (!start) start = ts;
				const progress = Math.min((ts - start) / duration, 1);
				const currentDeg = Math.floor(progress * targetDeg);
				circle.style.setProperty('--progress-deg', currentDeg + 'deg');
				if (progress < 1) {
					requestAnimationFrame(step);
				} else {
					circle.style.setProperty('--progress-deg', targetDeg + 'deg');
				}
			}
			requestAnimationFrame(step);
		}

		function animateCircles() {
			circles.forEach(circle => {
				const rect = circle.getBoundingClientRect();
				const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
				if (isVisible && !circle.classList.contains('animated')) {
					animateCircleProgress(circle, parseFloat(circle.dataset.targetDeg));
					circle.classList.add('animated');
				}
			});
		}

		window.addEventListener('scroll', animateCircles);
		animateCircles();
	const skillBars = document.querySelectorAll('.skill-bar-fill');

	// Store the target width in a data attribute and set initial width to 0%
	skillBars.forEach(bar => {
		bar.dataset.targetWidth = bar.style.width;
		bar.style.width = '0%';
		bar.classList.remove('animated');
	});

	function animateSkillBars() {
		skillBars.forEach(bar => {
			const rect = bar.getBoundingClientRect();
			const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
			if (isVisible && !bar.classList.contains('animated')) {
				bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0.2, 0.2, 1)';
				bar.style.width = bar.dataset.targetWidth;
				bar.classList.add('animated');
			}
		});
	}

	window.addEventListener('scroll', animateSkillBars);
	animateSkillBars();
});
