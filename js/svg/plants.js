// svg/plants.js — 3 культуры x 3 стадии роста (inline SVG, viewBox грядки 100x100)
// Каждая функция возвращает markup БЕЗ обёртки <svg> — вызывающий код оборачивает
// результат в <g class="crop-plant"> для анимаций (покачивание, pop, встряска)

const SvgPlants = {
    render(cropKey, stage) {
        const stages = this[cropKey];
        if (!stages) return '';
        return stages[stage] ? stages[stage]() : stages[1]();
    },

    carrot: {
        1: () => `
            <g stroke-linecap="round" fill="none">
                <path d="M50,80 Q47,63 44,52" stroke="#7CB342" stroke-width="4"/>
                <path d="M50,80 Q50,60 50,46" stroke="#8BC34A" stroke-width="4"/>
                <path d="M50,80 Q53,63 56,52" stroke="#7CB342" stroke-width="4"/>
            </g>
        `,
        2: () => `
            <g stroke-linecap="round" fill="none">
                <path d="M50,80 Q41,56 33,40" stroke="#689F38" stroke-width="4"/>
                <path d="M50,80 Q46,52 41,32" stroke="#7CB342" stroke-width="4"/>
                <path d="M50,80 Q50,50 50,28" stroke="#8BC34A" stroke-width="4"/>
                <path d="M50,80 Q54,52 59,32" stroke="#7CB342" stroke-width="4"/>
                <path d="M50,80 Q59,56 67,40" stroke="#689F38" stroke-width="4"/>
            </g>
        `,
        3: () => `
            <g>
                <path d="M38,60 L62,60 L52,90 Q50,94 48,90 Z" fill="#FF9800" stroke="#E65100" stroke-width="1.5"/>
                <path d="M45,64 L44,84 M55,64 L56,84" stroke="#E65100" stroke-width="1.5" opacity="0.4"/>
                <g stroke-linecap="round" fill="none">
                    <path d="M50,60 Q42,47 38,34" stroke="#689F38" stroke-width="4"/>
                    <path d="M50,60 Q50,44 50,28" stroke="#7CB342" stroke-width="4"/>
                    <path d="M50,60 Q58,47 62,34" stroke="#689F38" stroke-width="4"/>
                </g>
            </g>
        `
    },

    apple: {
        1: () => `
            <g>
                <line x1="50" y1="82" x2="50" y2="62" stroke="#6D4C41" stroke-width="4" stroke-linecap="round"/>
                <ellipse cx="50" cy="55" rx="7" ry="10" fill="#66BB6A"/>
                <ellipse cx="39" cy="63" rx="6" ry="8" fill="#7CB342" transform="rotate(-25 39 63)"/>
                <ellipse cx="61" cy="63" rx="6" ry="8" fill="#7CB342" transform="rotate(25 61 63)"/>
            </g>
        `,
        2: () => `
            <g>
                <rect x="46" y="64" width="8" height="23" rx="3" fill="#6D4C41"/>
                <circle cx="50" cy="47" r="25" fill="#66BB6A"/>
                <circle cx="36" cy="54" r="15" fill="#7CB342"/>
                <circle cx="64" cy="54" r="15" fill="#7CB342"/>
            </g>
        `,
        3: () => `
            <g>
                <rect x="46" y="64" width="8" height="23" rx="3" fill="#6D4C41"/>
                <circle cx="50" cy="47" r="25" fill="#66BB6A"/>
                <circle cx="36" cy="54" r="15" fill="#7CB342"/>
                <circle cx="64" cy="54" r="15" fill="#7CB342"/>
                <g fill="#F44336" stroke="#C62828" stroke-width="1">
                    <circle cx="40" cy="41" r="5"/>
                    <circle cx="60" cy="39" r="5"/>
                    <circle cx="50" cy="57" r="5"/>
                    <circle cx="66" cy="53" r="5"/>
                    <circle cx="34" cy="57" r="5"/>
                </g>
            </g>
        `
    },

    wheat: {
        1: () => `
            <g stroke="#8BC34A" stroke-width="3" stroke-linecap="round">
                <line x1="40" y1="85" x2="38" y2="55"/>
                <line x1="50" y1="88" x2="50" y2="50"/>
                <line x1="60" y1="85" x2="62" y2="55"/>
            </g>
        `,
        2: () => `
            <g>
                <g stroke="#689F38" stroke-width="3" stroke-linecap="round">
                    <line x1="38" y1="88" x2="36" y2="42"/>
                    <line x1="50" y1="90" x2="50" y2="35"/>
                    <line x1="62" y1="88" x2="64" y2="42"/>
                </g>
                <ellipse cx="36" cy="38" rx="5" ry="10" fill="#7CB342"/>
                <ellipse cx="50" cy="31" rx="5" ry="11" fill="#8BC34A"/>
                <ellipse cx="64" cy="38" rx="5" ry="10" fill="#7CB342"/>
            </g>
        `,
        3: () => `
            <g>
                <g stroke="#C79A00" stroke-width="3" stroke-linecap="round">
                    <line x1="38" y1="90" x2="36" y2="40"/>
                    <line x1="50" y1="92" x2="50" y2="32"/>
                    <line x1="62" y1="90" x2="64" y2="40"/>
                </g>
                <ellipse cx="36" cy="36" rx="6" ry="12" fill="#FFC107"/>
                <ellipse cx="50" cy="28" rx="6" ry="13" fill="#FFCA28"/>
                <ellipse cx="64" cy="36" rx="6" ry="12" fill="#FFC107"/>
                <g stroke="#F57F17" stroke-width="1" opacity="0.6">
                    <line x1="33" y1="30" x2="30" y2="26"/>
                    <line x1="39" y1="30" x2="42" y2="26"/>
                    <line x1="47" y1="22" x2="44" y2="18"/>
                    <line x1="53" y1="22" x2="56" y2="18"/>
                    <line x1="61" y1="30" x2="58" y2="26"/>
                    <line x1="67" y1="30" x2="70" y2="26"/>
                </g>
            </g>
        `
    }
};
