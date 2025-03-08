export enum Damage {
	Acidic,
	Bludgeoning,
	Cold,
	Healing,
	Heat,
	Manaric,
	Electric,
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
	Manara,
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
	Spiritual,
	Manaric,
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

export enum Category {
	Damage,
	Material,
	Kinetic,
	Shape,
	Sense,
	Creature,
}

const ambueMapping = {
	[Category.Damage]: Damage,
	[Category.Material]: Material,
	[Category.Kinetic]: Kinetic,
	[Category.Shape]: Shape,
	[Category.Sense]: Sense,
	[Category.Creature]: Creature,
}

type NumericEnumMember<E> = Exclude<E[keyof E], string>;
// type Ambues = { [K in keyof typeof ambueMapping]: NumericEnumMember<(typeof ambueMapping)[K]>}[keyof typeof ambueMapping]

export type Pair = {
	[K in keyof typeof ambueMapping]: { type: K; value: NumericEnumMember<(typeof ambueMapping)[K]> }
}[keyof typeof ambueMapping];

export const GetName = (ambue: Pair) => {
	return ambueMapping[ambue.type][ambue.value]
};

export const Serialize = (ambue: Pair) => {
	return ambue.type.toString() + '_' + ambue.value.toString();
};

const color = (hue: number) => {
	return `hsv(${Math.round(100 * hue / 360) / 100}, ${36 / 100}, ${59 / 100})`;
};

// Rewrite the GetColor function to use nested objects instead of switch statements
const colors = {
	[Category.Creature]: {
		[Creature.Aberration]: color(296),
		[Creature.Beast]: color(338),
		[Creature.Celestial]: color(60),
		[Creature.Construct]: color(16),
		[Creature.Dragon]: color(115),
		[Creature.Elemental]: color(169),
		[Creature.Fey]: color(180),
		[Creature.Fiend]: color(0),
		[Creature.Giant]: color(255),
		[Creature.Humanoid]: color(43),
		[Creature.Monstrosity]: color(235),
		[Creature.Ooze]: color(306),
		[Creature.Plant]: color(115),
		[Creature.Undead]: color(180),
	},
	[Category.Damage]: {
		[Damage.Acidic]: color(81),
		[Damage.Bludgeoning]: color(110),
		[Damage.Cold]: color(192),
		[Damage.Healing]: color(55),
		[Damage.Heat]: color(0),
		[Damage.Manaric]: color(317),
		[Damage.Electric]: color(43),
		[Damage.Necrotic]: color(245),
		[Damage.Piercing]: color(125),
		[Damage.Poisoning]: color(295),
		[Damage.Psychic]: color(142),
		[Damage.Radiant]: color(28),
		[Damage.Slashing]: color(159),
		[Damage.Sonic]: color(213),
	},
	[Category.Kinetic]: {
		[Kinetic.Push]: color(0),
		[Kinetic.Pull]: color(235),
	},
	[Category.Shape]: {
		[Shape.Sphere]: color(0),
		[Shape.Cube]: color(55),
		[Shape.Cone]: color(125),
		[Shape.Line]: color(175),
	},
	[Category.Sense]: {
		[Sense.Touch]: color(0),
		[Sense.Taste]: color(120),
		[Sense.Smell]: color(169),
		[Sense.Sight]: color(240),
		[Sense.Hearing]: color(81),
		[Sense.Spiritual]: color(55),
		[Sense.Manaric]: color(317),
	},
	[Category.Material]: {
		[Material.Wood]: color(60),
		[Material.Stone]: color(175),
		[Material.Metal]: color(201),
		[Material.Dirt]: color(16),
		[Material.Ice]: color(175),
		[Material.Fire]: color(43),
		[Material.Manara]: color(317),
		[Material.Cloth]: color(131),
		[Material.Glass]: color(148),
		[Material.Wax]: color(66),
		[Material.Acid]: color(120),
		[Material.Lightning]: color(60),
		[Material.Water]: color(180),
		[Material.Lava]: color(0),
		[Material.Air]: color(207),
		[Material.Poison]: color(295),
		[Material.Light]: color(28),
	}
};

export const GetColor = (ambue: Pair): string => {
	console.log(ambue, colors[ambue.type], ambue.value)
	return colors[ambue.type][ambue.value];
};