import { testAccounts } from './seed'
import { canSeeFullDivision, canSeeInvestigation, canSeeJudicialRegistries, filterProfile, filterTransfer, hasLevel } from './permissions'
import type { Account, Investigation, Profile, Transfer } from './types'

const byLevel = (level: Account['clearance']) => testAccounts.find(account => account.clearance === level)!
const checks: Array<[string, boolean]> = []
const check = (name: string, value: boolean) => checks.push([name, value])

const classifiedTransfer: Transfer = { id:'test', nickname:'Demo', actor:'Secret_Actor', from:'USAF', to:'DIS', reasonType:'Назначение', reason:'Секретная причина', date:'29.07.2026', classifiedDivision:'DIS', publicReason:false }
const profile: Profile = { nickname:'Demo', fullName:'Demo User', gender:'Мужской', birthDate:'01.01.2000', birthPlace:'SF', residence:'SF', citizenship:'USA', rank:'Майор', division:'DIS', position:'Agent DIS', biography:'', skills:[], serviceHistory:[], medals:[], secretSection:'SECRET', topSecretSection:'TOP SECRET', registryFlags:['Иноагент'] }
const publicInvestigation: Investigation = { id:'public', title:'Public', author:'DIS_Agent', clearance:'0', summary:'', content:'', date:'', editors:[] }
const dis1Investigation: Investigation = { ...publicInvestigation, id:'d1', clearance:'1D' }
const dis2Investigation: Investigation = { ...publicInvestigation, id:'d2', clearance:'2D' }
const judicialInvestigation: Investigation = { ...publicInvestigation, id:'mj', clearance:'5B' }

check('Гость наследует открытый уровень 0', hasLevel(null, '0'))
check('Гость не видит полный DIS', !canSeeFullDivision(null, 'DIS'))
check('1D видит полный DIS', canSeeFullDivision(byLevel('1D'), 'DIS'))
check('5B наследует 1D и видит DIS', canSeeFullDivision(byLevel('5B'), 'DIS'))
check('5B не наследует 2D', !hasLevel(byLevel('5B'), '2D'))
check('5B не получает командование SRT', !hasLevel(byLevel('5B'), '2S'))
check('Гость видит открытое расследование', canSeeInvestigation(null, publicInvestigation))
check('5B видит расследование 1D', canSeeInvestigation(byLevel('5B'), dis1Investigation))
check('5B не видит расследование 2D', !canSeeInvestigation(byLevel('5B'), dis2Investigation))
check('5B не видит расследование 5B', !canSeeInvestigation(byLevel('5B'), judicialInvestigation))
check('7 видит расследование 5B', canSeeInvestigation(byLevel('7'), judicialInvestigation))
check('Гость не видит судебные реестры', !canSeeJudicialRegistries(null))
check('5A не видит судебные реестры', !canSeeJudicialRegistries(byLevel('5A')))
check('5B видит судебные реестры', canSeeJudicialRegistries(byLevel('5B')))
check('7 видит судебные реестры', canSeeJudicialRegistries(byLevel('7')))
check('Неавторизованный перевод скрывает автора', filterTransfer(null, classifiedTransfer).actor === 'CLASSIFIED')
check('Неавторизованный перевод скрывает причину', filterTransfer(null, classifiedTransfer).reason === 'Нарушение внутренних НПА')
check('1D видит настоящего автора перевода DIS', filterTransfer(byLevel('1D'), classifiedTransfer).actor === 'Secret_Actor')
check('Гость не получает секретные разделы ЛД', !filterProfile(null, profile).secretSection && !filterProfile(null, profile).topSecretSection)
check('2D видит обычную секретную часть, но не сверхсекретную', filterProfile(byLevel('2D'), profile).secretSection === 'SECRET' && !filterProfile(byLevel('2D'), profile).topSecretSection)
check('5B видит обе секретные части и судебные флаги', filterProfile(byLevel('5B'), profile).topSecretSection === 'TOP SECRET' && filterProfile(byLevel('5B'), profile).registryFlags?.[0] === 'Иноагент')
check('Существует ровно 17 тестовых аккаунтов', testAccounts.length === 17)
check('Пароли тестовых аккаунтов уникальны', new Set(testAccounts.map(account => account.password)).size === 17)

const failed = checks.filter(([, passed]) => !passed)
checks.forEach(([name, passed]) => console.log(`${passed ? 'PASS' : 'FAIL'}: ${name}`))
if (failed.length) throw new Error(`Security checks failed: ${failed.length}`)
console.log(`Security checks passed: ${checks.length}/${checks.length}`)
