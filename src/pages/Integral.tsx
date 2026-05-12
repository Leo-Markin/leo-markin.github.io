import React from 'react';
import { Calculator } from 'lucide-react';
import { M, BM, FRef } from '../components/Math';

export function Integral() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full mb-4">Глава 3</div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Метод граничных интегралов</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Теория потенциала — один из самых мощных разделов математической физики. В этой главе мы выведем условия <FRef id="jump_cond_p">(9)</FRef> и <FRef id="infinity_cond">(10)</FRef>, введём потенциал двойного слоя <FRef id="double_layer">(11)</FRef>, предел его скачка <FRef id="double_layer_limit">(12)</FRef> и получим то самое Интегральное уравнение <FRef id="integral">(13)</FRef>. Мы ничего не пропустим.
        </p>
      </header>

      <section className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif">1. Потенциалы возмущений и условия на них</h2>
        <div className="text-slate-700 leading-loose space-y-6">
          <p>
            Функции <M m={"\\varphi_\\nu^*(M)"} /> — потенциалы возмущений, вызванные контуром. Так как <M m={"\\varphi_\\nu(M)"} /> и <M m={"\\varphi_0(M)"} /> удовлетворяют уравнению Лапласа, то <M m={"\\varphi_\\nu^*(M)"} /> также удовлетворяют ему в силу линейности оператора.
          </p>
          <p>
            Подставим наш общий потенциал <M m={"\\varphi_\\nu = (\\varphi_0 + \\varphi_\\nu^*)/k_\\nu"} /> в граничные условия <FRef id="bc_system">(6)</FRef>. 
            <br />Из условия давлений <M m={"\\varphi_1 = \\varphi_2"} /> на контуре получаем:
          </p>
          <BM m={"\\frac{\\varphi_0(M) + \\varphi_1^*(M)}{k_1} = \\frac{\\varphi_0(M) + \\varphi_2^*(M)}{k_2}"} />
          <p>
            Умножая, группируем члены и получаем первое условие системы <FRef id="jump_cond_p">(9)</FRef>:
          </p>
          <div className="flex justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <FRef id="jump_cond_p" desc="Система (9) - часть первая">
              Условие на скачок потенциалов
            </FRef>
          </div>
          
          <p>
            Из условия расходов <M m={"k_1 \\partial \\varphi_1 / \\partial n = k_2 \\partial \\varphi_2 / \\partial n"} />, подставляя замену, множитель <M m={"k"} /> сокращается, и у нас остаётся, что непрерывными должны быть производные самого возмущения. Это второе условие системы <FRef id="jump_cond_v">(9)</FRef>:
          </p>
          <div className="flex justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <FRef id="jump_cond_v" desc="Система (9) - часть вторая">
               Непрерывность нормальной производной
            </FRef>
          </div>

          <p>
            Для потенциала возмущения нужно также наложить условие затухания на бесконечности <FRef id="infinity_cond">(10)</FRef>:
          </p>
          <div className="flex justify-center p-4">
            <FRef id="infinity_cond" desc="Условие (10)">
              Отсутствие потока на бесконечности
            </FRef>
          </div>
        </div>
      </section>

      <section className="bg-pink-50 p-5 md:p-8 rounded-3xl shadow-sm border border-pink-100">
        <h2 className="text-2xl font-bold text-pink-900 mb-6">2. Потенциал двойного слоя <FRef id="double_layer">(11)</FRef> и <FRef id="double_layer_limit">(12)</FRef></h2>
        <div className="text-pink-900/80 leading-loose space-y-4">
          <p>
            Поскольку нормальная производная (скорость) возмущения должна быть непрерывной по условию <FRef id="jump_cond_p">(9)</FRef>, а сам потенциал возмущения претерпевает скачок, мы ищем решение в виде <strong>потенциала двойного слоя <FRef id="double_layer">(11)</FRef></strong>:
          </p>
          <div className="flex justify-center">
            <div className="scale-110 my-4">
              <FRef id="double_layer" desc="Уравнение (11)">
                Потенциал двойного слоя
              </FRef>
            </div>
          </div>
          <p>
            Здесь <M m={"g_\\nu(N)"} /> — искомая плотность особенностей на контуре, <M m={"G(N, M)"} /> — фундаментальное решение.
          </p>
          <p>
            По теоремам Сохоцкого-Племеля, когда точка <M m={"M"} /> приближается к контуру <M m={"L"} /> изнутри или снаружи, интеграл имеет разрыв (предельные значения <FRef id="double_layer_limit">(12)</FRef>). При подходе с разных сторон (знаки плюс и минус) возникает поправка <M m={"\\pm \\frac{g(M)}{2}"} />.
          </p>
          <div className="flex justify-center">
            <FRef id="double_layer_limit" desc="Уравнение (12)">
              Свойство скачка на границе
            </FRef>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 text-slate-100 p-5 md:p-8 rounded-3xl shadow-lg border border-slate-700 mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-5 md:p-8 opacity-10">
          <Calculator size={120} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 relative z-10">3. Вывод Интегрального Уравнения <FRef id="integral">(13)</FRef></h2>
        <div className="leading-loose space-y-6 relative z-10">
          <p>
            Если мы выберем плотность одинаковой с обеих сторон <M m={"g_1(M) = g_2(M) = g(M)"} />, то мы сможем удовлетворить второе условие системы (9) автоматически. По теории потенциала (в отличие от самого потенциала), производная потенциала двойного слоя по направлению нормали проходит через контур непрерывно (без скачка). Поэтому:
          </p>
          <BM m={"\\left( \\frac{\\partial \\varphi_1^*(M)}{\\partial n_M} \\right)^+ = \\left( \\frac{\\partial \\varphi_2^*(M)}{\\partial n_M} \\right)^-"} />
          <p>
            Это в точности удовлетворяет второму уравнению системы (9).
          </p>
          <p>
            Теперь займёмся первым уравнением (9). Подставим формулы скачка (12) со знаками <M m={"+"} /> (с внешней стороны <M m={"D_1"} />) и <M m={"-"} /> (с внутренней стороны <M m={"D_2"} />) в первое уравнение (9). Для краткости обозначим сам контурный интеграл за <M m={"W(M)"} />:
          </p>
          <BM m={"k_2 \\left( W(M) + \\frac{g(M)}{2} \\right) - k_1 \\left( W(M) - \\frac{g(M)}{2} \\right) = (k_1 - k_2) \\varphi_0(M)"} />
          <p>
            Раскроем скобки и сгруппируем слагаемые с неизвестной плотностью <M m={"g(M)"} /> слева, а интеграл <M m={"W(M)"} /> перенесём направо:
          </p>
          <BM m={"k_2 W(M) + k_2 \\frac{g(M)}{2} - k_1 W(M) + k_1 \\frac{g(M)}{2} = (k_1 - k_2) \\varphi_0(M)"} />
          <BM m={"\\frac{k_1 + k_2}{2} g(M) = (k_1 - k_2) \\varphi_0(M) + (k_1 - k_2) W(M)"} />
          <p>
            Разделим обе части на коэффициент при <M m={"g(M)"} />:
          </p>
          <BM m={"g(M) = 2 \\frac{k_1 - k_2}{k_1 + k_2} \\varphi_0(M) + 2 \\frac{k_1 - k_2}{k_1 + k_2} W(M)"} />
          <p>
            Обозначая дробь через параметр <M m={"\\lambda"} />, возвращая интеграл в развёрнутом виде и перенося его влево, мы получаем итоговое <strong>Главное Интегральное Уравнение <FRef id="integral">(13)</FRef></strong>:
          </p>
          
          <div className="flex justify-center my-8">
            <div className="bg-slate-900 p-6 rounded-2xl shadow-inner border border-slate-700/50">
              <FRef id="integral" desc="Уравнение (13)">
                Главное уравнение Фредгольма II рода
              </FRef>
            </div>
          </div>

          <p>
            Где параметр лямбда:
          </p>
          <div className="flex justify-center my-4">
            <FRef id="lambda" desc="Контраст проницаемостей">
               <M m={"\\lambda \\in (-1, 1)"} />
            </FRef>
          </div>
          
          <div className="bg-blue-500/20 border border-blue-400/30 p-5 rounded-2xl">
            <strong>Суть:</strong> Задача поиска двух функций в 2D-пространстве свелась к поиску ОДНОЙ функции <M m={"g(M)"} /> на 1D-контуре. Это интегральное уравнение второго рода типа Фредгольма. Разрешив его, мы восстановим всё поле!
          </div>
        </div>
      </section>
    </div>
  );
}
