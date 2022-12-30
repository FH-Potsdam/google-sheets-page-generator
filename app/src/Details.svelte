<script type="typescript">
  import {link} from 'svelte-spa-router';
  export let params: {id?: string} = {};
  import {loaded, data} from './store';
  $:item = $loaded && params.id ? $data.filter(d => d['ID'] === params.id)  : null;
</script>

<a class="backlink" href="/list" use:link>zurück</a>
{#if $loaded && item && item.length === 1}
  <h1>{item[0]['Name']}</h1>
  <h2>{item[0]['Stichworte']}</h2>
  <p>{item[0]['Kurzbeschreibung']}</p>
  <ul>
  {#each Array(4) as _, i}
    {#if item[0]['Bild-' + (i + 1)] && item[0]['Bild-' + (i + 1)].length > 0}
    <li><img src="{item[0]['Bild-' + (i + 1)]}" alt="" /></li>
    {/if}
  {/each}
  </ul>
  <p class="source">Quelle: <a href="{item[0]['Url']}">{item[0]['Url'].substring(0, 50)}{#if item[0]['Url'].length > 50}...{/if}</a></p>
  <p class="author">Autor*in: {item[0]['Autor*in']}</p>
{/if}

<style>
  .backlink {
    display: inline-block;
    padding: 3px 5px;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.1);
    color: #222222;
    margin: 50px auto 20px auto;
  }
  .backlink:hover {
    color: rgba(255, 255, 255, 0.9);
    background-color: #222222;
  }
  h1, h2 {
    text-align:center;
  }
  h1, h2, p{
    width: 90%;
    max-width: 600px;
  }
  ul, li {
    list-style: none;
    margin:0;
    padding:0;
  }
  img {
    max-width: 100%;
    max-height: 600px;
    margin: 20px auto;
  }
</style>