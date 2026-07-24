// svg/svgUtils.js — общие помощники для генерации inline SVG-иллюстраций

const SvgUtils = {
    // Полоска травы: короткие изогнутые штрихи вдоль нижнего края
    grassBlades(xStart, xEnd, y, count, color) {
        let out = `<g stroke="${color}" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.55">`;
        for (let i = 0; i < count; i++) {
            const x = xStart + ((xEnd - xStart) / count) * i + (Math.sin(i * 12.9) * 6);
            const h = 10 + (Math.abs(Math.sin(i * 3.7)) * 8);
            const lean = Math.sin(i * 5.1) * 5;
            out += `<path d="M${x.toFixed(1)},${y} q${lean.toFixed(1)},-${h.toFixed(1)} 0,-${(h + 4).toFixed(1)}"/>`;
        }
        out += '</g>';
        return out;
    },

    // Силуэт облака из нескольких эллипсов
    cloud(cx, cy, scale, opacity) {
        return `
            <g transform="translate(${cx},${cy}) scale(${scale})" fill="#FFFFFF" opacity="${opacity}">
                <ellipse cx="0" cy="0" rx="42" ry="20"/>
                <ellipse cx="32" cy="-8" rx="28" ry="16"/>
                <ellipse cx="-30" cy="-4" rx="24" ry="14"/>
            </g>
        `;
    },

    // Простой силуэт человека (для рыночной толпы вдалеке)
    personSilhouette(cx, cy, scale, color) {
        return `
            <g transform="translate(${cx},${cy}) scale(${scale})" fill="${color}" opacity="0.55">
                <circle cx="0" cy="-26" r="8"/>
                <path d="M-10,0 Q0,-18 10,0 L8,26 L-8,26 Z"/>
            </g>
        `;
    },

    // Экранирует id уникальным суффиксом, чтобы несколько копий одной SVG
    // могли одновременно жить в DOM без коллизий id у градиентов/фильтров
    uid(prefix) {
        return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
    }
};
