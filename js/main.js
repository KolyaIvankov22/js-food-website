// Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
	modal = document.querySelector('.modal')

modalTrigger.forEach(btn => {
	btn.addEventListener('click', openModal)
})

function closeModal() {
	modal.style.display = 'none'
	document.body.style.overflow = ''
}

function openModal() {
	modal.style.display = 'block'
	document.body.style.overflow = 'hidden'
}

modal.addEventListener('click', e => {
	if (e.target === modal || e.target.getAttribute('data-close') == '') {
		closeModal()
	}
})

// Tabs Slider

const tabsParent = document.querySelector('.tabheader__items'),
	tabs = document.querySelectorAll('.tabheader__item'),
	slides = document.querySelectorAll('.tabcontent')

slides.forEach((item, index) =>
	index === 0 ? (item.style.display = 'block') : (item.style.display = 'none')
)

tabsParent.addEventListener('click', event => {
	const target = event.target
	const index = Array.from(event.currentTarget.children).indexOf(target)

	if (target.classList.contains('tabheader__item')) {
		showSlides(slides, index)
		showTabs(tabs, target)
	}
})

function showSlides(slides, index) {
	slides.forEach(item => (item.style.display = 'none'))
	slides[index].style.display = 'block'
}

function showTabs(tabs, target) {
	tabs.forEach(item => item.classList.remove('tabheader__item_active'))
	target.classList.add('tabheader__item_active')
}

// Slider Body

const sliderPrev = document.querySelector('.offer__slider-prev'),
	sliderNext = document.querySelector('.offer__slider-next'),
	slidesOffer = document.querySelectorAll('.offer__slide'),
	current = document.querySelector('#current')

slidesOffer.forEach((item, index) =>
	index === 2 ? (item.style.display = 'block') : (item.style.display = 'none')
)

function sliderToggle(next, prev) {
	prev.addEventListener('click', event => {
		let sum = current.textContent
		sum == 4 ? (sum = 1) : sum++

		current.textContent = `0${sum}`
		showSlidesOffer(slidesOffer, sum)
	})

	next.addEventListener('click', event => {
		let sum = current.textContent
		sum == 1 ? (sum = 4) : sum--

		current.textContent = `0${sum}`
		showSlidesOffer(slidesOffer, sum)
	})
}

function showSlidesOffer(slides, index) {
	slides.forEach(item => (item.style.display = 'none'))
	slides[index - 1].style.display = 'block'
}

sliderToggle(sliderPrev, sliderNext)

// Timer

const deadline = '2023-12-30'

function getTimeRemaining(endtime) {
	const t = Date.parse(endtime) - Date.parse(new Date()),
		days = Math.floor(t / (1000 * 60 * 60 * 24)),
		seconds = Math.floor((t / 1000) % 60),
		minutes = Math.floor((t / 1000 / 60) % 60),
		hours = Math.floor((t / (1000 * 60 * 60)) % 24)

	return {
		total: t,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds
	}
}

function getZero(num) {
	if (num >= 0 && num < 10) {
		return '0' + num
	} else {
		return num
	}
}

function setClock(selector, endtime) {
	const timer = document.querySelector(selector),
		days = timer.querySelector('#days'),
		hours = timer.querySelector('#hours'),
		minutes = timer.querySelector('#minutes'),
		seconds = timer.querySelector('#seconds'),
		timeInterval = setInterval(updateClock, 1000)

	updateClock()

	function updateClock() {
		const t = getTimeRemaining(endtime)

		days.innerHTML = getZero(t.days)
		hours.innerHTML = getZero(t.hours)
		minutes.innerHTML = getZero(t.minutes)
		seconds.innerHTML = getZero(t.seconds)

		if (t.total <= 0) {
			clearInterval(timeInterval)
		}
	}
}

setClock('.timer', deadline)

// Calculator

const result = document.querySelector('.calculating__result span')

let sex, height, weight, age, ratio

if (localStorage.getItem('sex')) {
	sex = localStorage.getItem('sex')
} else {
	sex = 'female'
	localStorage.setItem('sex', 'female')
}

if (localStorage.getItem('ratio')) {
	ratio = localStorage.getItem('ratio')
} else {
	ratio = 1.375
	localStorage.setItem('ratio', 1.375)
}

function calcTotal() {
	if (!sex || !height || !weight || !age || !ratio) {
		result.textContent = '____'
		return
	}
	if (sex === 'female') {
		result.textContent = Math.round(
			(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
		)
	} else {
		result.textContent = Math.round(
			(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
		)
	}
}

calcTotal()

function initLocalSettings(selector, activeClass) {
	const elements = document.querySelectorAll(selector)

	elements.forEach(elem => {
		elem.classList.remove(activeClass)
		if (elem.getAttribute('id') === localStorage.getItem('sex')) {
			elem.classList.add(activeClass)
		}
		if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
			elem.classList.add(activeClass)
		}
	})
}

initLocalSettings('#gender div', 'calculating__choose-item_active')
initLocalSettings(
	'.calculating__choose_big div',
	'calculating__choose-item_active'
)

function getStaticInformation(selector, activeClass) {
	const elements = document.querySelectorAll(selector)

	elements.forEach(elem => {
		elem.addEventListener('click', e => {
			if (e.target.getAttribute('data-ratio')) {
				ratio = +e.target.getAttribute('data-ratio')
				localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
			} else {
				sex = e.target.getAttribute('id')
				localStorage.setItem('sex', e.target.getAttribute('id'))
			}

			elements.forEach(elem => {
				elem.classList.remove(activeClass)
			})

			e.target.classList.add(activeClass)

			calcTotal()
		})
	})
}

getStaticInformation('#gender div', 'calculating__choose-item_active')
getStaticInformation(
	'.calculating__choose_big div',
	'calculating__choose-item_active'
)

function getDynamicInformation(selector) {
	const input = document.querySelector(selector)

	input.addEventListener('input', () => {
		if (input.value.match(/\D/g)) {
			input.style.border = '1px solid red'
		} else {
			input.style.border = 'none'
		}
		switch (input.getAttribute('id')) {
			case 'height':
				height = +input.value
				break
			case 'weight':
				weight = +input.value
				break
			case 'age':
				age = +input.value
				break
		}

		calcTotal()
	})
}

getDynamicInformation('#height')
getDynamicInformation('#weight')
getDynamicInformation('#age')
