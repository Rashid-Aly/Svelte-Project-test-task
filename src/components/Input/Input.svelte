<script>
  export let required = false;
  export let disabled = false;
  export let optional = false;
  export let icon = null;
  export let buttonIcon = null;
  export let buttonText = null;
  export let maxlength = null;
  export let minlength = null;
  export let type = "text";
  export let placeholder = "";
  export let label = "";
  export let id = "";
  export let name = "";
  export let className = "";
  export let size = "";
  export let errorText = ""; 
  export let helperText = ""; 
  export let hintText = ""; 
  export let hintIcon = "";
  export let contentFloat = "left";
  export let readonly = false;
  export let controlled = false;
  export let onButtonClick = null;
  export let value = ""; 

  $: value = inputValue;
  let inputValue = value;
  let touched = false;
  let displayErrorText = "";

  const handleInput = (event) => {
    inputValue = event.target.value;
    let rawInput = inputValue;

    if (type === "creditCardNumber") {
      rawInput = inputValue.replace(/\D/g, "");
      inputValue = formatCreditCardNumber(rawInput);
      event.target.value = inputValue;
    }

    if (type === "phoneNumber") {
      rawInput = inputValue.replace(/\D/g, "");
      inputValue = formatPhoneNumber(rawInput);
      event.target.value = inputValue;
    }

    if (type === "email") {
      if (!isValidEmail(inputValue)) {
        displayErrorText = errorText;
      } else {
        displayErrorText = "";
      }
    }

    if (minlength !== null && rawInput.length < minlength) {
      displayErrorText = errorText;
    } else {
      displayErrorText = "";
    }

    if (required && !inputValue.trim()) {
      displayErrorText = "This field is required.";
    } else {
      displayErrorText = "";
    }
  };

  const formatCreditCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatPhoneNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    let formattedValue = "";
    if (cleanedValue.length > 0) {
      formattedValue += cleanedValue.substring(0, 3);
    }
    if (cleanedValue.length >= 4) {
      formattedValue += "-" + cleanedValue.substring(3, 6);
    }
    if (cleanedValue.length >= 7) {
      formattedValue += "-" + cleanedValue.substring(6, 10);
    }
    return formattedValue;
  };

  const handleBlur = () => {
    touched = true;

    if (required && !inputValue.trim()) {
      displayErrorText = "This field is required.";
    } else if (type === "email" && !isValidEmail(inputValue)) {
      displayErrorText = errorText;
    } else if (minlength !== null && inputValue.length < minlength) {
      displayErrorText = errorText;
    } else {
      displayErrorText = "";
    }
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const getSizeClass = () => {
    switch (size) {
      case "full":
        return "w-full";
      case "large":
        return "w-96";
      case "medium":
        return "w-64";
      case "small":
        return "w-52";
      default:
        return "w-44";
    }
  };

  const getContentFloatClass = () => {
    switch (contentFloat) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const handleButtonClick = () => {
    if (typeof onButtonClick === "function") {
      onButtonClick(inputValue);
    } else {
      console.log("Button clicked, input value:", inputValue);
    }
  };
</script>

<div class="flex flex-col gap-3 {className}">
  {#if label}
    <div class="flex justify-start items-center gap-1">
      <label
        for={id}
        class="text-Text-Primary text-sm not-italic leading-[14px] font-medium"
        >{label}</label
      >
      {#if optional}
        <span class="text-Text-Tartiary">(optional)</span>
      {/if}
    </div>
  {/if}
  <div class="relative {getSizeClass()}">
    {#if type === "textarea"}
      <textarea
        {id}
        {name}
        {placeholder}
        value={inputValue}
        on:input={handleInput}
        on:blur={handleBlur}
        {maxlength}
        {minlength}
        class="py-3 px-4 text-Text-Tartiary font-medium text-sm leading-3 border rounded-md focus:outline-none focus:ring-2 focus:border-blue-500 hover:border-blue-500 resize-y {getContentFloatClass()} {displayErrorText
          ? 'border-[#f66]'
          : 'border-gray-300'} {getSizeClass()} {className}"
        required={false}
        {disabled}
        {readonly}
        rows="4"
        aria-required={required}
      ></textarea>
    {:else}
      <div class="flex items-center">
        <input
          {id}
          type={type}
          {name}
          {placeholder}
          value={inputValue}
          on:input={handleInput}
          on:blur={handleBlur}
          {maxlength}
          {minlength}
          class="p-4 bg-gray-50 text-Text-Tartiary font-medium text-sm leading-3 border rounded-md focus:outline-none focus:ring-2 focus:border-blue-500 hover:border-blue-500 {icon
            ? 'pr-10'
            : ''} {getContentFloatClass()} {displayErrorText
            ? 'border-[#f66]'
            : 'border-gray-300'} {getSizeClass()} {className}"
          required={false}
          {disabled}
          {readonly}
          aria-required={required}
        />
        {#if controlled && (buttonIcon || buttonText)}
          <button
            type="button"
            on:click={handleButtonClick}
            class="absolute inset-y-0 right-0 gap-1 flex items-center justify-center px-4 {helperText ||
            hintText ||
            displayErrorText
              ? 'mb-7'
              : ''}"
          >
            {#if buttonIcon}
              <img src={buttonIcon} alt="Button Icon" class="w-5 h-5" />
            {/if}
            {#if buttonText}
              <span class="text-sm font-normal text-brand-Primary"
                >{buttonText}</span
              >
            {/if}
          </button>
        {/if}
      </div>
    {/if}

    {#if displayErrorText && touched}
      <p class="mt-2 text-accent-Danger text-sm">
        {displayErrorText}
      </p>
    {:else if hintText}
      <div class="mt-2 flex items-center text-Text-Tartiary opacity-65 text-sm">
        {#if hintIcon}
          <img src={hintIcon} alt="Hint icon" class="w-4 h-4 mr-2" />
        {/if}
        <span>{hintText}</span>
      </div>
    {:else if helperText}
      <p class="mt-2 text-Text-Tartiary opacity-65 text-sm">
        {helperText}
      </p>
    {/if}

    {#if icon && type !== "textarea"}
      <img
        src={icon}
        alt="Input icon"
        class="absolute inset-y-0 right-0 w-5 h-5 mr-3 top-1/2 transform -translate-y-1/2 text-Text-Primary"
      />
    {/if}
  </div>
</div>
