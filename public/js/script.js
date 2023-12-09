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

const waitSpinner = document.querySelector('#wait-spinner')
const messagebox = document.querySelector('#messagebox')
// console.log(waitSpinner);

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
let inquiredProductImage, inquiredProductName

// Product_Details page Qoute button modal handling
const btnRFQ = document.querySelector("[RFQ-BUTTON]");
if (btnRFQ) {
    btnRFQ.addEventListener('click', (e)=>{
        e.preventDefault()

        if (modalQuote) {
            
            toggleModal(modalQuote);

            let rfqPreview = modalQuote.querySelector("#rfq-preview");

            rfqPreview.querySelector(".image-responsive").src = document.querySelector("#current-image").src;            
            rfqPreview.querySelector("#prod-name").innerText = document.querySelector("#name-rfq").firstChild.textContent;
            document.querySelector("#prodIdentifier").value = document.querySelector("[productIdentifier]").textContent
            clearfrmAddListner()
        }
    })
}

quoteWrapper = document.querySelectorAll("[quoteWrapper]");
modalQuote = document.querySelector('#modal-quote');

for (let i = 0; i < quoteWrapper.length; i++) {
    quoteWrapper[i].addEventListener('click', GetQuoteModal);
}

function GetQuoteModal(e) {
    
    if (e.target.hasAttribute('quoteButton')) {
        e.preventDefault();
        
        if (modalQuote) {
            
            toggleModal(modalQuote);

            let rfqPreview = modalQuote.querySelector("#rfq-preview");
            const cardWrapperAnchorTag = e.target.parentElement.parentElement.parentElement;

            rfqPreview.querySelector(".image-responsive").src = cardWrapperAnchorTag.querySelector("[productImage]").src;            
            rfqPreview.querySelector("#prod-name").textContent = cardWrapperAnchorTag.querySelector(".card__caption__basic__name").textContent;
            document.querySelector("#prodIdentifier").value = cardWrapperAnchorTag.querySelector("[productIdentifier]").textContent

            clearfrmAddListner()   
        }
    }
}

function clearfrmAddListner() {
    const frmQuote = modalQuote.querySelector('#frmQuote')
    frmQuote.txtFullName.value = null
    frmQuote.txtEmail.value = null
    frmQuote.txtCountry.value = null
    frmQuote.txtQuantity.value = null
    
    frmQuote.addEventListener('submit', sendQuote);
}

function sendQuote (e) {
    e.preventDefault()
    e.stopImmediatePropagation()
    
    grecaptcha.execute('6LefTBApAAAAAGdco4sK5twxnRng07x-QJLSaO8K', {action: 'submit'})
    .then(async function(token) {
        
        const data = JSON.stringify({ 
            fullname: e.target.txtFullName.value,
            email: e.target.txtEmail.value,
            country: e.target.txtCountry.value,
            quantity: e.target.txtQuantity.value,
            _csrfToken: e.target._csrfToken.value,
            identifier: e.target.prodIdentifier.value,
            captcha: token
        })
        
        waitSpinner.classList.remove('display-none')
        waitSpinner.classList.add('flex')
            
        try {
            const response = await fetch('/rfq', {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'content-type': 'application/json'
                },
                body: data,
            })

            const result = await response.json();
            // console.log(result);
            

            if (result.success) {
                messagebox.classList.remove('bg-red')
                messagebox.classList.add('bg-green')
                messagebox.firstElementChild.textContent = result.message
                
                e.target.txtFullName.value = null
                e.target.txtEmail.value = null
                e.target.txtCountry.value = null
                e.target.txtQuantity.value = null
                
            }else {
                
                messagebox.classList.add('bg-red')
                messagebox.classList.remove('bg-green')
                messagebox.firstElementChild.textContent = result.message
            }
            
        } catch (error) {
            console.log('bad response', error);

            messagebox.classList.add('bg-red')
            messagebox.classList.remove('bg-green')
            messagebox.firstElementChild.textContent = 'Email not sent, invalid request'
            
        }finally{
            console.log('finally');
            waitSpinner.classList.remove('flex')
            waitSpinner.classList.add('display-none')

            messagebox.classList.add('show-message')

            modalClose(modalQuote);
        }

    });
}

// if (document.querySelector('#modal-quote .close-button')) {
//     btnClose = document.querySelector('#modal-quote .close-button');
//     btnClose.addEventListener("click", function () {
//         modalClose(modalQuote);
//     });
// }

if (modalQuote) {
    const closeButtons = modalQuote.querySelectorAll('[close-button]')
    if (closeButtons.length > 0) {
        for (let i = 0; i < closeButtons.length; i++) {
            closeButtons[i].addEventListener("click", () => { modalClose(modalQuote); });
        }
    }
}
//#endregion


// ********************************************************************
// Products Page Load More button
// ********************************************************************
//#region 

const url = window.location

let page = 1;
const productContainer = document.querySelector('#product-container')
const btnLoadMore = document.querySelector('#btnLoadMore')

