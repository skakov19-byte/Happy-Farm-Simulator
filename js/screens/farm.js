// screens/farm.js — Экран 2: Ферма (выращивание)

const HARVEST_SHAKE_MS = 350; // должно совпадать с длительностью анимации .harvest-shake в CSS
const SWAY_DURATION_MS = 2400; // должно совпадать с длительностью анимации sway в CSS

const FarmScreen = {
    tickTimer: null,
    lastStage: {}, // index -> последняя показанная "культура-стадия", чтобы ловить смену для pop-анимации

    render() {
        const el = document.getElementById('screen-farm');
        el.innerHTML = `
            <div class="screen-bg">${SvgBackgrounds.farm()}</div>
            <div class="farm-wrap screen-content">
                <div class="farm-grid" id="farmGrid"></div>
                <button id="harvestAllBtn" class="btn">${SvgBasket.render()} Собрать всё</button>
            </div>
        `;
        document.getElementById('harvestAllBtn').addEventListener('click', () => FarmHarvest.harvestAll());

        this.renderGrid();
        // Сразу досчитываем рост за время, пока игра была закрыта (не ждём первый тик раз в сек)
        const grownWhileAway = this.tick();
        this.startGrowthLoop();

        return grownWhileAway;
    },

    // Раз в секунду проверяет, не выросли ли политые растения
    startGrowthLoop() {
        if (this.tickTimer) return;
        this.tickTimer = setInterval(() => this.tick(), 1000);
    },

    // Возвращает число клеток, созревших за этот вызов (используется для оффлайн-прогресса)
    tick() {
        const plots = GameState.data.farm.plots;
        let newlyReady = 0;

        plots.forEach((plot) => {
            if (plot && plot.watered && !plot.ready) {
                const elapsed = (Date.now() - plot.wateredAt) / 1000;
                if (elapsed >= plot.growTime) {
                    plot.ready = true;
                    newlyReady++;
                }
            }
        });

        if (Main.currentScreen === 'farm') {
            this.renderGrid();
        }

        return newlyReady;
    },

    renderGrid() {
        const grid = document.getElementById('farmGrid');
        if (!grid) return;

        const { plots, unlockedPlots } = GameState.data.farm;
        grid.innerHTML = plots
            .map((plot, index) => this.renderCell(plot, index, index < unlockedPlots))
            .join('');

        grid.querySelectorAll('.farm-cell').forEach((cellEl) => {
            cellEl.addEventListener('click', () => this.onCellClick(Number(cellEl.dataset.index)));
        });

        const readyCount = plots.filter((p) => p && p.ready).length;
        const harvestBtn = document.getElementById('harvestAllBtn');
        if (harvestBtn) harvestBtn.disabled = readyCount === 0;
    },

    renderCell(plot, index, unlocked) {
        if (!unlocked) {
            delete this.lastStage[index];
            return `<div class="farm-cell locked" data-index="${index}"><span class="lock-icon">🔒</span></div>`;
        }

        if (!plot) {
            delete this.lastStage[index];
            return `
                <div class="farm-cell empty" data-index="${index}">
                    <svg viewBox="0 0 100 100" class="plot-illustration" xmlns="http://www.w3.org/2000/svg">${SvgPlot.frameMarkup()}</svg>
                    <span class="plus-icon">➕</span>
                </div>
            `;
        }

        let stage;
        let stateClass;

        if (!plot.watered) {
            stage = 1;
            stateClass = 'needs-water';
        } else if (plot.ready) {
            stage = 3;
            stateClass = 'ready';
        } else {
            const progress = (Date.now() - plot.wateredAt) / 1000 / plot.growTime;
            stage = progress < 0.5 ? 1 : 2;
            stateClass = 'growing';
        }

        // Плавный pop (scale + fade) только когда стадия реально сменилась — не на каждый тик
        const stageKey = `${plot.type}-${stage}`;
        const popClass = this.lastStage[index] !== stageKey ? 'emoji-pop' : '';
        this.lastStage[index] = stageKey;

        // Покачивание синхронизируем с реальным временем через отрицательную задержку,
        // чтобы фаза не «прыгала» при пересоздании DOM-узла на каждом тике
        const swayDelay = -(Date.now() % SWAY_DURATION_MS);
        const swayStyle = stateClass !== 'needs-water' ? `transform-origin:50px 85px;animation-delay:${swayDelay}ms` : 'transform-origin:50px 85px;';

        return `
            <div class="farm-cell ${stateClass}" data-index="${index}">
                <svg viewBox="0 0 100 100" class="plot-illustration" xmlns="http://www.w3.org/2000/svg">
                    ${SvgPlot.frameMarkup()}
                    <g class="crop-plant ${popClass}" style="${swayStyle}">
                        ${SvgPlants.render(plot.type, stage)}
                    </g>
                </svg>
                ${!plot.watered ? '<span class="water-hint">💧</span>' : ''}
            </div>
        `;
    },

    onCellClick(index) {
        const state = GameState.data;
        if (index >= state.farm.unlockedPlots) return;

        const plot = state.farm.plots[index];
        if (!plot) {
            this.openPlantMenu(index);
            return;
        }

        if (!plot.watered) {
            this.waterPlot(index);
            return;
        }

        if (plot.ready) {
            FarmHarvest.harvestOne(index);
        }
        // ещё растёт, но не полито заново — по клику ничего не делаем
    },

    openPlantMenu(index) {
        const optionsHtml = Object.entries(Economy.CROPS)
            .map(
                ([key, crop]) => `
                <button class="btn plant-option" data-crop="${key}">
                    <span>${crop.sproutEmoji} ${crop.name}</span>
                    <small>${crop.growTime} сек · ${crop.waterCost} 💧 · урожай ${crop.yieldAmount} шт</small>
                </button>
            `
            )
            .join('');

        const close = UI.openModal(`
            <h3>Что посадить?</h3>
            <div class="plant-menu">${optionsHtml}</div>
        `);

        document.querySelectorAll('.plant-option').forEach((btn) => {
            btn.addEventListener('click', () => {
                Audio_.click();
                this.plant(index, btn.dataset.crop);
                close();
            });
        });
    },

    // Сажает выбранную культуру в клетку (время роста уже учитывает уровень удобрения)
    plant(index, cropKey) {
        const state = GameState.data;
        const crop = Economy.CROPS[cropKey];
        const fertilizerLevel = state.upgrades.fertilizer;
        const growTime = Math.max(5, Math.round(crop.growTime * Math.pow(0.9, fertilizerLevel)));

        state.farm.plots[index] = {
            type: cropKey,
            watered: false,
            wateredAt: null,
            ready: false,
            growTime
        };

        this.renderGrid();
    },

    // Тратит воду из общего запаса и запускает таймер роста
    waterPlot(index) {
        const state = GameState.data;
        const plot = state.farm.plots[index];
        const crop = Economy.CROPS[plot.type];
        const waterCost = Math.max(1, crop.waterCost - state.upgrades.autoWater);

        if (state.water < waterCost) {
            UI.showToast(`Не хватает воды 💧 (нужно ${waterCost})`);
            return;
        }

        state.water -= waterCost;
        plot.watered = true;
        plot.wateredAt = Date.now();

        Audio_.splash();
        Main.renderHeader();
        this.renderGrid();
    }
};
