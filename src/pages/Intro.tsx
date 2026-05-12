import React from 'react';
import { M, BM, FRef } from '../components/Math';

export function Intro() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full mb-4">Глава 1</div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Введение и физическая постановка</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Начнем с самого фундамента. В этой главе мы рассмотрим исходную задачу, введём основные допущения, приведем закон Дарси и шаг за шагом выведем безразмерные уравнения скорости и потенциала. Вы увидите, как получается уравнение Лапласа. Никаких «пропущенных» формул — только строгий и последовательный вывод.
        </p>
      </header>

      <section className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
          Физическая постановка задачи
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 leading-loose">
          <p>
            Пусть течение жидкости, вызванное источником (или стоком), происходит в некоторой безграничной области грунта с постоянным коэффициентом проницаемости <M m={"k_1"} />. Предположим также, что в данном грунте имеется полупроницаемое включение с грунтом другой проницаемости <M m={"k_2"} />. Мы ограничены контуром <M m={"L"} />.
          </p>
          <p>
            На контуре раздела сред разных проницаемостей должны выполняться условия непрерывности давлений и расхода жидкости:
          </p>
          <div className="flex justify-center p-2 mb-4">
            <FRef id="bc_pressure" desc="Непрерывность давления и расхода">
              Давление и скорость не разрываются
            </FRef>
          </div>
          <p>
            Грунт имеет некоторую толщину и в общем случае задача трёхмерная. Для упрощения модели будем считать, что течение во всех горизонтальных плоскостях (по всей толщине грунта) одинаково. Такое течение называется <strong>плоским или плоскопараллельным</strong>, если все частицы, лежащие на одном и том же перпендикуляре к некоторой неподвижной плоскости, имеют одинаковые давление, плотность и движутся параллельно этой плоскости. Таким образом, течения во всех плоскостях перпендикулярных к оси <M m={"z"} /> совершенно одинаковы.
          </p>
        </div>
      </section>

      <section className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
          Основные уравнения и Закон Дарси
        </h2>
        <div className="text-slate-700 leading-loose space-y-6">
          <p>
            Рассмотрим стационарную фильтрацию: мы допускаем, что жидкость <strong>идеальная</strong> (не оказывает сопротивления при скольжении одного слоя по другому) и <strong>несжимаемая</strong> (<M m={"\\rho = \\text{const}"} />). Среда недеформируемая и изотропная. Стационарная фильтрация несжимаемой жидкости описывается линейным законом Дарси и уравнением неразрывности <FRef id="darcy">(1)</FRef> и <FRef id="continuity">(2)</FRef>:
          </p>
          
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
            <h3 className="font-bold text-center mb-2">Уравнение <FRef id="darcy">(1)</FRef></h3>
            <FRef id="darcy" desc="Закон Дарси">
              Связь скорости и потенциала
            </FRef>
            
            <h3 className="font-bold text-center mb-2 mt-6">Уравнение <FRef id="continuity">(2)</FRef></h3>
            <div className="flex justify-center">
              <FRef id="continuity" desc="Уравнение неразрывности">
                Дивергенция равна нулю
              </FRef>
            </div>
          </div>

          <p>
            Где <M m={"\\vec{v}(M)"} /> ─ скорость фильтрации, <M m={"K"} /> ─ коэффициент проницаемости среды (постоянный для однородной среды), <M m={"\\mu"} /> ─ вязкость жидкости, <M m={"\\nabla_M"} /> ─ оператор Гамильтона по координате точки <M m={"M"} />, <M m={"\\varphi(M)"} /> ─ потенциал скорости фильтрации, <M m={"p(M)"} /> ─ давление, <M m={"\\gamma"} /> ─ удельный вес жидкости, <M m={"z"} /> ─ вертикальная координата.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 md:p-8 rounded-3xl shadow-sm border border-indigo-100">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6">3. Обезразмеривание: как выводятся формулы <FRef id="char_values">(3)</FRef>, <FRef id="dimensionless">(4)</FRef>, <FRef id="dim_darcy">(1')</FRef></h2>
        <div className="text-indigo-900/80 leading-loose space-y-4">
          <p>Чтобы привести уравнения к удобному универсальному виду (сделать их свободными от единиц измерения), мы выбираем характерные величины для масштабирования (уравнение <FRef id="char_values">(3)</FRef>):</p>
          <div className="flex justify-center p-2 mb-4 bg-white/60 rounded-xl">
            <FRef id="char_values" desc="Характерные величины (3)">
               Масштабы: давление, потенциал, скорость
            </FRef>
          </div>
          <p>Теперь вводим безразмерные переменные (через штрихи), деля каждую физическую величину на её характерный масштаб (уравнение <FRef id="dimensionless">(4)</FRef>):</p>
          <div className="flex justify-center p-2 mb-4 bg-white/60 rounded-xl">
            <FRef id="dimensionless" desc="Безразмерные переменные (4)">
               Подстановка размерных компонентов
            </FRef>
          </div>
          
          <h3 className="font-bold text-indigo-950 mt-8 mb-2">Строгий вывод уравнения <FRef id="dim_darcy">(1')</FRef></h3>
          <p>Подставим наши безразмерные переменные в исходный закон Дарси <FRef id="darcy">(1)</FRef>. Сначала — для потенциала:</p>
          <div className="flex justify-center p-2 mb-4 bg-white/60 rounded-xl">
            <FRef id="deriv_phi" desc="Вывод потенциала">
               Шаг 1: Подстановка потенциала
            </FRef>
          </div>
          <p>Разделив обе части на <M m={"\\Phi_0"} />, мы получаем <M m={"\\varphi' = -K'(p' + z')"} />.</p>
          <p>Теперь подставим безразмерные переменные в выражение для скорости <M m={"\\vec{v}(M)"} />:</p>
          <div className="flex justify-center p-2 mb-4 bg-white/60 rounded-xl">
            <FRef id="deriv_v" desc="Вывод скорости">
               Шаг 2: Подстановка градиента
            </FRef>
          </div>
          <p>Разделив обе части на <M m={"V_0"} />, получаем <M m={"\\vec{v}' = \\nabla' \\varphi'"} />. Опустив штрихи над всеми величинами для простоты дальнейшей записи, мы приходим к финальному <strong>уравнению <FRef id="dim_darcy">(1')</FRef></strong>:</p>
          
          <div className="flex justify-center p-4 bg-white font-bold text-indigo-900 rounded-2xl shadow">
            <div className="flex-col justify-center gap-4 text-center">
              <span className="block mb-2 text-sm text-slate-400">Уравнение <FRef id="dim_darcy">(1')</FRef></span>
              <FRef id="dim_darcy" desc="Безразмерный закон Дарси (1')">
                 Итоговая обезразмеренная система
              </FRef>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-200 mt-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">4</span>
          Уравнение Лапласа <FRef id="laplace">(5)</FRef>
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 leading-loose">
          <p>
            Из безразмерных уравнений <FRef id="dim_darcy">(1')</FRef> и несжимаемости <FRef id="continuity">(2)</FRef> мы легко получаем самое главное уравнение. Подставим выражение для скорости в уравнение неразрывности:
          </p>
          <BM m={"\\nabla_M \\cdot \\vec{v}(M) = \\nabla_M \\cdot (\\nabla_M \\varphi(M)) = \\Delta \\varphi(M) = 0"} />
          <p>
            Оператор дивергенции <M m={"\\nabla \\cdot"} />, примененный к оператору градиента <M m={"\\nabla"} />, дает знаменитый оператор Лапласа <M m={"\\Delta"} />. Таким образом, потенциал течения удовлетворяет <strong>Уравнению Лапласа <FRef id="laplace">(5)</FRef></strong>:
          </p>
          <div className="flex justify-center p-4 bg-slate-50 rounded-2xl border">
            <FRef id="laplace" desc="Уравнение Лапласа (5)">
              Фундамент нашей модели!
            </FRef>
          </div>
        </div>
      </section>

    </div>
  );
}
