// console.log('console from script.js');
// (async () => {
// const moduleSpecifier = `./testing2.mjs`;
//     const module = await import(moduleSpecifier)
//     module.default();
//     module.doStuff();
    
// })();
// (async () => {
// const moduleSpecifier = `./testing.mjs`;
//     const testing = await import(moduleSpecifier)
    
    
// })();


// Traversing Guide
// https://zellwk.com/blog/dom-traversals/



//#region Product Posting Sub Category Population
let subcategorySelection = document.querySelector('select#subCategory');
let categorySelection = document.querySelector('select#category');
if (categorySelection) {
    categorySelection.addEventListener('change', function (params) {
        let categoryID = categorySelection.options[categorySelection.selectedIndex].value
        const request = new XMLHttpRequest();
        request.open('GET', 'getsubcategories/' + categoryID + '/', true);
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        request.onload = () => {
            let output = ''
            const data = JSON.parse(request.responseText);
            data['subcategories'].forEach(element => {
                output += `<option value="${element.id}">${element.name}</option>`
            });
            subcategorySelection.innerHTML = output
        }

        request.send();
        return false;
    })
}
//#endregion

//#region  NavBar
let navbarBrand = document.querySelector('.navbar__brand__hamburger');
if (navbarBrand) {
    navbarBrand.addEventListener('click', function () {
        let navbarlinks = document.getElementById('navbar-links');
        if (navbarlinks) {
            navbarlinks.classList.toggle('navbar__collapsed');
        }

    })
}


let contactSlider = document.querySelector('#contact-list-slider');
if (contactSlider) {

    const arrowLeft = contactSlider.previousElementSibling
    const arrowRight = contactSlider.nextElementSibling

    let contacts = Array.from(contactSlider.children);

    let slideWidth = contactSlider.parentElement.clientWidth;
    let slideMoveWait = 3000;

    contacts.forEach(function (contact, index) {
        contact.style.left = slideWidth * index + 'px';
    })


    contactSlider.addEventListener('mouseover', pauseSlide)
    arrowLeft.addEventListener('mouseover', pauseSlide)
    arrowRight.addEventListener('mouseover', pauseSlide)

    contactSlider.addEventListener('mouseleave', restartSlide)
    arrowLeft.addEventListener('mouseleave', restartSlide)
    arrowRight.addEventListener('mouseleave', restartSlide)

    arrowRight.addEventListener('click', function () {
        if (slide > 1) {
            contactSlider.style.left =
                (parseInt(contactSlider.style.left.replace('px', '')) + slideWidth) + 'px';
            slide--
        }
    })
    arrowLeft.addEventListener('click', function () {
        if (slide < contactSlider.childElementCount) {
            contactSlider.style.left = '-' + slide * slideWidth + 'px';
            slide++
        }
    })

    var slide = 1;
    function moveSlide() {
        contactSlider.style.left = '-' + slideWidth * slide + 'px';
        slide++
        if (slide > contactSlider.childElementCount) {
            contactSlider.style.left = '0px';
            slide = 1
        }
        arrowLeft.style.display = 'block';
    }

    let myTimer = setInterval(moveSlide, slideMoveWait)
    function pauseSlide() {
        clearInterval(myTimer);
    }
    function restartSlide() {
        myTimer = setInterval(moveSlide, slideMoveWait);
    }
}
//#endregion

// ********************************************************************
// Search Modal & Modal Common Functions
// ********************************************************************
//#region 
let KEY = {
    ESCAPE: 27,
    TAB: 9
}
//SEARCH MODALS VARIABLES
let btnSearch, modalSearch;
//MODALS COMMON VARIABLES
let btnClose, focusedElementBeforeModal, firstElementOfModal, lastElementOfModal;


if (document.querySelector('#modal-search') && document.querySelector('#btnSearch') && document.querySelector('.close-button')) {
    modalSearch = document.querySelector('#modal-search');

    btnSearch = document.querySelector('#btnSearch');
    btnSearch.addEventListener('click', function () {
        toggleModal(modalSearch);
    });

    btnClose = document.querySelector('.close-button');
    btnClose.addEventListener("click", function () {
        modalClose(modalSearch);
    });
}


//MODALS COMMON FUNCTIONS
function toggleModal(modal) {
    focusedElementBeforeModal = document.activeElement;

    modal.classList.toggle("show-modal");

    modal.addEventListener('keydown', processEscapeTabKeys);

    // Find all focusable modal elements
    let focusableElements = modal.querySelectorAll('input:not([disabled]), button:not([disabled])');

    firstElementOfModal = focusableElements[0];
    lastElementOfModal = focusableElements[focusableElements.length - 1];

    // Focus on first element of the modal - firstName
    if (firstElementOfModal) {
        firstElementOfModal.focus();
    }
}

// ENTER MODAL TO ENABLE WINDOW CLICK CLOSE
window.addEventListener("click", windowOnClick);
function windowOnClick(event) {
    if (event.target === modalSearch) {
        toggleModal(modalSearch);
    }
    else if (event.target === modalQuote) {
        toggleModal(modalQuote);
    }
    else if (event.target === modalImages) {
        toggleModal(modalImages);
    }
}

function processEscapeTabKeys(event) {
    // handle TAB key
    if (event.keyCode === KEY.TAB) {
        if (document.activeElement === lastElementOfModal) {
            event.preventDefault();
            firstElementOfModal.focus();
        }
    }
    // handle ESCAPE key to close the modal
    if (event.keyCode === KEY.ESCAPE) {
        modalClose(document.querySelector(".show-modal"));
    }
}

function modalClose(modal) {
    modal.classList.toggle("show-modal");
    focusedElementBeforeModal.focus();
}
//#endregion



