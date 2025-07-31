<script>
  import Facebook from "../../assets/images/Facebook.png";
  import Instagram from "../../assets/images/Instagram.png";
  import Reddit from "../../assets/images/Reddit.png";
  import TicketLink from "../../assets/images/Ticket Link.png";
  import TikTok from "../../assets/images/TikTok.png";
  import Twitter from "../../assets/images/Twitter.png";
  import { redirect } from "@sveltejs/kit";
  import { Card, Toast } from "flowbite-svelte";
  import { onMount } from "svelte";
  import Button from "../../components/Button/Button.svelte";
  import copyicon from "../../assets/icons/copy.png";
  import { goto } from "$app/navigation";

  let platforms = [
    { name: "Twitter", logo: Twitter },
    { name: "Instagram", logo: Instagram },
    { name: "Facebook", logo: Facebook },
    { name: "Reddit", logo: Reddit },
    { name: "TikTok", logo: TikTok },
    { name: "Ticket Link", logo: TicketLink },
  ];

  export let data;
  let showToast = false;
  let toastMessage = "";
  let toastTimeout;

  // Check if user has token, if not redirect to login
  let token = data.token;
  if (!token) {
    goto("/login")
  }

  let eventData = data.eventData;
  let platformTexts = {};
  let isLoading = true;
  let error = null;

  // Generate title slug for URL
  function generateTitleSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Generate marketing message for each platform
  function generatePlatformText(platform) {
    if (!eventData) return "";

    const eventTitle = eventData.title;
    const venueName = eventData.venue?.name || "Bar Lubitsch";
    const doorsOpenTime = new Date(eventData.doorsOpenTime);
    const eventId = eventData.ID;

    // Format the date as "Friday 7/28"
    const doorsOpenDateStr = doorsOpenTime.toLocaleDateString("en-US", {
      weekday: "long",
      month: "numeric",
      day: "numeric",
    });

    // Generate the proper URL format
    const titleSlug = generateTitleSlug(eventTitle);
    const ticketUrl = `https://get-micdrop.com/e/${eventId}/${titleSlug}`;

    let message = "";

    switch (platform) {
      case "Twitter":
        message = `Friday ${doorsOpenDateStr} @${venueName.replace(/\s+/g, "")}\n\nThe Friday Night Comedy Show\n\n@KingKightlinger\n@uiugswggweg\n@AmberSmelson\n@thecomedybureau\n@anothercomic\n@jsdnvosdn90\n@89jnsdusd\n@tommyb839f\n\nTickets: ${ticketUrl}`;
        break;
      case "Instagram":
        message = `Friday ${doorsOpenDateStr} @${venueName.replace(/\s+/g, "")}\n\nThe Friday Night Comedy Show\n\n@IGname1\n@DGndiog\n@comicnamenumber3\n@thecomedybureau\n\nTickets: ${ticketUrl}`;
        break;
      case "Facebook":
        message = `Friday ${doorsOpenDateStr} at ${venueName}\n\nThe Friday Night Comedy Show\n\nMake your Sunday sweet with a powerful and flavorful mix of seasoned veteran comedians of all genres. You've seen them on Def Comedy Jam, The Late Show, Conan, Comedy Central, HBO, Showtime and now you can see them live in person. Don't miss this incredible lineup of comedy legends!\n\nTickets: ${ticketUrl}`;
        break;
      case "Reddit":
        message = `Friday ${doorsOpenDateStr} at ${venueName}\n\nThe Friday Night Comedy Show\n\nMake your Sunday sweet with a powerful and flavorful mix of seasoned veteran comedians of all genres. You've seen them on Def Comedy Jam, The Late Show, Conan, Comedy Central, HBO, Showtime and now you can see them live in person. Don't miss this incredible lineup of comedy legends!\n\nTickets: ${ticketUrl}`;
        break;
      case "TikTok":
        message = `Friday ${doorsOpenDateStr} @${venueName.replace(/\s+/g, "")}\n\nThe Friday Night Comedy Show\n\n@KingKightlinger\n@uiugswggweg\n@AmberSmelson\n@thecomedybureau\n@anothercomic\n@jsdnvosdn90\n@89jnsdusd\n@tommyb839f\n\nTickets: ${ticketUrl}`;
        break;
      case "Ticket Link":
        message = ticketUrl;
        break;
      default:
        message = `${eventTitle} at ${venueName}\n\n${doorsOpenDateStr}\n\nTickets: ${ticketUrl}`;
    }

    return message;
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  function copyPlatformText(platform) {
    let text = platformTexts[platform];
    copyToClipboard(text);
    toastMessage = `${platform} text copied to clipboard`;
    showToast = true;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      showToast = false;
    }, 3000); 
  }

  

  onMount(() => {
    if (eventData) {
      platforms.forEach((platform) => {
        platformTexts[platform.name] = generatePlatformText(platform.name);
      });
      isLoading = false;
    } else {
      error = "Failed to load event data";
      isLoading = false;
    }
  });
</script>

{#if showToast}
  <div class="fixed top-3 left-1/2 transform -translate-x-1/2 z-50">
    <Toast class="!p-1 !bg-green-100 !text-green-700 !text-xs shadow-md rounded-md">
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4 text-green-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" class=" hidden md:block" />
        </svg>
        <span>{toastMessage}</span>
      </div>
    </Toast>
  </div>
{/if}


{#if data.marketingAccessSocialMediaPosts}
  {#if isLoading}
    <div class="flex items-center justify-center min-h-screen">
      <Card size="md">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Loading...</h2>
        <p class="text-gray-600">Loading event data...</p>
      </Card>
    </div>
  {:else if error}
    <div class="flex items-center justify-center min-h-screen">
      <Card size="md">
        <h2 class="text-xl font-semibold text-red-600 mb-4">Error</h2>
        <p class="text-gray-600">{error}</p>
        <Button class="mt-4" on:click={() => window.location.reload()}
          >Retry</Button
        >
      </Card>
    </div>
  {:else if eventData}
    <div class="p-6">
      <div class="flex items-start justify-start">
        <h1 class="text-[20px] font-normal text-black mb-5">Promotion</h1>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {#each platforms as platform}
          <Card size="md" class="h-full shadow-md">
            <div class="flex justify-between items-center mb-5">
              <div class="flex items-center">
                <img
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  class="w-[34px] h-[34px] mr-2"
                />
              </div>
              <Button
                strokebtn
                size="xs"
                on:click={() => {
                  copyPlatformText(platform.name);
                }}
              >
                <img
                  src={copyicon}
                  alt={`${copyicon} logo`}
                  class="w-[16px] h-[16px] mr-2"
                />
                <span class="text-[#0284FE]">Copy</span>
              </Button>
            </div>

            <h2 class="text-black text-[16px] mb-5 font-semibold">
              {platform.name}
            </h2>
            <div class="space-y-5 h-80 overflow-y-auto thick-scrollbar">
              <p
                class="text-[#666C79] text-[14px] whitespace-pre-line leading-relaxed"
              >
                {platformTexts[platform.name]}
              </p>
            </div>
          </Card>
        {/each}
      </div>
    </div>
  {:else}
    <div class="flex items-center justify-center min-h-screen">
      <Card size="md">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">No Event Data</h2>
        <p class="text-gray-600">No event data available.</p>
      </Card>
    </div>
  {/if}
{:else}
  <div class="flex items-center justify-center min-h-screen">
    <Card size="md">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Access Denied</h2>
      <p class="text-gray-600">
        You don't have permission to access marketing features.
      </p>
    </Card>
  </div>
{/if}
