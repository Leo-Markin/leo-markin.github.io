import React from 'react';
import { M, BM, FRef } from '../components/Math';

export function Numerical() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full mb-4">Глава 4</div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Сведение к СЛАУ (Численное решение)</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Аналитически решить полученное нами интегральное уравнение невозможно для произвольного контура. Мы переходим к этапу дискретизации: от интеграла к дискретной сумме, и от функции — к массиву точек. Здесь мы строго выводим системы <FRef id="param_curve">(14)</FRef>-<FRef id="velocity_discrete">(19)</FRef>.
        </p>
      </header>

      <section className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
          Параметризация контура <FRef id="param_curve">(14)</FRef> - <FRef id="kernel_param">(17)</FRef>
        </h2>
        <div className="text-slate-700 leading-loose space-y-6">
          <p>
            Зададим наш контур <M m={"L"} /> с помощью параметра <M m={"t \\in [0, S]"} /> (где <M m={"S"} /> — длина кривой). Пусть <M m={"N"} /> — текущая точка интегрирования с параметром <M m={"t"} />, а <M m={"M"} /> — фиксированная точка (коллокации) с параметром <M m={"t_0"} />. Опишем их координаты <FRef id="param_curve">(14)</FRef>:
          </p>
          <div className="flex justify-center my-4">
             <FRef id="param_curve" desc="Уравнения (14)">
               Параметрическое представление точек
             </FRef>
          </div>
          
          <p>
            Направим орты нормали <M m={"\\vec{n}_N"} /> во внешнюю область, а вектор <M m={"\\vec{r}_{NM}"} /> проведем от источника к наблюдателю. Вектор нормали и единичный вектор можно точно выразить через производные (скорости изменения) координат контура <M m={"x'_t, y'_t"} />. По формуле <FRef id="normal_vec">(15)</FRef>:
          </p>
          <div className="flex justify-center my-4 bg-slate-50 p-4 border border-slate-100 rounded-xl">
             <FRef id="normal_vec" desc="Формула (15)">
               Вектор нормали (n_N) к кривой
             </FRef>
          </div>

          <p>
            Теперь давайте детально разберём, как мы переходим от интеграла по кривой <M m={"L"} /> к обычному определённому интегралу по параметру <M m={"t"} />. В интеграле <FRef id="integral">(13)</FRef> у нас присутствует элемент длины дуги <M m={"dS_N"} />. 
          </p>
          <p>
            <strong>Что такое <M m={"dS_N"} />?</strong> По теореме Пифагора для бесконечно малого смещения по кривой, квадрат длины дуги равен сумме квадратов дифференциалов координат: <M m={"(dS_N)^2 = dx^2 + dy^2"} />. Так как наши координаты зависят от параметра <M m={"t"} />, то <M m={"dx = x'_t dt"} /> и <M m={"dy = y'_t dt"} />. Подставляя это, мы получаем <strong>формулу дифференциала длины дуги</strong>: 
          </p>
          <BM m={"dS_N = \\sqrt{{x'_t}^2 + {y'_t}^2} dt"} />
          <p>
            Обратите внимание на знаменатель в формуле единичной нормали <FRef id="normal_vec">(15)</FRef>! Чтобы нормаль была единичной по длине, мы делим вектор нормали <M m={"(-y'_t, x'_t)"} /> на его собственную длину — которая, как изящно оказывается, в точности равна скорости движения по кривой: <M m={"\\sqrt{{x'_t}^2 + {y'_t}^2}"} />. 
          </p>
          <p>
            В ядре интеграла <FRef id="integral">(13)</FRef> мы вычисляем скалярное произведение градиента фундаментального решения <M m={"\\nabla_M G"} /> (вектора) на вектор нормали <M m={"\\vec{n}_N"} />, и умножаем всё это на элемент дуги <M m={"dS_N"} />: <M m={"(\\nabla_M G \\cdot \\vec{n}_N) dS_N"} />. Если мы подставим в это выражение наши формулы, произойдет настоящая математическая магия — <strong>корень знаменателя нормали идеально сократится с корнем из дифференциала дуги!</strong>
          </p>
          <BM m={"\\left( \\nabla_M G \\cdot \\vec{n}_N \\right) dS_N = \\left( \\nabla_M G \\cdot \\frac{(-y'_t, x'_t)}{\\sqrt{{x'_t}^2 + {y'_t}^2}} \\right) \\left( \\sqrt{{x'_t}^2 + {y'_t}^2} dt \\right)"} />
          <p>
            Корни сокращаются, и остаётся скалярное произведение вектора градиента <M m={"(\\frac{\\partial G}{\\partial x}, \\frac{\\partial G}{\\partial y})"} /> на масштабированный (но уже без корня) вектор <M m={"(-y'_t, x'_t)"} />. 
            Полученное новое "параметрическое" ядро <M m={"K(t, t_0)"} /> принимает очень быстрый для вычисления вид <FRef id="kernel_param">(17)</FRef> (без медленных операций вычисления корней!), а само уравнение легко записывается в виде обычного одномерного интеграла <FRef id="integral_param">(16)</FRef>:
          </p>
          
          <div className="flex flex-col gap-4 items-center mt-6">
            <FRef id="kernel_param" desc="Формула ядра (17)">
               Скалярное произведение градиента и нормали (без корней!)
            </FRef>
            <FRef id="integral_param" desc="Уравнение (16)">
               Одномерный интеграл Φредгольма
            </FRef>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 p-5 md:p-8 rounded-3xl shadow-sm border border-amber-100 mt-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-6">2. Дискретизация и СЛАУ <FRef id="discrete">(18)</FRef></h2>
        <div className="text-amber-900/90 leading-loose space-y-4">
          <p>
            Разобьем контур по дуге <M m={"t"} /> на <M m={"n"} /> равных частей с шагом <M m={"h"} />. Получим узлы <M m={"E = \\{t_1, t_2, \\ldots, t_n\\}"} />. Вычисляя интеграл по <strong>правилу прямоугольников</strong>, непрерывное уравнение <FRef id="integral_param">(16)</FRef> превращается в систему из <M m={"n"} /> линейных алгебраических уравнений (СЛАУ) относительно неизвестных плотностей <M m={"g_k"} />.
          </p>
          
          <div className="flex justify-center p-6 bg-white rounded-2xl border border-amber-200 shadow-inner my-6">
            <FRef id="discrete" desc="Система (18)">
              Конечномерная аппроксимация (СЛАУ)
            </FRef>
          </div>

          <p>
            <strong>Почему <M m={"k \\neq m"} />?</strong> При <M m={"k = m"} /> точки совпадают, знаменатель ядра (расстояние) стремится к нулю, возникает сингулярность. В строгой теории потенциала доказывается, что для гладких кривых интеграл от ядра существует в смысле главного значения, и эта сингулярность уже "вынесена" в виде отдельного слагаемого <M m={"g_m"} />. Оставшийся интеграл на интервале <M m={"k=m"} /> полагается равным нулю. Именно поэтому в сумме этот член опускается, а на диагонали матрицы стоит <M m={"1"} />.
          </p>
        </div>
      </section>

      <section className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-200 mt-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</span>
          Поле скоростей <FRef id="velocity_discrete">(19)</FRef>
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 leading-loose">
           <p>Решив систему <FRef id="discrete">(18)</FRef>, мы получаем все неизвестные значения <M m={"g_k"} />. Это означает, что мы "размазали" нужную силу источников по контуру. Теперь мы можем восстановить скорость течения в ЛЮБОЙ точке плоскости <M m={"M"} />. Она складывается из скорости "оригинальной" скважины и суммы малых порций скоростей от наших дискретных элементов контура. Строго по формуле <FRef id="velocity_discrete">(19)</FRef>:</p>
           
           <div className="flex flex-col gap-4 items-center p-6 mt-4">
             <FRef id="velocity_parts" desc="Определения">
               Скорости от базового потенциала и контура
             </FRef>
             <FRef id="velocity_discrete" desc="Формула (19)">
               Итоговая система восстановления скоростей
             </FRef>
           </div>
           
           <p className="mt-4">
             Метод дискретизации позволяет решать задачу обтекания не только для окружностей, но и для произвольно кусочно-гладких кривых, что делает метод сверхмощным для аэро-гидродинамики! 
           </p>
        </div>
      </section>

    </div>
  );
}
