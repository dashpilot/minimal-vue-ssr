<template>
	<div :class="{ 'dark-theme': isDarkTheme }">
		<Header :title="headerTitle" />
		<main>
			<section class="hero">
				<div class="container">
					<h2>{{ heading }}</h2>
					<p class="subtitle">{{ message }}</p>

					<!-- Interactive Counter Example -->
					<div class="interactive-demo">
						<div class="counter-box">
							<button @click="decrementCount" class="counter-btn">-</button>
							<span class="counter-value">{{ count }}</span>
							<button @click="incrementCount" class="counter-btn">+</button>
						</div>
						<p class="counter-text">
							This counter demonstrates client-side interactivity: {{ countMessage }}
						</p>
					</div>

					<!-- Theme Toggle Example -->
					<div class="theme-toggle">
						<label class="switch">
							<input type="checkbox" v-model="isDarkTheme" />
							<span class="slider"></span>
						</label>
						<span>Toggle {{ isDarkTheme ? 'Light' : 'Dark' }} Theme</span>
					</div>
				</div>
			</section>

			<section class="services">
				<div class="container">
					<h2 class="section-title">Our Services</h2>
					<p class="section-subtitle">We offer a wide range of services to meet your needs</p>

					<div class="service-grid">
						<div
							class="service-card"
							v-for="(service, index) in services"
							:key="index"
							@mouseenter="service.isHovered = true"
							@mouseleave="service.isHovered = false"
							:class="{ 'card-hovered': service.isHovered }"
						>
							<div class="service-image">
								<div class="placeholder-image" :class="{ 'image-hovered': service.isHovered }">
									<span class="service-label">{{ service.title }}</span>
								</div>
							</div>
							<h3>{{ service.title }}</h3>
							<p>{{ service.description }}</p>
							<button class="learn-more-btn" @click="showServiceDetails(index)">Learn More</button>
						</div>
					</div>
				</div>
			</section>

			<!-- Service Details Modal -->
			<div class="modal" v-if="showModal" @click="closeModal">
				<div class="modal-content" @click.stop>
					<button class="close-btn" @click="closeModal">×</button>
					<h3>{{ selectedService?.title }}</h3>
					<div class="modal-body">
						<p>{{ selectedService?.description }}</p>
						<p class="modal-details">{{ selectedService?.detailedDescription }}</p>
						<ul class="feature-list">
							<li v-for="(feature, i) in selectedService?.features" :key="i">
								{{ feature }}
							</li>
						</ul>
					</div>
				</div>
			</div>

			<section class="feature-section" ref="featureSection">
				<div class="container">
					<h2 class="section-title">Why Choose Us</h2>
					<div class="feature-grid">
						<div
							v-for="(feature, index) in features"
							:key="index"
							class="feature-item"
							:class="{ 'feature-visible': feature.visible }"
						>
							<div class="feature-highlight"></div>
							<h3>{{ feature.title }}</h3>
							<p>{{ feature.description }}</p>
						</div>
					</div>
				</div>
			</section>

			<section class="cta">
				<div class="container">
					<h2>Ready to get started?</h2>
					<p>Check out our other pages to learn more about our company.</p>
					<div class="cta-links">
						<a href="/about" class="btn">About Us</a>
						<a href="/contact" class="btn btn-outline">Contact Us</a>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue';

const headerTitle = ref('Vue 3 SSR Example');
const heading = ref('Welcome to Our SSR Website');
const message = ref('A powerful and minimal approach to server-side rendering with Vue 3');

// Counter example
const count = ref(0);
const incrementCount = () => count.value++;
const decrementCount = () => count.value--;
const countMessage = computed(() => {
	if (count.value === 0) return 'Try clicking the buttons!';
	if (count.value > 10) return "You're clicking a lot!";
	if (count.value < 0) return 'Going negative, are we?';
	return `Current count is ${count.value}`;
});

// Theme toggle
const isDarkTheme = ref(false);

