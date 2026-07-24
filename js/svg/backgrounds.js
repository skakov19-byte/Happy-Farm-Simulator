// svg/backgrounds.js — иллюстрированные фоны для трёх экранов (800x600, inline SVG)

const SvgBackgrounds = {
    // Колодец: деревенский пейзаж — небо, солнце, облака, холмы, трава
    well() {
        return `
            <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bgwell-sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#87CEEB"/>
                        <stop offset="100%" stop-color="#E0F6FF"/>
                    </linearGradient>
                    <linearGradient id="bgwell-hill3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#AED581"/>
                        <stop offset="100%" stop-color="#9CCC65"/>
                    </linearGradient>
                    <linearGradient id="bgwell-hill2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#9CCC65"/>
                        <stop offset="100%" stop-color="#8BC34A"/>
                    </linearGradient>
                    <linearGradient id="bgwell-hill1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#8BC34A"/>
                        <stop offset="100%" stop-color="#7CB342"/>
                    </linearGradient>
                    <radialGradient id="bgwell-sunglow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#FFF9C4" stop-opacity="0.9"/>
                        <stop offset="100%" stop-color="#FFF9C4" stop-opacity="0"/>
                    </radialGradient>
                </defs>

                <rect x="0" y="0" width="800" height="600" fill="url(#bgwell-sky)"/>

                <!-- ключевые элементы держим ближе к центру (x≈200-600): на портретных
                     экранах контейнер намного уже viewBox, и slice обрезает края -->
                <circle cx="260" cy="110" r="90" fill="url(#bgwell-sunglow)"/>
                <circle cx="260" cy="110" r="44" fill="#FFD54F"/>

                ${SvgUtils.cloud(520, 105, 0.9, 0.85)}
                ${SvgUtils.cloud(340, 170, 0.65, 0.8)}

                <path d="M0,420 Q200,360 400,410 T800,400 L800,600 L0,600 Z" fill="url(#bgwell-hill3)"/>
                <path d="M0,460 Q220,410 420,455 T800,445 L800,600 L0,600 Z" fill="url(#bgwell-hill2)"/>
                <path d="M0,500 Q240,455 440,500 T800,490 L800,600 L0,600 Z" fill="url(#bgwell-hill1)"/>

                ${SvgUtils.grassBlades(0, 800, 598, 60, '#5A7D2A')}
            </svg>
        `;
    },

    // Ферма: вид сверху-сбоку — небо-полоска, борозды земли, забор, деревья, тропинка
    farm() {
        return `
            <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bgfarm-sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#87CEEB"/>
                        <stop offset="100%" stop-color="#C8E9F5"/>
                    </linearGradient>
                    <linearGradient id="bgfarm-ground" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#8D6E63"/>
                        <stop offset="100%" stop-color="#6D4C41"/>
                    </linearGradient>
                </defs>

                <rect x="0" y="0" width="800" height="90" fill="url(#bgfarm-sky)"/>
                <rect x="0" y="90" width="800" height="510" fill="url(#bgfarm-ground)"/>

                <!-- борозды -->
                <g stroke="#5D4037" stroke-width="4" opacity="0.5" fill="none">
                    <path d="M-20,160 Q400,140 820,160"/>
                    <path d="M-20,230 Q400,210 820,230"/>
                    <path d="M-20,300 Q400,280 820,300"/>
                    <path d="M-20,370 Q400,350 820,370"/>
                    <path d="M-20,440 Q400,420 820,440"/>
                    <path d="M-20,510 Q400,490 820,510"/>
                </g>

                <!-- тропинка из камней (держим ближе к центру, чтобы не срезало на портретных экранах) -->
                <g fill="#9E9E9E" opacity="0.8">
                    <ellipse cx="260" cy="130" rx="16" ry="9"/>
                    <ellipse cx="300" cy="160" rx="14" ry="8"/>
                    <ellipse cx="275" cy="195" rx="15" ry="9"/>
                    <ellipse cx="310" cy="230" rx="13" ry="7"/>
                    <ellipse cx="540" cy="150" rx="15" ry="8"/>
                    <ellipse cx="580" cy="185" rx="14" ry="8"/>
                    <ellipse cx="555" cy="220" rx="16" ry="9"/>
                </g>

                <!-- деревья (сдвинуты к центру от краёв) -->
                <g>
                    <rect x="188" y="30" width="14" height="46" fill="#6D4C41"/>
                    <circle cx="195" cy="24" r="30" fill="#66BB6A"/>
                    <circle cx="178" cy="36" r="20" fill="#7CB342"/>
                    <circle cx="212" cy="36" r="20" fill="#7CB342"/>
                </g>
                <g>
                    <rect x="602" y="24" width="12" height="40" fill="#6D4C41"/>
                    <circle cx="608" cy="18" r="26" fill="#66BB6A"/>
                    <circle cx="593" cy="28" r="17" fill="#7CB342"/>
                    <circle cx="623" cy="28" r="17" fill="#7CB342"/>
                </g>

                <!-- забор по нижнему краю неба -->
                <g stroke="#5D4037" stroke-width="3" fill="#8D6E63">
                    <line x1="0" y1="88" x2="800" y2="88" stroke-width="4"/>
                    ${Array.from({ length: 20 })
                        .map((_, i) => `<rect x="${i * 42 + 8}" y="68" width="8" height="22"/>`)
                        .join('')}
                </g>
            </svg>
        `;
    },

    // Рынок: площадь с мостовой, прилавками, навесами, гирляндой и силуэтами покупателей
    market() {
        return `
            <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bgmarket-sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#B3E5FC"/>
                        <stop offset="100%" stop-color="#E1F5FE"/>
                    </linearGradient>
                    <linearGradient id="bgmarket-stall" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#8D6E63"/>
                        <stop offset="100%" stop-color="#6D4C41"/>
                    </linearGradient>
                </defs>

                <rect x="0" y="0" width="800" height="150" fill="url(#bgmarket-sky)"/>
                <rect x="0" y="150" width="800" height="450" fill="#B0AFAF"/>

                <!-- текстура брусчатки -->
                <g fill="#9E9E9E" opacity="0.5">
                    ${Array.from({ length: 8 })
                        .map((_, row) =>
                            Array.from({ length: 12 })
                                .map((_, col) => {
                                    const x = col * 68 + (row % 2 === 0 ? 0 : 34);
                                    const y = 170 + row * 55;
                                    return `<rect x="${x}" y="${y}" width="58" height="45" rx="8"/>`;
                                })
                                .join('')
                        )
                        .join('')}
                </g>

                <!-- гирлянда флажков -->
                <g>
                    <path d="M120,60 Q400,25 680,60" stroke="#8D6E63" stroke-width="2" fill="none"/>
                    ${Array.from({ length: 12 })
                        .map((_, i) => {
                            const t = i / 11;
                            const x = 120 + t * 560;
                            const y = 60 - Math.sin(t * Math.PI) * 34;
                            const colors = ['#F44336', '#FFC107', '#4FC3F7', '#8BC34A'];
                            return `<path d="M${x - 8},${y} L${x + 8},${y} L${x},${y + 16} Z" fill="${colors[i % colors.length]}"/>`;
                        })
                        .join('')}
                </g>

                <!-- покупатели вдали (в безопасной зоне по центру) -->
                ${SvgUtils.personSilhouette(300, 175, 0.8, '#5D4037')}
                ${SvgUtils.personSilhouette(500, 178, 0.9, '#5D4037')}
                ${SvgUtils.personSilhouette(400, 172, 0.7, '#5D4037')}

                <!-- прилавок слева (сдвинут к центру, чтобы не срезало на портретных экранах) -->
                <g>
                    <rect x="180" y="330" width="180" height="14" fill="#5D4037"/>
                    <rect x="195" y="344" width="16" height="90" fill="url(#bgmarket-stall)"/>
                    <rect x="330" y="344" width="16" height="90" fill="url(#bgmarket-stall)"/>
                    <path d="M170,270 L370,270 L355,330 L185,330 Z" fill="#F44336"/>
                    <path d="M170,270 L370,270 L370,282 L170,282 Z" fill="#FFFFFF"/>
                    <path d="M200,282 L230,282 L222,330 L192,330 Z" fill="#FFFFFF"/>
                    <path d="M280,282 L310,282 L302,330 L272,330 Z" fill="#FFFFFF"/>
                </g>

                <!-- прилавок справа -->
                <g>
                    <rect x="440" y="330" width="180" height="14" fill="#5D4037"/>
                    <rect x="455" y="344" width="16" height="90" fill="url(#bgmarket-stall)"/>
                    <rect x="590" y="344" width="16" height="90" fill="url(#bgmarket-stall)"/>
                    <path d="M430,270 L630,270 L615,330 L445,330 Z" fill="#2196F3"/>
                    <path d="M430,270 L630,270 L630,282 L430,282 Z" fill="#FFFFFF"/>
                    <path d="M460,282 L490,282 L482,330 L452,330 Z" fill="#FFFFFF"/>
                    <path d="M540,282 L570,282 L562,330 L532,330 Z" fill="#FFFFFF"/>
                </g>
            </svg>
        `;
    }
};
