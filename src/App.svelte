<script>
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
  // import '../node_modules/materialize-css/dist/css/materialize.min.css'
  // import '../node_modules/materialize-css/dist/js/materialize.min.js'
</script>

<style global lang="postcss">
  /* only apply purgecss on utilities, per Tailwind docs */
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;
</style>

<Router {routes} />
