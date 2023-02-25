const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = 'hidden-detail';
const TINY_EFFECT_CLASS = 'is-tiny';
const ESC_KEY = 'Escape';


// Изменение увеличенного изображения и его названия

function setDetails(imageUrl, titleText) {

	const detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
	const detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
	
	detailImage.setAttribute('src', imageUrl);
	detailTitle.textContent = titleText;
}

// Получение url изображения из миниатюры

function imageFromThumbnail (thumbnail) {
	return thumbnail.getAttribute('data-image-url')
}

// Получение названия из миниатюры

function titleFromThumb(thumbnail) {
	return thumbnail.getAttribute('data-image-title')
}

// Функция принимает на входе ссылку на элемент миниатюры, вызывает функцию setDetails, передавая ей значения из вызовов функций mageFromThumbnail и titleFromThumb

function setDetailsFromThumb(thumbnail) {
	setDetails(imageFromThumbnail (thumbnail), titleFromThumb(thumbnail))
}

//Функция принимает на входе миниатюру и добавляет слушатель события

function addThumbClickHandler(thumb) {
	thumb.addEventListener('click', function (event){
		event.preventDefault();
		setDetailsFromThumb(thumb);
		showDetails();
	});
}

//Выбираем миниатюры в коллекцию Nodelist и преобразуем коллекцию в массив
function getThumbnailArray() {
	const thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
	// const thumbnailArray = [].slice.call(thumbnails);
	const thumbnailArray = Array.from(thumbnails);
	return thumbnailArray;
}

//добавляет скрывыющий класс к body
function hideDetails() {
	document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
	const frame = document.querySelector(DETAIL_FRAME_SELECTOR);
	document.body.classList.remove(HIDDEN_DETAIL_CLASS);
	frame.classList.add(TINY_EFFECT_CLASS);
	setTimeout (function () {
		frame.classList.remove(TINY_EFFECT_CLASS);
	}, 50);
	
}

function addKeyPressHandler() {
	document.body.addEventListener('keyup', function(event) {
		event.preventDefault();	
		console.log(event.key);
		if (event.key === ESC_KEY) {
			hideDetails();
		}
	});
}

//Навешивает слушатель события на каждый элемент массива и выполняется функция при клике
function initializeEvents() {
	const thumbnails = getThumbnailArray();
	thumbnails.forEach(addThumbClickHandler);
	addKeyPressHandler();
}

initializeEvents();