import React from 'react';
import { M, FRef, Code } from '../components/Math';

export function CodeSolve() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full mb-4">Глава 7</div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Разбор кола: Решение СЛАУ и поля</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Финал нашего путешествия по коду. Мы соберём окончательную матрицу для разных параметров полупроницаемости <M m={"\\lambda"} />, решим СЛАУ и визуализируем, как контур искривляет поток жидкости.
        </p>
      </header>

      <section className="bg-slate-900 text-slate-300 p-5 md:p-8 rounded-3xl shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6">1. Решение системы уравнений</h2>
        <div className="leading-loose space-y-4">
          <p>
            Запустим цикл, который пройдется по разным значениям параметра <M m={"\\lambda"} /> (от -0.8 до 0.8), что соответствует разным соотношениям проницаемости грунта внутри и снаружи контура.
          </p>
          
          <Code code={`# --- 1. Сборка и решение алгебраической системы (СЛАУ 18) ---
for lam in np.arange(-0.8, 0.9, 0.2):
  lam = round(lam, 1)

  # Составляем матрицу левой части A_k,m = E_k,m - 2*lambda*K_k,m (Уравнение 18)
  # np.eye(n) - это единичная матрица (1 на диагонали, 0 иначе)
  A_matrix = np.eye(n) -  2 * lam * K_matrix

  # Координаты внешнего источника M0(x_0, y_0) (описано в разделе Фундаментальное решение 7)
  sx0, sx1 = 2, 0 

  # Вычисляем расстояние r_M0,N от скважины до каждой из n точек контура (Для формулы 8)
  r_s = np.sqrt((xx[0, :] - sx0)**2 + (xx[1, :] - sx1)**2) 
  
  # Правая часть уравнения: 2 * lambda * phi_0(M) - (СЛАУ 18 и ф-ла 7)
  B_vector = 2 * lam * (1 / (2 * np.pi)) * np.log(1 / r_s)

  # МАГИЯ РЕШЕНИЯ! Функция solve за долю секунды находит вектор g_k (Система 18)
  g = np.linalg.solve(A_matrix.astype(float), B_vector.astype(float))`} />

          <div className="bg-slate-800/80 p-5 rounded-xl border border-indigo-500/30">
            <h3 className="text-lg font-bold text-indigo-300 mb-2">Почему единичная матрица (np.eye) превращается в g_m?</h3>
            <p className="text-sm text-slate-300">
              Вспомним дискретизированное уравнение <FRef id="discrete">(18)</FRef>: мы ищем вектор неизвестных плотностей <M m={"\\vec{g}"} />. Левая часть уравнения СЛАУ для каждой <code>m</code>-ой точки наблюдения выглядит так: <M m={"g_m - 2\\lambda \\sum g_k K_{m,k} = B_m"} />.
            </p>
            <p className="text-sm text-slate-300 mt-2">
              Если мы запишем это в матричном виде <M m={"A \\cdot \\vec{g} = B"} />, нам нужно создать матрицу коэффициентов <M m={"A"} />.
            </p>
            <ul className="text-sm text-slate-300 mt-2 list-disc ml-5 space-y-1">
              <li>Коэффициенты перед <M m={"g_k"} /> при <M m={"k \\neq m"} /> равны <M m={"-2\\lambda K_{m,k}"} /> (это наша матрица ядра вне диагонали).</li>
              <li>Коэффициент перед <M m={"g_m"} /> (то есть когда <M m={"k = m"} />) состоит из двух частей: единичка от первого слагаемого <M m={"1 \\cdot g_m"} /> и минус интеграл. Но интеграл по отрезку с сингулярностью мы обнулили в <code>K_matrix</code> на главной диагонали! Поэтому там остаётся <strong>ровно 1</strong>.</li>
            </ul>
            <p className="text-sm text-slate-300 mt-2">
              Функция <code>np.eye(n)</code> как раз и генерирует матрицу, у которой везде нули, а на главной диагонали стоят единицы. Прибавляя её, мы математически точно добавляем то самое внеинтегральное слагаемое <M m={"g(M)"} /> из формулы <FRef id="integral">(13)</FRef>, которое возникло из-за скачка потенциала двойного слоя на границе! 
            </p>
          </div>

          <p>
            В результате этой коротенькой секции мы получили вектор <M m={"g"} /> — значения плотности распределения виртуальных "диполей" по всему контуру!
          </p>
        </div>
      </section>

      <section className="bg-slate-900 text-slate-300 p-5 md:p-8 rounded-3xl shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6">2. Построение поля скоростей</h2>
        <div className="leading-loose space-y-4">
          <p>
            Зная плотность <M m={"g"} />, мы можем найти скорость жидкости <M m={"\\vec{V}(M)"} /> в узлах прямоугольной сетки (<M m={"30 \\times 30"} />) для красивой картинки. Скорость равна градиенту <M m={"\\varphi_0"} /> от скважины плюс интегралу от нашего "двойного слоя" диполей.
          </p>

          <Code code={`  # --- 2. Восстановление глобального поля скоростей (Формула 19) ---
  n1 = 30
  x_g = np.linspace(-3, 3, n1) # Сетка координат
  y_g = np.linspace(-3, 3, n1)
  XM, YM = np.meshgrid(x_g, y_g) # Матрицы координат точек наблюдения M

  # Базовая скорость от источника \vec{v}_0(M) (Градиент от ур. 7, см. уравнение 19)
  V0_0 = sp.lambdify((x0, x1, y0, y1), dG_dx0, 'numpy')(XM, YM, sx0, sx1)
  V0_1 = sp.lambdify((x0, x1, y0, y1), dG_dx1, 'numpy')(XM, YM, sx0, sx1)

  # Символьно берём вторые производные фундаментального решения
  n0_s, n1_s = sp.symbols('n0_s n1_s')
  K_sym = dG_dx0 * n0_s + dG_dx1 * n1_s
  dv_star_0_sym = sp.diff(K_sym, y0)
  dv_star_1_sym = sp.diff(K_sym, y1)

  # Подготовка 3D тензоров для векторизованного интегрирования по контуру L
  XM_3D = XM[:, :, np.newaxis]
  YM_3D = YM[:, :, np.newaxis]
  XX0_3D = xx[0, :][np.newaxis, np.newaxis, :]
  XX1_3D = xx[1, :][np.newaxis, np.newaxis, :]
  N0_3D = Nrm0[np.newaxis, np.newaxis, :]
  N1_3D = Nrm1[np.newaxis, np.newaxis, :]

  # Превращаем символьные производные в быстрые numpy-функции
  dV0_star_f = sp.lambdify((x0, x1, y0, y1, n0_s, n1_s), dv_star_0_sym, 'numpy')
  dV1_star_f = sp.lambdify((x0, x1, y0, y1, n0_s, n1_s), dv_star_1_sym, 'numpy')

  # Возмущения скорости от контура \vec{v}^*(M)
  V_star_0 = np.sum(dV0_star_f(XX0_3D, XX1_3D, XM_3D, YM_3D, N0_3D, N1_3D) * g, axis=2)
  V_star_1 = np.sum(dV1_star_f(XX0_3D, XX1_3D, XM_3D, YM_3D, N0_3D, N1_3D) * g, axis=2)
  
  # Суммируем базовую скорость \vec{v}_0(M) и возмущения от контура \vec{v}^*(M) (Ур. 19)
  V_total_0 = V0_0 + V_star_0
  V_total_1 = V0_1 + V_star_1`} />

          <h3 className="text-xl font-bold text-white mt-8 mb-4">Борьба с сингулярностями при визуализации</h3>
          <p>
            Если точка сетки <code>(XM, YM)</code> случайно упадёт очень близко к контуру <M m={"L"} />, знаменатели в интеграле опять станут почти нулём, и программа нарисует в этой точке гигантскую стрелку, из-за которой все остальные стрелки (с нормальной скоростью) сожмутся в невидимые точки!
          </p>
          
          <Code code={`  # --- Визуальные поправки (Устранение сингулярностей графики) ---
  # Специфика численного интегрирования (Ур. 19): 
  # Вблизи контура L знаменатель ядра K стремится к нулю.
  dist_to_L = np.sqrt((XM_3D - XX0_3D)**2 + (YM_3D - XX1_3D)**2)
  min_dist = np.min(dist_to_L, axis=2)
  
  # Шаг разбиения контура h (упоминается в дискретизации перед СЛАУ 18)
  h_val = 2 * np.pi * R / n
  
  # Если точка визуальной сетки пала ближе одного шага h к сингулярности,
  # мы "стираем" ее (маскируем как NaN), чтобы quiver не сошел с ума
  V_total_0[min_dist < h_val] = np.nan
  V_total_1[min_dist < h_val] = np.nan
  
  # --- Итоговая визуализация поля скоростей ---
  plt.figure(figsize=(8, 8))
  plt.plot(x[0, :], x[1, :], 'k', linewidth=2, label='Контур L')
  plt.plot(sx0, sx1, 'ro', markersize=10, label='Сток (2,0)')
  plt.quiver(XM, YM, V_total_0, V_total_1, color='blue')
  plt.title(f'Обтекание полупроницаемого контура (λ = {lam})')
  plt.xlabel('x')
  plt.ylabel('y')
  plt.axis('equal')
  plt.grid(True, linestyle=':')
  plt.legend()
  plt.show()`} />

          <p>
            Эта элегантная маска "вырезает" точки на контуре. <code>NaN</code> (Not a Number) значит, что Matplotlib просто откажется рисовать вектор в этой "опасной" зоне, сохраняя красивый и ровный график (<code>quiver</code>) вокруг профиля!
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-tr from-slate-900 to-indigo-900 text-slate-100 p-5 md:p-8 rounded-3xl shadow-lg border border-indigo-800">
        <h2 className="text-2xl font-bold text-white mb-6">Итог</h2>
        <div className="leading-loose space-y-4">
          <p>
            Мы прошли большой путь от физического Закона Дарси до математического уравнения Лапласа, от аналитических интегралов к сингулярным матрицам, и наконец — к векторизованному коду на Python!
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-indigo-100">
            <li>Вы понимаете, откуда в коде взялись производные <M m={"G"} />.</li>
            <li>Вы знаете, почему на матричной диагонали нули, а вокруг единицы из единичной матрицы.</li>
            <li>И самое главное — вы понимаете, как математически симулируется проницаемость грунта без построения сложных сеток внутри него, а лишь через интегралы по его границе (<M m={"L"} />).</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
