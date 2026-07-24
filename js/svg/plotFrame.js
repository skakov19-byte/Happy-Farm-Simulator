// svg/plotFrame.js — деревянная рамка грядки с землёй (100x100, inline SVG, без внешних id)

const SvgPlot = {
    // Возвращает markup БЕЗ обёртки <svg> — используется как фон внутри общего viewBox грядки
    frameMarkup() {
        return `
            <rect x="2" y="2" width="96" height="96" rx="10" fill="#8D6E63"/>
            <rect x="2" y="2" width="96" height="96" rx="10" fill="none" stroke="#6D4C41" stroke-width="3"/>
            <rect x="10" y="10" width="80" height="80" rx="5" fill="#5D4037"/>
            <g stroke="#4E342E" stroke-width="2" opacity="0.5" stroke-linecap="round" fill="none">
                <path d="M18,28 q8,-4 16,0"/>
                <path d="M48,20 q8,-4 16,0"/>
                <path d="M20,52 q8,-4 16,0"/>
                <path d="M54,58 q8,-4 16,0"/>
                <path d="M28,76 q8,-4 16,0"/>
                <path d="M58,80 q8,-4 16,0"/>
            </g>
            <rect x="10" y="10" width="80" height="80" rx="5" fill="none" stroke="#000000" stroke-opacity="0.22" stroke-width="6"/>
        `;
    }
};
