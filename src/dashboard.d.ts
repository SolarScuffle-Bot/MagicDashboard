enum TIME_UNIT {
	TURN,
	LONG_REST,
	SHORT_REST,
}

namespace IMBUES {
	enum DAMAGE {
		ACID,
		BLUDGEONING,
		COLD,
		HEALING,
		HEAT,
		FORCE,
		SHOCK,
		NECROTIC,
		PIERCING,
		POISON,
		PSYCHIC,
		RADIANT,
		SLASHING,
		SONIC,
	}

	enum KINETIC {
		PUSH,
		PULL,
	}

	enum SHAPE {
		SPHERE,
		CUBE,
		CONE,
		LINE,
	}

	enum SENSE {
		TOUCH,
		TASTE,
		SMELL,
		SIGHT,
		HEARING,
		MAGIC,
	}

	enum CREATURE {
		ABERRATION,
		BEAST,
		CELESTIAL,
		CONSTRUCT,
		DRAGON,
		ELEMENTAL,
		FEY,
		FIEND,
		GIANT,
		HUMANOID,
		MONSTROSITY,
		OOZE,
		PLANT,
		UNDEAD,
	}
}
type IMBUE = IMBUES.DAMAGE | IMBUES.KINETIC | IMBUES.SHAPE | IMBUES.SENSE | IMBUES.CREATURE

type Spell = {
	name: string,
	description: string,
	components: {
		name: string,
		type: IMBUE,
	}[],
	consumables: {
		name: string,
		required: number,
	}[],
	cooldown: {
		amount: number,
		unit: TIME_UNIT,
	},
}