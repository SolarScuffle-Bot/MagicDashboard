<script lang="ts">
    import svelteLogo from "./assets/svelte.svg";
    import viteLogo from "/vite.svg";
    import * as Types from "./types.svelte";
    import CounterComponent from "./lib/CounterComponent.svelte";
    import SpellComponent from "./lib/SpellComponent.svelte";

	const id = () => { return Math.floor(2^52 * Math.random()) }
	const color = (hue: number) => { return `hsv(${hue}, ${70}, ${75})` }

	let Imbues: Types.ImbueItem[] = $state([
		{
			id: id(),
			imbue: {
				type: Types.Imbue.Material,
				value: Types.Imbues.Material.Metal,
			},
		},
		{
			id: id(),
			imbue: {
				type: Types.Imbue.Shape,
				value: Types.Imbues.Shape.Cube,
			},
		},
		{
			id: id(),
			imbue: {
				type: Types.Imbue.Damage,
				value: Types.Imbues.Damage.Bludgeoning,
			},
		},
	])

	let Spells: Types.SpellItem[] = $state([
		{
			id: id(),
			spell: {
				name: 'Eldritch Blast',
				description: 'You instantly hurl a beam of {Material} in a line towards a target within 120ft dealing 1d10 of its associated damage type to whatever it hits before dissipating.',
				imbues: [
					{
						name: 'Material',
						type: Types.Imbue.Material,
						value: 2,
					},
				],
				consumables: [],
				cooldown: {
					uses: 6,
					usesLeft: 0,
					amount: 6,
					amountLeft: 0,
					unit: Types.TimeUnit.ShortRest,
				},
				color: color(289),
			},
		},
		{
			id: id(),
			spell: {
				name: 'Shield',
				description: 'You gain a flat, temporary AC boost until the start of your next turn.',
				imbues: [],
				consumables: [],
				cooldown: {
					uses: 1,
					usesLeft: 0,
					amount: 1,
					amountLeft: 0,
					unit: Types.TimeUnit.Turn,
				},
				color: color(175),
			}
		},
		{
			id: id(),
			spell: {
				name: 'Shield',
				description: 'You gain a flat, temporary AC boost until the start of your next turn.',
				imbues: [],
				consumables: [],
				cooldown: {
					uses: 1,
					usesLeft: 0,
					amount: 1,
					amountLeft: 0,
					unit: Types.TimeUnit.Turn,
				},
				color: color(175),
			}
		},
		{
			id: id(),
			spell: {
				name: 'Eldritch Blast',
				description: 'You instantly hurl a beam of {Material} in a line towards a target within 120ft dealing 1d10 of its associated damage type to whatever it hits before dissipating.',
				imbues: [
					{
						name: 'Material',
						type: Types.Imbue.Material,
						value: null,
					},
				],
				consumables: [],
				cooldown: {
					uses: 6,
					usesLeft: 0,
					amount: 6,
					amountLeft: 0,
					unit: Types.TimeUnit.ShortRest,
				},
				color: color(289),
			},
		},
		{
			id: id(),
			spell: {
				name: 'Eldritch Blast',
				description: 'You instantly hurl a beam of {Material} in a line towards a target within 120ft dealing 1d10 of its associated damage type to whatever it hits before dissipating.',
				imbues: [
					{
						name: 'Material',
						type: Types.Imbue.Material,
						value: 4,
					},
				],
				consumables: [],
				cooldown: {
					uses: 6,
					usesLeft: 0,
					amount: 6,
					amountLeft: 0,
					unit: Types.TimeUnit.ShortRest,
				},
				color: color(289),
			},
		},
	])
</script>

<header>

</header>

<main>
	<section
		id="imbues"
	>
		{#each Imbues as item}
			{#if item.imbue.value !== null}
				<button>{Types.GetName(item.imbue.type, item.imbue.value)}</button>
			{/if}
		{/each}
	</section>

	<section
		id="grid"
	>
		{#each Spells as item}
			<div class="no-select">
				<SpellComponent bind:spell={item.spell} onclick={() => {
					const cooldown = item.spell.cooldown
					if (cooldown.usesLeft < cooldown.uses) {
						cooldown.usesLeft++
					}

					if (cooldown.amountLeft === 0 && cooldown.usesLeft === cooldown.uses) {
						cooldown.amountLeft = cooldown.amount
					}
				}} />
			</div>
		{/each}

		<div class="no-select">
			<button
				style="
					width:100%;
					height:100%;
				"
				onclick={(e) => {
					Spells[Spells.length] = {
						id: id(),
						spell: {
							name: 'Cloned',
							description: 'You instantly hurl a beam of {Material} in a line towards a target within 120ft dealing 1d10 of its associated damage type to whatever it hits before dissipating.',
							imbues: [
								{
									name: 'Material',
									type: Types.Imbue.Material,
									value: undefined,
								},
							],
							consumables: [],
							cooldown: {
								uses: 6,
								usesLeft: 0,
								amount: 6,
								amountLeft: 0,
								unit: Types.TimeUnit.LongRest,
							},
							color: color(289),
						},
					}
				}}
			>
				+
			</button>
		</div>
	</section>
</main>

<footer>
	<section
		id="left"
		class="buttonContainer"
	>
		<button>Save As</button>
		<button>Load</button>
	</section>

	<section
		id="right"
		class="buttonContainer"
	>
		<button
			onclick={(e) => {
				for (const item of Spells) {
					const cooldown = item.spell.cooldown
					switch (cooldown.unit) {
						case Types.TimeUnit.Turn: cooldown.amountLeft = Math.max(0, cooldown.amountLeft - 1); break
					}
				}
			}}
		>
			End Turn
		</button>

		<button
			onclick={(e) => {
				for (const item of Spells) {
					const cooldown = item.spell.cooldown
					switch (cooldown.unit) {
						case Types.TimeUnit.Turn: cooldown.amountLeft = 0; break
						case Types.TimeUnit.ShortRest: cooldown.amountLeft = Math.max(0, cooldown.amountLeft - 1); break
					}
				}
			}}
		>
			Short Rest
		</button>

		<button
			onclick={(e) => {
				for (const item of Spells) {
					const cooldown = item.spell.cooldown
					switch (cooldown.unit) {
						case Types.TimeUnit.Turn: cooldown.amountLeft = 0; break
						case Types.TimeUnit.ShortRest: cooldown.amountLeft = 0; break
						case Types.TimeUnit.LongRest: cooldown.amountLeft = Math.max(0, cooldown.amountLeft - 1); break
					}
				}
			}}
		>
			Long Rest
		</button>
	</section>
</footer>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x:hidden;
	}

	.no-select {
		-webkit-touch-callout: none; /* iOS Safari */
			-webkit-user-select: none; /* Safari */
			-khtml-user-select: none; /* Konqueror HTML */
			-moz-user-select: none; /* Old versions of Firefox */
				-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
	}

	main {
		background-color: brown;
		width:100vw;
		display:flex;
		flex:content;
		flex-direction:row;
		justify-content:space-between;
	}

	#grid {
		background-color:aquamarine;
		width:50vw;

		max-height: 95vh;
		overflow-y: auto;

		display:flex;
		flex:content;
		flex-direction:row;
		flex-wrap:wrap;
		justify-content:left;

		padding: 0.5vmin;

		div {
			width: calc(25% - 1vmin);
			height: auto;
			margin: 0.5vmin;
		}
	}

	footer {
		background-color: brown;
		width:100%;
		height: 5vh;
		display:flex;
		flex:content;
		flex-direction:row;
		justify-content:space-between;

		position:fixed;
		left:0;
		bottom:0;
		margin-top: auto;
	}
</style>