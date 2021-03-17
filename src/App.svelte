<script>
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
  import Notifications from 'svelte-notifications'

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

<Notifications>
  <Router {routes} />
</Notifications>
