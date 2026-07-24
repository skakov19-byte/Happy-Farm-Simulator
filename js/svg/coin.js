// svg/coin.js — золотая монета в стиле доллара (50x50, inline SVG)
// Каждый вызов получает уникальный id для градиента — монета показывается
// одновременно в шапке, списке рынка, магазине апгрейдов и летящих частицах

const SvgCoin = {
    render(size) {
        const px = size || 22;
        const uid = SvgUtils.uid('coin');

        return `
            <svg viewBox="0 0 50 50" width="${px}" height="${px}" class="coin-icon" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="${uid}" cx="35%" cy="30%" r="75%">
                        <stop offset="0%" stop-color="#FFD54F"/>
                        <stop offset="100%" stop-color="#FFC107"/>
                    </radialGradient>
                </defs>
                <ellipse cx="25" cy="46" rx="15" ry="3" fill="#000000" opacity="0.18"/>
                <circle cx="25" cy="23" r="20" fill="url(#${uid})" stroke="#F57F17" stroke-width="2.5"/>
                <text x="25" y="31" font-size="22" font-weight="800" text-anchor="middle" fill="#5D4037" font-family="Arial, Helvetica, sans-serif">$</text>
                <path d="M10,15 A18,18 0 0,1 32,8" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
            </svg>
        `;
    }
};
