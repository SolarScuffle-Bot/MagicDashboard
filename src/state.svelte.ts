class Counter {
	value = $state(0)

	constructor() {
		this.value = 0
	}

    increment() {
        this.value++;
    }
}

export const Turns = new Counter()
export const ShortRests = new Counter()
export const LongRests = new Counter()