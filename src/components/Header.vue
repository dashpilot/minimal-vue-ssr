<template>
	<header>
		<div class="header-container">
			<nav>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/about">About</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script setup>
// Define props using defineProps
const props = defineProps({
	title: {
		type: String,
		default: 'My Vue SSR App'
	}
});
</script>

<style scoped>
header {
	background-color: #6c5ce7;
	color: white;
	padding: 2rem 0;
}

.header-container {
	max-width: 1200px;
	margin: 0 auto;
	text-align: center;
}

h1 {
	margin: 0;
	padding: 0;
	font-size: 2rem;
	font-weight: 600;
	letter-spacing: -0.5px;
}

nav {
	margin-top: 0;
}

ul {
	display: flex;
	list-style: none;
	padding: 0;
	margin: 0;
	justify-content: center;
	gap: 2rem;
}

li {
	margin: 0;
	padding: 0;
}

a {
	color: white;
	text-decoration: none;
	font-weight: 500;
	transition: opacity 0.2s;
}

a:hover {
	opacity: 0.8;
}
</style>
