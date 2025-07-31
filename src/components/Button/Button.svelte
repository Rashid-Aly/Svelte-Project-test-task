<script>
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

  export let alert = false;
  export let danger = false;
  export let disabled = false;
  export let deemphasized = false;
  export let lightbtn = false;
  export let strokebtn = false;
  export let textBtn = false;
  export let beforeIcon = null;
  export let afterIcon = null;
  export let className = "";
  export let size = "";
  export let ScheduledBtn = false;
  let xs = false;
  let sm = false;
  let lg = false;
  let xl = false;

  $: isDisabled = disabled ? "cursor-not-allowed btn-disabled" : "";

  $: sizeClass = (() => {
    switch (size) {
      case "full":
        return "w-full";
      case "xl":
        return "px-6 py-3 text-base";
      case "lg":
        return "px-4 py-2 text-base";
      case "sm":
        return "px-3 py-2 leading-4 rounded-md";
      case "xs":
        return "px-2.5 py-1.5 text-xs rounded";
      default:
        return "";
    }
  })();
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<button
  class={classNames(
    "cursor-pointer px-3 py-3",
    "inline-flex items-center",
    "rounded-lg shadow-sm",
    "focus:outline-none no-focus-ring",
    "flex justify-center",
    sizeClass,
    xs ? "px-2.5 py-1.5 text-xs rounded" : "",
    sm ? "px-3 py-2 leading-4 rounded-md" : "",
    lg ? "px-4 py-2 text-base" : "",
    xl ? "px-6 py-3 text-base" : "",
    alert
      ? strokebtn
        ? "btn-alert-stroke"
        : "btn-alert"
      : strokebtn
        ? "btn-default-stroke"
        : "btn-default",
    deemphasized
      ? strokebtn
        ? "btn-deEmphasized-outline"
        : "btn-deEmphasized"
      : strokebtn
        ? "btn-default-outline"
        : "btn-default",
    lightbtn
      ? strokebtn
        ? "btn-light-outline"
        : "btn-light"
      : strokebtn
        ? "btn-default-outline"
        : "btn-default",
    danger ? (strokebtn ? "btn-danger-stroke" : "btn-danger") : "",
    alert && danger && deemphasized
      ? strokebtn
        ? "btn-alert btn-deEmphasized-outline btn-danger-outline"
        : "btn-alert btn-deEmphasized btn-danger"
      : "",
    isDisabled,
    strokebtn
      ? "btn-text-style-outline"
      : ScheduledBtn
        ? "scheduledBtn-text-style"
        : "btn-text-style",
    textBtn ? "btn-text" : "",
    ScheduledBtn ? "scheduledBtn" : "",
    className
  )}
  {disabled}
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  {...$$restProps}
>
  {#if beforeIcon}
    <img src={beforeIcon} alt="Before Icon here" class="mr-2" />
  {/if}
  <slot />
  {#if afterIcon}
    <img src={afterIcon} alt="After Icon here" class="ml-2" />
  {/if}
</button>

<style>
  .btn-default {
    background-color: #0284fe;
  }
  .btn-default:hover {
    background-color: #369dfe;
  }
  .btn-default:active {
    background-color: #026acb;
  }
  .btn-default-stroke {
    color: var(--Text-Primary, #0d1526);
    border-radius: var(--8, 8px);
    border: 1px solid var(--Stroke-Primary, #d4d6d9);
  }
  .btn-default-stroke:hover {
    border: 1px solid var(--Stroke-Primary, #d4d6d9);
    background: var(--BG-Secondary, #f7f7f8);
  }
  .btn-default-stroke:active {
    border: 1px solid var(--Stroke-Primary, #d4d6d9);
    background: var(--BG-Tartiary, #efeff1);
  }
  .btn-alert {
    border-radius: var(--8, 8px);
    background: var(--Accent-Warning, #ff922e);
  }
  .btn-alert:hover {
    background: linear-gradient(
        0deg,
        var(--neutral-white-20, rgba(255, 255, 255, 0.2)) 0%,
        var(--neutral-white-20, rgba(255, 255, 255, 0.2)) 100%
      ),
      var(--Accent-Warning, #ff922e);
  }
  .btn-alert:active {
    background: linear-gradient(
        0deg,
        var(--neutral-black-20, rgba(0, 0, 0, 0.2)) 0%,
        var(--neutral-black-20, rgba(0, 0, 0, 0.2)) 100%
      ),
      var(--Accent-Warning, #ff922e);
  }
  .btn-alert-stroke {
    color: var(--Accent-Warning, #ff922e);
    border-radius: var(--8, 8px);
    border: 1px solid var(--Stroke-Primary, #d4d6d9);
  }
  .btn-alert-stroke:hover {
    background: var(--BG-Secondary, #f7f7f8);
  }
  .btn-alert-stroke:active {
    background: linear-gradient(
        0deg,
        var(--Accent-Warning-2, rgba(255, 146, 46, 0.15)) 0%,
        var(--Accent-Warning-2, rgba(255, 146, 46, 0.15)) 100%
      ),
      var(--BG-Primary, #fff);
  }
  .scheduledBtn {
    background-color: rgba(2, 132, 254, 0.15);
    height: 34px;
  }
  .scheduledBtn:hover {
    background-color: rgba(2, 132, 254, 0.3);
  }
  .scheduledBtn:active {
    background-color: rgba(2, 132, 254, 0.6);
  }
  .scheduledBtn-text-style {
    color: #0284fe;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
  }
  .btn-danger {
    border-radius: 8px;
    background: #f66;
  }
  .btn-danger:hover {
    background: linear-gradient(
        0deg,
        var(--neutral-white-20, rgba(255, 255, 255, 0.2)) 0%,
        var(--neutral-white-20, rgba(255, 255, 255, 0.2)) 100%
      ),
      var(--Accent-Danger, #f66);
  }
  .btn-danger:active {
    background: linear-gradient(
        0deg,
        var(--neutral-black-20, rgba(0, 0, 0, 0.2)) 0%,
        var(--neutral-black-20, rgba(0, 0, 0, 0.2)) 100%
      ),
      var(--Accent-Danger, #f66);
  }
  .btn-danger-stroke {
    color: var(--Accent-Danger, #f66);
    border-radius: var(--8, 8px);
    border: 1px solid var(--Stroke-Primary, #d4d6d9);
  }
  .btn-danger-stroke:hover {
    border-radius: var(--8, 8px);
    border: 1px solid var(--Stroke-Primary, #d4d6d9);
    background: var(--BG-Secondary, #f7f7f8);
  }
  .btn-danger-stroke:active {
    border-radius: var(--8, 8px);
    border: 1px solid var(--Stroke-Primary, #d4d6d9);
    background: linear-gradient(
        0deg,
        var(--accent-danger-15, rgba(255, 102, 102, 0.15)) 0%,
        var(--accent-danger-15, rgba(255, 102, 102, 0.15)) 100%
      ),
      var(--BG-Primary, #fff);
  }
  .btn-disabled {
    cursor: not-allowed;
    border-radius: var(--8, 8px);
    background: var(--Stroke-Primary, #d4d6d9);
  }
  .btn-disabled:hover {
    cursor: not-allowed;
    border-radius: var(--8, 8px);
    background: var(--Stroke-Primary, #d4d6d9);
  }
  .btn-deEmphasized {
    border-radius: var(--8, 8px);
    background: var(--BG-Quaternary, #e6e7e9);
  }
  .btn-deEmphasized:hover {
    background: linear-gradient(
        0deg,
        var(--nuetral-white-20, rgba(255, 255, 255, 0.2)) 0%,
        var(--nuetral-white-20, rgba(255, 255, 255, 0.2)) 100%
      ),
      var(--BG-Quaternary, #e6e7e9);
  }
  .btn-deEmphasized:active {
    background: linear-gradient(
        0deg,
        var(--neutral-black-20, rgba(0, 0, 0, 0.2)) 0%,
        var(--neutral-black-20, rgba(0, 0, 0, 0.2)) 100%
      ),
      var(--BG-Quaternary, #e6e7e9);
  }
  .btn-light {
    border-radius: var(--9999, 9999px);
    background: var(--brand-primary-15, rgba(2, 132, 254, 0.15));
  }
  .btn-light:hover {
    background: var(--Brand-Primary, #0284fe);
  }
  .btn-light:active {
    background: linear-gradient(
        0deg,
        var(--nuetral-black-20, rgba(0, 0, 0, 0.2)) 0%,
        var(--nuetral-black-20, rgba(0, 0, 0, 0.2)) 100%
      ),
      var(--Brand-Primary, #0284fe);
  }

  .no-focus-ring:focus {
    outline: none;
    box-shadow: none;
  }
  .btn-text-style {
    color: var(--Text-White, #fff);
    text-align: center;

    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
  }
  .btn-text-style-outline {
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
  }
  .btn-deEmphasized {
    color: var(--Text-Tertiary, #666c79);
  }
  .btn-text {
    background: none;
    border: none;
    color: var(--Text-Primary, #0d1526);
  }
  .btn-text:hover {
    background: none;
    border: none;
    color: var(--Text-Primary, #0d1526);
  }
  .btn-text:active {
    background: none;
    border: none;
    color: var(--Text-Primary, #0d1526);
  }

  @media only screen and (max-width: 768px) {
    .scheduledBtn-text-style {
      font-size: 10px;
      font-weight: 500;
      line-height: 13px;
    }

    .scheduledBtn {
      padding: 2px;
      height: 20px;
    }
  }
</style>
