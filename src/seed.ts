import type { Account, Member, PortalData } from './types'

const accountRows: Array<[string, string, string, string, string]> = [
  ['Recruit_Demo', '0', 'USAF', 'Recruit USAF', 'Рядовой'],
  ['SRT_Fighter', '1S', 'SRT', 'Fighter SRT', 'Ст. Лейтенант'],
  ['DIS_Agent', '1D', 'DIS', 'Agent DIS', 'Капитан'],
  ['SEAL_Commander', '2L', 'SEAL', 'Commander SEAL', 'Ст. Лейтенант'],
  ['NETC_Commander', '2N', 'NETC', 'Commander NETC', 'Капитан'],
  ['SRT_Commander', '2S', 'SRT', 'Commander SRT', 'Майор'],
  ['DIS_Head', '2D', 'DIS', 'Head DIS', 'Капитан'],
  ['SEAL_Curator', '3L', 'SEAL', 'Curator SEAL', 'Подполковник'],
  ['NETC_Curator', '3N', 'NETC', 'Curator NETC', 'Майор'],
  ['SRT_Curator', '3S', 'SRT', 'Curator SRT', 'Подполковник'],
  ['DIS_Curator', '3D', 'DIS', 'Curator DIS', 'Подполковник'],
  ['Head_HRD', '4A', 'GS', 'Head HRD', 'Полковник'],
  ['Head_SOD', '4B', 'GS', 'Head SOD', 'Полковник'],
  ['Vice_Admiral', '5A', 'GS', 'Vice-Admiral', 'Полковник'],
  ['Military_Supervisor', '5B', 'MJ', 'Military Supervisor', 'Майор'],
  ['Admiral_Demo', '6', 'GS', 'Admiral', 'Генерал'],
  ['Head_Military_Judge', '7', 'MJ', 'Head Military Judge', 'Полковник'],
]

export const testAccounts: Account[] = accountRows.map((row, index) => ({
  id: `u${index + 1}`,
  nickname: row[0],
  clearance: row[1] as Account['clearance'],
  division: row[2] as Account['division'],
  position: row[3],
  rank: row[4],
  password: `SFA-demo-${String.fromCharCode(65 + index)}`,
  active: true,
  isGeneralStaff: row[2] === 'GS',
}))

const rawMembers: Array<[string, Member['division'], string, string]> = [
  ['Alexander_Somua','SEAL','Curator SEAL','Капитан'],['Mark_Milligan','SEAL','Commander SEAL','Ст. Лейтенант'],['Paul_Richter','SEAL','Deputy Commander SEAL','Капитан'],['Julian_West','SEAL','Deputy Commander SEAL','Лейтенант'],['Alex_Rild','SEAL','Instructor SEAL','Капитан'],['Anya_Milligan','SEAL','Instructor SEAL','Лейтенант'],['Joe_Buckler','SEAL','Senior Warrior SEAL','Мл. Лейтенант'],['Jonathan_Cage','SEAL','Senior Warrior SEAL','Прапорщик'],['Fort_Nox','SEAL','Warrior SEAL','Прапорщик'],['Christopher_Endfield','SEAL','Warrior SEAL','Старшина'],['Curtis_Scaparotti','SEAL','Recruit SEAL','Капитан'],
  ['Maxim_Ukolov','NETC','Curator NETC','Майор'],['Tim_Noure','NETC','Vice-Curator NETC','Майор'],['Lina_Line','NETC','Commander NETC','Ст. Сержант'],['Criss_Redfild','NETC','Deputy Commander NETC','Капитан'],['Kimmi_Antonelli','NETC','Senior Instructor NETC','Старшина'],['Leo_Machiavelli','NETC','Senior Instructor NETC','Ст. Сержант'],['Ludvig_Beethoven','NETC','Instructor NETC','Капитан'],['Itsuki_Tomonari','NETC','Academic NETC','Ст. Сержант'],
  ['Carlito_Escobar','SRT','Curator SRT','Подполковник'],['Hurt_Reborn','SRT','Vice-Curator SRT','Подполковник'],['Vanya_Romanov','SRT','Commander SRT','Майор'],['Sasha_Muraveev','SRT','Instructor SRT','Капитан'],['Alex_McFarlane','SRT','Senior Fighter SRT','Прапорщик'],['Adrian_Roulins','SRT','Fighter SRT','Капитан'],['Nikita_Smoov','SRT','Trainee SRT','Капитан'],
  ['Leonardo_Galante','DIS','Curator DIS','Подполковник'],['Jagermeister_Orazov','DIS','Head DIS','Капитан'],['Shiori_Asato','DIS','Vice Head DIS','Капитан'],['Ludwig_Stauffenberg','DIS','Vice Head DIS','Капитан'],['Ksander_Bel','DIS','Instructor DIS','Капитан'],['Makima_Russ','DIS','Instructor DIS','Ст. Лейтенант'],['Alvaro_Gallego','DIS','Agent DIS','Капитан'],['Sereja_Murphy','DIS','Trainee DIS','Капитан'],
  ['Elya_Frightened','GS','Admiral','Генерал'],['Bill_Tench','GS','Vice-Admiral','Полковник'],['Goga_Szoboszlai','GS','Head SOD','Полковник'],['Carlos_Makerri','GS','Head HRD','Полковник'],['Maxim_Ukolov','GS','Curator NETC','Майор'],
  ['Leo_Markin','MJ','Head Military Judge','Полковник'],['Blas_Ferreira','MJ','Military Judge','Майор'],
  ['John_Pilot','USAF','Pilot USAF','Сержант'],['Peter_Recruit','USAF','Recruit USAF','Рядовой'],
]

