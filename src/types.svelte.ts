export enum TimeUnit {
	Turn,
	ShortRest,
	LongRest,
}

export namespace Imbues {
	export enum Damage {
		Acidic,
		Bludgeoning,
		Cold,
		Healing,
		Heat,
		Force,
		Shock,
		Necrotic,
		Piercing,
		Poisoning,
		Psychic,
		Radiant,
		Slashing,
		Sonic,
	}

	export enum Material {
		Wood,
		Stone,
		Metal,
		Dirt,
		Ice,
		Fire,
		Magic,
		Cloth,
		Glass,
		Wax,
		Acid,
		Lightning,
		Water,
		Lava,
		Air,
		Poison,
		Light,
		Plant,
	}

	export enum Kinetic {
		Push,
		Pull,
	}

	export enum Shape {
		Sphere,
		Cube,
		Cone,
		Line,
	}

	export enum Sense {
		Touch,
		Taste,
		Smell,
		Sight,
		Hearing,
		Magic,
	}

	export enum Creature {
		Aberration,
		Beast,
		Celestial,
		Construct,
		Dragon,
		Elemental,
		Fey,
		Fiend,
		Giant,
		Humanoid,
		Monstrosity,
		Ooze,
		Plant,
		Undead,
	}
}
export enum Imbue {
	Damage,
	Material,
	Kinetic,
	Shape,
	Sense,
	Creature,
}

const ImbueMapping = {
	[Imbue.Damage]: Imbues.Damage,
	[Imbue.Material]: Imbues.Material,
	[Imbue.Kinetic]: Imbues.Kinetic,
	[Imbue.Shape]: Imbues.Shape,
	[Imbue.Sense]: Imbues.Sense,
	[Imbue.Creature]: Imbues.Creature,
}

type Imbues = { [K in keyof typeof ImbueMapping]: NumericEnumMember<(typeof ImbueMapping)[K]>}[keyof typeof ImbueMapping]

type NumericEnumMember<E> = Exclude<E[keyof E], string>;

export type ImbueType = {
	[K in keyof typeof ImbueMapping]: { type: K; value: NumericEnumMember<(typeof ImbueMapping)[K]> }
}[keyof typeof ImbueMapping];

export function GetName (type: Imbue, value: Imbues) {
	return ImbueMapping[type][value]
};

// Usage – now this should type-check:
GetName(Imbue.Creature, Imbues.Creature.Construct);

export type Spell = {
	name: string,
	description: string,
	imbues: ({ name: string } & (ImbueType | { type: Imbue, value: null }))[],
	consumables: {
		name: string,
		required: number,
	}[],
	cooldown: {
		uses: number,
		usesLeft: number,
		amount: number,
		amountLeft: number,
		unit: TimeUnit,
	},
	color: string,
}

export type ImbueItem = {
	id: number,
	imbue: ImbueType,
}

export type SpellItem = {
	id: number,
	spell: Spell,
}