if (btnLoadMore) {
    
    btnLoadMore.addEventListener('click', (e) => {
        e.preventDefault()

        console.log(`${url.origin}${url.pathname}/${page}${url.search}`);
    
        fetch(`${url.origin}${url.pathname}/${page}${url.search}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const products = data.data.rows
            // console.log(Number(data.currentPage), data.totalPages);
    
            if (Number(data.currentPage) + 1 >= data.totalPages) btnLoadMore.style.visibility = 'hidden'
    
            page++
    
            products.forEach(product => {
    
                const card = document.createElement('div')
                card.setAttribute("quoteWrapper", "");
                card.classList = 'product-page-collection__grid__card'
                const cardLink = document.createElement('a')
                cardLink.classList = 'btn card__wrapper'
                cardLink.href = `/product/${product.slug}`
                card.append(cardLink)
    
                card.addEventListener('click', GetQuoteModal)
    
                const thumb = document.createElement('img')
                thumb.setAttribute("productImage", "");
                thumb.classList = 'image-responsive'
                thumb.src = `/images/assets/300/${product.images[0].src}`
                cardLink.append(thumb)
    
                const cardCaption = document.createElement('div')
                cardCaption.classList = 'card__caption'
                cardLink.append(cardCaption)
    
                const cardCaptionBasic = document.createElement('div')
                cardCaptionBasic.classList = 'card__caption__basic'
                cardCaption.append(cardCaptionBasic)
    
                const cardCaptionP = document.createElement('p')
                cardCaptionP.classList = 'card__caption__basic__name'
                cardCaptionP.append(product.name)
                cardCaptionBasic.append(cardCaptionP)
    
                const cardCaptionBasicInfo = document.createElement('div')
                cardCaptionBasicInfo.classList = 'card__caption__basic__info'
                cardCaptionBasic.append(cardCaptionBasicInfo)
    
                const cardCaptionBasicInfoP = document.createElement('h3')
                cardCaptionBasicInfo.append(cardCaptionBasicInfoP)
                // if (product.subCategoryId) cardCaptionBasicInfoP.append(product.subCategory.name)
                cardCaptionBasicInfoP.append(product.usage)
    
                const cardCaptionBasicInfoPP = document.createElement('p')
                cardCaptionBasicInfo.append(cardCaptionBasicInfoPP)
                if (product.subCategoryId) cardCaptionBasicInfoPP.append(product.subCategory.name)
    
                const cardCaptionAttribute = document.createElement('div')
                cardCaptionAttribute.classList = 'card__caption__attribute'
                cardCaption.append(cardCaptionAttribute)
                
                const cardCaptionAttributeMod = document.createElement('div')
                cardCaptionAttributeMod.classList = 'card__caption__attribute__mod'
                cardCaptionAttribute.append(cardCaptionAttributeMod)
    
                const cardCaptionAttributeH = document.createElement('h4')
                cardCaptionAttributeMod.append(cardCaptionAttributeH)
    
                const cardCaptionAttributeP = document.createElement('p')
                cardCaptionAttributeMod.append(cardCaptionAttributeP)
                
                const cardCaptionAttributeS = document.createElement('span')
                cardCaptionAttributeMod.append(cardCaptionAttributeS)
                
                const cardCaptionAttributeButton = document.createElement('button')
                cardCaptionAttributeButton.setAttribute("quoteButton", "");
                cardCaptionAttributeButton.classList = 'quote-button'
                cardCaptionAttributeButton.append("Get Quote")
                cardCaptionAttribute.append(cardCaptionAttributeButton)
                
                
                if (productContainer) productContainer.append(card)
    
            });
        })
    })

}


//#endregion


//#region Sorting
const frmCollection = document.querySelector('#frmCollection')
const sorting = document.querySelector('#sorting')
if (sorting) {
    sorting.onchange = function (e) {

        if (frmCollection && frmCollection.collection.value) {
            return window.location.href = `${document.location.pathname}?sort=${e.target.value}&collection=${frmCollection.collection.value}`;
        }
        return window.location.href = `${document.location.pathname}?sort=${e.target.value}`;
    }
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
        // console.log(data);

        if (e.target.id == 'btn-model-images' && data['page'] == 1) {
            fillModalWithImages();
        } else if (e.target.id == 'load-more-images') {
            fillModalWithImages();
        } else {
            return
        }

        function fillModalWithImages() {
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
            action = `/home/imagesAjax/?page=${pageNumber}`;
        } else {
            btnLoadMoreImages.disabled = true;
            data.images = null
        }
    }

    request.send();
    return false;

    // const data = { username: 'example' };
    // fetch('imagesAjax/?page=0', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json',},
    //     body: JSON.stringify(data),
    // }).then(
    //     (response) => response.json()
    // ).then((data) => {
    //     console.log('Success:', data);
    // }).catch((error) => {
    //     console.error('Error:', error);
    // });
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

//#region Products Page Reset filter Button
const btnReset = document.querySelector('.btnReset')
if (btnReset) {
    btnReset.addEventListener('click', (e)=>{
        e.preventDefault()
        window.location.href = document.location.pathname
    })
}
//#endregion