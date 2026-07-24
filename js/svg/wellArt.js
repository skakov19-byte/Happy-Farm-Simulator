// svg/wellArt.js — детальный деревянный колодец (200x300, inline SVG)
// Два состояния (ведро вверх/вниз) переключаются через CSS-класс .well-active
// на кнопке-обёртке — анимируется только группа .well-bucket-group (верёвка + ведро)

const SvgWell = {
    render() {
        return `
            <svg viewBox="0 0 200 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="well-stoneGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#90A4AE"/>
                        <stop offset="100%" stop-color="#78909C"/>
                    </linearGradient>
                    <linearGradient id="well-woodGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#8D6E63"/>
                        <stop offset="100%" stop-color="#6D4C41"/>
                    </linearGradient>
                    <linearGradient id="well-roofGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#A1887F"/>
                        <stop offset="100%" stop-color="#8D6E63"/>
                    </linearGradient>
                    <linearGradient id="well-bucketGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#CFD8DC"/>
                        <stop offset="100%" stop-color="#90A4AE"/>
                    </linearGradient>
                </defs>

                <!-- тень под колодцем -->
                <ellipse cx="100" cy="278" rx="72" ry="14" fill="#000000" opacity="0.18"/>

                <!-- каменная стенка (барабан основания) -->
                <path d="M34,232 C34,222 166,222 166,232 L162,268 C162,278 38,278 38,268 Z" fill="url(#well-stoneGrad)"/>
                <g stroke="#607D8B" stroke-width="2" opacity="0.4">
                    <line x1="40" y1="236" x2="40" y2="264"/>
                    <line x1="60" y1="238" x2="60" y2="266"/>
                    <line x1="140" y1="238" x2="140" y2="266"/>
                    <line x1="160" y1="236" x2="160" y2="264"/>
                </g>

                <!-- деревянные брёвна-опоры -->
                <rect x="34" y="92" width="20" height="142" rx="7" fill="url(#well-woodGrad)"/>
                <rect x="146" y="92" width="20" height="142" rx="7" fill="url(#well-woodGrad)"/>
                <g stroke="#5D4037" stroke-width="1.5" opacity="0.5">
                    <line x1="34" y1="120" x2="54" y2="120"/>
                    <line x1="34" y1="160" x2="54" y2="160"/>
                    <line x1="34" y1="200" x2="54" y2="200"/>
                    <line x1="146" y1="120" x2="166" y2="120"/>
                    <line x1="146" y1="160" x2="166" y2="160"/>
                    <line x1="146" y1="200" x2="166" y2="200"/>
                </g>

                <!-- треугольная черепичная крыша -->
                <path d="M14,96 L100,26 L186,96 Z" fill="url(#well-roofGrad)"/>
                <rect x="10" y="93" width="180" height="10" rx="3" fill="#795548"/>
                <g stroke="#795548" stroke-width="2" opacity="0.5">
                    <path d="M30,84 L170,84"/>
                    <path d="M42,68 L158,68"/>
                    <path d="M56,52 L144,52"/>
                </g>

                <!-- ворот (деревянный цилиндр) с ручкой -->
                <rect x="58" y="128" width="84" height="18" rx="9" fill="url(#well-woodGrad)"/>
                <line x1="142" y1="137" x2="158" y2="137" stroke="#5D4037" stroke-width="3" stroke-linecap="round"/>
                <circle cx="158" cy="137" r="6" fill="#5D4037"/>

                <!-- каменный обод и тёмное отверстие колодца -->
                <ellipse cx="100" cy="232" rx="66" ry="15" fill="url(#well-stoneGrad)"/>
                <ellipse cx="100" cy="231" rx="48" ry="9" fill="#37474F"/>

                <!-- верёвка и ведро — единая группа для анимации .well-active -->
                <g class="well-bucket-group">
                    <path d="M100,146 L100,210" stroke="#5D4037" stroke-width="3" fill="none"/>
                    <path d="M84,208 L116,208 L111,232 L89,232 Z" fill="url(#well-bucketGrad)" stroke="#455A64" stroke-width="1.5"/>
                    <path d="M88,208 Q100,196 112,208" stroke="#78909C" stroke-width="2.5" fill="none"/>
                </g>
            </svg>
        `;
    }
};
