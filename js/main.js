(function ($) {

	"use strict";

	$(window).stellar({
		responsive: true,
		parallaxBackgrounds: true,
		parallaxElements: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		scrollProperty: 'scroll'
	});


	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var hideLoader = function () {
		var loaderEl = document.getElementById('loader');
		if (loaderEl) {
			loaderEl.classList.add('hidden');
		}
	};

	var initLoader = function () {
		setTimeout(hideLoader, 800);
	};

	if (document.readyState === 'complete') {
		initLoader();
	} else {
		window.addEventListener('load', initLoader);
	}

	// Scrollax
	$.Scrollax();

	// Burger Menu
	var burgerMenu = function () {

		$('body').on('click', '.js-fh5co-nav-toggle', function (event) {
			event.preventDefault();
			if ($('#ftco-nav').is(':visible')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
		});

		// Cerrar menú al hacer clic en el backdrop (fuera del sidebar)
		$('body').on('click', '#ftco-nav', function (e) {
			if (e.target === this) {
				if ($('.navbar-toggler').attr('aria-expanded') === 'true') {
					$('.navbar-toggler').trigger('click');
				}
			}
		});

	};
	burgerMenu();

	var onePageClick = function () {

		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
			event.preventDefault();

			const href = this.getAttribute('href');

			// Cierra el menú al seleccionar una opción internamente
			if ($('.navbar-toggler').attr('aria-expanded') === 'true') {
				$('.navbar-toggler').trigger('click');
			}

			// Scroll suave hacia la sección
			if (href && href !== '#') {
				$('html, body').animate({
					scrollTop: $(href).offset().top - 70
				}, 1200);
			}
		});

		// Cierra el menú cuando se hace tap en el fondo oscuro/backdrop
		$(document).on('click', '#ftco-nav', function (e) {
			if (e.target === this) {
				if ($('.navbar-toggler').attr('aria-expanded') === 'true') {
					$('.navbar-toggler').trigger('click');
				}
			}
		});

	};

	onePageClick();

	/* CAROUSEL SLIDER Y PREGUNTAS */
	var carousel = function () {
		if (typeof $.fn.owlCarousel !== 'function') {
			return;
		}

		if ($('.home-slider').length) {
			$('.home-slider').owlCarousel({
				loop: true,
				autoplay: true, // Cambiarlo a false para evitar autoplay en el slider principal
				smartSpeed: 1000,		// fade de 1s (más suave)
				autoplayTimeout: 6000,     // 6s en pantalla (tiempo para leer)
				autoplayHoverPause: false,
				margin: 0,
				animateOut: 'fadeOut',
				animateIn: 'fadeIn',
				nav: false,
				items: 1
			});
		}

		if ($('.carousel-FAQS').length) {
			$('.carousel-FAQS').owlCarousel({
				center: false,
				loop: true,
				autoplay: true,
				autoplayTimeout: 8000,
				autoplaySpeed: 2000,
				autoplayHoverPause: true, // Pausa cuando el usuario está leyendo
				items: 1,
				margin: 20,
				stagePadding: 0,
				responsive: {
					0: {
						items: 1
					},
					768: {
						items: 2,
						margin: 20,
						stagePadding: 20
					},
					1000: {
						items: 3
					}
				}
			});
		}
	};
	carousel();

	$('nav .dropdown').hover(function () {
		var $this = $(this);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');
	}, function () {
		var $this = $(this);
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		$this.find('.dropdown-menu').removeClass('show');
	});

	$('#dropdown04').on('show.bs.dropdown', function () {
		console.log('show');
	});

	// scroll
	var scrollWindow = function () {
		var lastScrollTop = 0;
		$(window).scroll(function () {
			var st = $(this).scrollTop();
			var navbar = $('.ftco_navbar, .ftco-navbar-light, .toggle-menu');

			// Estado inicial en el tope (Transparente)
			if (st === 0) {
				navbar.removeClass('scrolled navbar-invisible');
			}

			// Estado intermedio (Ocultar solo al bajar, mostrar al subir)
			if (st > 10 && st < 150) {
				if (st > lastScrollTop) {
					// Bajando: ocultar para transición limpia
					if (!navbar.hasClass('navbar-invisible')) {
						navbar.addClass('navbar-invisible');
					}
					navbar.removeClass('scrolled');
				} else {
					// Subiendo: mostrar transparente para evitar "pop" visual
					navbar.removeClass('navbar-invisible scrolled');
				}
			}

			// Estado Scrolled (Reaparece con fondo de color)
			if (st >= 150) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}
				navbar.removeClass('navbar-invisible');
			}

			lastScrollTop = st;
		});
	};
	scrollWindow();

	// Ejecutar el manejador de scroll una vez al cargar la página
	// para aplicar las clases `scrolled/awake/sleep` según la posición inicial.
	$(window).trigger('scroll');

	var contentWayPoint = function () {
		var i = 0;
		$('.ftco-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				i++;

				// Función que maneja la animación de un solo elemento
				function handleSingleAnimation(index) {
					const el = $(this);
					const effect = el.data('animate-effect');
					const validEffect = ['fadeIn', 'fadeInLeft', 'fadeInRight'].includes(effect) 
						? effect 
						: 'fadeInUp';

					el.addClass(`${validEffect} ftco-animated`).removeClass('item-animate');
				}

				// Función que recorre los elementos
				function processAllAnimations() {
					$('body .ftco-animate.item-animate').each(function (k) {
						// Usamos una función independiente con setTimeout basada en el índice
						setTimeout(handleSingleAnimation.bind(this, k), k * 50);
					});
				}

				// Función principal de inicio
				function startAnimationSequence() {
					setTimeout(processAllAnimations, 100);
				}

				// Ejecución inicial
				$(this.element).addClass('item-animate');
				startAnimationSequence();
			}

		}, { offset: '95%' });
	};
	contentWayPoint();

	if (typeof $.fn.magnificPopup === 'function' && $('.popup-youtube, .popup-vimeo, .popup-gmaps').length) {
		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	}

	// Botón "Obtener Guía" — loader y luego segunda pantalla del popup
	var resourceGuideTimer = null;

	function resetResourceGuideButton() {
		clearTimeout(resourceGuideTimer);
		resourceGuideTimer = null;
		$('#btn-download, .btn-download[href="#popup-recursos"]')
			.removeClass('loading')
			.attr('aria-busy', 'false')
			.find('.btn-download-text')
			.text('📥 Obtener Guía');
	}

	var resourceConfettiRaf = null;
	var resourceConfettiResize = null;
	var isSwitchingPopups = false; // Flag para evitar detener confeti al cambiar de popup

	// Hacer la función global para que esté disponible en scripts inline
	window.launchResourceConfetti = function () {
		//console.log('[Confetti] Iniciando launchResourceConfetti');
		stopResourceConfetti();

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			console.log('[Confetti] Reduced motion detectado, cancelando');
			return;
		}

		var wrap = document.querySelector('.mfp-wrap');
		if (!wrap) {
			console.log('[Confetti] .mfp-wrap no encontrado, reintentando hasta 5s...');
			var attempts = 50; // 50 intentos × 100ms = 5 segundos
			var interval = setInterval(function () {
				wrap = document.querySelector('.mfp-wrap');
				if (wrap) {
					clearInterval(interval);
					console.log('[Confetti] .mfp-wrap encontrado en reintento, creando canvas');
					createConfettiCanvas(wrap);
				} else if (--attempts <= 0) {
					clearInterval(interval);
					console.log('[Confetti] ERROR: No se encontró .mfp-wrap después de 5s');
				}
			}, 100);
			return;
		}
		//console.log('[Confetti] .mfp-wrap encontrado, creando canvas');

		createConfettiCanvas(wrap);
	};

	function createConfettiCanvas(wrap) {
		var canvas = document.createElement('canvas');
		canvas.className = 'resource-confetti-canvas';
		canvas.setAttribute('aria-hidden', 'true');
		var bg = wrap.querySelector('.mfp-bg');

		wrap.insertBefore(canvas, bg?.nextSibling || wrap.firstChild);

		// Asegurar posición absolute y tamaño del .mfp-wrap (no window)
		canvas.style.position = 'absolute';
		canvas.style.width = wrap.offsetWidth + 'px';
		canvas.style.height = wrap.offsetHeight + 'px';
		canvas.width = wrap.offsetWidth;
		canvas.height = wrap.offsetHeight;

		var ctx = canvas.getContext('2d');
		var particles = [];
		var colors = ['#fab800', '#124390', '#ffffff', '#28a745', '#1a5cbf', '#ffc107', '#0f3575'];

		function setSize() {
			var w = wrap.offsetWidth;
			var h = wrap.offsetHeight;
			canvas.width = w;
			canvas.height = h;
			canvas.style.width = w + 'px';
			canvas.style.height = h + 'px';
		}
		resourceConfettiResize = setSize;
		// Dar un frame de render al popup antes de calcular tamaño
		requestAnimationFrame(function () {
			requestAnimationFrame(resourceConfettiResize);
		});
		window.addEventListener('resize', resourceConfettiResize);

		function addParticle(opts) {
			particles.push({
				x: opts.x,
				y: opts.y,
				w: opts.w || (5 + Math.random() * 5),
				h: opts.h || (3 + Math.random() * 4),
				color: opts.color || colors[Math.floor(Math.random() * colors.length)],
				rotation: Math.random() * 360,
				rotSpeed: (Math.random() - 0.5) * 10,
				vx: opts.vx != null ? opts.vx : (Math.random() - 0.5) * 3,
				vy: opts.vy != null ? opts.vy : (2 + Math.random() * 3),
				sway: Math.random() * Math.PI * 2,
				swaySpeed: 0.04 + Math.random() * 0.04,
				opacity: 0.85 + Math.random() * 0.15,
				shape: Math.random() > 0.35 ? 'rect' : 'circle'
			});
		}

		var i;
		for (i = 0; i < 95; i++) {
			addParticle({
				x: Math.random() * canvas.width,
				y: -20 - Math.random() * canvas.height * 0.55,
				vy: 2.5 + Math.random() * 3.5
			});
		}

		var cx = canvas.width / 2;
		for (i = 0; i < 55; i++) {
			addParticle({
				x: cx + (Math.random() - 0.5) * 80,
				y: canvas.height * 0.32,
				vx: (Math.random() - 0.5) * 14,
				vy: 2 + Math.random() * 4
			});
		}

		var start = performance.now();
		var duration = 4200;

		function frame(now) {
			var elapsed = now - start;
			if (elapsed > duration) {
				stopResourceConfetti();
				return;
			}

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var fade = 1 - Math.max(0, (elapsed - duration * 0.65) / (duration * 0.35));

			particles.forEach(function (p) {
				p.sway += p.swaySpeed;
				p.x += p.vx + Math.sin(p.sway) * 0.6;
				p.y += p.vy;
				p.vy += 0.07;
				p.vx *= 0.992;
				p.rotation += p.rotSpeed;

				if (p.y > canvas.height + 40) {
					return;
				}

				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation * Math.PI / 180);
				ctx.globalAlpha = p.opacity * fade;
				ctx.fillStyle = p.color;

				if (p.shape === 'circle') {
					ctx.beginPath();
					ctx.arc(0, 0, p.w * 0.45, 0, Math.PI * 2);
					ctx.fill();
				} else {
					ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
				}
				ctx.restore();
			});

			resourceConfettiRaf = requestAnimationFrame(frame);
		}

		resourceConfettiRaf = requestAnimationFrame(frame);
	};

	window.stopResourceConfetti = function stopResourceConfetti() {
		if (isSwitchingPopups) {
			console.log('[Confetti] Cambiando de popup, no detener confeti');
			return;
		}
		if (resourceConfettiRaf) {
			cancelAnimationFrame(resourceConfettiRaf);
			resourceConfettiRaf = null;
		}
		if (resourceConfettiResize) {
			window.removeEventListener('resize', resourceConfettiResize);
			resourceConfettiResize = null;
		}
		$('.resource-confetti-canvas').remove();
	};

	function openResourceGuideSuccessPopup() {
		$.magnificPopup.open({
			items: { src: '#popup-recursos' },
			type: 'inline',
			fixedContentPos: true,
			removalDelay: 400,
			mainClass: 'mfp-zoom-in mfp-fade',
			callbacks: {
				open: function () {
					setTimeout(launchResourceConfetti, 280);
				},
				change: function () {
					// Si el contenido cambia a popup-recursos, lanzar confetti
					if (this.content?.attr('id') === 'popup-recursos') {
						setTimeout(launchResourceConfetti, 280);
					}
				}
			}
		});
	}

	// Función para descargar la guía PDF con un nombre predeterminado
	window.downloadResourceGuide = function () {
		var downloadName = '10-Errores-Comunes-en-WordPress.pdf';
		var pdfUrl = '/MyPortfolio/assets/docs/Guia-Para-Desarrolladores-Web.pdf';

		console.log('[Descarga] Ruta detectada:', pdfUrl);

		// También intentar descargar con nombre personalizado
		setTimeout(function () {
			var a = document.createElement('a');
			a.href = pdfUrl;
			a.download = downloadName;
			a.style.display = 'none';

			// Evitar que el clic de descarga burbujee y cierre el popup
			a.addEventListener('click', function (e) {
				e.stopPropagation();
			});

			var container = document.getElementById('popup-recursos') || document.body;
			container.appendChild(a);
			a.click();
			a.remove();
			/*console.log('[Descarga] Intentando descargar con nombre:', downloadName);*/
		}, 500);
	}

	// Usar delegación de eventos más específica para capturar clicks dentro del popup
	$(document).on('click', 'a.btn-download', function (e) {
		// Si el script del blog ya procesó este click, solo nos encargamos del confetti
		var $btn = $(this);
		var isBlogPage = window.location.pathname.includes('/blog/');

		if (isBlogPage) {
			return; // El script del blog lo maneja completamente
		}

		e.preventDefault();
		e.stopPropagation();

		if ($btn.hasClass('loading')) {
			return;
		}

		$btn.addClass('loading').attr('aria-busy', 'true');
		$btn.find('.btn-download-text').text('Preparando guía...');

		clearTimeout(resourceGuideTimer);
		resourceGuideTimer = setTimeout(function () {
			resourceGuideTimer = null;
			resetResourceGuideButton();
			console.log('[Confetti] Timeout ejecutado, descargando PDF y abriendo popup');

			// Descargar el PDF
			downloadResourceGuide();

			// Si el popup ya está abierto, cambiar el contenido directamente
			if ($.magnificPopup.instance) {
				$.magnificPopup.open({
					items: { src: '#popup-recursos' },
					type: 'inline',
					fixedContentPos: true,
					removalDelay: 400,
					mainClass: 'mfp-zoom-in mfp-fade',
					callbacks: {
						open: function () {
							setTimeout(launchResourceConfetti, 280);
						},
						change: function () {
							if (this.content?.attr('id') === 'popup-recursos') {
								setTimeout(launchResourceConfetti, 280);
							}
						}
					}
				});
			} else {
				openResourceGuideSuccessPopup();
			}
		}, 1500);
	});

	$(document).on('mfpBeforeClose', function () {
		var isBlogPage = window.location.pathname.includes('/blog/');
		if (isBlogPage) {
			resetResourceGuideButton();
			return;
		}
		console.log('[Confetti] mfpBeforeClose - deteniendo confeti');
		resetResourceGuideButton();
		stopResourceConfetti();
	});

	// Detectar cuando el contenido del popup cambia a popup-recursos para lanzar confetti
	// Solo activo en páginas que no sean blog (en blog, el callback open del popup lo maneja)
	$(document).on('mfpChange', function () {
		var isBlogPage = window.location.pathname.includes('/blog/');
		if (isBlogPage) return; // El blog lo maneja en su callback inline
		var $content = $('.mfp-content');
		if ($content.find('#popup-recursos').length > 0) {
			setTimeout(launchResourceConfetti, 280);
		}
	});

	// Filtrado de proyectos por categoría desde el sidebar
	/*$(document).on('click', '.project-filter a', function (e) {
		e.preventDefault();
		var $t = $(this);
		var filter = $t.data('filter');

		// Actualizar estado activo en los botones de filtro
		$('.project-filter a').removeClass('active');
		$t.addClass('active');

		// Seleccionar todos los contenedores de proyectos (las columnas col-*)
		var $projectItems = $('#projects-section .project').closest('[class^="col-"]');

		if (filter === 'all') {
			$projectItems.each(function () {
				$(this).removeClass('d-none').stop(true, true).fadeIn(300);
			});
		} else {
			$projectItems.each(function () {
				var $proj = $(this).find('.project');
				var category = $proj.data('category');

				if (category === filter) {
					$(this).removeClass('d-none').stop(true, true).fadeIn(300);
				} else {
					$(this).stop(true, true).fadeOut(200, function () {
						$(this).addClass('d-none');
					});
				}
			});
		}
	});*/

	// === Manejo de Menu activo  ===
	var setActiveMenuByScroll = function () {
		var sections = $('section[id]');
		if (!sections.length) return;

		var scrollPos = $(window).scrollTop() + 100;

		sections.each(function () {
			var section = $(this),
				sectionTop = section.offset().top - 100,
				sectionBottom = sectionTop + section.outerHeight(),
				sectionId = section.attr('id');

			if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
				$('.navbar-nav .nav-link, .navbar-nav .nav-item').removeClass('active');
				$('.navbar-nav .nav-link[href="#' + sectionId + '"]').addClass('active');
				$('.navbar-nav .nav-link[href="#' + sectionId + '"]').parent('.nav-item').addClass('active');
			}
		});
	};

	// Set active menu based on current page filename (for multi-page site)
	var setActiveMenuItemByPage = function () {

		var path = window.location.pathname;

		// Si la URL está en /blog/ marcar la sección Blog
		if (path.includes('/blog/')) {
			var $blogLink = $('.navbar-nav .nav-link').filter(function () {
				const href = this.getAttribute('href') || '';
				return href.includes('#blog-section');
			}).first();
			if ($blogLink.length) {
				$('.navbar-nav .nav-link, .navbar-nav .nav-item').removeClass('active');
				$blogLink.parent('.nav-item').addClass('active');
				$blogLink.addClass('active');
				return;
			}
		}

		// Si la URL corresponde a la página "Sobre mí"
		if (path.includes('/sobre-mi')) {
			var $aboutLink = $('.navbar-nav .nav-link').filter(function () {
				const href = this.getAttribute('href') || '';
				return href.includes('#about-section');
			}).first();
			if ($aboutLink.length) {
				$('.navbar-nav .nav-link, .navbar-nav .nav-item').removeClass('active');
				$aboutLink.parent('.nav-item').addClass('active');
				$aboutLink.addClass('active');
				return;
			}
		}
	};

	// Initialize active menu handling
	var initActiveMenu = function () {
		var path = window.location.pathname || '/';
		var currentPage = path.substring(path.lastIndexOf('/') + 1);

		console.log('[initActiveMenu] currentPage:', currentPage, 'path:', path);

		if (currentPage === 'index.html' || currentPage === '' || currentPage.endsWith('/')) {
			$(window).on('scroll', setActiveMenuByScroll);
			setActiveMenuByScroll();
		} else {
			setActiveMenuItemByPage();
		}
	};

	function validateEmail(email) {
		return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/.test(email);
	}

	// Newsletter form handling
	$(function () {
		var $form = $('.inline-newsletter');
		var $input = $form.find('#email');
		var $btn = $form.find('#formulario');
		var $loader = $('#cargadorFooter');
		var $success = $('#suscrito');
		var $error = $('#errorsuscrito');
		var ultimaPeticion = 0; // Controlar el tiempo de creditos
		var webhookUrl = process.env.PIPEDREAM_ENDPOINT; // Variable Pipedream

		$form.on('submit', function (e) {
			e.preventDefault(); // Prevent form submission
			$success.hide();
			$error.hide();

			var email = $input.val().trim();
			if (!email || email.trim().length === 0) {
				$error.text('El correo electrónico es obligatorio. ⚠️').fadeIn();
				return false; // Frena el envío
			}
			email = email.toLowerCase();

			var historialSuscripciones = JSON.parse(localStorage.getItem('historial_suscritos')) || [];
			// Verificamos si el correo actual ya existe dentro de la lista guardada
			if (historialSuscripciones.includes(email)) {
				$error.text('Ya estás registrado. ¡Gracias! 🎉').fadeIn();
				return false; // Se detiene aquí.
			}
			// Control de tiempo (Evitar clics repetidos rápidos)
			var ahora = Date.now();
			var UN_MINUTO = 60 * 1000;

			if (ahora - ultimaPeticion < UN_MINUTO) {
				var segundosRestantes = Math.round((UN_MINUTO - (ahora - ultimaPeticion)) / 1000);
				$error.text(`Por favor, espera ${segundosRestantes} segundos antes de intentar registrarte otra vez.`).fadeIn();
				return false;
			}

			var additionalUser = $('#username_hp').val();
			if (additionalUser.length > 0) {
				$success.fadeIn();
				$input.val('');
				setTimeout(function () { $success.fadeOut(); }, 4000);
				return false;
			}

			if (!validateEmail(email)) {
				$error.text('Debes ingresar un correo válido!').fadeIn();
				return false;
			}

			historialSuscripciones.push(email);
			localStorage.setItem('historial_suscritos', JSON.stringify(historialSuscripciones));

			// Paso los filtros
			ultimaPeticion = ahora;
			$btn.prop('disabled', true);
			$loader.show();

			// Petición real a Pipedream mediante AJAX
			if (!webhookUrl) {
				console.warn('PIPEDREAM_ENDPOINT no está configurado.');
				$loader.hide();
				$btn.prop('disabled', false);
				$error.text('Error de configuración en el servidor. ⚠️').fadeIn();
				return false;
			}

			$.ajax({
				url: webhookUrl,
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({
					email: email
				}),
				success: function (response) {
					$loader.hide();
					$success.fadeIn();
					$input.val('');
					$btn.prop('disabled', false);
					setTimeout(function () { $success.fadeOut(); }, 4000);
				},
				// Respuesta no exitosa o excedido el limite
				error: function (xhr, status, error) {
					$loader.hide();
					$btn.prop('disabled', false);

					if (xhr.status !== 422 && xhr.status !== 429) {
						var historialActual = JSON.parse(localStorage.getItem('historial_suscritos')) || [];
						var index = historialActual.indexOf(email);
						if (index > -1) {
							historialActual.splice(index, 1);
							localStorage.setItem('historial_suscritos', JSON.stringify(historialActual));
						}
						ultimaPeticion = 0;
					}

					var mensajeError = 'Hubo un problema de conexión. Inténtalo de nuevo.';
					// Demasiados intentos de registro o el formato del correo
					mensajeError = xhr.responseJSON?.error;
					// Mostramos el error real en la interfaz
					$error.text(mensajeError).fadeIn();
				}
			});
		});
	});

	// Contact form validation
	function validatePhone(phone) {
		return /^[0-9+\-\s()]{7,20}$/.test(phone);
	}

	// Validadores específicos para cada tipo de campo
	const fieldValidators = {
		nombre: (value) => {
			if (!value) return 'Por favor ingresa tu nombre';
			if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
			if (value.length > 100) return 'El nombre no puede tener más de 100 caracteres';
			return null;
		},
		_replyto: (value) => {
			if (!value || !validateEmail(value)) return 'Ingresa un email válido';
			return null;
		},
		telefono: (value) => {
			if (!value) return 'Ingresa tu teléfono';
			if (!validatePhone(value)) return 'Formato de teléfono inválido';
			return null;
		},
		mensaje: (value) => {
			if (!value) return 'El mensaje es obligatorio';
			if (value.length < 10) return 'El mensaje debe tener al menos 10 caracteres';
			if (value.length > 2000) return 'El mensaje no puede tener más de 2000 caracteres';
			return null;
		}
	};

	function validateField($field) {
		var value = $field.val().trim();
		var fieldName = $field.attr('name');
		var $feedback = $field.siblings('.invalid-feedback').first();

		var errorMessage = null;

		// Ejecutamos la regla de validación correspondiente si existe
		if (fieldValidators[fieldName]) {
			errorMessage = fieldValidators[fieldName](value);
		}

		var valid = !errorMessage;
		var message = errorMessage || ($feedback.length ? $feedback.text().trim() : 'Por favor completa este campo');

		if (valid) {
			$field.removeClass('is-invalid').addClass('is-valid');
		} else {
			$field.removeClass('is-valid').addClass('is-invalid');
			if ($feedback.length) {
				$feedback.text(message);
			}
		}

		return valid;
	}

	// Función para extraer el mensaje de cada error
	function extractErrorMessage(err) {
		return err.message;
	}

	$(function () {
		var $contactForm = $('#contactForm');
		if (!$contactForm.length) {
			return;
		}
		var $alertContainer = $('#alertContainer');
		var $submitBtn = $contactForm.find('#submitBtn');
		var $fields = $contactForm.find('input[name="nombre"], input[name="_replyto"], input[name="telefono"], textarea[name="mensaje"]');

		function resetContactForm() {
			$contactForm[0].reset();
			$fields.removeClass('is-valid is-invalid');
		}

		function showAlert(message, type) {
			var $alert = $('<div>', {
				class: 'alert alert-' + type,
				role: 'alert'
			}).text(message);

			$alertContainer.empty().append($alert);
		}

		$fields.on('blur', function () {
			validateField($(this));
		});

		$fields.on('input', function () {
			if ($(this).hasClass('is-invalid')) {
				validateField($(this));
			}
		});

		$contactForm.on('submit', function (e) {
			e.preventDefault();

			var formIsValid = true;
			$alertContainer.empty();

			$fields.each(function () {
				if (!validateField($(this))) {
					formIsValid = false;
				}
			});

			if (!formIsValid) {
				showAlert('Por favor corrige los errores en el formulario antes de enviar.', 'danger');
				return;
			}

			// Mostrar spinner y deshabilitar botón
			var $btnText = $submitBtn.find('.btn-text');
			var $spinner = $submitBtn.find('.spinner-border');

			var additionalInfo = $contactForm.find('[name="direccion"]').val();
			if (additionalInfo) {
				showAlert('¡Mensaje enviado! Te responderé a la brevedad. 🙌', 'success');
				resetContactForm();
				return;
			}

			// ============================================

			$submitBtn.prop('disabled', true); // Evita doble envío
			$btnText.text('Enviando…');
			$spinner.removeClass('d-none').removeAttr('aria-hidden');

			// Serializar campos como JSON (más compatible con Formspree AJAX)
			var payload = {
				nombre: $contactForm.find('[name="nombre"]').val().trim(),
				email: $contactForm.find('[name="_replyto"]').val().trim(),
				telefono: $contactForm.find('[name="telefono"]').val().trim(),
				mensaje: $contactForm.find('[name="mensaje"]').val().trim(),
				_subject: 'Nuevo mensaje desde el formulario de contacto'
			};

			// --- Detección de entorno ---
			// Formspree bloquea con 403 las peticiones desde localhost.
			// En desarrollo simulamos el éxito; en producción se hace el fetch real.
			var isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

			if (isLocalhost) {
				console.warn('[FormHandler] Entorno local detectado — simulando envío (Formspree bloquea localhost con 403).');
				setTimeout(function () {
					showAlert('⚠️ Modo local: el formulario está configurado correctamente. Formspree bloqueará el envío desde localhost; funcionará sin cambios al publicar en tu dominio real.', 'warning');
					$submitBtn.prop('disabled', false);
					$btnText.text('Enviar mensaje');
					$spinner.addClass('d-none').attr('aria-hidden', 'true');
				}, 1000);
				return;
			}

			var FORMSPREE_ID = process.env.FORMSPREE_ID;
			if (!FORMSPREE_ID) {
				console.error('[FormHandler] Error: FORMSPREE_ID no está configurado.');
				showAlert('Error de configuración en el servidor. Inténtalo más tarde.', 'danger');
				// Restaurar el botón/spinner antes de salir
				$submitBtn.prop('disabled', false);
				$btnText.text('Enviar mensaje');
				$spinner.addClass('d-none').attr('aria-hidden', 'true');
				
				return;
			} 

			fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(function (response) {
				//console.log('[FormHandler] Respuesta status:', response.status);
				if (response.ok) {
					showAlert('¡Mensaje enviado! Te responderé a la brevedad. 🙌', 'success');
					resetContactForm();
					//console.log('[FormHandler] Enviado correctamente vía fetch.');
				} else {
					return response.json().then(function (data) {
						console.error('[FormHandler] Error de Formspree:', data);

						var errorsList = data?.errors?.map(extractErrorMessage);
						var msg = errorsList ? errorsList.join(', ') : 'Hubo un problema al enviar el formulario. Intenta de nuevo.';

						showAlert(msg, 'danger');
					});
				}
			})
			.catch(function (err) {
				console.error('[FormHandler] Error de red/CORS:', err);
				showAlert('Error de red. Verifica tu conexión e intenta de nuevo.', 'danger');
			})
			.finally(function () {
				$submitBtn.prop('disabled', false);
				$btnText.text('Enviar mensaje');
				$spinner.addClass('d-none').attr('aria-hidden', 'true');
			});
		});
	});

	// === Popup de recursos y botón de PayPal ===
	$(function () {
		// Mostrar el popup automáticamente a los 7 segundos
		setTimeout(function () {
			// Para evitar errores si el usuario entra a una página sin popup de recursos
			if ($('#sidebar-recursos').length === 0) return;

			$.magnificPopup.open({
				items: { src: '#sidebar-recursos' },
				type: 'inline',
				fixedContentPos: true,
				removalDelay: 400,
				mainClass: 'mfp-zoom-in mfp-fade'
			});
		}, 7000);

		// Cerrar popup con teclado
		$(document).on('keydown', '.resource-popup-close', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				$.magnificPopup.close();
			}
		});

		// Manejar click en el botón de descarga
		$(document).on('click', '#sidebar-recursos #btn-download', function (e) {
			e.preventDefault();
			e.stopPropagation();

			var $btn = $(this);
			if ($btn.hasClass('loading')) return;

			$btn.addClass('loading').attr('aria-busy', 'true');
			$btn.find('.btn-download-text').text('Preparando guía...');

			setTimeout(function () {
				$btn.removeClass('loading').attr('aria-busy', 'false');
				$btn.find('.btn-download-text').text('📥 Obtener Guía');

				if (typeof downloadResourceGuide === 'function') {
					downloadResourceGuide();
				} else {
					console.error('[Blog] downloadResourceGuide is not defined');
				}

				if ($.magnificPopup.instance?.isOpen) {
					var mfp = $.magnificPopup.instance;
					mfp.items = [{ src: '#popup-recursos', type: 'inline' }];
					mfp.index = 0;
					mfp.updateItemHTML();

					setTimeout(function () {
						if (typeof launchResourceConfetti === 'function') {
							launchResourceConfetti();
						}
						if (typeof confetti === 'function') {
							confetti({ particleCount: 90, spread: 65, origin: { y: 0.65 } });
						}
					}, 280);
					renderPaypalButton();
				} else {
					openSuccessPopup();
				}
			}, 1500);
		});

		// Abrir popup de éxito (o cambiar contenido manteniendo el modal abierto)
		function initSuccessContent() {
			setTimeout(function () {
				if (typeof launchResourceConfetti === 'function') {
					launchResourceConfetti();
				}
				if (typeof confetti === 'function') {
					confetti({ particleCount: 90, spread: 65, origin: { y: 0.65 } });
				}
			}, 280);
			renderPaypalButton();
		}

		function openSuccessPopup() {
			$.magnificPopup.open({
				items: { src: '#popup-recursos' },
				type: 'inline',
				fixedContentPos: true,
				removalDelay: 400,
				mainClass: 'mfp-zoom-in mfp-fade',
				callbacks: {
					open: function () {
						initSuccessContent();
					},
					change: function () {
						initSuccessContent();
					},
					close: function () {
						if (typeof stopResourceConfetti === 'function') {
							stopResourceConfetti();
						}
					}
				}
			});
		}

		// Renderizar botón de PayPal DINÁMICO
		function renderPaypalButton() {
			var container = document.getElementById('paypal-container-popup');
			if (!container) return;

			// LEER EL ID DESDE EL HTML
			var buttonId = container.dataset.buttonId;
			if (!buttonId) {
				console.error('[Blog] No se encontró el data-button-id en el contenedor');
				return;
			}

			while (container.firstChild) {
				container.firstChild?.remove();
			}

			var attempts = 0;
			var maxAttempts = 20;
			var paypalInterval = setInterval(function () {
				attempts++;
				if (window.paypal && paypal.HostedButtons) {
					clearInterval(paypalInterval);
					paypal.HostedButtons({
						hostedButtonId: buttonId, // 👈 Se inyecta la variable dinámica
					}).render("#paypal-container-popup");
				} else if (attempts >= maxAttempts) {
					clearInterval(paypalInterval);
					container.textContent = '[Blog] SDK de PayPal no disponible.';
				}
			}, 500);
		}
	});

	// WhatsApp flotante
	document.addEventListener('DOMContentLoaded', () => {
		const btnWhatsapp = document.getElementById('btn-whatsapp');

		if (btnWhatsapp) {
			// Número oculto en Base64
			const phone = atob('NTg0MTI1ODQxOTc1');

			// Obtenemos el texto desde el atributo data-message del HTML
			const rawMessage = btnWhatsapp.dataset.message;
			const encodedMessage = encodeURIComponent(rawMessage);

			// Asignamos la URL completa al enlace
			btnWhatsapp.href = `https://wa.me/${phone}?text=${encodedMessage}`;
		}
	});

	// Initialize active menu on DOM ready
	$(document).ready(function () {
		initActiveMenu();
	});

})(jQuery);