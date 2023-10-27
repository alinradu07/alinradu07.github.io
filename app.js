const planPrice = {
	monthly: {
		arcade: 9,
		advanced: 12,
		pro: 15
	},
	yearly: {
		arcade: 90,
		advanced: 120,
		pro: 150
	}
};

const addonsPrice = {
	addonMonthly: {
		onlineService: 1,
		largerStorage: 2,
		customizableProfile: 2
	},
	addonYearly: {
		onlineService: 10,
		largerStorage: 20,
		customizableProfile: 20
	}
};

const { monthly } = planPrice;
const { addonMonthly } = addonsPrice;
const { yearly } = planPrice;
const { addonYearly } = addonsPrice;

// Navigation Progress
let progress = 0;
let plan = 'monthly';
let currentPlan = 'arcade';
let currentPlanPrice = 9;
let selectedAddons = [];

const backBtn = document.querySelector('.back');
const nextBtn = document.querySelector('.next');
const confirmBtn = document.querySelector('.confirm');

const tab = document.getElementsByClassName('tab');
const progressStep = document.querySelectorAll('.progress');
const validateInput = document.querySelectorAll('.validateInput');
const invalidText = document.querySelectorAll('.invalid');

// Navigation Progress

// Price Toggle
const monthlySub = document.querySelector('.monthly');
const yearlySub = document.querySelector('.yearly');

const arcadePrice = document.getElementById('arcade-price');
const advancedPrice = document.getElementById('advanced-price');
const proPrice = document.getElementById('pro-price');

const toggle = document.querySelector('.toggle');
const onlinePrice = document.getElementById('online-price');

const storagePrice = document.getElementById('storage-price');

const customPrice = document.getElementById('custom-price');

const freeMonths = document.querySelectorAll('.free');

const checkboxes = document.querySelectorAll('.checkboxes');
const choice = document.querySelectorAll('.pick-choice');

const summaryContainer = document.querySelector('.summary-container');
const selectedPlan = document.getElementById('selected-plan');
const selectedPlanPrice = document.getElementById('selected-plan-price');
const total = document.getElementById('total');
const totalPrice = document.getElementById('total-price');

// Navigation Progress
function next(step) {
	if (progress === tab.length - 1) return false;
	if (progress === 0 && !valid()) return false;
	let currentStep = step + progress;

	progress = currentStep;
	stepIndication(progress);
}

function back(step) {
	if (progress === 0) return false;
	if (progress === tab.length - 1) document.querySelectorAll('.dynamic').forEach((elem) => elem.remove());
	currentStep = step + progress;

	progress = currentStep;
	stepIndication(progress);
}

function stepIndication(n) {
	if (n > 0) backBtn.style.visibility = 'visible';
	else backBtn.style.visibility = 'hidden';

	if (n === tab.length - 1) {
		nextBtn.style.display = 'none';
		confirmBtn.style.display = 'block';
		summaryView();
	} else {
		nextBtn.style.display = 'block';
		confirmBtn.style.display = 'none';
	}

	for (let i = 0; i < tab.length; i++) {
		tab[i].classList.remove('active');
		progressStep[i].classList.add('hide');
	}
	tab[n].classList.add('active');
	progressStep[n].classList.remove('hide');
}
// Navigation Progress

// Toggle
toggle.addEventListener('click', () => {
	//plan is Global variable
	const result = toggle.classList.toggle('active');

	plan = result ? 'yearly' : 'monthly';
	subscription();
});
// Toggle

// Subscription
const subscription = () => {
	userPlanPrice();
	totalAddons();
	if (plan === 'monthly') {
		// Step 2 - Select Plan
		arcadePrice.innerText = `$${monthly.arcade}/mo`;
		advancedPrice.innerText = `$${monthly.advanced}/mo`;
		proPrice.innerText = `$${monthly.pro}/mo`;
		// Step 2 - Select Plan

		// Step 3 - Add-Ons
		onlinePrice.innerText = `$${addonMonthly.onlineService}/mo`;
		storagePrice.innerText = `$${addonMonthly.largerStorage}/mo`;
		customPrice.innerText = `$${addonMonthly.customizableProfile}/mo`;
		// Step 3 - Add-Ons

		monthlySub.classList.add('active-subscription');
		yearlySub.classList.remove('active-subscription');
		for (const element of freeMonths) {
			element.style.display = 'none';
		}
	} else {
		// Step 2 - Select Plan
		arcadePrice.innerText = `$${yearly.arcade}/yr`;
		advancedPrice.innerText = `$${yearly.advanced}/yr`;
		proPrice.innerText = `$${yearly.pro}/yr`;
		// Step 2 - Select Plan

		// Step 3 - Add-Ons
		onlinePrice.innerText = `$${addonYearly.onlineService}/yr`;
		storagePrice.innerText = `$${addonYearly.largerStorage}/yr`;
		customPrice.innerText = `$${addonYearly.customizableProfile}/yr`;
		// Step 3 - Add-Ons

		monthlySub.classList.remove('active-subscription');
		yearlySub.classList.add('active-subscription');
		for (const element of freeMonths) {
			element.style.display = 'block';
		}
	}
};

