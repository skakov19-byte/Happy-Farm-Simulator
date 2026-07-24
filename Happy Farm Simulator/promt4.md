# ЗАДАЧА: Интеграция Low-Poly 3D графики в игру

Замени всю примитивную графику (эмодзи, простые фигуры) на сгенерированные Low-Poly 3D изображения.

## 📁 СТРУКТУРА АССЕТОВ

Создай папку `/assets/images/` и сохрани все изображения:

```
/assets/images/
  /backgrounds/
    well-bg.png        — деревенский пейзаж (фон для колодца)
    farm-bg.png        — ферма сверху (фон для грядок)
    market-bg.png      — рыночная площадь (фон для рынка)
  /objects/
    well.png           — колодец
    plot-empty.png     — пустая грядка
    coin.png           — монета-доллар
  /plants/
    carrot-ready.png   — готовая морковь
    apple-tree-ready.png — яблоня с яблоками
    wheat-ready.png    — пшеница
    seedling.png       — росток (ранняя стадия)
  /upgrades/
    pump.png           — насос
    barrel.png         — бочка с водой
    fertilizer.png     — мешок удобрений
    watering-can.png   — лейка
```

## 🎨 ИНТЕГРАЦИЯ В HTML/CSS

### 1. Фоны экранов

В `index.html` добавь фоновые изображения для каждого экрана:

```css
.screen-well {
  background: url('/assets/images/backgrounds/well-bg.png') center/cover no-repeat;
}

.screen-farm {
  background: url('/assets/images/backgrounds/farm-bg.png') center/cover no-repeat;
}

.screen-market {
  background: url('/assets/images/backgrounds/market-bg.png') center/cover no-repeat;
}
```

### 2. Колодец (Экран 1)

Замени эмодзи 🪣 на изображение колодца:

```html
<div class="well-container">
  <img src="/assets/images/objects/well.png" alt="Колодец" class="well-image">
</div>
```

```css
.well-container {
  position: relative;
  width: 200px;
  height: 300px;
  cursor: pointer;
  transition: transform 0.2s ease-out;
}

.well-container:hover {
  transform: scale(1.05);
}

.well-container:active {
  transform: scale(0.95);
}

.well-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
}

/* Анимация при клике */
.well-container.active .well-image {
  animation: wellPump 0.5s ease-out;
}

@keyframes wellPump {
  0% { transform: translateY(0); }
  50% { transform: translateY(10px); }
  100% { transform: translateY(0); }
}
```

### 3. Грядки (Экран 2)

Замени простые div'ы на изображения грядок:

```html
<div class="plot" data-plot-id="0">
  <img src="/assets/images/objects/plot-empty.png" alt="Грядка" class="plot-image">
  <img src="/assets/images/plants/seedling.png" alt="Росток" class="plant-image" style="display: none;">
</div>
```

```css
.plot {
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.plot-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.plant-image {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 60%;
  object-fit: contain;
  transition: all 0.3s ease-out;
}

/* Стадии роста */
.plot.stage-1 .plant-image {
  width: 30%;
  height: 30%;
  opacity: 0.7;
}

.plot.stage-2 .plant-image {
  width: 50%;
  height: 50%;
  opacity: 0.9;
}

.plot.stage-3 .plant-image {
  width: 70%;
  height: 70%;
  opacity: 1;
  animation: plantBounce 1s infinite;
}

@keyframes plantBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-5px); }
}
```

### 4. Растения (разные типы)

Для каждого типа растения используй своё изображение:

```javascript
const plantImages = {
  carrot: '/assets/images/plants/carrot-ready.png',
  apple: '/assets/images/plants/apple-tree-ready.png',
  wheat: '/assets/images/plants/wheat-ready.png'
};

// При сборе урожая меняй изображение
function updatePlantVisual(plotId, plantType, stage) {
  const plot = document.querySelector(`[data-plot-id="${plotId}"]`);
  const plantImg = plot.querySelector('.plant-image');
  
  if (stage === 3) {
    plantImg.src = plantImages[plantType];
    plantImg.style.display = 'block';
  } else if (stage > 0) {
    plantImg.src = '/assets/images/plants/seedling.png';
    plantImg.style.display = 'block';
  } else {
    plantImg.style.display = 'none';
  }
}
```

