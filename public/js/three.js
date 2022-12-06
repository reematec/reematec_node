import * as THREE from '../three.js-master/build/three.module.js';
// import { color, GUI } from '../three.js-master/examples/jsm/libs/dat.gui.module.js';
// import Stats from '../three.js-master/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../three.js-master/examples/jsm/controls/OrbitControls.js';
// import { RoomEnvironment } from '../three.js-master/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from '../three.js-master/examples/jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from '../three.js-master/examples/jsm/loaders/RGBELoader.js';
// import { RoughnessMipmapper } from '../three.js-master/examples/jsm/utils/RoughnessMipmapper.js';
// import { TWEEN } from '../three.js-master/examples/jsm/libs/tween.module.min.js';


function main() {
	
	const canvas = document.querySelector('#c');
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
	
	renderer.outputEncoding = THREE.sRGBEncoding;

	//#region Variable
	let model;


	let punch_zone = null;
	let gusset = [];
	let finger_middle = [];
	let rubber_tag = [];	
	let finger_index = [];
	let finger_ring = [];
	let alien_rubber_tag = [];
	let finger_small = [];
	let palm = null;
	let palmProtector = null;
	let titan = [];
	let backhand = [];
	let strap = [];
	let logo = [];
	let strap_text = [];

	let originalConfiguration = {}
	//#endregion

	//#region Camera Setup
	const fov = 75;
	const aspect = 2;  // the canvas default
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = .7;

	const cameraFront = new THREE.PerspectiveCamera(fov, aspect, near, far);
	cameraFront.position.z = -.7;
	
	const cameraBack = new THREE.PerspectiveCamera(fov, aspect, near, far);
	cameraBack.position.z = .7;



	const controls = new OrbitControls(camera, canvas);
	controls.maxPolarAngle = Math.PI / 2;
	// controls.enableDamping = true;
	controls.target.set(0, 0, 0);
	// controls.enablePan = false;
	controls.update();
	//#endregion

	const scene = new THREE.Scene();
	scene.background = new THREE.Color('#eee');

	// const helper = new THREE.CameraHelper( camera1 );
	// scene.add( helper );

	//#region lights
	const color = 0xffffff;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.castShadow = true;
	light.position.set(0, 0.5, .5);
	// light.target.position.set(0, 0, 0);

	// light.shadow.bias = -0.004;
	// light.shadow.mapSize.width = 2048;
	// light.shadow.mapSize.height = 2048;

	scene.add(light);
	// scene.add(light.target);
	// const cam = light.shadow.camera;
	// cam.near = 1;
	// cam.far = 2000;
	// cam.left = -1500;
	// cam.right = 1500;
	// cam.top = 1500;
	// cam.bottom = -1500;

	// const cameraHelper = new THREE.CameraHelper(cam);
	// scene.add(cameraHelper);
	// cameraHelper.visible = true;
	// const helper = new THREE.DirectionalLightHelper(light, 100);
	// scene.add(helper);
	//helper.visible = true;


	// const intensity01 = 1.5;
	// const light01 = new THREE.DirectionalLight(color, intensity01);
	// // light.castShadow = true;
	// light01.position.set(0, 1, 0);
	// light01.target.position.set(0, 0, 0);
	// scene.add(light01);
	// const helper01 = new THREE.DirectionalLightHelper(light01, 100);
	// scene.add(helper01);
	// helper01.visible = true;


	const intensity02 = 0.8;
	const light02 = new THREE.DirectionalLight(color, intensity02);
	// light.castShadow = true;
	light02.position.set(0, 0.15, -1);
	light02.target.position.set(0, 0, 0);


	scene.add(light02);
	// const helper02 = new THREE.DirectionalLightHelper(light02, 100);
	// scene.add(helper02);
	//helper02.visible = true;
	//#endregion

	// new RGBELoader().setPath('./static/model/')
	// 	.load('studio_small_03_1k.hdr', function (texture) {
	// 		texture.mapping = THREE.EquirectangularReflectionMapping;
	// 		scene.environment = texture;
	// 		//scene.background = texture;
	// 		scene.background = new THREE.Color('#ffffff');
	// 	})

	
	const gltfLoader = new GLTFLoader();
	gltfLoader.load('images/glove-texture.gltf', (gltf) => {
		
		model = gltf.scene;
		// const axesHelper = new THREE.AxesHelper( 5 );
		// scene.add( axesHelper );
		model.position.y = -0.1;
		// model.rotation.y = 3.15;


		// var aabb = new THREE.Box3().setFromObject(model);
		// var center = aabb.getCenter(new THREE.Vector3());
		// x: 0.02578836679458618
		// y: 0.07089218664900654
		// z: 0.005242546471471196
		// console.log(center)

		cameraBack.lookAt(new THREE.Vector3(0, 0, 0));
		cameraFront.lookAt(new THREE.Vector3(0, 0, 0));

		// camera1.lookAt(new THREE.Vector3(0, 4.286263797015736e-17, 0.7));
		//The X axis is red. The Y axis is green. The Z axis is blue.




		punch_zone = model.getObjectByName('punch_zone');
		gusset = model.getObjectByName('gusset');
		finger_middle = model.getObjectByName('finger_middle');
		finger_index = model.getObjectByName('finger_index');
		finger_ring = model.getObjectByName('finger_ring');
		finger_small = model.getObjectByName('finger_small');
		rubber_tag = model.getObjectByName('rubber_tag');
		alien_rubber_tag = model.getObjectByName('alien_rubber_tag');
		palm = model.getObjectByName('palm');
		palmProtector = model.getObjectByName('palm_protector');
		titan = model.getObjectByName('titan');
		backhand = model.getObjectByName('backhand');
		strap = model.getObjectByName('strap');
		strap_text = model.getObjectByName('strap_text');
		titan = model.getObjectByName('Titan');
		logo = model.getObjectByName('logo');

		logo.visible = false;
		strap_text.visible = false;

		// model.traverse(o => {
		// 	if (o.isMesh) {
		// 		// o.material.color = new THREE.Color(0x999999)
		// 		//console.log(o)
		// 	}
		// });
		scene.add(model);
		render();
		originalConfiguration.rubber_tag = rubber_tag.material.color
		originalConfiguration.alien_rubber_tag = alien_rubber_tag.material.color
		originalConfiguration.titan = titan.material.color

		originalConfiguration.punch_zone = punch_zone.material.color
		originalConfiguration.gusset = gusset.material.color
		originalConfiguration.finger_middle = finger_middle.material.color
		originalConfiguration.finger_index = finger_index.material.color
		originalConfiguration.finger_ring = finger_ring.material.color
		originalConfiguration.finger_small = finger_small.material.color
		originalConfiguration.palm = palm.material.color
		originalConfiguration.palmProtector = palmProtector.material.color
		originalConfiguration.backhand = backhand.material.map
		originalConfiguration.strap = strap.material.color
		originalConfiguration.strap_customization = false
		originalConfiguration.strap_text = strap_text.material.map
		originalConfiguration.logo = false

	});

	//#region Color Customization Events
	const punchZoneColors = document.querySelectorAll('.punch-zone-color')
	punchZoneColors.forEach(swatch => {
		swatch.addEventListener('click', () => {
			punch_zone.material.color = new THREE.Color(swatch.style.background)
			render();

		});
	});

	const palmProtectorColor = document.querySelectorAll('.palm-protector-color')
	palmProtectorColor.forEach(swatch => {
		swatch.addEventListener('click', () => {
			palmProtector.material.color = new THREE.Color(swatch.style.background)
			render();
		});
	});

	const palmColor = document.querySelectorAll('.palm-color')
	palmColor.forEach(swatch => {
		swatch.addEventListener('click', () => {
			palm.material.color = new THREE.Color(swatch.style.background)
			render();
		});
	});

	const gussetColor = document.querySelectorAll('.gusset-color')
	gussetColor.forEach(swatch => {
		swatch.addEventListener('click', () => {
			gusset.material.color = new THREE.Color(swatch.style.background)
			render();
		});
	});

	//#endregion

	//#region Backhand Color and Texture customization
	const backhandColor = document.querySelectorAll('.backhand-color')
	backhandColor.forEach(swatch => {
		swatch.addEventListener('click', () => {

			backhand.material.map = null
			backhand.material.needsUpdate = true;
			backhand.material.color = new THREE.Color(swatch.style.background)
			textureImagePreview.src = ''
			render();
			// console.log(backhand.material.map);
		});
	});

	const backhandTexture = document.querySelectorAll('.backhand-texture')
	backhandTexture.forEach(swatch => {
		swatch.addEventListener('click', (e) => {
			
			let src = e.target.src;
			src = src.replace('icons/', '')
			const loader = new THREE.TextureLoader();
			loader.load(src, (texture) => {
				backhand.material.color = new THREE.Color(0xffffff);
				backhand.material.map = texture
				backhand.material.map.encoding = 3001
				backhand.material.needsUpdate = true;
				textureImagePreview.src = ''
				render();
				// console.log(backhand.material.map);
			}
				, undefined, function (err) { console.error('An error happened.', err); }
			);
		});
	});

	const textureUpload = document.querySelector('#texture-upload')
	textureUpload.addEventListener('change', (e) => {


		const loader = new THREE.TextureLoader();
		loader.load(URL.createObjectURL(e.target.files[0]), (texture) => {

			backhand.material.map = texture
			backhand.material.map.encoding = 3001
			backhand.material.needsUpdate = true;

			render();
			
			const fileReader = new FileReader()
			fileReader.onloadend = () => {
				const data = fileReader.result
				textureImagePreview.src = data
				// console.log(backhand.material.map);
			}
			fileReader.readAsDataURL(e.target.files[0])

		},
			undefined, function (err) { console.error('An error happened. ', err); }
		);


	});
	//#endregion

	//#region FINGER'S Color CUSTOMIZATION
	const fingerSmallColor = document.querySelectorAll('.finger-small-color')
	fingerSmallColor.forEach(swatch => {
		swatch.addEventListener('click', () => {
			finger_small.material.color = new THREE.Color(swatch.style.background)
			render();
		});
	});

	const fingerRingColor = document.querySelectorAll('.finger-ring-color')
	fingerRingColor.forEach(swatch => {
		swatch.addEventListener('click', () => {
			finger_ring.material.color = new THREE.Color(swatch.style.background)
			render();
		});
	});

	const fingerMiddleColor = document.querySelectorAll('.finger-middle-color')
	fingerMiddleColor.forEach(swatch => {
		swatch.addEventListener('click', () => {
			finger_middle.material.color = new THREE.Color(swatch.style.background)
			render();
		});
	});

	const fingerIndexColor = document.querySelectorAll('.finger-index-color')
	fingerIndexColor.forEach(swatch => {
		swatch.addEventListener('click', () => {
			finger_index.material.color = new THREE.Color(swatch.style.background)
			render();
		});
	});
	//#endregion

	const strapColor = document.querySelectorAll('.strap-color')
	strapColor.forEach(swatch => {
		swatch.addEventListener('click', () => {
			strap.material.color = new THREE.Color(swatch.style.background)
			render();
		});
	});

	const modelReset = document.querySelector('#model-reset')
	modelReset.addEventListener('click', () => {

		punch_zone.material.color = originalConfiguration.punch_zone
		gusset.material.color = originalConfiguration.gusset
		finger_middle.material.color = originalConfiguration.finger_middle
		finger_index.material.color = originalConfiguration.finger_index
		finger_ring.material.color = originalConfiguration.finger_ring
		finger_small.material.color = originalConfiguration.finger_small

		palm.material.color = originalConfiguration.palm
		palmProtector.material.color = originalConfiguration.palmProtector


		backhand.material.color = new THREE.Color(0xffffff)
		backhand.material.map = originalConfiguration.backhand
		backhand.material.needsUpdate = true;

		strap.material.color = originalConfiguration.strap
		strap_text.visible = false
		strap_text.material.map = originalConfiguration.strap_text
		logo = false
		render()
	})

	//#region LOGO
	const customLogoToggle = document.querySelector('#turn-logo-on');
	const customLogoControls = document.querySelector('#custom-logo-controls');
	const logoImagePreview = document.querySelector('#logoImagePreview')
	if (customLogoControls) {
		customLogoToggle.addEventListener('click', () => {
			if (customLogoControls.classList.contains('show')) {
				customLogoControls.classList.remove('show');
				logo.visible = false;
				titan.visible = true;
				logoImagePreview.src = ''



				// TODO uploaded images must be reset to null.
				render();
			} else {
				customLogoControls.classList.add('show');
				logo.visible = true;
				titan.visible = false;


				logo.material.opacity = 1;
				logo.material.transparent = true;
				logo.material.alphaTest = 0.9;

				render();
			}
		})
	}


	let initialAssignmentLogo = false;
	let uploadedImage = [];
	const logoUpload = document.querySelector('#logo-upload')
	logoUpload.addEventListener('change', (e) => {

		uploadedImage = e.target.files[0];
		initialAssignmentLogo = false;
		logoCustomization(0, 0, 1);
		console.log(logo.material.map);
	});

	const imageScale = document.querySelector('#image-scale')
	imageScale.addEventListener('change', LogoHandling);

	const imagehPosition = document.querySelector('#image-h-position')
	imagehPosition.addEventListener('change', LogoHandling);

	const imagevPosition = document.querySelector('#image-v-position')
	imagevPosition.addEventListener('change', LogoHandling);

	function LogoHandling() {
		if (uploadedImage) {
			logoCustomization(imagevPosition.value, imagehPosition.value, imageScale.value);
		}
	}

	function logoCustomization(v, h, scale) {

		const logoCanvas = document.createElement("canvas")
		let logoCTX = logoCanvas.getContext('2d')
		const logoTexture = new THREE.CanvasTexture(logoCanvas);
		let logoImage = new Image();
		logoImage.src = URL.createObjectURL(uploadedImage);

		logoTexture.flipY = false
		// logoTexture.center.x = 0.5
		// logoTexture.center.y = 0.5
		logoTexture.repeat.set(1, 1);
		//texture.rotation = 1.57

		logoImage.onload = () => {


			//#region 
			const imageRatio = logoImage.height / logoImage.width
			if (imageRatio > 1) {

				logoCanvas.height = logoImage.height;
				logoCanvas.width = (logoImage.width * imageRatio);
				// console.log("1")

			} else if (imageRatio < 1) {
				// Here image width  is higher than image Height

				logoCanvas.height = (logoImage.height * (logoImage.width / logoImage.height))
				logoCanvas.width = logoImage.width;
				// console.log("2")

			} else {
				if (logoImage.height > logo.material.map.image.height) {
					logoCanvas.height = logoImage.height;
					logoCanvas.width = logoImage.width;
					// console.log("3")
				} else {
					logoCanvas.height = 500;
					logoCanvas.width = 500;
					// console.log("4")
				}
			}
			//#endregion




			// logoCanvas.width = logoImage.width;
			// logoCanvas.height = logoImage.height;


			let x = logoCanvas.width / 2 - logoImage.width / 2;
			let y = logoCanvas.height / 2 - logoImage.height / 2;

			if (initialAssignmentLogo == false) {
				imagehPosition.min = -logoCanvas.height;
				imagehPosition.max = logoCanvas.height;
				imagehPosition.value = 0

				imagevPosition.min = -logoCanvas.width;
				imagevPosition.max = logoCanvas.width;
				imagevPosition.value = 0
				initialAssignmentLogo = true
			}

			logoCTX.scale(scale, scale)
			logoCTX.translate(v, h);
			logoCTX.drawImage(logoImage, x, y)
			logo.material.map = logoTexture;
			logoImagePreview.src = logoCanvas.toDataURL()

			render();
			URL.revokeObjectURL(logoImage.src);
		}
	}

	//#endregion

	//#region TEXT HANDLING
	let initialAssignmentText = false;
	const customText = document.querySelector('#txt-custom-text');
	if (customText.value) {

		customText.addEventListener('input', (e) => {
			textCustomization(e.target.value, 0, 0, 0);
		});
		customText.addEventListener('change', (e) => {
			textCustomization(e.target.value, 0, 0, 0);
		});
	}

	const customTextToggle = document.querySelector('#turn-text-on');
	const customTextControls = document.querySelector('#custom-text-controls');
	if (customTextControls) {
		customTextToggle.addEventListener('click', () => {
			if (customTextControls.classList.contains('show')) {
				customTextControls.classList.remove('show');
				strap_text.visible = false;

			} else {
				customTextControls.classList.add('show');
				strap_text.visible = true

				textCustomization(customText.value, 0, 0, 0)
			}
		})
	}

	const textScale = document.querySelector('#text-scale')
	textScale.addEventListener('change', TextHandling);

	const texthPosition = document.querySelector('#text-h-position')
	texthPosition.addEventListener('change', TextHandling);

	const textvPosition = document.querySelector('#text-v-position')
	textvPosition.addEventListener('change', TextHandling);

	function TextHandling() {
		if (customText.value) {
			textCustomization(customText.value, textvPosition.value, texthPosition.value, textScale.value);
		}
	}

	function textCustomization(text, v, h,) {

		const textCanvas = document.createElement("canvas")
		let textCTX = textCanvas.getContext('2d')
		const textTexture = new THREE.CanvasTexture(textCanvas);
		textCanvas.width = 264
		textCanvas.height = 151

		textTexture.flipY = false
		//logoTexture.center.x = 0.5
		// logoTexture.center.y = 0.5
		// textTexture.repeat.set(1, 1);
		//texture.rotation = 1.57

		//#region 
		// const imageRatio = logoImage.height / logoImage.width
		// if (imageRatio > 1) {

		// 	logoCanvas.height = logoImage.height;
		// 	logoCanvas.width = (logoImage.width * imageRatio);
		// 	// console.log("1")

		// } else if (imageRatio < 1) {
		// 	// Here image width  is higher than image Height

		// 	logoCanvas.height = (logoImage.height * (logoImage.width / logoImage.height))
		// 	logoCanvas.width = logoImage.width;
		// 	// console.log("2")

		// } else {
		// 	if (logoImage.height > logo.material.map.image.height) {
		// 		logoCanvas.height = logoImage.height;
		// 		logoCanvas.width = logoImage.width;
		// 		// console.log("3")
		// 	}else{
		// 		logoCanvas.height = 500;
		// 		logoCanvas.width = 500;
		// 		// console.log("4")
		// 	}
		// }
		//#endregion


		// let x = textCanvas.width / 2 - logoImage.width / 2;
		// let y = textCanvas.height / 2 - logoImage.height / 2;

		if (initialAssignmentText == false) {
			texthPosition.min = -(textCanvas.height / 2);
			texthPosition.max = (textCanvas.height / 2);
			texthPosition.value = 0

			textvPosition.min = -(textCanvas.width / 2);
			textvPosition.max = (textCanvas.width / 2);
			textvPosition.value = 0
			initialAssignmentText = true
		}


		textCTX.translate(v, h);


		//Bebas Neue
		let fontSize = textScale.value
		console.log(fontSize)
		textCTX.font = `900  ${fontSize}px Arial`;
		textCTX.fillStyle = "white";
		textCTX.textAlign = "center";
		textCTX.fillText(text, textCanvas.width / 2, textCanvas.height / 2 + fontSize / 2);



		strap_text.material.map = textTexture;
		// strap_text.material.needsUpdate = true;


		render();



	}
	//#endregion

	//#region RENDER
	function resizeRendererToDisplaySize(renderer) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		// console.log(width, ' client width')
		const height = canvas.clientHeight;
		// console.log(height, ' client height')
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}
	// console.log(renderer)
	let renderRequested = false;

	function render() {
		renderRequested = undefined;

		if (resizeRendererToDisplaySize(renderer)) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}
		// console.log(camera.position)

		controls.update();
		renderer.render(scene, camera);
	}
	render();


	function requestRenderIfNotRequested() {
		if (!renderRequested) {
			renderRequested = true;
			requestAnimationFrame(render);
		}
	}

	controls.addEventListener('change', requestRenderIfNotRequested);
	window.addEventListener('resize', requestRenderIfNotRequested);
	//#endregion

	//#region ScreenShot
	const btnCamera = document.querySelector('#btn-camera');
	btnCamera.addEventListener('click', () => {

		const screeshot = new ScreenShot(renderer, cameraBack, canvas, scene, document, render)
		screeshot.Capture();

	});
	//#endregion
	
	const btnReset = document.querySelector('#btn-reset');
	btnReset.addEventListener('click', () => {
		modals[2].classList.add('show-modal');
		modals[2].firstElementChild.classList.add('show-modalContainer');
	});

	const btnAddToCart = document.querySelector('#btn-add-to-cart');
	btnAddToCart.addEventListener('click', () => {

		modals[3].classList.add('show-modal');
		modals[3].firstElementChild.classList.add('show-modalContainer');

		const screenshotFront = new ScreenShot(renderer, cameraFront, canvas, scene, document, render)
		screenshotFront.preview(document.querySelector('#front-preview'))

		const screenshotBack = new ScreenShot(renderer, cameraBack, canvas, scene, document, render)
		screenshotBack.preview(document.querySelector('#back-preview'))


	});

	const sltSize = document.querySelector('#slt-size');
	const iptQuantity = document.querySelector('#ipt-quantity');
	const orderSheet = document.querySelector('#order-sheet');
	const btnAdd = document.querySelector('#btn-add');

	btnAdd.addEventListener('click', () => {

		if (iptQuantity.value || iptQuantity.value > 0) {


			let updated = false
			Array.from(orderSheet.children).forEach(element => {

				if (element.children[0].textContent == sltSize.value) {
					element.children[1].children[1].value = parseInt(element.children[1].children[1].value) + parseInt(iptQuantity.value)
					updated = true
				}
			});


			if (!updated) {

				const tr = document.createElement('tr')
				const td1 = document.createElement('td')
				td1.textContent = sltSize.value
				tr.appendChild(td1)

				const td2 = document.createElement('td')

				const btndecrease = document.createElement('button')
				btndecrease.classList.add('btn-quantity-change')
				btndecrease.classList.add('btnQuantityDecrease')
				btndecrease.innerText = '-'
				td2.appendChild(btndecrease)

				const input = document.createElement('input')
				input.setAttribute('min', '1')
				input.setAttribute('max', '100')
				input.setAttribute('type', 'number')
				input.classList.add('item-quantity')
				input.value = iptQuantity.value
				td2.appendChild(input)

				const btnIncrease = document.createElement('button')
				btnIncrease.classList.add('btn-quantity-change')
				btnIncrease.classList.add('btnQuantityIncrease')
				btnIncrease.innerText = '+'

				td2.appendChild(btnIncrease)
				tr.appendChild(td2)

				const td3 = document.createElement('td')
				td3.classList.add('right-text')
				td3.innerHTML = `<svg data-button="remove" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" ><path data-button="remove" d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"/></svg>`
				tr.appendChild(td3)

				orderSheet.appendChild(tr)
			}


			OrderProcessing();
			OrderSummary();
		}

	})

	orderSheet.addEventListener('click', (e) => {
		if (e.target.dataset.button === 'remove' && e.target.tagName === 'svg') {
			e.target.parentElement.parentElement.remove()
		} else if (e.target.dataset.button === 'remove' && e.target.tagName === 'path') {
			e.target.parentElement.parentElement.parentElement.remove()
		}
		OrderProcessing();
		OrderSummary();
		
	})

	function OrderProcessing() {


		const btnQuantityIncrease = document.querySelectorAll('.btnQuantityIncrease')
		const btnQuantityDecrease = document.querySelectorAll('.btnQuantityDecrease')

		btnQuantityIncrease.forEach(button => {
			button.addEventListener('click', (e) => {
				e.stopImmediatePropagation()
				if (e.target.classList.contains('btnQuantityIncrease')) {
					e.target.previousElementSibling.stepUp();
					OrderSummary()
				}
			})
		});
		btnQuantityDecrease.forEach(button => {
			button.addEventListener('click', (e) => {
				e.stopImmediatePropagation()
				if (e.target.classList.contains('btnQuantityDecrease')) {
					e.target.nextElementSibling.stepDown();
					OrderSummary()
				}
			})
		});
		if (orderSheet.children.length > 0) {
			btnCartFinalize.disabled = false
		}else{
			btnCartFinalize.disabled = true
			
		}
	}

	function OrderSummary() {
		const orderSummaryQuantity = document.querySelector('#order-summary-quantity')
		const orderSummaryPrice = document.querySelector('#order-summary-price')
		const orderSummaryTotal = document.querySelector('#order-summary-total')

		let totalQuantity = 0;
		let price = 0;
		Array.from(orderSheet.children).forEach(tr => {
			const quantity = parseInt(tr.children[1].children[1].value);
			totalQuantity += quantity;
		});

		if (totalQuantity >= 1 && totalQuantity < 5) {
			price = 40
		} else if (totalQuantity >= 5 && totalQuantity < 10) {
			price = 38
		} else if (totalQuantity >= 10 && totalQuantity < 15) {
			price = 36
		}

		orderSummaryQuantity.children[0].textContent = 'Total Quantity'
		orderSummaryQuantity.children[1].textContent = totalQuantity

		orderSummaryPrice.children[0].textContent = 'Price'
		orderSummaryPrice.children[1].textContent = price

		orderSummaryTotal.children[0].textContent = 'Total Amount'
		orderSummaryTotal.children[1].textContent = totalQuantity * price



	}
	
	const btnCartFinalize = document.querySelector('#btn-cart-finalize')
	btnCartFinalize.addEventListener('click', async (e) => {
		e.preventDefault()

		const orderSummary = document.querySelector('#order-summary')

		const cart = {}
		cart.id = '';
		cart.model = document.querySelector('#model-name').textContent
		
		
		const sizes = {}
		Array.from(orderSheet.children).forEach(tr => {
			sizes[tr.children[0].textContent] = tr.children[1].children[1].value
		});

		cart.sizes = sizes;
		cart.totalQuantity = orderSummary.children[0].children[1].textContent
		cart.price = orderSummary.children[1].children[1].textContent
		cart.amount = orderSummary.children[2].children[1].textContent

		const customization = {};
		
		customization['punch_zone'] = punch_zone.material.color.getHexString()
		customization['palm'] = palm.material.color.getHexString()
		customization['palmProtector'] = palmProtector.material.color.getHexString()
		customization['strap'] = strap.material.color.getHexString()
		customization['gusset'] = gusset.material.color.getHexString()
		customization['finger_small'] = finger_small.material.color.getHexString()
		customization['finger_ring'] = finger_ring.material.color.getHexString()
		customization['finger_middle'] = finger_middle.material.color.getHexString()
		customization['finger_index'] = finger_index.material.color.getHexString()
		
		// Backhand Customization for Cart
		if (backhand.material.map) {			
			if (backhand.material.map.image instanceof ImageBitmap) {
				customization['backhand'] = 'default'
			}else if (backhand.material.map.image.currentSrc.includes('blob')) {
				customization['backhand'] = textureImagePreview.src;
			}else if(backhand.material.map.image.currentSrc.includes('http')){
				customization['backhand'] = backhand.material.map.image.currentSrc;
			}
			
		}else{
			customization['backhand'] = backhand.material.color.getHexString();
		}

		// Logo Customization for Cart
		if (logo.visible) {			
			customization['logo'] = logoImagePreview.src		
		}else{
			customization['logo'] = 'default'
		}

		// Glove Preview 
		cart.frontPreview = document.querySelector('#front-preview').src;
		cart.backPreview = document.querySelector('#back-preview').src;
		
		cart.customization = customization

		console.log(cart);

		try {
			const res = await fetch('/add-to-cart', {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify({ cart }),
			})

			const data = await res.json();
			// console.log(data)

			// if (data.errors) {}
			// if (data.user) { location.assign('/') }


		} catch (err) {
			console.log(err);
		}
	})
}

