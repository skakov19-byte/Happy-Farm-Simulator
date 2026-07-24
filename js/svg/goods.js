// svg/goods.js — иконки товаров для рынка (80x80, inline SVG, без внешних id)

const SvgGoods = {
    render(cropKey) {
        const icon = this[cropKey];
        return icon ? icon() : '';
    },

    carrot() {
        return `
            <svg viewBox="0 0 80 80" class="good-icon" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="40" cy="72" rx="20" ry="5" fill="#000000" opacity="0.15"/>
                <path d="M28,35 L52,35 L42,68 Q40,72 38,68 Z" fill="#FF9800" stroke="#E65100" stroke-width="2"/>
                <path d="M34,40 L33,62 M46,40 L47,62" stroke="#E65100" stroke-width="1.5" opacity="0.4"/>
                <g stroke-linecap="round" fill="none">
                    <path d="M40,35 Q32,20 26,10" stroke="#4CAF50" stroke-width="5"/>
                    <path d="M40,35 Q40,18 40,6" stroke="#66BB6A" stroke-width="5"/>
                    <path d="M40,35 Q48,20 54,10" stroke="#4CAF50" stroke-width="5"/>
                </g>
            </svg>
        `;
    },

    apple() {
        return `
            <svg viewBox="0 0 80 80" class="good-icon" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="40" cy="72" rx="18" ry="5" fill="#000000" opacity="0.15"/>
                <path d="M40,26 Q42,20 39,14" stroke="#5D4037" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M40,19 Q29,10 21,19 Q31,20 40,19 Z" fill="#4CAF50"/>
                <circle cx="40" cy="46" r="24" fill="#F44336"/>
                <path d="M28,32 Q33,25 41,25 Q30,29 28,38 Z" fill="#FFCDD2" opacity="0.85"/>
            </svg>
        `;
    },

    wheat() {
        return `
            <svg viewBox="0 0 80 80" class="good-icon" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="40" cy="72" rx="20" ry="5" fill="#000000" opacity="0.15"/>
                <g stroke="#F9A825" stroke-width="3" stroke-linecap="round">
                    <line x1="26" y1="66" x2="30" y2="18"/>
                    <line x1="34" y1="68" x2="36" y2="14"/>
                    <line x1="40" y1="69" x2="40" y2="12"/>
                    <line x1="46" y1="68" x2="44" y2="14"/>
                    <line x1="54" y1="66" x2="50" y2="18"/>
                </g>
                <g fill="#FFC107">
                    <ellipse cx="30" cy="16" rx="5" ry="11" transform="rotate(-6 30 16)"/>
                    <ellipse cx="36" cy="12" rx="5" ry="12" transform="rotate(-3 36 12)"/>
                    <ellipse cx="40" cy="10" rx="5" ry="12"/>
                    <ellipse cx="44" cy="12" rx="5" ry="12" transform="rotate(3 44 12)"/>
                    <ellipse cx="50" cy="16" rx="5" ry="11" transform="rotate(6 50 16)"/>
                </g>
                <path d="M22,45 L58,45" stroke="#5D4037" stroke-width="5"/>
            </svg>
        `;
    }
};
