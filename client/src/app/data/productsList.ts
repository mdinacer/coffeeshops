type ProductItem = { name: string, description?: string, pictureUrl: string, category?: string }

const imagesPath = "/assets/images/products/"

const categories = {
    soda: 'boissons gazeuses',
    hot_drinks: "boissons chaudes",
    water: "eau minérale",
    juice: "jus",
    bread: "pains et gateaux",
    others: "autres",
    fresh_drinks: "boissons fraîches",
}

const ext = "png"

export const productsList: ProductItem[] = [

    {
        name: "pain",
        pictureUrl: `${imagesPath}bread.${ext}`,

        category: categories.bread
    },

    {
        name: "madeleine",
        pictureUrl: `${imagesPath}madeleine.${ext}`,

        category: categories.bread
    },

    {
        name: "café crème",
        pictureUrl: `${imagesPath}creme.${ext}`,

        category: categories.hot_drinks
    },

    {
        name: "café espresso",
        pictureUrl: `${imagesPath}espresso.${ext}`,

        category: categories.hot_drinks
    },

    {
        name: "jus d'orange",
        pictureUrl: `${imagesPath}orange_juice.${ext}`,

        category: categories.juice
    },

    {
        name: "Tranche de tarte",
        pictureUrl: `${imagesPath}cake_slice.${ext}`,

        category: categories.bread
    },

    {
        name: "patisserie",
        pictureUrl: `${imagesPath}cake.${ext}`,

        category: categories.bread
    },

    {
        name: "coca cola P.B",
        pictureUrl: `${imagesPath}coke_bottle_sm.${ext}`,
        description: "petite bouteille",
        category: categories.soda
    },

    {
        name: "coca cola G.B ",
        pictureUrl: `${imagesPath}coke_bottle_lg.${ext}`,
        description: "grande bouteille",
        category: categories.soda
    },

    {
        name: "coca cola cannette",
        pictureUrl: `${imagesPath}coke_can.${ext}`,

        category: categories.soda
    },

    {
        name: "fanta cannette",
        pictureUrl: `${imagesPath}fanta_can.${ext}`,

        category: categories.soda
    },

    {
        name: "pepsi cannette",
        pictureUrl: `${imagesPath}pepsi_can.${ext}`,

        category: categories.soda
    },

    {
        name: "sprite cannette",
        pictureUrl: `${imagesPath}sprite_can.${ext}`,

        category: categories.soda
    },

    {
        name: "redbull cannette",
        pictureUrl: `${imagesPath}redbull_can.${ext}`,

        category: categories.soda
    },

    {
        name: "7UP cannette",
        pictureUrl: `${imagesPath}sevenup_can.${ext}`,

        category: categories.soda
    },

    {
        name: "mirinda cannette",
        pictureUrl: `${imagesPath}mirinda_can.${ext}`,

        category: categories.soda
    },

    {
        name: "mirinda bouteille",
        pictureUrl: `${imagesPath}mirinda_bottle.${ext}`,
        description: "7UP Pepsi Mirinda",
        category: categories.soda
    },

    {
        name: "cannette",
        pictureUrl: `${imagesPath}soda_can.${ext}`,
        description: "Coca cola Fanta Sprite",
        category: categories.soda
    },

    {
        name: "eau minérale",
        pictureUrl: `${imagesPath}water_glass.${ext}`,
        description: "verre",
        category: categories.water
    },

    {
        name: "eau minérale Pt",
        pictureUrl: `${imagesPath}water_small.${ext}`,
        description: "petite bouteille",
        category: categories.water
    },

    {
        name: "eau minérale Gr",
        pictureUrl: `${imagesPath}water_bottle.${ext}`,
        description: "grande bouteille",
        category: categories.water
    },

    {
        name: "verre de lait",
        pictureUrl: `${imagesPath}milk_glass.${ext}`,

        category: categories.hot_drinks
    },

    {
        name: "Pain maison",
        pictureUrl: `${imagesPath}bread_home.${ext}`,

        category: categories.bread
    },

    {
        name: "Bouteille Marron",
        pictureUrl: `${imagesPath}brown_bottle.${ext}`,


    },

    {
        name: "Bouteille verte",
        pictureUrl: `${imagesPath}green_bottle.${ext}`,


    },

    {
        name: "Cannette",
        pictureUrl: `${imagesPath}can_placeholder.${ext}`,

    },

    {
        name: "crêpes au chocolat",
        pictureUrl: `${imagesPath}crepes_chocolat.${ext}`,
        category: categories.bread,
    },

    {
        name: "crêpe",
        pictureUrl: `${imagesPath}crepes.${ext}`,
        category: categories.bread,
    },

    {
        name: "Croissant Fourré",
        pictureUrl: `${imagesPath}croissant_fourre.${ext}`,
        category: categories.bread,
    },

    {
        name: "Croissant",
        pictureUrl: `${imagesPath}croissant.${ext}`,
        category: categories.bread,
    },

    {
        name: "Pain au chocolat",
        pictureUrl: `${imagesPath}pain_chocolat.${ext}`,
        category: categories.bread,
    },

    {
        name: "Mille feuilles",
        pictureUrl: `${imagesPath}mille_feuilles.${ext}`,
        category: categories.bread,
    },

    {
        name: "Pain au raisins",
        pictureUrl: `${imagesPath}pain_raisin.${ext}`,
        category: categories.bread,
    },

    {
        name: "Palmier",
        pictureUrl: `${imagesPath}palmier.${ext}`,
        category: categories.bread,
    },

    {
        name: "Sprite Pt.Bouteille",
        pictureUrl: `${imagesPath}sprite_bottle_small.${ext}`,
        category: categories.soda,
    },

    {
        name: "Thé Gr.Verre",
        pictureUrl: `${imagesPath}tea_big.${ext}`,
        category: categories.hot_drinks,
    },

    {
        name: "Thé Pt.Verre",
        pictureUrl: `${imagesPath}tea_small.${ext}`,
        category: categories.hot_drinks,
    },




].sort((a, b) => a.name.localeCompare(b.name))