// ********************************************************************
// ASK QUOTE Modal
// ********************************************************************
//#region 
let quoteWrapper, modalQuote;
let inquiredProductImage, inquiredProductName, inquiredProductConstructionType, inquiredProductUsage
quoteWrapper = document.querySelectorAll(".quote-wrapper");

for (let i = 0; i < quoteWrapper.length; i++) {
    quoteWrapper[i].addEventListener('click', GetQuoteModal);
}
function GetQuoteModal(e) {
    console.time("GetQuoteModal")

    if (e.target.classList == 'quote-button') {
        e.preventDefault();
        if (document.querySelector('#modal-quote')) {
            //Quote Modal is assigned to the variable only here.
            modalQuote = document.querySelector('#modal-quote');
            toggleModal(modalQuote);

            let rfqPreview = document.getElementById("rfq-preview");
            const element = e.target.parentElement.parentElement.parentElement;

            rfqPreview.querySelector(".image-responsive").src = element.querySelector(".product-image").src;
            rfqPreview.querySelector("#prod-name").innerText = element.querySelector(".card__caption__basic__name").innerText;
            rfqPreview.querySelector("#prod-construction").innerText = element.querySelector(".construction-type").innerText;
            rfqPreview.querySelector("#prod-usage").innerText = element.querySelector(".usage").innerText;
        }
    }

    console.timeEnd("GetQuoteModal")
}

if (document.querySelector('#modal-quote .close-button')) {
    btnClose = document.querySelector('#modal-quote .close-button');
    btnClose.addEventListener("click", function () {
        modalClose(modalQuote);
    });
}
//#endregion


// ********************************************************************
// SELECT IMAGES Modal & Load More images button in modal
// ********************************************************************
//#region 
let btnImagesModel, btnLoadMoreImages, modalImages;
// let inquiredProductImage, inquiredProductName, inquiredProductConstructionType, inquiredProductUsage
btnImagesModel = document.querySelector("#btn-model-images");
if (btnImagesModel) {
    btnImagesModel.addEventListener('click', GetImagesModal);
}

btnLoadMoreImages = document.querySelector("#load-more-images");
if (btnLoadMoreImages) {
    btnLoadMoreImages.addEventListener('click', GetImagesModal);
}

let imageShowcase = document.querySelector("#image-showcase");

let action = `/home/imagesAjax/?page=${0}`;
let imageModalOutput = '';
function GetImagesModal(e) {
    e.preventDefault();

    modalImages = document.querySelector("#modal-images");
    if (modalImages && e.target.id == 'btn-model-images') toggleModal(modalImages);

    const request = new XMLHttpRequest();
    request.open('GET', action, true);
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    request.onload = () => {
        const data = JSON.parse(request.responseText);
        console.log(data);

        if (e.target.id == 'btn-model-images' && data['page'] == 1) {
            fillModalWithImages();
        } else if (e.target.id == 'load-more-images') {
            fillModalWithImages();
        } else {
            return
        }

        function fillModalWithImages(params) {
            if (!btnLoadMoreImages.disabled) {
                data.images.forEach(img => {
                    
                    const image = document.createElement('img');
                    image.classList.add('product-image')
                    image.src = `/images/assets/100/${img.src}`;
                    // image.width = 100
                    image.setAttribute('id', img.id)
                    imageShowcase.appendChild(image);

                });
            }
        }

        if (data.currentPage < data.totalPages) {
            let pageNumber = Number(data.currentPage) + Number(1);
            action = 'imagesAjax/?page=' + pageNumber;
        } else {
            btnLoadMoreImages.disabled = true;
            data.images = null
        }
    }

    request.send();
    return false;
}

if (document.querySelector('#modal-images .close-button')) {
    btnClose = document.querySelector('#modal-images .close-button');
    btnClose.addEventListener("click", function () {
        modalClose(modalImages);
    });
}
//#endregion

//#region Image SELECTION ADDITION & REMOVAL from Product Form
const productImageArray = document.querySelector('#product-image-array')
const selectedImages = document.querySelector('#selected-images')

if (imageShowcase) {
    
    imageShowcase.addEventListener('click', (e) => {
    
        if (e.target.localName == 'img') {
            let imageFound = null
            if (productImageArray) {
                Array.from(productImageArray.children).forEach(element => {
                    if (element.value == e.target.id) {
                        element.remove();
                        imageFound = true
                        e.target.classList.remove('image-border-highlight')
                    }
                });
            }
    
    
            if (selectedImages) {
                Array.from(selectedImages.children).forEach(element => {
                    if (element.id == e.target.id) {
                        element.remove();
                        imageFound = true
                    }
                });
            }
    
    
    
            if (!imageFound) {
                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'image');
                input.setAttribute('value', e.target.id);
                productImageArray.appendChild(input);
    
    
    
                const span = document.createElement('span');
                span.setAttribute('id', e.target.id);
    
                const button = document.createElement('input');
                button.setAttribute('type', 'button');
                button.setAttribute('id', e.target.id);
                button.setAttribute('value', 'x');
                button.classList.add('remove-button');
    
                let image = document.createElement('img');
                image.src = e.target.src;
                // image.setAttribute('width', '100px');
                // image.setAttribute('height', '100px');
    
                span.appendChild(button)
                span.appendChild(image)
                selectedImages.appendChild(span)
                e.target.classList.add('image-border-highlight')
            }
    
        }
    
    });
}

if (selectedImages) {
    selectedImages.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-button')) {
            e.target.parentElement.remove();

            if (productImageArray) {
                Array.from(productImageArray.children).forEach(element => {
                    if (element.value == e.target.id) {
                        element.remove();
                    }
                });
            }
        }
    });
}


//#endregion