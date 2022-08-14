type ProductItem = { name: string, description: string | null, pictureUrl: string }

const imagesPath = "/assets/images/products/"
export const productsList: ProductItem[] = [

    {
        name: "pain",
        pictureUrl: `${imagesPath}bread.png`,
        description: null
    },

    {
        name: "madeleine",
        pictureUrl: `${imagesPath}madeleine.png`,
        description: null
    },

    {
        name: "café crème",
        pictureUrl: `${imagesPath}creme.png`,
        description: null
    },

    {
        name: "café espresso",
        pictureUrl: `${imagesPath}espresso.png`,
        description: null
    },

    {
        name: "jus d'orange",
        pictureUrl: `${imagesPath}orange_juice.png`,
        description: null
    },

    {
        name: "Tranche de tarte",
        pictureUrl: `${imagesPath}cake_slice.png`,
        description: null
    },

    {
        name: "patisserie",
        pictureUrl: `${imagesPath}cake.png`,
        description: null
    },

    {
        name: "coca cola bouteille",
        pictureUrl: `${imagesPath}coke_bottle_sm.png`,
        description: "petite bouteille"
    },

    {
        name: "coca cola bouteille",
        pictureUrl: `${imagesPath}coke_bottle_lg.png`,
        description: "grande bouteille"
    },

    {
        name: "coca cola cannette",
        pictureUrl: `${imagesPath}coke_can.png`,
        description: null
    },

    {
        name: "fanta cannette",
        pictureUrl: `${imagesPath}fanta_can.png`,
        description: null
    },

    {
        name: "pepsi cannette",
        pictureUrl: `${imagesPath}pepsi_can.png`,
        description: null
    },

    {
        name: "sprite cannette",
        pictureUrl: `${imagesPath}sprite_can.png`,
        description: null
    },

    {
        name: "redbull cannette",
        pictureUrl: `${imagesPath}redbull_can.png`,
        description: null
    },

    {
        name: "7UP cannette",
        pictureUrl: `${imagesPath}sevenup_can.png`,
        description: null
    },

    {
        name: "mirinda cannette",
        pictureUrl: `${imagesPath}mirinda_can.png`,
        description: null
    },

    {
        name: "mirinda bouteille",
        pictureUrl: `${imagesPath}mirinda_bottle.png`,
        description: "7UP Pepsi Mirinda"
    },

    {
        name: "cannette",
        pictureUrl: `${imagesPath}soda_can.png`,
        description: "Coca cola Fanta Sprite"
    },

    {
        name: "eau minérale",
        pictureUrl: `${imagesPath}water_glass.png`,
        description: "verre"
    },

    {
        name: "eau minérale",
        pictureUrl: `${imagesPath}water_bottle.png`,
        description: "petite bouteille"
    },

    {
        name: "eau minérale",
        pictureUrl: `${imagesPath}water_bottle.png`,
        description: "grande bouteille"
    },

    {
        name: "verre de lait",
        pictureUrl: `${imagesPath}milk_glass.png`,
        description: null
    },




]