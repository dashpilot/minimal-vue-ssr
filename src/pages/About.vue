<template>
	<div>
		<Header :title="headerTitle" />
		<main>
			<section class="about-hero">
				<div class="container">
					<h2>About Us</h2>
					<p class="subtitle">Learn more about our team and mission</p>
				</div>
			</section>

			<section class="about-content">
				<div class="container two-column">
					<div class="text-column">
						<h3>Our Story</h3>
						<p>
							We are a team of passionate developers and designers dedicated to creating beautiful
							and functional digital experiences.
						</p>
						<p>
							Founded in 2023, our company has been at the forefront of web development innovation,
							helping businesses and individuals bring their digital visions to life.
						</p>
						<p>{{ message }}</p>
						<a href="/contact" class="btn">Get in touch</a>
					</div>
					<div class="image-column">
						<div class="placeholder-image">
							<span>Team Image</span>
						</div>
					</div>
				</div>
			</section>

			<section class="team-values">
				<div class="container">
					<h3 class="section-title">Our Values</h3>
					<div class="values-grid">
						<div class="value-card">
							<h4>Quality</h4>
							<p>
								We never compromise on the quality of our work, ensuring that every project meets
								the highest standards.
							</p>
						</div>
						<div class="value-card">
							<h4>Innovation</h4>
							<p>
								We embrace new technologies and methodologies to deliver cutting-edge solutions.
							</p>
						</div>
						<div class="value-card">
							<h4>Collaboration</h4>
							<p>
								We believe in working closely with our clients to ensure their vision becomes
								reality.
							</p>
						</div>
						<div class="value-card">
							<h4>Integrity</h4>
							<p>We maintain transparency and honesty in all our dealings and relationships.</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';

const headerTitle = ref('About Us');
const message = ref(
	'Our team combines technical expertise with creative problem-solving to deliver exceptional results for our clients.'
);
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

/* About hero section */
.about-hero {
	background-color: #f8f9fa;
	text-align: center;
	padding: 5rem 0;
}

.about-hero h2 {
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

/* About content section */
.about-content {
	background-color: white;
}

.two-column {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 3rem;
	align-items: center;
}

@media (max-width: 768px) {
	.two-column {
		grid-template-columns: 1fr;
	}

	.image-column {
		order: -1;
		margin-bottom: 2rem;
	}
}

.text-column h3 {
	font-size: 1.75rem;
	margin-bottom: 1.5rem;
	color: #333;
}

.text-column p {
	margin-bottom: 1.25rem;
	color: #555;
}

.image-column {
	display: flex;
	justify-content: center;
}

.placeholder-image {
	background-color: #ddd;
	border-radius: 8px;
	width: 100%;
	height: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #999;
	font-size: 1.25rem;
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
	margin-top: 1rem;
}

.btn:hover {
	background-color: #5b4ad5;
	transform: translateY(-2px);
}

/* Team values section */
.team-values {
	background-color: #f8f9fa;
}

.section-title {
	text-align: center;
	font-size: 1.75rem;
	margin-bottom: 3rem;
	color: #333;
}

.values-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 2rem;
}

.value-card {
	background-color: white;
	border-radius: 8px;
	padding: 1.5rem;
	box-shadow:
		0 4px 6px rgba(0, 0, 0, 0.05),
		0 1px 3px rgba(0, 0, 0, 0.1);
	text-align: center;
}

.value-card h4 {
	font-size: 1.25rem;
	margin-bottom: 1rem;
	color: #6c5ce7;
}

.value-card p {
	color: #666;
}
</style>
