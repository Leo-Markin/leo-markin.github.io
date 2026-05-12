import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BookOpen, Calculator, FunctionSquare, Code2, PlaySquare, Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { path: '/', label: '1. Физика процесса', icon: BookOpen },
  { path: '/math-model', label: '2. Математическая модель', icon: Calculator },
  { path: '/integral', label: '3. Метод граничных интегралов', icon: FunctionSquare },
  { path: '/numerical', label: '4. Численное решение', icon: Calculator },
  { path: '/code-geom', label: '5. Код: Контур и производные', icon: Code2 },
  { path: '/code-kernel', label: '6. Код: Декоратор и особенности', icon: Code2 },
  { path: '/code-broadcasting', label: '7. Код: Векторная магия', icon: Code2 },
  { path: '/code-solve', label: '8. Код: Решение СЛАУ и поля', icon: PlaySquare },
];

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-20 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Аэро-гидродинамика
        </h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors">
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 bg-white border-r border-slate-200 overflow-y-auto z-40 flex flex-col shadow-sm w-72 lg:w-80 transition-transform duration-300 ease-in-out md:translate-x-0 max-w-[85vw]",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-100 flex-shrink-0">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight hidden md:block">
            Аэро-гидродинамика:<br/>Обтекание профиля
          </h1>
          <h1 className="text-xl font-bold text-slate-900 md:hidden">
            Меню
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Подробный разбор теории и кода (Python)
          </p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm",
                isActive 
                  ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", "opacity-75 flex-shrink-0")} />
              <span className="leading-snug">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="p-6 border-t border-slate-100 text-xs text-slate-400 bg-slate-50/50 flex-shrink-0">
          Создано как статичное приложение. Чистый PWA / HTML. Не требует backend-сервера.
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 lg:ml-80 max-w-4xl px-5 py-8 md:px-12 md:py-16 mx-auto w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
