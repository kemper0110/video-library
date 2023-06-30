/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
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
                listTables: "min-content auto repeat(3, min-content)"
            },
            gridTemplateRows: {
                cards: "repeat(auto-fill, 390px)"
            },
            gridTemplateAreas: {
                detailed_wide: [
                    "img info rating",
                    "img info studio",
                    "img desc desc"
                ],
                detailed_wide2: [
                    "img info info rating rating",
                    "img info info studio studio",
                    "img desc desc desc desc"
                ],
                detailed_wide3: [
                    "img info info rating rating rating",
                    "img info info studio studio studio",
                    "img desc desc desc desc desc"
                ]
            }
        },
    },
    plugins: [
        require('@savvywombat/tailwindcss-grid-areas')
    ]
}

