import React from 'react';
import { M, FRef, Code } from '../components/Math';

export function CodeKernel() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full mb-4">Глава 6</div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Разбор кола: Декоратор и Особенности</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Самая хитрая часть численных методов при работе с фундаментальными решениями — это обработка сингулярностей (делений на ноль). В этом блоке кода мы создадим элегантный "перехватчик" ошибок.
        </p>
      </header>

      <section className="bg-slate-900 text-slate-300 p-5 md:p-8 rounded-3xl shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6">Подготовка квадратных матриц (Сетка NxN)</h2>
        <div className="leading-loose space-y-4">
          <p>
            Матрица СЛАУ собирает взаимодействия <strong>каждого</strong> элемента контура с <strong>каждым</strong> другим элементом. Нам нужно подставить в формулу градиента все возможные пары координат <M m={"(x_k, y_m)"} />. Для этого используется <code>meshgrid</code>.
          </p>
          
          <Code code={`# --- Подготовка матриц для СЛАУ (Уравнение 18) ---
# Создание двумерных решёток всех пар точек (x_k, x_m)
X0m, X0k = np.meshgrid(xx[0, :], xx[0, :])
X1m, X1k = np.meshgrid(xx[1, :], xx[1, :])

# Растягивание компонентов векторов нормалей (n_N) до квадратной матрицы
Nrm0_matrix, _ = np.meshgrid(Nrm0, Nrm0)
Nrm1_matrix, _ = np.meshgrid(Nrm1, Nrm1)`} />

          <p>
            Функция <code>meshgrid</code> создаёт двумерные сетки (матрицы размером <M m={"n \\times n"} />) из одномерных массивов. Давайте разберём переменные:
          </p>
          <ul className="list-disc leading-relaxed ml-6 mt-4 space-y-2 text-slate-300">
            <li><strong><code>X0k</code></strong>: Матрица, в которой каждая строка — это копия X-координат (<M m={"0"} /> — индекс оси <M m={"X"} />). Индекс <strong><code>k</code></strong> означает, что это координаты текущей <em>точки интегрирования</em> <M m={"N"} />, "бегущей" по контуру.</li>
            <li><strong><code>X0m</code></strong>: Матрица, в которой каждый столбец — это копия X-координат. Индекс <strong><code>m</code></strong> означает, что это координаты <em>точки наблюдения</em> <M m={"M"} /> (точки коллокации), в которой мы составляем уравнение.</li>
            <li><strong><code>X1k</code></strong> и <strong><code>X1m</code></strong>: Аналогичные матрицы для Y-координат (<M m={"1"} /> — индекс оси <M m={"Y"} />).</li>
          </ul>
          <p className="mt-4">
            В результате, если мы возьмём любой элемент матриц с индексами <code>[i, j]</code> (например, <code>i</code>-я строка, <code>j</code>-й столбец), мы мгновенно получим "парочку": <code>(X0m[i,j], X1m[i,j])</code> будут координатами точки наблюдения <M m={"m=i"} />, а <code>(X0k[i,j], X1k[i,j])</code> — координатами точки интегрирования <M m={"k=j"} />. Это позволяет посчитать расстояния и ядро сразу для всех точек контура за один векторный удар вычислений процессора, вообще без медленных циклов <code>for</code>!
          </p>
        </div>
      </section>

      <section className="bg-slate-900 text-slate-300 p-5 md:p-8 rounded-3xl shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6">Укрощение бесконечности: декоратор <code>withoutZero</code></h2>
        <div className="leading-loose space-y-4">
          <p>
            Что произойдет на главной диагонали матрицы? Точка наблюдения совпадет с точкой интегрирования. <M m={"r = \\sqrt{(x - x)^2 + (y - y)^2} = 0"} />. При попытке подставить это в нашу производную от <M m={"\\ln(1/r)"} />, Python попытается разделить на ноль и выбросит ошибку (получим массив из страшных <code>NaN</code> — Not a Number).
          </p>
          <p>
            В 4-й главе мы узнали, что по теории интеграл с таким сингулярным ядром берётся в смысле "главного значения", и для прямолинейного отрезка нормальная производная на самом деле <strong>равна нулю</strong> (так как вектор нормали перпендикулярен самому отрезку, а логарифмический потенциал меняется только вдоль отрезка). Но Python этого не знает! Мы должны принудительно обнулить эти элементы, не уронив программу.
          </p>

          <Code code={`myeps = 1e-12

def withoutZero(sFunct = None, minDist = myeps):
    # Декоратор для безопасного вычисления ядра интеграла (Уравнение 17)
    def vectorFunct(A, B, C, D):
        # Логическая маска: где расстояние между x_k и x_m больше погрешности?
        # Это защищает нас от сингулярностей при k = m в СЛАУ (18)
        gd = ((A - C)**2 + (B - D)**2) > minDist**2
        
        # lambdify - превращает символьную sympy-формулу в быструю numpy-функцию
        func_raw = sp.lambdify((x0, x1, y0, y1), sFunct, modules='numpy')
        
        # Делаем копию координат x_k
        AA = A.copy()
        
        # ХИТРОСТЬ: Там где точки совпали (False в маске gd), сдвигаем координату!
        AA[np.logical_not(gd)] += 1
        
        # Результирующая матрица по умолчанию заполнена нулями
        result = np.zeros_like(A, dtype=float)
        
        # Вычисляем функцию. Там где был сдвиг, ошибки деления на 0 уже не будет.
        # Но мы берем результаты ТОЛЬКО для "хороших" валидных точек (маска gd)
        result[gd] = func_raw(AA, B, C, D)[gd]
        
        # Для диагонали (где gd=False) в матрице result останутся нули (по умолчанию)
        # Это строго соответствует замечанию к СЛАУ (18) о равенстве нулю интеграла
        return result
    return vectorFunct`} />

          <p className="p-4 bg-slate-800/50 rounded-xl my-4 italic">
            <strong>Как это работает шаг за шагом:</strong><br/>
            1. Находим "плохие" места (где знаменатель почти ноль).<br/>
            2. Искусственно добавляем туда <code>+1</code>, чтобы при вызове функции не словить <code>ZeroDivisionError</code>.<br/>
            3. Запускаем "глупую" формулу для всех точек.<br/>
            4. Выбрасываем "мусорные" сдвинутые результаты на диагонали, оставляя чистые нули!
          </p>
        </div>
      </section>

      <section className="bg-slate-900 text-slate-300 p-5 md:p-8 rounded-3xl shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6">Сборка финального ядра</h2>
        <div className="leading-loose space-y-4">
          <p>
            Теперь смело применяем наш безопасный декоратор к обоим компонентам градиента и домножаем на нормаль.
          </p>

          <Code code={`# --- Сборка матрицы ядра K(t_k, t_m) (Формула 17 и СЛАУ 18) ---
# Вычисляем dG/dx0 и dG/dx1 для всех 100x100 комбинаций без нулей на диагонали!
KF0 = withoutZero(dG_dx0, myeps)(X0k, X1k, X0m, X1m)
KF1 = withoutZero(dG_dx1, myeps)(X0k, X1k, X0m, X1m)

# Собираем ядро K(t_k, t_m) = (nabla G * n_N) (Уравнение 17)
# Скалярное произведение компонента градиента на компонент нормали
K_matrix = KF0 * Nrm0_matrix + KF1 * Nrm1_matrix`} />

          <p>
            Матрица матрица <code>K_matrix</code> готова. Это и есть главный кирпичик для сбора коэффициентов СЛАУ, к которому мы перейдём в следующем шаге!
          </p>
        </div>
      </section>
    </div>
  );
}