// Services with hover state
const services = ref([
	{
		title: 'Web Development',
		description: 'Custom websites built with the latest technologies.',
		isHovered: false,
		detailedDescription:
			'Our web development services include full-stack development using modern frameworks and libraries. We build responsive, accessible, and performant websites tailored to your needs.',
		features: [
			'Responsive design for all devices',
			'SEO optimization',
			'Performance tuning',
			'Accessibility compliance',
			'Content management systems'
		]
	},
	{
		title: 'App Development',
		description: 'Mobile applications for iOS and Android platforms.',
		isHovered: false,
		detailedDescription:
			'We develop native and cross-platform mobile applications for iOS and Android. Our approach focuses on intuitive user experiences and reliable performance.',
		features: [
			'Native iOS development',
			'Native Android development',
			'Cross-platform solutions',
			'App store optimization',
			'Ongoing maintenance and support'
		]
	},
	{
		title: 'UI/UX Design',
		description: 'User-friendly interfaces that enhance the user experience.',
		isHovered: false,
		detailedDescription:
			'Our design process combines aesthetics with usability. We create interfaces that not only look good but also provide intuitive navigation and meaningful interactions.',
		features: [
			'User research and testing',
			'Wireframing and prototyping',
			'Visual design',
			'Interaction design',
			'Design systems'
		]
	}
]);

// Modal for service details
const showModal = ref(false);
const selectedService = ref(null);

const showServiceDetails = (index) => {
	selectedService.value = services.value[index];
	showModal.value = true;
	document.body.style.overflow = 'hidden';
};

const closeModal = () => {
	showModal.value = false;
	document.body.style.overflow = 'auto';
};

// Features with scroll animation
const features = ref([
	{
		title: 'Modern Tech Stack',
		description:
			'We use the latest technologies to build fast, reliable, and scalable applications.',
		visible: false
	},
	{
		title: 'Responsive Design',
		description: 'All our projects are fully responsive and work on any device or screen size.',
		visible: false
	},
	{
		title: 'SEO Optimization',
		description:
			'We ensure your website ranks well on search engines and attracts organic traffic.',
		visible: false
	},
	{
		title: 'Continuous Support',
		description: 'We provide ongoing maintenance and support for all our projects.',
		visible: false
	}
]);

const featureSection = ref(null);

let observer;
onMounted(() => {
	window.addEventListener('keydown', handleKeyDown);

	observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				features.value.forEach((feature, index) => {
					setTimeout(() => {
						feature.visible = true;
					}, index * 200);
				});
				observer.disconnect();
			}
		},
		{ threshold: 0.3 }
	);

	if (featureSection.value) {
		observer.observe(featureSection.value);
	}
});

onUnmounted(() => {
	window.removeEventListener('keydown', handleKeyDown);
	if (observer) {
		observer.disconnect();
	}
});

const handleKeyDown = (e) => {
	if (e.key === 'Escape' && showModal.value) {
		closeModal();
	}
};
</script>

<style scoped>
/* General styles */
main {
	font-family:
		-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;
	color: #333;
	line-height: 1.6;
}

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1.5rem;
}

section {
	padding: 4rem 0;
}

/* Dark theme with improved contrast */
.dark-theme {
	background-color: #121212;
	color: #f5f5f5;
}

.dark-theme .hero,
.dark-theme .feature-section,
.dark-theme .cta {
	background-color: #121212;
}

.dark-theme .services {
	background-color: #1e1e1e;
}

.dark-theme .section-title,
.dark-theme .hero h2,
.dark-theme .cta h2,
.dark-theme .theme-toggle,
.dark-theme .theme-toggle span {
	color: #ffffff;
}

.dark-theme .section-subtitle,
.dark-theme .subtitle,
.dark-theme .cta p,
.dark-theme .counter-text {
	color: #dddddd;
}

