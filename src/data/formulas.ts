export const formulas: Record<string, string> = {
  // Физика и течение
  darcy: "\\vec{v}(M) = \\nabla_M \\varphi(M), \\quad \\varphi(M) = -\\frac{K}{\\mu} (p(M) + \\gamma z)",
  continuity: "\\nabla_M \\cdot \\vec{v}(M) = 0",
  laplace: "\\Delta \\varphi(M) = 0",
  
  // Безразмерные и граничные условия
  char_values: "P_0 = \\gamma L_0, \\quad \\Phi_0 = \\frac{K_0 \\gamma L_0}{\\mu}, \\quad V_0 = \\frac{K_0}{\\mu} \\gamma",
  dimensionless: "\\vec{v}' = \\frac{\\vec{v}}{V_0}, \\quad K' = \\frac{K}{K_0}, \\quad \\varphi' = \\frac{\\varphi}{\\Phi_0}, \\quad \\nabla' = L_0 \\nabla_M",
  deriv_phi: "\\varphi' \\Phi_0 = -\\frac{K' K_0}{\\mu} (p' P_0 + \\gamma z' L_0) = -\\frac{K' K_0 \\gamma L_0}{\\mu} (p' + z') = -\\Phi_0 K' (p' + z')",
  deriv_v: "\\vec{v}' V_0 = \\frac{1}{L_0} \\nabla' (\\varphi' \\Phi_0) = \\frac{\\Phi_0}{L_0} \\nabla' \\varphi' = V_0 \\nabla' \\varphi'",
  dim_darcy: "\\vec{v}(M) = \\nabla_M \\varphi(M), \\quad \\varphi(M) = -K(p(M) + z)",
  
  // Граничные условия
  bc_system: "\\begin{cases} \\varphi_1(M) = \\varphi_2(M) \\\\ k_1 \\frac{\\partial \\varphi_1(M)}{\\partial n_M} = k_2 \\frac{\\partial \\varphi_2(M)}{\\partial n_M} \\end{cases}",
  bc_pressure: "p_1 = p_2, \\quad v_1 = v_2",
  bc_potential: "\\varphi_1(M) = \\varphi_2(M)",
  bc_velocity: "k_1 \\left( \\frac{\\partial \\varphi_1(M)}{\\partial n_M} \\right) = k_2 \\left( \\frac{\\partial \\varphi_2(M)}{\\partial n_M} \\right)",
  
  // Фундаментальное решение и потенциалы
  fundamental: "\\varphi_0(M) = \\frac{1}{2\\pi} \\ln r + C",
  fundamental_q: "\\varphi'_0(M) = \\frac{q}{2\\pi k} \\ln \\frac{1}{r} + C",
  radius: "r = \\sqrt{(x - x_0)^2 + (y - y_0)^2}",
  total_potential: "\\varphi_\\nu(M) = \\frac{\\varphi_0(M) + \\varphi_\\nu^*(M)}{k_\\nu}, \\quad \\nu=1,2",
  
  // Граничные условия для звездочек
  jump_cond_p: "k_2 \\varphi_1^*(M) - k_1 \\varphi_2^*(M) = (k_1 - k_2) \\varphi_0(M)",
  jump_cond_v: "\\left( \\frac{\\partial \\varphi_1^*(M)}{\\partial n_M} \\right)^+ = \\left( \\frac{\\partial \\varphi_2^*(M)}{\\partial n_M} \\right)^-",
  infinity_cond: "\\varphi_1^*(M) \\to 0 \\text{ при } r_{NM} \\to \\infty",
  
  // Формула двойного слоя
  double_layer: "\\varphi_\\nu^*(M) = \\int_L g_\\nu(N) \\nabla_M G(N,M) \\vec{n}_N dS_N",
  double_layer_limit: "{\\varphi_{1,2}^*(M)}^{\\pm} = \\int_L g_{1,2}(N) \\nabla_M G(N,M) \\vec{n}_N dS_N \\pm \\frac{g_{1,2}(M)}{2}",
  
  // Интегральное уравнение
  integral: "g(M) - 2\\lambda \\int_L g(N) \\nabla_M G(N,M) \\vec{n}_N dS_N = 2\\lambda \\varphi_0(M)",
  integral_param: "g(t_0) - 2\\lambda \\int_0^S g(t) K(t, t_0) dt = 2\\lambda \\varphi_0(t_0)",
  lambda: "\\lambda = \\frac{k_1 - k_2}{k_1 + k_2}, \\quad \\lambda \\in (-1, 1)",
  
  // Параметризация и дискретизация
  param_curve: "x_N = x(t), \\quad y_N = y(t), \\quad x_M = x(t_0), \\quad y_M = y(t_0)",
  normal_vec: "\\vec{n}_N = \\frac{-y'_t \\vec{i} + x'_t \\vec{j}}{\\sqrt{{x'_t}^2 + {y'_t}^2}}",
  discrete: "g_m - 2\\lambda \\sum_{\\substack{k=1 \\\\ k \\neq m}}^n g_k K(t_k, t_m) h = 2\\lambda \\varphi_0(t_m)",
  kernel_param: "K(t, t_0) = \\frac{\\partial G}{\\partial x} (-y'_t) + \\frac{\\partial G}{\\partial y} x'_t",
  velocity_discrete: "\\vec{V}(M) = \\vec{V}_0(M) + \\sum_{k=1}^n g_k \\vec{\\Omega}(t_k, M) h",
  velocity_parts: "\\vec{V}_0(M) = \\nabla_M \\varphi_0(M), \\quad \\vec{\\Omega}(t_k, M) = \\nabla_M K(t_k, M)",
  param_circle: "x_0 = R \\cos \\theta, \\quad x_1 = R \\sin \\theta, \\quad \\theta \\in [2\\pi, 0]"
};
