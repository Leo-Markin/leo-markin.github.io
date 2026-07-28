export type Clearance = '0' | '1S' | '1D' | '2L' | '2N' | '2S' | '2D' | '3L' | '3N' | '3S' | '3D' | '4A' | '4B' | '5A' | '5B' | '6' | '7'
export type Division = 'USAF' | 'SEAL' | 'NETC' | 'SRT' | 'DIS' | 'GS' | 'MJ'

export interface Account {
  id: string
  nickname: string
  password: string
  clearance: Clearance
  division: Division
  position: string
  rank: string
  isGeneralStaff?: boolean
  active: boolean
}

export interface Member {
  nickname: string
  division: Division
  position: string
  rank: string
  callsign?: string
  isGeneralStaff?: boolean
}

export interface NewsItem {
  id: string
  source: 'VK' | 'PORTAL'
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  image: string
  pinned?: boolean
}

export interface Transfer {
  id: string
  nickname: string
  actor: string
  from: string
  to: string
  reasonType: string
  reason: string
  date: string
  classifiedDivision?: 'DIS' | 'SRT'
  publicReason?: boolean
}

export interface Sanction {
  id: string
  offender: string
  issuer: string
  type: string
  reason: string
  evidence: string
  date: string
  division: Division | 'ARMY'
  status: 'active' | 'served' | 'cancelled'
}

export interface BlacklistEntry {
  id: string
  offender: string
  issuer: string
  reason: string
  evidence: string
  degree: number
  date: string
  division: Division | 'ARMY'
  status: 'active' | 'removed' | 'pending'
}

export interface Investigation {
  id: string
  title: string
  author: string
  clearance: Clearance
  summary: string
  content: string
  date: string
  editors: string[]
  lockedBySenior?: boolean
}

export interface Medal {
  id: string
  name: string
  division: Division | 'ARMY'
  image: string
  statute: string
  privilege: string
  recipients: string[]
}

export interface Profile {
  nickname: string
  fullName: string
  gender: string
  birthDate: string
  birthPlace: string
  residence: string
  citizenship: string
  rank: string
  division: Division
  position: string
  biography: string
  skills: string[]
  serviceHistory: string[]
  medals: string[]
  secretSection: string
  topSecretSection: string
  registryFlags?: string[]
}

export interface Approval {
  id: string
  type: string
  applicant: string
  target: string
  summary: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface AuditEntry {
  id: string
  actor: string
  action: string
  target: string
  date: string
}

export interface PortalData {
  accounts: Account[]
  members: Member[]
  news: NewsItem[]
  transfers: Transfer[]
  sanctions: Sanction[]
  blacklists: BlacklistEntry[]
  investigations: Investigation[]
  medals: Medal[]
  profiles: Profile[]
  approvals: Approval[]
  audit: AuditEntry[]
}
