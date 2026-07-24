// economy.js — константы и формулы экономики: культуры, апгрейды, цены

const Economy = {
    // Стартовые условия игрока (см. Промт → «Стартовые условия»)
    START_BUCKET_MAX: 10,
    START_PLOTS: 3,
    MAX_PLOTS: 9,
    START_PUMP_LEVEL: 1,

    // Культуры: время роста (сек), стоимость полива (вода), урожай за сбор, базовая цена продажи
    CROPS: {
        carrot: { name: 'Морковь', growTime: 30, waterCost: 2, yieldAmount: 3, sellPrice: 3, sproutEmoji: '🌱', readyEmoji: '🥕' },
        wheat: { name: 'Пшеница', growTime: 60, waterCost: 3, yieldAmount: 5, sellPrice: 2, sproutEmoji: '🌱', readyEmoji: '🌾' },
        apple: { name: 'Яблоня', growTime: 120, waterCost: 10, yieldAmount: 10, sellPrice: 5, sproutEmoji: '🌱', readyEmoji: '🍎' }
    },

    // Случайные события при сборе урожая
    HARVEST_EVENT_CHANCE: 0.10, // суммарный шанс срабатывания события (делится поровну между золотым урожаем и вредителями)
    GOLDEN_MULTIPLIER: 2,
    PEST_MULTIPLIER: 0.7,

    // Апгрейды: базовая цена и множитель на уровень (цена = база * 1.15^уровень)
    UPGRADES: {
        pump: { name: 'Насос', icon: '🚰', base: 10, description: '+1 воды за клик' },
        container: { name: 'Тара', icon: '🪣', base: 25, description: '+10 к макс. объёму тары' },
        fertilizer: { name: 'Удобрение', icon: '🌿', base: 50, description: '-10% времени роста (мин. 5 сек)' },
        plot: { name: 'Грядка', icon: '🟫', base: 100, description: '+1 клетка на ферме' },
        autoWater: { name: 'Авто-полив', icon: '🚿', base: 500, description: '-1 воды на полив (мин. 1)' }
    },

    UPGRADE_GROWTH_RATE: 1.15,

    // Стоимость апгрейда на заданном уровне
    upgradeCost(upgradeKey, level) {
        const base = this.UPGRADES[upgradeKey].base;
        return Math.round(base * Math.pow(this.UPGRADE_GROWTH_RATE, level));
    }
};
