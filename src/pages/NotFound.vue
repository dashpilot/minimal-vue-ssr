<template>
	<div>
		<Header :title="headerTitle" />
		<main>
			<section class="not-found">
				<div class="container">
					<div class="error-content">
						<div class="error-code">404</div>
						<h2>Page Not Found</h2>
						<p>{{ message }}</p>
						<a href="/" class="btn">Go Back Home</a>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';

const headerTitle = ref('404 - Not Found');
const message = ref(
	'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
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
	min-height: 70vh;
	display: flex;
	align-items: center;
}

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1.5rem;
}

/* Not Found styles */
.not-found {
	width: 100%;
	text-align: center;
	padding: 4rem 0;
}

.error-content {
	max-width: 600px;
	margin: 0 auto;
}

.error-code {
	font-size: 8rem;
	font-weight: 700;
	color: #6c5ce7;
	line-height: 1;
	margin-bottom: 1rem;
	opacity: 0.8;
}

h2 {
	font-size: 2.5rem;
	margin-bottom: 1rem;
	color: #444;
}

p {
	font-size: 1.1rem;
	color: #666;
	margin-bottom: 2rem;
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
</style>