main();

class ScreenShot {
	constructor(renderer, camera, canvas, scene, document, callback) {
		this.renderer = renderer
		this.camera = camera
		this.canvas = canvas
		this.callback = callback
		this.document = document
		this.scene = scene
		this.imageholder = null;
	}

	init(){
		this.renderer.setSize(550, 750, false);
		this.camera.aspect = 550 / 750;
		this.camera.updateProjectionMatrix();
		this.renderer.render(this.scene, this.camera);
	}

	preview(imgtag){
		this.imageholder = imgtag
		this.init()

		this.canvas.toBlob((blob) => {

			const reader = new FileReader();
			reader.onloadend = (e) => {
				const image = new Image();
				image.src = reader.result;

				image.onload = () => {
					this.imageholder.src = image.src
					URL.revokeObjectURL(image.src);
				}
			}
			reader.readAsDataURL(blob);

		}, 'image/jpg', 0.80);
		this.callback();
	}

	Capture() {
		// this.renderer.setSize(550, 750, false);
		// this.camera.aspect = 550 / 750;
		// this.camera.updateProjectionMatrix();
		// this.renderer.render(this.scene, this.camera);
		this.init();

		this.canvas.toBlob((blob) => {
			this.SaveBlob(blob, `screencapture-${this.camera.aspect}.png`);
		});
		this.callback();
	}

	SaveBlob(blob, fileName) {
		const a = this.document.createElement('a');
		this.document.body.appendChild(a);
		a.style.display = 'none';
		const url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = fileName;
		a.click();

	}

}

// function wrapText(context, text, x, y, maxWidth, lineHeight) {
// 	var words = text.split(' ');
// 	var line = '';

// 	for (var n = 0; n < words.length; n++) {
// 		var testLine = line + words[n] + ' ';
// 		var metrics = context.measureText(testLine);
// 		var testWidth = metrics.width;
// 		if (testWidth > maxWidth && n > 0) {
// 			context.fillText(line, x, y);
// 			line = words[n] + ' ';
// 			y += lineHeight;
// 		}
// 		else {
// 			line = testLine;
// 		}
// 	}
// 	context.fillText(line, x, y);
// }