// Price Select Plan
const userPlanPrice = () => {
	if (plan === 'monthly') {
		arcadeValue = monthly.arcade;
		advancedValue = monthly.advanced;
		proValue = monthly.pro;
	} else {
		arcadeValue = yearly.arcade;
		advancedValue = yearly.advanced;
		proValue = yearly.pro;
	}
	if (currentPlan === 'arcade') currentPlanPrice = arcadeValue;
	else if (currentPlan === 'advanced') currentPlanPrice = advancedValue;
	else if (currentPlan === 'pro') currentPlanPrice = proValue;
	// currentPlanPrice is Global variable
};

const radioButton = (selectedRadio) => {
	// currentPlan is Global variable
	currentPlan = selectedRadio;
	userPlanPrice();
};
// Price Select Plan

// Subscription

// Total Price Add-Ons and Custom Style
const pickedAddons = () => {
	// Style
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			choice[i].classList.add('active-plan');
		} else choice[i].classList.remove('active-plan');
	}
	// Style
	totalAddons();
};
// Total Price Add-Ons

const totalAddons = () => {
	if (plan === 'monthly') {
		onlineValue = addonMonthly.onlineService;
		largerValue = addonMonthly.largerStorage;
		customValue = addonMonthly.customizableProfile;
	} else {
		onlineValue = addonYearly.onlineService;
		largerValue = addonYearly.largerStorage;
		customValue = addonYearly.customizableProfile;
	}
	selectedAddons = [];

	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			selectedAddons.push({
				addon: checkboxes[i].value,
				price:
					checkboxes[i].value === 'onlineService'
						? onlineValue
						: checkboxes[i].value === 'largerStorage' ? largerValue : customValue
			});
		}
	}

	//  if (selectedAddons.length === 0) selectedAddons = 'No add-ons';
};

// Validations
const valid = () => {
	let valid = true;
	for (let i = 0; i < validateInput.length; i++) {
		if (validateInput[i].value.length === 0) {
			validateInput[i].classList.add('invalid-input');
			invalidText[i].classList.remove('hide-message');
			valid = false;
		} else invalidText[i].classList.add('hide-message');
	}
	return valid;
};

function hideInvalidMessage(currentElement) {
	currentElement.classList.remove('invalid-input');
	currentElement.previousElementSibling.lastElementChild.classList.add('hide-message');
}
// Validations

//Change Summary
const change = () => {
	console.log('change');
};
const confirm = () => {
	console.log('confirm');
};

const summaryView = () => {
	let totalAddonsPrice = 0;
	selectedPlan.innerText = `${currentPlan === 'arcade' ? 'Arcade' : currentPlan === 'advanced' ? 'Advanced' : 'Pro'}`;
	selectedPlanPrice.innerText = `$${currentPlanPrice}/${plan === 'monthly' ? 'mo' : 'yr'}`;
	if (selectedAddons.length === 0) {
		selectedAddons = [
			{
				addon: 'No Add-ons',
				price: 0
			}
		];
		for (const elem of selectedAddons) {
			const flexDiv = document.createElement('div');
			flexDiv.classList.add('summary-flex', 'dynamic');

			const textParagh = document.createElement('p');
			textParagh.innerText = `${elem.addon}`;

			const textPrice = document.createElement('p');
			textPrice.innerText = `$${elem.price}`;

			flexDiv.appendChild(textParagh);
			flexDiv.appendChild(textPrice);

			summaryContainer.appendChild(flexDiv);
		}
	} else {
		for (const elem of selectedAddons) {
			const flexDiv = document.createElement('div');
			flexDiv.classList.add('summary-flex', 'dynamic');

			const textParagh = document.createElement('p');
			textParagh.innerText = `${elem.addon === 'onlineService'
				? 'Online Service'
				: elem.addon === 'largerStorage' ? 'Larger Storage' : 'Customizable Profile'}`;

			const textPrice = document.createElement('p');
			textPrice.innerText = `+$${elem.price}/${plan === 'monthly' ? 'mo' : 'yr'}`;

			flexDiv.appendChild(textParagh);
			flexDiv.appendChild(textPrice);

			summaryContainer.appendChild(flexDiv);
			totalAddonsPrice += elem.price;
		}
	}
	total.innerText = `Total (per ${plan === 'monthly' ? 'month' : 'year'})`;
	totalPrice.innerText = `+$${currentPlanPrice + totalAddonsPrice}/${plan === 'monthly' ? 'mo' : 'yr'}`;
};

//Change Summary