.dark-theme .service-card {
	background-color: #2d2d2d;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

.dark-theme .service-card h3 {
	color: #ffffff;
}

.dark-theme .service-card p,
.dark-theme .feature-item p {
	color: #dddddd;
}

.dark-theme .placeholder-image {
	background-color: #3d3d3d;
	color: #ffffff;
}

.dark-theme .counter-box {
	background-color: #2d2d2d;
}

.dark-theme .counter-btn {
	background-color: #6c5ce7;
}

.dark-theme .counter-value {
	color: #ffffff;
}

.dark-theme .learn-more-btn {
	border-color: #8a7cff;
	color: #8a7cff;
}

.dark-theme .learn-more-btn:hover {
	background-color: #8a7cff;
	color: #121212;
}

.dark-theme .btn-outline {
	border-color: #8a7cff;
	color: #8a7cff;
}

.dark-theme .modal-content {
	background-color: #2d2d2d;
	color: #ffffff;
}

.dark-theme .modal-content h3 {
	color: #ffffff;
}

.dark-theme .modal-content p,
.dark-theme .modal-content li {
	color: #dddddd;
}

.dark-theme .close-btn {
	color: #ffffff;
}

.dark-theme .close-btn:hover {
	background-color: #3d3d3d;
}

.dark-theme .feature-item {
	background-color: #2d2d2d;
}

.dark-theme .feature-item h3 {
	color: #ffffff;
}

.dark-theme .feature-highlight {
	background-color: #6c5ce7;
}

/* Hero section */
.hero {
	background-color: #f8f9fa;
	text-align: center;
	padding: 5rem 0;
	transition: background-color 0.3s;
}

.hero h2 {
	font-size: 2.5rem;
	margin-bottom: 1rem;
	font-weight: 700;
	color: #444;
	transition: color 0.3s;
}

.subtitle {
	font-size: 1.25rem;
	max-width: 800px;
	margin: 0 auto 2rem auto;
	color: #666;
	transition: color 0.3s;
}

/* Interactive Counter */
.interactive-demo {
	margin-top: 2rem;
	margin-bottom: 2rem;
}

.counter-box {
	display: inline-flex;
	align-items: center;
	background-color: #f1f1f1;
	border-radius: 50px;
	padding: 0.5rem;
	margin-bottom: 1rem;
	transition: background-color 0.3s;
}

.counter-btn {
	background-color: #6c5ce7;
	color: white;
	border: none;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	font-size: 1.25rem;
	cursor: pointer;
	transition: all 0.2s;
	display: flex;
	align-items: center;
	justify-content: center;
}

.counter-btn:hover {
	background-color: #5b4ad5;
	transform: scale(1.05);
}

.counter-btn:active {
	transform: scale(0.95);
}

.counter-value {
	font-size: 1.5rem;
	font-weight: bold;
	margin: 0 1.5rem;
	min-width: 3rem;
	text-align: center;
	transition: color 0.3s;
}

.counter-text {
	color: #666;
	transition: color 0.3s;
}

/* Theme Toggle */
.theme-toggle {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	margin-top: 2rem;
	transition: color 0.3s;
}

.theme-toggle span {
	transition: color 0.3s;
}

.switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
}

.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}

.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	transition: 0.4s;
	border-radius: 34px;
}

.slider:before {
	position: absolute;
	content: '';
	height: 26px;
	width: 26px;
	left: 4px;
	bottom: 4px;
	background-color: white;
	transition: 0.4s;
	border-radius: 50%;
}

input:checked + .slider {
	background-color: #6c5ce7;
}

input:checked + .slider:before {
	transform: translateX(26px);
}

/* Services section */
.services {
	background-color: white;
	transition: background-color 0.3s;
}

.section-title {
	text-align: center;
	font-size: 2rem;
	margin-bottom: 0.5rem;
	color: #333;
	transition: color 0.3s;
}

.section-subtitle {
	text-align: center;
	font-size: 1.1rem;
	color: #666;
	margin-bottom: 3rem;
	transition: color 0.3s;
}

.service-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 2rem;
}

