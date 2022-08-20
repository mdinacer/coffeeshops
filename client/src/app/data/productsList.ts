type ProductItem = { name: string, description: string | null, pictureUrl: string, category?: string }

const imagesPath = "/assets/images/products/"
export const productsList: ProductItem[] = [

    {
        name: "pain",
        pictureUrl: `${imagesPath}bread.png`,
        description: null,
        category: "pains et gateaux"
    },

    {
        name: "madeleine",
        pictureUrl: `${imagesPath}madeleine.png`,
        description: null,
        category: "pains et gateaux"
    },

    {
        name: "café crème",
        pictureUrl: `${imagesPath}creme.png`,
        description: null,
        category: "boissons chaudes"
    },

    {
        name: "café espresso",
        pictureUrl: `${imagesPath}espresso.png`,
        description: null,
        category: "boissons chaudes"
    },

    {
        name: "jus d'orange",
        pictureUrl: `${imagesPath}orange_juice.png`,
        description: null,
        category: "jus"
    },

    {
        name: "Tranche de tarte",
        pictureUrl: `${imagesPath}cake_slice.png`,
        description: null,
        category: "pains et gateaux"
    },

    {
        name: "patisserie",
        pictureUrl: `${imagesPath}cake.png`,
        description: null,
        category: "pains et gateaux"
    },

    {
        name: "coca cola bouteille",
        pictureUrl: `${imagesPath}coke_bottle_sm.png`,
        description: "petite bouteille",
        category: "boissons gazeuses"
    },

    {
        name: "coca cola bouteille",
        pictureUrl: `${imagesPath}coke_bottle_lg.png`,
        description: "grande bouteille",
        category: "boissons gazeuses"
    },

    {
        name: "coca cola cannette",
        pictureUrl: `${imagesPath}coke_can.png`,
        description: null,
        category: "boissons gazeuses"
    },

    {
        name: "fanta cannette",
        pictureUrl: `${imagesPath}fanta_can.png`,
        description: null,
        category: "boissons gazeuses"
    },

    {
        name: "pepsi cannette",
        pictureUrl: `${imagesPath}pepsi_can.png`,
        description: null,
        category: "boissons gazeuses"
    },

    {
        name: "sprite cannette",
        pictureUrl: `${imagesPath}sprite_can.png`,
        description: null,
        category: "boissons gazeuses"
    },

    {
        name: "redbull cannette",
        pictureUrl: `${imagesPath}redbull_can.png`,
        description: null,
        category: "boissons gazeuses"
    },

    {
        name: "7UP cannette",
        pictureUrl: `${imagesPath}sevenup_can.png`,
        description: null,
        category: "boissons gazeuses"
    },

    {
        name: "mirinda cannette",
        pictureUrl: `${imagesPath}mirinda_can.png`,
        description: null,
        category: "boissons gazeuses"
    },

    {
        name: "mirinda bouteille",
        pictureUrl: `${imagesPath}mirinda_bottle.png`,
        description: "7UP Pepsi Mirinda",
        category: "boissons gazeuses"
    },

    {
        name: "cannette",
        pictureUrl: `${imagesPath}soda_can.png`,
        description: "Coca cola Fanta Sprite",
        category: "boissons gazeuses"
    },

    {
        name: "eau minérale",
        pictureUrl: `${imagesPath}water_glass.png`,
        description: "verre",
        category: "eau minérale"
    },

    {
        name: "eau minérale",
        pictureUrl: `${imagesPath}water_bottle.png`,
        description: "petite bouteille",
        category: "eau minérale"
    },

    {
        name: "eau minérale",
        pictureUrl: `${imagesPath}water_bottle.png`,
        description: "grande bouteille",
        category: "eau minérale"
    },

    {
        name: "verre de lait",
        pictureUrl: `${imagesPath}milk_glass.png`,
        description: null,
        category: "boissons chaudes"
    },




]