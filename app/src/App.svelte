<script>
  import Router from 'svelte-spa-router';
	import List from './List.svelte';
	import Details from './Details.svelte';
	import NotFound from './NotFound.svelte';
	import {load, loaded} from './store';

	if (!$loaded) {
		load();
	}

  const routes = {
		'/': List,
		'/list': List,
		'/details/:id': Details,
		'/404': NotFound,
		'*': NotFound,
	};
</script>

<main>
  <Router {routes} />
</main>
