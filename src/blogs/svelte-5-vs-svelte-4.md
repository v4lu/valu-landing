---
title: Svelte 5 Runes A New Era of Reactivity
date: '09.10.2024'
desc: 'Exploring Svelte 5 runes and how they compare to Svelte 4 syntax'
cover: '/cover/svelte-cover.webp'
---

# Intro

Svelte 5 introduces a powerful new feature called "runes," which revolutionizes how we handle reactivity in our applications. In this post, we'll explore the key runes and compare them with their Svelte 4 equivalents.

## What are Runes?

Runes are special symbols that provide instructions to the Svelte compiler. They allow for more fine-grained control over reactivity and can be used both in Svelte components and in regular JavaScript modules.

Let's dive into the main runes and see how they compare to Svelte 4 syntax.

## $state: Declaring Reactive State

**Svelte 4**

```javascript
<script>
let count = 0;
</script>

<button on:click={() => count++}>
  Clicks: {count}
</button>
```

**Svelte 5**

```javascript
<script>
let count = $state(0);
</script>

<button on:click={() => count++}>
  Clicks: {count}
</button>
```

In Svelte 5, we explicitly declare reactive state using `$state`. This makes the intent clearer and allows for reactive state outside of components.

## $derived: Computed Values

**Svelte 4**

```javascript
<script>
let count = 0;
$: doubled = count * 2;
</script>

<p>{count} doubled is {doubled}</p>
```

**Svelte 5**

```javascript
<script>
let count = $state(0);
let doubled = $derived(count * 2);
</script>

<p>{count} doubled is {doubled}</p>
```

`$derived` replaces the `$:` reactive declarations for computed values. It's more explicit and can be used in any JavaScript context.

## $effect: Side Effects

**Svelte 4**

```javascript
<script>
let count = 0;

$: {
  console.log(`The count is ${count}`);
}
</script>
```

**Svelte 5**

```javascript
<script>
let count = $state(0);

$effect(() => {
  console.log(`The count is ${count}`);
});
</script>
```

`$effect` replaces reactive statements that cause side effects. It's clearer in intent and provides more control over when the effect runs.

## $props: Declaring Component Props

**Svelte 4**

```javascript
<script>
export let name;
export let greeting = "Hello";
</script>

<p>{greeting}, {name}!</p>
```

**Svelte 5**

```javascript
<script>
let { name, greeting = "Hello" } = $props();
</script>

<p>{greeting}, {name}!</p>
```

`$props` provides a more familiar destructuring syntax for declaring props, replacing the `export let` syntax.

## Event Handlers

Event handlers have been given a facelift in Svelte 5. Instead of using the `on:` directive, they are now properties like any other:

**Svelte 4**

```javascript
<script>
let count = 0;
</script>

<button on:click={() => count++}>
  clicks: {count}
</button>
```

**Svelte 5**

```javascript
<script>
let count = $state(0);
</script>

<button onclick={() => count++}>
  clicks: {count}
</button>
```

You can also use the normal shorthand syntax:

```javascript
<script>
let count = $state(0);

function onclick() {
  count++;
}
</script>

<button {onclick}>
  clicks: {count}
</button>
```

### Component Events

In Svelte 5, instead of using `createEventDispatcher`, components should accept callback props:

```javascript
<script>
import Pump from './Pump.svelte';

let size = $state(15);
let burst = $state(false);

function reset() {
  size = 15;
  burst = false;
}
</script>

<Pump
  inflate={(power) => {
    size += power;
    if (size > 75) burst = true;
  }}
  deflate={(power) => {
    if (size > 0) size -= power;
  }}
/>

{#if burst}
  <button onclick={reset}>new balloon</button>
  <span class="boom">💥</span>
{:else}
  <span class="balloon" style="scale: {0.01 * size}">
    🎈
  </span>
{/if}
```

### Bubbling Events

To 'forward' events, components should accept an `onclick` callback prop:

```javascript
<script>
let { onclick, children } = $props();
</script>

<button {onclick}>
  {@render children()}
</button>
```

### Event Modifiers

Event modifiers like `once` and `preventDefault` are no longer used with the `on:` directive. Instead, you can create wrapper functions:

```javascript
<script>
function once(fn) {
  return function (event) {
    if (fn) fn.call(this, event);
    fn = null;
  };
}

function preventDefault(fn) {
  return function (event) {
    event.preventDefault();
    fn.call(this, event);
  };
}
</script>

<button onclick={once(preventDefault(handler))}>...</button>
```

For the `capture` modifier, add it to the event name:

```javascript
<button onclickcapture={...}>...</button>
```

## Conclusion

Svelte 5 runes and the new event handling system offer a more explicit and powerful way to handle reactivity and events in your applications. They provide clearer intent, work outside of components, and offer more fine-grained control over how and when reactivity occurs.

While it may take some time to adjust to the new syntax, the benefits in terms of clarity and flexibility are significant. As you start using Svelte 5, experiment with these runes and new event handling techniques to discover how they can improve your code structure and reactivity management.

Remember, Svelte 5 is still in development, so syntax and features may change. Always refer to the official Svelte documentation for the most up-to-date information.

Happy coding with Svelte 5 runes and events!