export const seedData: PortalData = {
  accounts: testAccounts,
  members: rawMembers.map(([nickname, division, position, rank]) => ({ nickname, division, position, rank })),
  news: [
    { id:'n1', source:'VK', title:'Тактические учения в заливе Сан-Фиерро', excerpt:'Подразделения SFA провели совместную тренировку по защите морского периметра.', content:'[B]Совместные учения завершены успешно.[/B]\nБойцы отработали эвакуацию, перехват и оборону порта.', date:'28.07.2026 20:15', author:'VK · nb69sl', image:'./field-report.svg', pinned:true },
    { id:'n2', source:'PORTAL', title:'Портал переведён в режим опытной эксплуатации', excerpt:'Открыт доступ к цифровым реестрам и личным делам военнослужащих.', content:'Новый портал объединяет составы, уставы и служебные реестры.', date:'28.07.2026 18:40', author:'Admiral_Demo', image:'./field-report.svg' },
    { id:'n3', source:'VK', title:'Новый учебный цикл NETC', excerpt:'Командование объявило набор на курс подготовки инструкторов.', content:'Подать заявку можно после достижения звания Младший Сержант.', date:'27.07.2026 16:10', author:'VK · nb69sl', image:'./field-report.svg' },
  ],
  transfers: [
    {id:'t1',nickname:'John_Doe',actor:'Alexander_Somua',from:'Pilot USAF',to:'Recruit SEAL',reasonType:'Добровольный перевод',reason:'Успешное собеседование и прохождение отбора',date:'28.07.2026 21:04'},
    {id:'t2',nickname:'Nikita_Smoov',actor:'Vanya_Romanov',from:'Pilot USAF',to:'Trainee SRT',reasonType:'Вербовка',reason:'Успешно пройдена закрытая подготовка',date:'27.07.2026 19:30',classifiedDivision:'SRT'},
    {id:'t3',nickname:'Sereja_Murphy',actor:'Jagermeister_Orazov',from:'Pilot USAF',to:'Trainee DIS',reasonType:'Назначение',reason:'Отобран по результатам внутренней проверки',date:'26.07.2026 22:18',classifiedDivision:'DIS',publicReason:false},
  ],
  sanctions: [
    {id:'s1',offender:'John_Pilot',issuer:'Lina_Line',type:'Предупреждение',reason:'Нарушение формы доклада',evidence:'https://imgur.com/example',date:'28.07.2026',division:'ARMY',status:'active'},
    {id:'s2',offender:'Fort_Nox',issuer:'Alexander_Somua',type:'Внутривзводный выговор',reason:'Самовольное оставление поста',evidence:'https://youtu.be/example',date:'27.07.2026',division:'SEAL',status:'active'},
    {id:'s3',offender:'Sereja_Murphy',issuer:'Jagermeister_Orazov',type:'Внутривзводное предупреждение',reason:'Нарушение внутренней инструкции',evidence:'CLASSIFIED',date:'26.07.2026',division:'DIS',status:'active'},
  ],
  blacklists: [
    {id:'b1',offender:'Bad_Actor',issuer:'Tim_Noure',reason:'Не пройдена стажировка',evidence:'https://imgur.com/demo',degree:2,date:'20.07.2026',division:'NETC',status:'active'},
    {id:'b2',offender:'Unknown_Target',issuer:'Carlito_Escobar',reason:'Грубое нарушение внутренних НПА',evidence:'CLASSIFIED',degree:4,date:'18.07.2026',division:'SRT',status:'pending'},
  ],
  investigations: [
    {id:'i1',title:'Операция «Маяк»',author:'DIS_Agent',clearance:'0',summary:'Открытая аналитическая сводка по безопасности порта.',content:'[CENTER][B]ОПЕРАЦИЯ «МАЯК»[/B][/CENTER]\n[IMG]./field-report.svg[/IMG]\n[SPOILER=Материалы наблюдения]Проверены маршруты снабжения и камеры периметра.[/SPOILER]',date:'25.07.2026',editors:[]},
    {id:'i2',title:'Внутреннее дело «Контур»',author:'DIS_Head',clearance:'2D',summary:'Проверка возможной утечки служебной информации.',content:'[B]Материал ограниченного доступа.[/B]\nСобраны показания и цифровые следы.',date:'24.07.2026',editors:['DIS_Agent']},
    {id:'i3',title:'Материал коллегии №17',author:'Head_Military_Judge',clearance:'5B',summary:'Сверхсекретное судебное производство.',content:'[COLOR=#e2a94f][B]ДОСТУП ТОЛЬКО КОЛЛЕГИИ[/B][/COLOR]',date:'23.07.2026',editors:[],lockedBySenior:true},
  ],
  medals: [
    {id:'m1',name:'За боевую доблесть',division:'ARMY',image:'https://i.ibb.co/B26N0FbD/image.png',statute:'За исключительную стойкость при выполнении боевой задачи.',privilege:'Приоритет при отборе на специальные учения.',recipients:['Ludwig_Stauffenberg','Alexander_Somua']},
    {id:'m2',name:'За верность морским котикам',division:'SEAL',image:'https://i.ibb.co/twLrxH5s/image.png',statute:'За длительную безупречную службу в SEAL.',privilege:'Право возврата без повторной стажировки.',recipients:['Alexander_Somua']},
    {id:'m3',name:'Лучший инструктор',division:'NETC',image:'https://i.ibb.co/8D5XkVfT/image.png',statute:'За вклад в подготовку личного состава.',privilege:'Почётная отметка в личном деле.',recipients:['Lina_Line']},
  ],
  profiles: rawMembers.slice(0,24).map(([nickname, division, position, rank], index) => ({
    nickname, fullName:nickname.replace('_',' '), gender:'Мужской', birthDate:`${String(5 + index%20).padStart(2,'0')}.03.197${index%10}`, birthPlace:'San Fierro, State of Saint-Louis', residence:'San Fierro', citizenship:'USA, State of Saint-Louis', rank, division, position,
    biography:'Проходил подготовку в Военной академии. После выпуска поступил на службу в San Fierro Army. Принимал участие в охране базы и операциях снабжения.',
    skills:['Огневая подготовка','Управление транспортом','Тактическая связь'], serviceHistory:['Recruit USAF','Pilot USAF',position], medals:index%3===0?['За боевую доблесть']:[],
    secretSection:'[B]Секретная часть DIS/MJ.[/B]\nРезультаты проверки благонадёжности: допущен к службе.',
    topSecretSection:'[B]Сверхсекретная часть MJ.[/B]\nМатериалы судебной коллегии и закрытые заключения.',
    registryFlags:index===3?['Реестр экстремистов: проверка закрыта']:[],
  })),
  approvals: [
    {id:'a1',type:'Правка личного дела',applicant:'Fort_Nox',target:'Fort_Nox',summary:'Добавить прошлую службу в NETC с доказательством.',date:'28.07.2026',status:'pending'},
    {id:'a2',type:'ЧС IV степени',applicant:'SRT_Commander',target:'Unknown_Target',summary:'Запрос на внесение в ЧС IV степени.',date:'27.07.2026',status:'pending'},
  ],
  audit: [
    {id:'l1',actor:'Head_Military_Judge',action:'Изменён уровень расследования',target:'Материал коллегии №17',date:'28.07.2026 22:01'},
    {id:'l2',actor:'Admiral_Demo',action:'Опубликована новость',target:'Портал переведён в режим опытной эксплуатации',date:'28.07.2026 18:40'},
  ],
}
