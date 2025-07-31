<section class="w-screen min-h-screen bg-gray-300 flex">
  <div class="card bg-white p-4 shadow rounded-xl">
    <slot />
  </div>
</section>

<style lang="css">
  .card {
    margin: auto;
    width: 90%;
    min-height: 50%;
    margin: 5rem auto;
  }
</style>
