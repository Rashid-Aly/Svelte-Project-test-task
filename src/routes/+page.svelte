<script>
  import { goto } from '$app/navigation';

  export let data;
  if(data.token) {
    goto('/marketing');
  } else {
    goto('/login');
  }
  console.log("Page data:", data);
</script>

<svelte:head>
  <title>MicDrop</title>
  <meta name="description" content="SvelteKit demo app" />
  l
</svelte:head>

<div class="flex items-center justify-center h-screen bg-white">
  <a
    href="/marketing"
    class="text-3xl text-blue-500 font-bold text-center hover:underline focus:outline-none flex items-center justify-center h-screen bg-white w-full"
  >
    Visit Marketing Page
  </a>
</div>
