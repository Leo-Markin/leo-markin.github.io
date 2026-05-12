import React from 'react';
import { M, FRef, Code } from '../components/Math';

export function CodeBroadcasting() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full mb-4">Глава 8</div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Разбор векторной магии: Broadcasting и np.newaxis</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Этот код часто вызывает шок при первом прочтении. Как матрица становится 3D-тензором? Как можно без циклов посчитать взаимодействие каждой точки контура с каждой точкой сетки? Разложим всё по полочкам: от осей до визуализации!
        </p>
      </header>

      <section className="bg-slate-900 text-slate-300 p-5 md:p-8 rounded-3xl shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6">Символьные вторые производные</h2>
        <div className="leading-loose space-y-4">
          <p>
            Прежде чем уходить в многомерные массивы, давайте разберем еще один хитрый кусок, где мы просим компьютер сделать аналитику за нас. В коде мы берем:
          </p>
          <Code code={`n0_s, n1_s = sp.symbols('n0_s n1_s')\nK_sym = dG_dx0 * n0_s + dG_dx1 * n1_s\ndv_star_0_sym = sp.diff(K_sym, y0)\ndv_star_1_sym = sp.diff(K_sym, y1)`} />
          <p>
            Для получения скорости <M m={"\\vec{v}^*"} /> нам нужен <strong>градиент</strong> от потенциала двойного слоя. Сам потенциал уже содержит ядро <M m={"K"} />, в которое входит скалярное произведение <em>первой</em> производной <M m={"\\nabla G"} /> на нормаль.
          </p>
          <p>
            Когда мы берем ещё один градиент оператором <M m={"\\nabla_M"} /> от всего интеграла, мы обязаны взять производные по координатам наблюдения <M m={"M(x, y)"} /> от самого ядра! Получаются <strong>вторые производные</strong> от логарифмического потенциала <M m={"\\varphi_0"} />.
          </p>
          <p>
            Вместо того чтобы писать эти огромные формулы руками (и неизбежно ошибиться в знаках), мы собираем символьное ядро <code>K_sym</code> и просим <code>sympy</code> взять от него производную по <M m={"y_0"} /> и <M m={"y_1"} />. Затем мы скомпилируем эти символьные формулы в быстрые <code>numpy</code>-функции с помощью <code>lambdify</code>.
          </p>
        </div>
      </section>

      <section className="bg-slate-900 text-slate-300 p-5 md:p-8 rounded-3xl shadow-lg border border-slate-800 mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">Что мы пытаемся сделать с векторами?</h2>
        <div className="leading-loose space-y-4">
          <p>
            Вспомним задачу: у нас есть сетка координат для построения тепловой карты и красивых стрелочек (quiver). Размер этой координатной сетки <M m={"30 \\times 30"} />. Всего — 900 точек. 
            Также у нас есть полупроницаемый контур, разбитый на <M m={"100"} /> отрезков. На каждом из этих 100 отрезков "сидит" свой маленький источник-диполь с силой <M m={"g_k"} />.
          </p>
          <p>
            Нам нужно получить скорость в КАЖДОЙ из 900 точек сетки. То есть каждая точка пространства <M m={"M_i"} /> испытывает влияние скорости от ВСЕХ 100 элементов контура. 
          </p>
          <div className="bg-slate-800/80 p-5 rounded-xl border border-rose-500/30 font-mono text-sm">
            <span className="text-rose-400"># Как это выглядит на "медленном" Python (с циклами for):</span><br/>
            V_star_0 = np.zeros((30, 30))<br/>
            for i in range(30):<br/>
            &emsp;for j in range(30):<br/>
            &emsp;&emsp;for k in range(n_contour): # 100<br/>
            &emsp;&emsp;&emsp;# Вычисляем влияние k-го элемента контура на (i,j) точку сетки<br/>
            &emsp;&emsp;&emsp;dV = compute_V_star(XM[i,j], YM[i,j], xx[0,k], xx[1,k], Nrm0[k], Nrm1[k])<br/>
            &emsp;&emsp;&emsp;V_star_0[i,j] += g[k] * dV
          </div>
          <p>
            Такой тройной вложенный цикл (<M m={"30 \\times 30 \\times 100 = 90\\,000"} /> итераций!) в Python будет работать <strong>медленно</strong>. Python на каждой итерации выделяет память под числа, вызывает функции, проверяет типы и так далее. Нам нужен способ заставить C-код внутри NumPy вычислить всё это за один раз. Это называется <strong>векторизация</strong>.
          </p>
        </div>
      </section>

      <section className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
          Архитектура массива
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 leading-loose">
          <p>
            Рассмотрим фрагмент кода:
          </p>
          <Code code={`XM_3D = XM[:, :, np.newaxis]
YM_3D = YM[:, :, np.newaxis]
XX0_3D = xx[0, :][np.newaxis, np.newaxis, :]
XX1_3D = xx[1, :][np.newaxis, np.newaxis, :]
N0_3D = Nrm0[np.newaxis, np.newaxis, :]
N1_3D = Nrm1[np.newaxis, np.newaxis, :]`} />
          <h3 className="font-bold border-b pb-2 mb-4">Оси NumPy и np.newaxis</h3>
          <p>
            Массивы NumPy — это списки элементов (1D), матрицы (2D), кубы (3D) и гиперкубы. У массивов есть "оси" (axis). У матрицы есть строки (ось 0) и столбцы (ось 1). 
            Команда <code>np.newaxis</code> (или <code>None</code>) добавляет <strong>фиктивную, виртуальную ось длины 1</strong> в указанном месте. 
          </p>
          <ul className="space-y-4 my-6 list-disc ml-5 w-full">
            <li>
              <strong>Матрицы сетки:</strong> Массив координат сетки <code>XM</code> имеет форму <code>(30, 30)</code>. 
              Команда <code>XM[:, :, np.newaxis]</code> означает: "Возьми все строки, все столбцы, и добавь новую третью ось (ось 2)". На выходе мы получаем форму <code>(30, 30, 1)</code>. Массив стал "стопкой" из одного листочка <M m={"30 \\times 30"} />.
            </li>
            <li>
              <strong>Массивы контура:</strong> Массив центров отрезков <code>xx[0, :]</code> имеет форму <code>(100,)</code> (это одномерный список из 100 элементов).
              Команда <code>xx[0, :][np.newaxis, np.newaxis, :]</code> делает его форму <code>(1, 1, 100)</code>. 
              Сначала две фиктивных оси, потом реальные 100 точек контура. То есть это теперь "куб", у которого нет "ширины" и "высоты", но есть "глубина".
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-indigo-50 p-5 md:p-8 rounded-3xl shadow-sm border border-indigo-100">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-sm">2</span>
          Магия Broadcasting (Растягивания)
        </h2>
        <div className="text-indigo-900/80 leading-loose space-y-4">
          <p>
            Теперь начинается настоящая магия линейной алгебры. Что сделает NumPy, если мы попытаемся сложить, вычесть или умножить эти массивы в одной формуле?
          </p>
          <p>
            В нашей функции <code>dV0_star_f()</code> они складываются, вычитаются и умножаются: "Эй, я <code>XM_3D</code>, меня нужно связать с <code>XX0_3D</code>". 
          </p>
          <div className="bg-white p-6 border border-indigo-200 rounded-xl font-mono text-sm space-y-2 mb-6 shadow-sm">
            <span>XM_3D_форма &nbsp;= (30, 30, \nbsp; 1)</span><br/>
            <span>XX0_3D_форма = ( 1, \nbsp; 1, 100)</span><br/>
            <hr className="border-indigo-100 my-2"/>
            <strong>Итог_формы &nbsp;= (30, 30, 100)</strong>
          </div>
          <p>
            NumPy видит, что оси, которые имеют размер <code>1</code>, можно "скопировать" чтобы массивы стали одинакового размера! 
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-4">
            <li>NumPy берёт листочек <code>XM_3D (30, 30, 1)</code> и копирует (растягивает) его 100 раз "вглубь экрана" до 100 слоев. Теперь в каждом слое записано одно и то же: координатная сетка M!</li>
            <li>Затем он берёт "глубинный столб" <code>XX0_3D (1, 1, 100)</code> и копирует его 30 раз по высоте и 30 раз по ширине! Теперь точки контура продублированы для каждого узла сетки.</li>
          </ul>
          <p className="mt-6 font-bold text-indigo-950">
             Они встретились!
          </p>
          <p>
            Теперь оба массива (виртуально) в памяти ведут себя так, будто они огромные блоки размера <code>(30, 30, 100)</code>. В одной клеточке этого блока (индексы: <code>[ряд_x=10, колонка_y=15, слой_k=42]</code>) теперь встретились координаты <strong>конкретного 42-го куска контура</strong> и координаты <strong>точки с координатами (10, 15) на нашей 2D-сетке</strong> наблюдения!
          </p>
          <p>
            И когда мы вызываем функцию скомпилированную в NumPy: <code>dV0_star_f(XX0, XX1, XM, YM, N0, N1) * g</code>, она мгновенно и параллельно (на уровне C-кода) рассчитывает матрицу <code>30x30x100</code> возмущений скорости всех элементов контура на все точки пространства. Точно так же, сила диполя <code>g (размер 100)</code> растягивается в <code>(1, 1, 100)</code> и домножается на результат.
          </p>
        </div>
      </section>

      <section className="bg-emerald-50 p-5 md:p-8 rounded-3xl shadow-sm border border-emerald-100">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center text-sm">3</span>
          Сведение к результату (Ось 2)
        </h2>
        <div className="text-emerald-900/80 leading-loose space-y-4">
          <p>
            Последний шаг — нам не нужна 3D матрица. Формула <FRef id="discrete">(19)</FRef> гласит, что скорость <M m={"v^*"} /> — это суммы эффектов (суперпозиция). Мы должны сложить влияние всех 100 кусочков контура на каждую точку <M m={"30 \\times 30"} />.
          </p>
          <Code code={`V_star_0 = np.sum(dV0_star_f(...) * g, axis=2)`} />
          <ul className="list-disc ml-6 space-y-2 mt-4">
            <li><code>axis=2</code> — означает просуммировать массив <strong>глубины</strong>. Мы как бы "сплющиваем" наш <code>(30, 30, 100)</code> куб.</li>
            <li>Мы складываем 100 слоев друг с другом.</li>
            <li>Результат — матрица <code>(30, 30)</code>! Именно та форма, которая нам и нужна была изначально, чтобы Matplotlib нарисовал 2D Векторное поле!</li>
          </ul>
          <p className="mt-4">
            В одной этой строке кода заключен такой вычислительный потенциал, что скорость выполнения может возрастать в десятки раз по сравнению с циклами в Python. Вот за что любят NumPy.
          </p>
        </div>
      </section>
    </div>
  );
}
