<script lang="ts">
  import {loaded, data} from './store';
  import {link} from 'svelte-spa-router';
</script>

{#if $loaded}
<ul>
  {#each $data as item}
    <li><a href="/details/{item['ID']}" use:link>
      <div style="background-image:url(images/{item['Bild-1']});"></div>
      <p>{item['Name']}</p>
    </a></li>
  {/each}
</ul>
{/if}

<style>
  ul {
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    margin: 40px;
  }
  li {
    width: 20%;
  }
  li a{
    text-decoration: none;
    color: #222222;
  }
  li div {
    width: 100%;
    height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  li p {
    text-align:left;
    font-size:16px;
    font-weight:bold;
  }
</style>