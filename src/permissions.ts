import type { Account, Clearance, Division, Investigation, Profile, Transfer } from './types'

const inherited: Record<Clearance, Clearance[]> = {
  '0': [], '1S': ['0'], '1D': ['0'], '2L': ['0'], '2N': ['0'],
  '2S': ['1S', '0'], '2D': ['1D', '0'], '3L': ['2L', '0'], '3N': ['2N', '0'],
  '3S': ['2S', '1S', '0'], '3D': ['2D', '1D', '0'],
  '4A': ['3L', '2L', '3N', '2N', '0'],
  '4B': ['3S', '2S', '1S', '3D', '2D', '1D', '0'],
  '5A': ['4A', '4B', '3L', '2L', '3N', '2N', '3S', '2S', '1S', '3D', '2D', '1D', '0'],
  '5B': ['1S', '1D', '0'],
  '6': ['5A', '4A', '4B', '3L', '2L', '3N', '2N', '3S', '2S', '1S', '3D', '2D', '1D', '0'],
  '7': ['6', '5B', '5A', '4A', '4B', '3L', '2L', '3N', '2N', '3S', '2S', '1S', '3D', '2D', '1D', '0'],
}

export const hasLevel = (user: Account | null, level: Clearance) => {
  if (!user) return level === '0'
  return user.clearance === level || inherited[user.clearance].includes(level)
}

export const canSeeFullDivision = (user: Account | null, division: Division) => {
  if (division === 'SRT') return hasLevel(user, '1S') || hasLevel(user, '2S') || hasLevel(user, '3S')
  if (division === 'DIS') return hasLevel(user, '1D') || hasLevel(user, '2D') || hasLevel(user, '3D')
  return true
}

export const canManageDivision = (user: Account | null, division: Division) => {
  const map: Partial<Record<Division, Clearance>> = { SEAL: '2L', NETC: '2N', SRT: '2S', DIS: '2D', USAF: '4A' }
  return !!map[division] && hasLevel(user, map[division]!)
}

export const canEditCharter = (user: Account | null, division: Division) => {
  const map: Partial<Record<Division, Clearance>> = { SEAL: '3L', NETC: '3N', SRT: '3S', DIS: '3D', USAF: '4A' }
  return !!map[division] && hasLevel(user, map[division]!)
}

export const canSeeJudicialRegistries = (user: Account | null) => !!user && (user.clearance === '5B' || user.clearance === '7')
export const canEditJudicialRegistries = (user: Account | null) => user?.clearance === '7'
export const canManageNews = (user: Account | null) => user?.clearance === '6' || user?.clearance === '7'
export const canApprove = (user: Account | null) => user?.clearance === '7'
export const canSeeSecretProfile = (user: Account | null) => !!user && (hasLevel(user, '2D') || user.clearance === '5B' || user.clearance === '7')
export const canSeeTopSecretProfile = (user: Account | null) => !!user && (user.clearance === '5B' || user.clearance === '7')

export const canSeeInvestigation = (user: Account | null, item: Investigation) => {
  if (item.clearance === '0') return true
  if (!user) return false
  if (item.clearance === '5B') return user.clearance === '7'
  if (user.clearance === '7') return true
  return hasLevel(user, item.clearance)
}

export const filterTransfer = (user: Account | null, item: Transfer): Transfer => {
  if (!item.classifiedDivision || canSeeFullDivision(user, item.classifiedDivision)) return item
  return { ...item, actor: 'CLASSIFIED', reason: item.publicReason ? item.reason : 'Нарушение внутренних НПА' }
}

export const filterProfile = (user: Account | null, item: Profile): Profile => {
  const clone = { ...item }
  if (!canSeeSecretProfile(user)) clone.secretSection = ''
  if (!canSeeTopSecretProfile(user)) {
    clone.topSecretSection = ''
    delete clone.registryFlags
  }
  return clone
}

export const clearanceLabel = (value: Clearance) => value === '0' ? 'Открытый' : `Допуск ${value}`
