<script lang="ts">
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";
  import Input from "../../components/Input/Input.svelte";
  import { Label } from "flowbite-svelte";
  import Button from "../../components/Button/Button.svelte";
  import { z } from "zod";
  import { isAuthenticated } from "../../stores/auth";
  import http from "../../lib/http/http";
  import { setOperatorTokenCookie } from "../../utils/helperfunctions";

  const authError = writable("");
  const email = writable("");
  const password = writable("");
  const errors = writable<{ email?: string; password?: string }>({});
  let isLoading = false;

  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  });
  async function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading = true;
    authError.set("");
    errors.set({});
    const emailValue = $email;
    const passwordValue = $password;
    const result = loginSchema.safeParse({
      email: emailValue,
      password: passwordValue,
    });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      errors.set(fieldErrors);
      isLoading = false;
      return;
    }
    try {
      const response = await http.post("/api/public/login", {
        email: emailValue,
        password: passwordValue,
      });
      isLoading = false;
      if (response.status >= 200 && response.status < 300) {
        if (response.data.token) {
          setOperatorTokenCookie(response.data.token);
        }
        isAuthenticated.set(true);
        goto("/marketing");
      } else {
        authError.set("Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        authError.set(
          error.response.data?.error || `Login failed: ${error.response.status}`
        );
      } else {
        authError.set("An error occurred while logging in");
      }
      isLoading = false;
    }
  }
</script>

<div
  class="min-h-screen flex items-center justify-center bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-3xl w-full flex gap-12 items-center">
    <div class="flex-1 w-full space-y-6 bg-white p-10 rounded-2xl">
    

      <form class="space-y-6" on:submit={handleSubmit}>
        <div class="space-y-5">
          <div>
            <div class="mb-6">
              <Label for="email" class="block mb-2">Email address</Label>
              <Input
                className="font-normal text-sm text-gray-500"
                size="full"
                id="email"
                placeholder="Enter your email"
                bind:value={$email}
              />
              {#if $errors.email}
                <p class="text-red-500 text-sm mt-1">{$errors.email}</p>
              {/if}
            </div>
          </div>

          <div>
            <div class="mb-6">
              <Label for="password" class="block mb-2">Password</Label>
              <Input
                className="font-normal text-sm text-gray-500"
                size="full"
                id="password"
                placeholder="**********"
                bind:value={$password}
                type="password"
              />
              {#if $errors.password}
                <p class="text-red-500 text-sm mt-1">{$errors.password}</p>
              {/if}
            </div>
          </div>
        </div>

      

        {#if $authError}
          <p class="text-sm text-red-600 bg-red-50 p-3 rounded-md" role="alert">
            {$authError}
          </p>
        {/if}

        <div class="space-y-4">
          <Button
            class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            size="xl"
            type="submit">{isLoading ? "Loading ..." : "Sign in"}</Button
          >

        </div>
      </form>
    </div>

   
  </div>
</div>

<style>
  :global(body) {
    background-color: #f8fafc;
  }
</style>
