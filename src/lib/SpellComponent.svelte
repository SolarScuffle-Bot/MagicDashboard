<script lang="ts">
	import * as Types from "../types.svelte"
	import { flip } from "svelte/animate"
	import { dndzone } from "svelte-dnd-action"

	let { spell = $bindable(), onclick }: { spell: Types.Spell, onclick: () => void } = $props()

	const cooldown = spell.cooldown
	const barsLimit = 5

	$effect(() => {
		if (cooldown.amountLeft === 0) {
			cooldown.usesLeft = 0
		}
	})

	let disabled = $derived(cooldown.amountLeft !== 0)

	let usesText = $derived(() => {
		let prefix = "Uses: "
		if (cooldown.uses < barsLimit) {
			return (
				prefix +
				"⦿".repeat(cooldown.uses - cooldown.usesLeft) +
				"〇".repeat(cooldown.usesLeft)
			)
		} else {
			return (
				prefix +
				(cooldown.uses - cooldown.usesLeft).toString() +
				" / " +
				cooldown.uses.toString()
			)
		}
	})

	let cooldownText = $derived(() => {
		let prefix: string
		let suffix = ""
		switch (cooldown.unit) {
			case Types.TimeUnit.Turn: prefix = "Turns: "; break
			case Types.TimeUnit.ShortRest: prefix = "Short Rests: "; break
			case Types.TimeUnit.LongRest: prefix = "Long Rests: "; break
		}

		if (cooldown.amount < barsLimit) {
			return (
				prefix +
				"■".repeat(cooldown.amountLeft) +
				"□".repeat(cooldown.amount - cooldown.amountLeft) +
				suffix
			)
		} else {
			return (
				prefix +
				cooldown.amountLeft.toString() +
				" / " +
				cooldown.amount.toString() +
				suffix
			)
		}
	})

	let description = $derived(() => {
		let desc = spell.description
		for (const imbue of spell.imbues) {
			const search = '{' + imbue.name + '}'
			if (imbue.value === null) {
				desc = desc.replaceAll(search, '<b>' + search + '</b>')
			} else {
				desc = desc.replaceAll(search, '<b><u>' + Types.GetName(imbue.type, imbue.value) + '</u></b>')
			}
		}
		return desc
	})
</script>

<button
	onclick={onclick}
	class="card"
	class:active-hover={disabled}
	disabled={disabled}
>
	<article>
		<section>
			<h1>{spell.name}</h1>
			<p>{@html description()}</p>
			<p>{usesText()}</p>
			<p>{cooldownText()}</p>
		</section>

		{#if spell.imbues.length > 0}
			{#each spell.imbues as imbue, i}
				<div>
					<h1>{imbue.name}</h1>
					<div
						class="imbueSlot"
					>

					</div>
				</div>
			{/each}
		{/if}
	</article>
</button>

<style>
	.card {
		/* width: 25%; */
		width:100%;
		height:100%;
		display:block;
		/* background-color: #111;
		border-radius: 20px;
		color:aliceblue;
		font-family: 'inter';

		box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
		transition: all 0.1s ease-in-out; */
	}

	/* .active-hover:hover {
		box-shadow: rgba(0, 0, 0, 0.22) 0px 9px 21px;
		transform: translate3d(0px, -2px, 0px);
	}

	.active-hover:active {
		box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
		transform: translate3d(0px, 4px, 0px);
	}

	.imbueSlot {
		width: 12vmin;
		height: 4vmin;
		background-color: aquamarine;
	} */
</style>