.service-card {
	background-color: white;
	border-radius: 8px;
	padding: 1.5rem;
	box-shadow:
		0 4px 6px rgba(0, 0, 0, 0.05),
		0 1px 3px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
	transform-origin: center;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.card-hovered {
	transform: translateY(-10px);
	box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.service-image {
	margin-bottom: 1rem;
}

.placeholder-image {
	background-color: #ddd;
	border-radius: 8px;
	width: 100%;
	height: 160px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #555;
	margin-bottom: 1rem;
	transition: all 0.3s;
	position: relative;
	overflow: hidden;
	font-weight: bold;
}

.service-label {
	font-size: 1.2rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	transition: transform 0.3s;
}

.image-hovered {
	background-color: #6c5ce7;
	color: white;
}

.image-hovered .service-label {
	transform: scale(1.1);
}

.service-card h3 {
	font-size: 1.25rem;
	margin-bottom: 0.75rem;
	color: #333;
	transition: color 0.3s;
}

.service-card p {
	color: #666;
	line-height: 1.6;
	transition: color 0.3s;
	margin-bottom: 1rem;
}

.learn-more-btn {
	background-color: transparent;
	color: #6c5ce7;
	border: 1px solid #6c5ce7;
	border-radius: 4px;
	padding: 0.5rem 1rem;
	cursor: pointer;
	font-weight: 500;
	transition: all 0.2s;
	margin-top: auto;
}

.learn-more-btn:hover {
	background-color: #6c5ce7;
	color: white;
}

/* Modal styles */
.modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	animation: fadeIn 0.3s ease;
}

.modal-content {
	background-color: white;
	border-radius: 8px;
	max-width: 600px;
	width: 90%;
	max-height: 90vh;
	overflow-y: auto;
	padding: 2rem;
	position: relative;
	animation: scaleIn 0.3s ease;
	transition:
		background-color 0.3s,
		color 0.3s;
}

.close-btn {
	position: absolute;
	top: 1rem;
	right: 1rem;
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition:
		background-color 0.2s,
		color 0.3s;
}

.close-btn:hover {
	background-color: #f1f1f1;
}

.modal-body {
	margin-top: 1rem;
}

.modal-details {
	margin: 1rem 0;
}

.feature-list {
	padding-left: 1.5rem;
}

.feature-list li {
	margin-bottom: 0.5rem;
	transition: color 0.3s;
}

/* Feature section with animations */
.feature-section {
	background-color: #f8f9fa;
	transition: background-color 0.3s;
}

.feature-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 2rem;
	margin-top: 3rem;
}

.feature-item {
	text-align: center;
	opacity: 0;
	transform: translateY(20px);
	transition:
		opacity 0.5s,
		transform 0.5s,
		background-color 0.3s;
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
	background-color: white;
	position: relative;
	overflow: hidden;
}

.feature-visible {
	opacity: 1;
	transform: translateY(0);
}

.feature-highlight {
	height: 4px;
	width: 60px;
	background-color: #6c5ce7;
	margin: 0 auto 1.5rem;
	border-radius: 2px;
}

.feature-item h3 {
	font-size: 1.25rem;
	margin-bottom: 0.75rem;
	color: #333;
	transition: color 0.3s;
}

.feature-item p {
	color: #666;
	transition: color 0.3s;
}

/* CTA section */
.cta {
	background-color: #f8f9fa;
	text-align: center;
	padding: 5rem 0;
	transition: background-color 0.3s;
}

.cta h2 {
	font-size: 2rem;
	margin-bottom: 1rem;
	transition: color 0.3s;
}

.cta p {
	margin-bottom: 2rem;
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
	transition: color 0.3s;
}

.cta-links {
	display: flex;
	gap: 1rem;
	justify-content: center;
}

.btn {
	display: inline-block;
	background-color: #6c5ce7;
	color: white;
	padding: 0.75rem 1.5rem;
	border-radius: 4px;
	text-decoration: none;
	font-weight: 500;
	transition: all 0.2s ease;
}

.btn:hover {
	background-color: #5b4ad5;
	transform: translateY(-2px);
}

.btn-outline {
	background-color: transparent;
	color: #6c5ce7;
	border: 1px solid #6c5ce7;
}

.btn-outline:hover {
	background-color: #6c5ce7;
	color: white;
}

/* Animations */
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes scaleIn {
	from {
		transform: scale(0.9);
		opacity: 0;
	}
	to {
		transform: scale(1);
		opacity: 1;
	}
}

/* Media queries for responsive design */
@media (max-width: 768px) {
	.feature-grid,
	.service-grid {
		grid-template-columns: 1fr;
	}

	.counter-box {
		width: 100%;
		justify-content: center;
	}

	.cta-links {
		flex-direction: column;
		align-items: center;
	}
}
</style>
