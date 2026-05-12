import React from 'react';
import { M, BM, FRef } from '../components/Math';

export function MathModel() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full mb-4">Глава 2</div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Математическая постановка</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          В предыдущей главе мы увидели, как физические законы приводят нас к уравнению Лапласа. Теперь мы формализуем геометрию задачи, определим граничные условия и введём понятие фундаментального решения уравнения Лапласа. Никаких «скачков» в логике — разбираем каждый индекс.
        </p>
      </header>

      <section className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
          Области и потенциалы
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 leading-loose">
          <p>
            Рассмотрим плоскопараллельное стационарное течение в координатной плоскости <M m={"Oxy"} />. Поставим задачу об обтекании полупроницаемого контура источником (или стоком). Координаты центра источника: <M m={"M_0(x_0, y_0)"} />.
          </p>
          <p>
            Гладкий контур <M m={"L"} /> делит безграничную область <M m={"D"} /> на две области:
          </p>
          <ul className="list-disc ml-6 space-y-2 mt-4 mb-6">
            <li><strong><M m={"D_1"} /> (внешняя):</strong> с коэффициентом проницаемости <M m={"k_1"} />. Мы полагаем, что источник находится именно здесь.</li>
            <li><strong><M m={"D_2"} /> (внутренняя):</strong> внутри контура <M m={"L"} />, с проницаемостью <M m={"k_2"} />.</li>
          </ul>
          <p>
            В областях <M m={"D_1"} /> и <M m={"D_2"} />, сопрягающихся вдоль контура <M m={"L"} />, проницаемости суть постоянные величины. При переходе через контур <M m={"L"} /> проницаемость меняется <strong>скачком</strong>. Потенциалы скоростей течения обозначим соответственно <M m={"\\varphi_1(M)"} /> и <M m={"\\varphi_2(M)"} />. Эти функции всюду в своих областях удовлетворяют уравнению Лапласа.
          </p>
        </div>
      </section>

      <section className="bg-zinc-50 p-5 md:p-8 rounded-3xl shadow-sm border border-zinc-200">
        <h2 className="text-2xl font-bold text-zinc-800 mb-6">Граничные условия <FRef id="bc_system">(6)</FRef></h2>
        <div className="text-zinc-700 leading-loose space-y-6">
          <p>
            На контуре <M m={"L"} /> эти потенциалы должны удовлетворять двум условиям непрерывности (давления и расхода). Мы ранее вывели, что <M m={"p_1 = p_2"} /> влечёт равенство потенциалов (если учесть постоянство плотности и высоты на контуре), поэтому <M m={"\\varphi_1(M) = \\varphi_2(M)"} />.
          </p>
          <p>
            Второе условие — непрерывность расхода жидкости через контур, что эквивалентно равенству нормальных компонент скорости: <M m={"v_{1n} = v_{2n}"} />. 
            Нормальная компонента вектора — это его проекция на вектор внешней нормали <M m={"\\vec{n}_M"} />, то есть скалярное произведение: <M m={"v_{1n} = \\vec{v}_1 \\cdot \\vec{n}_M"} /> и <M m={"v_{2n} = \\vec{v}_2 \\cdot \\vec{n}_M"} />.
          </p>
          <p>
            Вспомним закон Дарси. Учтем разные проницаемости для двух областей: <M m={"\\vec{v}_1 = k_1 \\nabla \\varphi_1"} /> и <M m={"\\vec{v}_2 = k_2 \\nabla \\varphi_2"} />.
            Подставим эти выражения скоростей в уравнение равенства нормальных компонент <M m={"v_{1n} = v_{2n}"} />:
          </p>
          <BM m={"k_1 (\\nabla \\varphi_1 \\cdot \\vec{n}_M) = k_2 (\\nabla \\varphi_2 \\cdot \\vec{n}_M)"} />
          <p>
            Скалярное произведение градиента функции на вектор нормали <M m={"(\\nabla \\varphi_\\nu \\cdot \\vec{n}_M)"} /> по определению является производной этой функции по направлению нормали: <M m={"\\frac{\\partial \\varphi_\\nu}{\\partial n_M}"} />. 
            Выполнив эту замену, мы получаем итоговую <strong>систему граничных условий <FRef id="bc_system">(6)</FRef></strong>:
          </p>
          
          <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 mt-4">
            <span className="text-sm text-zinc-500 uppercase tracking-widest font-bold font-mono">Уравнения <FRef id="bc_system">(6)</FRef></span>
            <FRef id="bc_potential" desc="Равенство давлений">
              <span className="text-lg"><M m={"\\varphi_1(M) = \\varphi_2(M)"} /></span>
            </FRef>
            <FRef id="bc_velocity" desc="Баланс масс (расходов)">
              <span className="text-lg"><M m={"k_1 \\frac{\\partial\\varphi_1}{\\partial n_M} = k_2 \\frac{\\partial\\varphi_2}{\\partial n_M}"} /></span>
            </FRef>
          </div>
          <p>
            <strong>Задача:</strong> по заданным граничным условиям найти потенциалы <M m={"\\varphi_\\nu"} /> (<M m={"\\nu=1,2"} />), определяющие поле скоростей.
          </p>
        </div>
      </section>

      <section className="bg-emerald-50 p-5 md:p-8 rounded-3xl shadow-sm border border-emerald-100">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Фундаментальное решение <FRef id="fundamental">(7)</FRef> и <FRef id="fundamental_q">(7')</FRef></h2>
        <div className="text-emerald-900/80 leading-loose space-y-4">
          <p>
            Фундаментальным решением уравнения Лапласа (в точке <M m={"M_0"} /> двумерной плоскости) является логарифмическая функция:
          </p>
          <div className="flex justify-center my-6">
            <div className="scale-110">
              <FRef id="fundamental" desc="Уравнение (7)">
                <M m={"\\varphi_0(M) = \\frac{1}{2\\pi} \\ln r + C"} />
              </FRef>
            </div>
          </div>
          <p>
            Где <M m={"r"} /> — расстояние <M m={"r = \\sqrt{(x - x_0)^2 + (y - y_0)^2}"} />. Потенциал <FRef id="fundamental">(7)</FRef> описывает течение жидкости от точечного источника единичной мощности (<M m={"q=1"} />) в среде с проницаемостью <M m={"k=1"} /> при <strong>отсутствии</strong> контура <M m={"L"} />.
          </p>
          <p>
            Для источника с мощностью <M m={"q"} /> в среде с проницаемостью <M m={"k"} /> (при отсутствии контура) скорость примет вид:
          </p>
          <div className="flex justify-center my-6">
            <FRef id="fundamental_q" desc="Уравнение (7')">
               Модифицированное фундаментальное решение
            </FRef>
          </div>
        </div>
      </section>

      <section className="bg-indigo-50 p-5 md:p-8 rounded-3xl shadow-sm border border-indigo-100 mt-8">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Представление решения: Формула <FRef id="total_potential">(8)</FRef></h2>
        <div className="text-indigo-900/80 leading-loose space-y-4">
          <p>
            Решение поставленной задачи (общий потенциал в каждой зоне <M m={"\\nu"} />) будем искать в виде суперпозиции базового фундаментального потока от скважины и потенциала возмущений, вызванного контуром. Функция примет вид:
          </p>
          <div className="flex justify-center my-6">
            <div className="scale-110">
              <FRef id="total_potential" desc="Уравнение (8)">
                Суперпозиция решений
              </FRef>
            </div>
          </div>
          <p>
             Обратите внимание: мы специально делим на <M m={"k_\\nu"} />. Это делается для математического удобства, чтобы при подстановке <FRef id="total_potential">(8)</FRef> в граничные условия <FRef id="bc_system">(6)</FRef> коэффициенты <M m={"k_\\nu"} /> красиво сокращались с производными, изолируя искомые возмущения <M m={"\\varphi^*"} />. Именно эту подстановку мы произведем в следующей главе.
          </p>
        </div>
      </section>
    </div>
  );
}
