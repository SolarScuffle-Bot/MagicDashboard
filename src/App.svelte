<script lang="ts">
    import * as Types from "./types.svelte";
    import * as Ambues from "./ambues.svelte";
    import * as Lithons from "./lithons.svelte";

    import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
    import {
        draggable,
        dropTargetForElements,
        monitorForElements,
    } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
    import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
    import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";

    import LithonComponent from "./lib/LithonComponent.svelte";

    type AmbueItem = Ambues.Pair;
    type LithonItem = Lithons.Lithon;

    let LithonItems: LithonItem[] = $state([
        {
            name: "Eldritch Blast 1",
            description:
                "You instantly hurl a beam of <Material> in a line towards a target within 120ft dealing 1d10 of the appropriate damage type to whatever it hits before dissipating.",
            ambues: [
                {
                    name: "Material",
                    ambue: {
                        type: Ambues.Category.Material,
                        value: 2,
                    },
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
        },
        {
            name: "Shield 1",
            description:
                "You gain a flat, temporary AC boost until the start of your next turn.",
            ambues: [],
            consumables: [],
            cooldown: {
                uses: 1,
                usesLeft: 0,
                amount: 1,
                amountLeft: 0,
                unit: Types.TimeUnit.Turn,
            },
        },
        {
            name: "Shield 2",
            description:
                "You gain a flat, temporary AC boost until the start of your next turn.",
            ambues: [],
            consumables: [],
            cooldown: {
                uses: 1,
                usesLeft: 0,
                amount: 1,
                amountLeft: 0,
                unit: Types.TimeUnit.Turn,
            },
        },
        {
            name: "Eldritch Blast 2",
            description:
                "You instantly hurl a beam of <Material> in a line towards a target within 120ft dealing 1d10 of the appropriate damage type to whatever it hits before dissipating.",
            ambues: [
                {
                    name: "Material",
                    ambue: {
                        type: Ambues.Category.Material,
                        value: null,
                    },
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
        },
        {
            name: "Eldritch Blast 3",
            description:
                "You instantly hurl a beam of <Material> in a line towards a target within 120ft dealing 1d10 of the appropriate damage type to whatever it hits before dissipating.",
            ambues: [
                {
                    name: "Material",
                    ambue: {
                        type: Ambues.Category.Material,
                        value: 4,
                    },
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
        },
    ]);

    let AmbueItems = $state(new Map<Ambues.Category, AmbueItem[]>());

    for (const ambue of Object.values(Ambues.Category)) {
        if (typeof ambue === "number") {
            AmbueItems.set(ambue, []);
        }
    }

    AmbueItems.get(Ambues.Category.Material).push({
        type: Ambues.Category.Material,
        value: Ambues.Material.Metal,
    });
    AmbueItems.get(Ambues.Category.Shape).push({
        type: Ambues.Category.Shape,
        value: Ambues.Shape.Cube,
    });
    AmbueItems.get(Ambues.Category.Damage).push(
        {
            type: Ambues.Category.Damage,
            value: Ambues.Damage.Bludgeoning,
        },
        {
            type: Ambues.Category.Damage,
            value: Ambues.Damage.Heat,
        },
        {
            type: Ambues.Category.Damage,
            value: Ambues.Damage.Healing,
        },
        {
            type: Ambues.Category.Damage,
            value: Ambues.Damage.Necrotic,
        }
    );

    // let Ambues = $derived(() => {
    //     const list: AmbueItem[] = [];

    //     for (const v of Items.values()) {
    //         for (const ambue of v.items) {
    //             list.push(ambue);
    //         }
    //     }

    //     return list;
    // });

    // let Lists = $derived(() => {
    //     const lists = new Map<string, string[]>();
    //     for (const item of Ambues) {
    //         const ambueType = Types.Ambue[item.ambue.type]
    //         const list = lists.get(ambueType) || []
    //         lists.set(ambueType, list)
    //         list.push(Types.GetName(item.ambue.type, item.ambue.value))
    //     }
    //     return lists;
    // })

    $effect(() => {
        return monitorForElements({
            onDragStart: ({ location, source }) => {},
            onDrop: ({ location, source }) => {
                console.log(location, source);
                const data = source.data as SourceData;
                if (location.current.dropTargets.length === 0) {
                    switch (data.kind) {
                        case Types.Kind.Ambue: {
                            AmbueItems.get(data.ambue.type).push(data.ambue);
                            AmbueItems = new Map(AmbueItems);
                            break;
                        }
                        case Types.Kind.Lithon: {
                            LithonItems.push(data.lithon);
                            break;
                        }
                    }
                }
            },
        });
    });

    const nop = () => {};
    type SourceData =
        | { kind: Types.Kind.Ambue; index: number; ambue: AmbueItem }
        | { kind: Types.Kind.Lithon; lithon: LithonItem };

    function AmbueMenuAdded(element: HTMLElement) {
        return {
            update: nop,
            destroy: autoScrollForElements({
                element,
            }),
        };
    }

    function AmbueListAdded(element: HTMLElement, ambueType: Ambues.Category) {
        return {
            update: nop,
            destroy: dropTargetForElements({
                element,
                onDragStart({ location, source }) {
                    const data = source.data as SourceData;
                    if (data.kind === Types.Kind.Ambue) {
                        const filtered = AmbueItems.get(data.ambue.type).filter(ambue => { return ambue !== data.ambue });
                        AmbueItems.set(data.ambue.type, filtered);
                        AmbueItems = new Map(AmbueItems);
                    }
                },
                onDragEnter: ({ source }) => {
                    const data = source.data as SourceData;
                    if (
                        data.kind === Types.Kind.Ambue &&
                        data.ambue.type === ambueType
                    ) {
                        element.classList.add("hovering-over");
                    }
                },
                onDragLeave: ({ source }) => {
                    element.classList.remove("hovering-over");
                },
                onDrop: ({ location, source }) => {
                    element.classList.remove("hovering-over");

                    const data = source.data as SourceData;
                    if (
                        data.kind === Types.Kind.Ambue &&
                        data.ambue.type === ambueType
                    ) {
                        console.log(data);
                        AmbueItems.get(ambueType).push(data.ambue);
                        AmbueItems = new Map(AmbueItems);
                    }
                },
                canDrop: ({ source }) => {
                    const data = source.data as SourceData;
                    if (data.kind === Types.Kind.Ambue) {
                        return data.ambue.type === ambueType;
                    } else {
                        return false;
                    }
                },
            }),
        };
    }

    function AmbueAdded(
        element: HTMLElement,
        { ambue, index }: { ambue: AmbueItem, index: number },
    ) {
        return {
            update: nop,
            destroy: draggable({
                element,
                getInitialData: () => ({
                    kind: Types.Kind.Ambue,
                    ambue,
                    index,
                }),
                onGenerateDragPreview: ({ nativeSetDragImage }) => {
                    setCustomNativeDragPreview({
                        getOffset: ({ container }) => {
                            const rect = container.getBoundingClientRect();
                            return { x: rect.width / 2, y: rect.height / 2 };
                        },
                        render: ({ container }) => {
                            const copy = element.cloneNode(true);
                            container.appendChild(copy);
                        },
                        nativeSetDragImage,
                    });
                },
            }),
        };
    }

    function LithonMenuAdded(element: HTMLElement) {
        return {
            update: nop,
            destroy: combine(
                dropTargetForElements({
                    element,
                    onDragStart: ({ location, source }) => {
                        const data = source.data as SourceData;
                        if (data.kind === Types.Kind.Lithon) {
                            console.log(data)
                            LithonItems = LithonItems.filter(val => { return val !== data.lithon });
                        }
                    },
                    onDrop: ({ location, source }) => {
                        element.classList.remove("hovering-over");

                        const data = source.data as SourceData;
                        if (data.kind === Types.Kind.Lithon) {
                            console.log(data)
                            LithonItems.push(data.lithon);
                        }
                    },
                    canDrop: ({ source }) => {
                        const data = source.data as SourceData;
                        if (data.kind === Types.Kind.Lithon) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                }),
                autoScrollForElements({
                    element,
                }),
            ),
        };
    }

    function LithonAdded(
        element: HTMLElement,
        { lithon }: { lithon: LithonItem },
    ) {
        return {
            update: nop,
            destroy: draggable({
                element,
                getInitialData: () => ({
                    kind: Types.Kind.Lithon,
                    lithon,
                }),
            }),
        };
    }

    /*
                                onconsider={(e) => {
                                if (e.detail.info.trigger === "dragStarted") {
                                    PreDraggedItems = Items;
                                    DraggedItemData = {
                                        type: ambueType,
                                    };
                                }

                                if (ambueType == DraggedItemData.type) {
                                    console.log(e.detail.info)
                                    Items.get(ambueType).items = e.detail.items;
                                    Items = new Map(Items);
                                }
                            }}
                            onfinalize={(e) => {
                                if (e.currentTarget.getAttribute("dnd-data") == DraggedItemData.type) {
                                    Items.get(ambueType).items = e.detail.items;
                                    Items = new Map(Items);
                                } else {
                                    Items = PreDraggedItems;
                                }
                                DraggedItemData = null;
                            }}
    */
</script>

<header></header>

<main>
    <section id="ambues" use:AmbueMenuAdded>
        <ul>
            {#each Object.values(Ambues.Category) as ambueType}
                {#if typeof ambueType === "number"}
                    <li>
                        <h1>{Ambues.Category[ambueType]}</h1>

                        <ul
                            class:ambue-list={true}
                            class:ambue-id={ambueType}
                            use:AmbueListAdded={ambueType}
                        >
                            {#each AmbueItems.get(ambueType).toSorted((a, b) => { return Ambues.GetName(a) < Ambues.GetName(b) ? 1 : -1 }, ) as ambue, index}
                                <li
                                    use:AmbueAdded={{ ambue, index }}
                                    class="ambue-item"
                                >
                                    {Ambues.GetName(ambue)}
                                </li>
                            {/each}
                        </ul>
                    </li>
                {/if}
            {/each}
        </ul>
    </section>

    <section id="grid" use:LithonMenuAdded>
        {#each LithonItems as lithon, index}
            <div class="no-select" use:LithonAdded={{ lithon }}>
                <LithonComponent
                    bind:lithon={LithonItems[index]}
                    onclick={() => {
                        const cooldown = lithon.cooldown;
                        if (cooldown.usesLeft < cooldown.uses) {
                            cooldown.usesLeft++;
                        }

                        if (
                            cooldown.amountLeft === 0 &&
                            cooldown.usesLeft === cooldown.uses
                        ) {
                            cooldown.amountLeft = cooldown.amount;
                        }
                    }}
                />
            </div>
        {/each}

        <div class="no-select">
            <button
                style="
					width:100%;
					height:100%;
				"
                onclick={e => {
                    LithonItems[LithonItems.length] = {
                        name: "Cloned",
                        description:
                            "You instantly hurl a beam of <Material> in a line towards a target within 120ft dealing 1d10 of its associated damage type to whatever it hits before dissipating.",
                        ambues: [
                            {
                                name: "Material",
                                ambue: {
                                    type: Ambues.Category.Material,
                                    value: undefined,
                                },
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
                    };
                }}
            >
                +
            </button>
        </div>
    </section>
</main>

<footer>
    <section id="left" class="buttonContainer">
        <button>Save As</button>
        <button>Load</button>
    </section>

    <section id="right" class="buttonContainer">
        <button
            onclick={e => {
                for (const lithon of LithonItems) {
                    const cooldown = lithon.cooldown;
                    switch (cooldown.unit) {
                        case Types.TimeUnit.Turn:
                            cooldown.amountLeft = Math.max(
                                0,
                                cooldown.amountLeft - 1,
                            );
                            break;
                    }
                }
            }}
        >
            End Turn
        </button>

        <button
            onclick={e => {
                for (const lithon of LithonItems) {
                    const cooldown = lithon.cooldown;
                    switch (cooldown.unit) {
                        case Types.TimeUnit.Turn:
                            cooldown.amountLeft = 0;
                            break;
                        case Types.TimeUnit.ShortRest:
                            cooldown.amountLeft = Math.max(
                                0,
                                cooldown.amountLeft - 1,
                            );
                            break;
                    }
                }
            }}
        >
            Short Rest
        </button>

        <button
            onclick={e => {
                for (const lithon of LithonItems) {
                    const cooldown = lithon.cooldown;
                    switch (cooldown.unit) {
                        case Types.TimeUnit.Turn:
                            cooldown.amountLeft = 0;
                            break;
                        case Types.TimeUnit.ShortRest:
                            cooldown.amountLeft = 0;
                            break;
                        case Types.TimeUnit.LongRest:
                            cooldown.amountLeft = Math.max(
                                0,
                                cooldown.amountLeft - 1,
                            );
                            break;
                    }
                }
            }}
        >
            Long Rest
        </button>

        <button
            onclick={e => {
                for (const lithon of LithonItems) {
                    const cooldown = lithon.cooldown;
                    cooldown.amountLeft = 0;
                }
            }}
        >
            Reset All
        </button>

        <button
            onclick={e => {
                AmbueItems.get(Ambues.Category.Material).push({
                    type: Ambues.Category.Material,
                    value: Ambues.Material.Metal,
                });
                AmbueItems = new Map(AmbueItems);
            }}
        >
            Add Ambue
        </button>
    </section>
</footer>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        overflow-x: hidden;

        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    .no-select {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, supported by modern browsers */
    }

    .hovering-over {
        border: solid;
        border-width: 10px;
        border-color: chartreuse;
    }

    main {
        background-color: brown;
        width: 100vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #ambues {
        width: 20vw;
        background-color: bisque;

        max-height: 95vh;
        overflow-y: auto;
    }

    .ambue-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15vmin;
        height: 5vmin;
        border-radius: 10px;
        border-style: dashed;
        border-color: azure;
        user-select: none;
        cursor:grab;
    }

    #grid {
        background-color: aquamarine;
        width: 80vw;
        min-height: 95vh;
        max-height: 95vh;
        overflow-y: auto;
        padding: 2vmin;

        /* Use grid to ensure row height consistency */
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(350px, 1fr)
        ); /* Max 4 per row */
        gap: 2vmin; /* Space between grid items */
        align-items: start; /* Ensure cards do not stretch */
        grid-auto-rows: min-content;

        div {
            background: white;
            border: 1px solid #ccc;
            height: 25vh;
            display: flex;
            flex-direction: column;

            button {
                height: 100%;
            }
        }
    }

    footer {
        background-color: brown;
        width: 100%;
        height: 5vh;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: fixed;
        left: 0;
        bottom: 0;
        margin-top: auto;
    }
</style>