### 5. Монеты (Экран 3)

Замени эмодзи  на изображение монеты:

```html
<div class="coin-counter">
  <img src="/assets/images/objects/coin.png" alt="Монеты" class="coin-icon">
  <span class="coin-amount">0</span>
</div>
```

```css
.coin-counter {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.9);
  padding: 10px 20px;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.coin-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  animation: coinSpin 3s infinite linear;
}

@keyframes coinSpin {
  0%, 100% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
}

.coin-amount {
  font-size: 24px;
  font-weight: bold;
  color: #F57F17;
}
```

### 6. Иконки апгрейдов (Магазин)

В модалке улучшений используй изображения:

```html
<div class="upgrade-item">
  <img src="/assets/images/upgrades/pump.png" alt="Насос" class="upgrade-icon">
  <div class="upgrade-info">
    <h3>Насос</h3>
    <p>+1 воды за клик</p>
    <span class="upgrade-cost">10 🪙</span>
  </div>
  <button class="upgrade-btn">Купить</button>
</div>
```

```css
.upgrade-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(255,255,255,0.95);
  border-radius: 15px;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.upgrade-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.upgrade-info {
  flex: 1;
}

.upgrade-info h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
}

.upgrade-info p {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #666;
}

.upgrade-cost {
  font-weight: bold;
  color: #F57F17;
}

.upgrade-btn {
  padding: 10px 20px;
  background: #8BC34A;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.upgrade-btn:hover {
  background: #7CB342;
  transform: scale(1.05);
}

.upgrade-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
```

## 🎯 АДАПТИВНОСТЬ

Убедись, что изображения масштабируются корректно:

```css
/* Мобильные устройства */
@media (max-width: 768px) {
  .well-container {
    width: 150px;
    height: 225px;
  }
  
  .plot {
    width: 80px;
    height: 80px;
  }
  
  .coin-icon {
    width: 30px;
    height: 30px;
  }
  
  .upgrade-icon {
    width: 50px;
    height: 50px;
  }
}
```

## ⚡ ОПТИМИЗАЦИЯ

1. **Ленивая загрузка:** Добавь `loading="lazy"` ко всем изображениям
2. **Кэширование:** Настрой кэш в `.htaccess` или сервере
3. **Сжатие:** Используй WebP формат, если браузер поддерживает

```html
<picture>
  <source srcset="/assets/images/objects/well.webp" type="image/webp">
  <img src="/assets/images/objects/well.png" alt="Колодец">
</picture>
```

## ✅ КРИТЕРИИ ГОТОВНОСТИ

1. Все эмодзи заменены на Low-Poly 3D изображения
2. Фоны экранов выглядят как полноценные сцены
3. Колодец анимируется при клике
4. Растения показывают стадии роста через размер и прозрачность
5. Монеты вращаются в счётчике
6. Иконки апгрейдов отображаются в магазине
7. Все изображения масштабируются на мобильных
8. Нет визуальных багов (наложения, обрезания)
9. Игра работает быстро (FPS > 50)
10. Прогресс сохраняется после перезагрузки

## 🚀 ПЛАН ВЫПОЛНЕНИЯ

**Шаг 1:** Создай папку `/assets/images/` и структуру подпапок.
**Шаг 2:** Замени фоны на всех 3 экранах.
**Шаг 3:** Замени колодец на Экране 1, добавь анимацию.
**Шаг 4:** Замени грядки на Экране 2, добавь стадии роста.
**Шаг 5:** Замени монеты на Экране 3, добавь вращение.
**Шаг 6:** Замени иконки апгрейдов в магазине.
**Шаг 7:** Добавь адаптивность для мобильных.
**Шаг 8:** Оптимизируй загрузку изображений.

После КАЖДОГО шага показывай результат и спрашивай, продолжать ли.