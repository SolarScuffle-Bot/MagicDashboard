import * as Types from "./types.svelte";
import * as Ambues from "./ambues.svelte";

export type Lithon = {
	name: string,
	description: string,
	ambues: ({ name: string, ambue: Ambues.Pair | { type: Ambues.Category, value: null }})[],
	consumables: {
		name: string,
		required: number,
	}[],
	cooldown: {
		uses: number,
		usesLeft: number,
		amount: number,
		amountLeft: number,
		unit: Types.TimeUnit,
	},
}

export const GetColor = (lithon: Lithon) => {
	return lithon.ambues[0] ? Ambues.GetColor(lithon.ambues[0].ambue) : "#fff";
}