<script lang="ts">
    let { spell } = $props() as { spell: Spell }
</script>

<article>
    <h1>{spell.name}</h1>
    <p>{spell.description}</p>
</article>