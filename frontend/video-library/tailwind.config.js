/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                "mc": '480px'
            },
            colors: {
                headline_bg: "#e8ebef",
                headline_border: "#d8dde4",
                table_border: '#ddd',
                secondary_column: '#9da2a8',
                link: '#176093'
            },
            gridTemplateColumns: {
                cardsAndFilter: "auto 20%",
                cards_filter: "auto 200px",
                cards: "repeat(auto-fill, minmax(200px, 1fr))",
                cards2: "repeat(2, minmax(100px, 1fr))",
                listTables: "min-content auto repeat(3, min-content)",
                detailed_wide: "auto 1fr 1fr",
                detailed_medium: "auto 1fr 1fr",
                detailed_small: "1fr"
            },
            gridTemplateAreas: {
                detailed_wide: [
                    "img info rating",
                    "img info studio",
                    "img desc desc"
                ],
                detailed_medium: [
                    "img info info",
                    "img rating rating",
                    "img studio studio",
                    "desc desc desc"
                ],
                detailed_small: [
                    "img",
                    "info",
                    "rating",
                    "studio",
                    "desc"
                ]
            }
        },
    },
    plugins: [
        require('@savvywombat/tailwindcss-grid-areas')
    ]
}

