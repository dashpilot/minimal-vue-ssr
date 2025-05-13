<template>
	<div>
		<Header :title="headerTitle" />
		<main>
			<section class="contact-hero">
				<div class="container">
					<h2>Contact Us</h2>
					<p class="subtitle">{{ message }}</p>
				</div>
			</section>

			<section class="contact-content">
				<div class="container two-column">
					<div class="contact-info">
						<h3>Get in Touch</h3>
						<div class="info-item">
							<strong>Email:</strong>
							<p>hello@example.com</p>
						</div>
						<div class="info-item">
							<strong>Phone:</strong>
							<p>+1 (555) 123-4567</p>
						</div>
						<div class="info-item">
							<strong>Address:</strong>
							<p>123 Web Dev Lane<br />Tech City, WD 98765</p>
						</div>
						<div class="social-links">
							<a href="#" class="social-link">Twitter</a>
							<a href="#" class="social-link">LinkedIn</a>
							<a href="#" class="social-link">GitHub</a>
						</div>
					</div>

					<div class="contact-form">
						<h3>Send us a Message</h3>
						<form @submit.prevent="handleSubmit">
							<div class="form-group">
								<label for="name">Name</label>
								<input type="text" id="name" v-model="form.name" required />
							</div>
							<div class="form-group">
								<label for="email">Email</label>
								<input type="email" id="email" v-model="form.email" required />
							</div>
							<div class="form-group">
								<label for="subject">Subject</label>
								<input type="text" id="subject" v-model="form.subject" />
							</div>
							<div class="form-group">
								<label for="message">Message</label>
								<textarea id="message" v-model="form.message" rows="5" required></textarea>
							</div>
							<button type="submit" class="btn btn-full">Send Message</button>
						</form>
						<div v-if="formSubmitted" class="form-success">
							Your message has been sent! We'll get back to you soon.
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Header from '../components/Header.vue';

const headerTitle = ref('Contact Us');
const message = ref("We'd love to hear from you");
const formSubmitted = ref(false);

const form = reactive({
	name: '',
	email: '',
	subject: '',
	message: ''
});

const handleSubmit = () => {
	// In a real app, you would send this data to your server
	console.log('Form submitted:', form);

	// Show success message
	formSubmitted.value = true;

	// Reset form
	form.name = '';
	form.email = '';
	form.subject = '';
	form.message = '';

	// Hide success message after 5 seconds
	setTimeout(() => {
		formSubmitted.value = false;
	}, 5000);
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

/* Contact hero section */
.contact-hero {
	background-color: #f8f9fa;
	text-align: center;
	padding: 5rem 0;
}

.contact-hero h2 {
	font-size: 2.5rem;
	margin-bottom: 1rem;
	font-weight: 700;
	color: #444;
}

.subtitle {
	font-size: 1.25rem;
	max-width: 800px;
	margin: 0 auto;
	color: #666;
}

/* Contact content section */
.contact-content {
	background-color: white;
}

.two-column {
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 3rem;
}

@media (max-width: 768px) {
	.two-column {
		grid-template-columns: 1fr;
	}
}

h3 {
	font-size: 1.5rem;
	margin-bottom: 1.5rem;
	color: #333;
}

/* Contact info styles */
.contact-info {
	background-color: #f8f9fa;
	padding: 2rem;
	border-radius: 8px;
}

.info-item {
	margin-bottom: 1.5rem;
}

.info-item strong {
	display: block;
	font-size: 1.1rem;
	margin-bottom: 0.5rem;
	color: #6c5ce7;
}

.info-item p {
	margin: 0;
	color: #555;
}

.social-links {
	margin-top: 2rem;
	display: flex;
	gap: 1rem;
}

.social-link {
	color: #6c5ce7;
	text-decoration: none;
	transition: color 0.2s;
}

.social-link:hover {
	color: #5b4ad5;
	text-decoration: underline;
}

/* Contact form styles */
.contact-form {
	background-color: white;
}

.form-group {
	margin-bottom: 1.5rem;
}

label {
	display: block;
	margin-bottom: 0.5rem;
	font-weight: 500;
	color: #444;
}

input,
textarea {
	width: 100%;
	padding: 0.75rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-family: inherit;
	font-size: 1rem;
	transition: border-color 0.2s;
}

input:focus,
textarea:focus {
	outline: none;
	border-color: #6c5ce7;
}

.btn {
	display: inline-block;
	background-color: #6c5ce7;
	color: white;
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 4px;
	text-decoration: none;
	font-weight: 500;
	transition: all 0.2s ease;
	cursor: pointer;
	font-size: 1rem;
}

.btn:hover {
	background-color: #5b4ad5;
	transform: translateY(-2px);
}

.btn-full {
	width: 100%;
}

.form-success {
	margin-top: 1.5rem;
	padding: 1rem;
	background-color: #d4edda;
	color: #155724;
	border-radius: 4px;
	text-align: center;
}
</style>
