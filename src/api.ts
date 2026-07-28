import { seedData } from './seed'
import type { Account, PortalData } from './types'
import { canSeeInvestigation, canSeeJudicialRegistries, filterProfile, filterTransfer } from './permissions'

const DB_KEY = 'sfa-portal-db-v1'
const SESSION_KEY = 'sfa-portal-session-v1'
const wait = (ms = 180) => new Promise(resolve => setTimeout(resolve, ms))
const copy = <T,>(value: T): T => JSON.parse(JSON.stringify(value))

function loadRaw(): PortalData {
  const saved = localStorage.getItem(DB_KEY)
  if (!saved) {
    localStorage.setItem(DB_KEY, JSON.stringify(seedData))
    return copy(seedData)
  }
  try { return JSON.parse(saved) } catch { return copy(seedData) }
}

function saveRaw(data: PortalData) { localStorage.setItem(DB_KEY, JSON.stringify(data)) }

export interface ApiSnapshot extends Omit<PortalData, 'profiles' | 'transfers' | 'investigations'> {
  profiles: PortalData['profiles']
  transfers: PortalData['transfers']
  investigations: PortalData['investigations']
  judicialRegistries?: Array<{ id: string; type: string; nickname: string; actor: string; reason: string; date: string }>
}

function filterData(data: PortalData, user: Account | null): ApiSnapshot {
  const filtered: ApiSnapshot = {
    ...copy(data),
    accounts: user?.clearance === '7' || user?.clearance === '6' || user?.clearance === '5A' ? copy(data.accounts) : [],
    transfers: data.transfers.map(item => filterTransfer(user, item)),
    profiles: data.profiles.map(item => filterProfile(user, item)),
    investigations: data.investigations.filter(item => canSeeInvestigation(user, item)),
    audit: user?.clearance === '7' ? copy(data.audit) : [],
    approvals: user ? data.approvals.filter(a => user.clearance === '7' || a.applicant === user.nickname) : [],
  }
  if (canSeeJudicialRegistries(user)) {
    filtered.judicialRegistries = [
      {id:'jr1',type:'Иноагент',nickname:'Foreign_Contact',actor:'Head_Military_Judge',reason:'Доказанное иностранное финансирование',date:'19.07.2026'},
      {id:'jr2',type:'Экстремист',nickname:'Radical_Actor',actor:'Blas_Ferreira',reason:'Организация нападения на военный объект',date:'16.07.2026'},
      {id:'jr3',type:'Террорист',nickname:'Unknown_Bomber',actor:'Head_Military_Judge',reason:'Подготовка террористического акта',date:'12.07.2026'},
    ]
  }
  return filtered
}

export const mockApi = {
  async session(): Promise<Account | null> {
    await wait(80)
    const id = localStorage.getItem(SESSION_KEY)
    return id ? loadRaw().accounts.find(a => a.id === id) ?? null : null
  },
  async login(nickname: string, password: string): Promise<Account> {
    await wait(300)
    const account = loadRaw().accounts.find(a => a.nickname.toLowerCase() === nickname.toLowerCase() && a.password === password && a.active)
    if (!account) throw new Error('Неверный ник или пароль')
    localStorage.setItem(SESSION_KEY, account.id)
    return copy(account)
  },
  async quickLogin(id: string): Promise<Account> {
    await wait(150)
    const account = loadRaw().accounts.find(a => a.id === id)
    if (!account) throw new Error('Аккаунт не найден')
    localStorage.setItem(SESSION_KEY, id)
    return copy(account)
  },
  async logout() { localStorage.removeItem(SESSION_KEY); await wait(80) },
  async snapshot(user: Account | null) { await wait(); return filterData(loadRaw(), user) },
  async mutate(user: Account, action: string, target: string, transform: (data: PortalData) => void) {
    await wait(220)
    const data = loadRaw(); transform(data)
    data.audit.unshift({id:`l${Date.now()}`, actor:user.nickname, action, target, date:new Date().toLocaleString('ru-RU')})
    saveRaw(data)
    return filterData(data, user)
  },
  async reset() { localStorage.setItem(DB_KEY, JSON.stringify(seedData)); localStorage.removeItem(SESSION_KEY); await wait(150) },
  async syncVk(user: Account | null) {
    await wait(500)
    const data = loadRaw()
    if (!data.news.some(n => n.id === 'vk-sync')) data.news.unshift({id:'vk-sync',source:'VK',title:'Синхронизация VK завершена',excerpt:'Получена свежая запись сообщества nb69sl через демонстрационный адаптер.',content:'[B]VK Adapter[/B] готов к подключению PHP-прокси.',date:new Date().toLocaleString('ru-RU'),author:'VK · nb69sl',image:'./field-report.svg'})
    saveRaw(data); return filterData(data, user)
  },
  async syncGoogle(user: Account | null) { await wait(600); return filterData(loadRaw(), user) },
}
