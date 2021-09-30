/*
Relation we know and need to map:

great-grandson
great-granddaughter

grandson
granddaughter

son
daughter
nephew
niece
son-in-law
daughter-in-law

wife
husband
brother
sister
cousin
brother-in-law
sister-in-law
fiance

father
mother
father-in-law
mother-in-law
uncle
aunt

maternal-uncle     //not considering this relation anymore
paternal-uncle     //not considering this relation anymore
maternal-aunt      //not considering this relation anymore
paternal-aunt     //not considering this relation anymore


grandfather
grandmother

great-grandfather
great-grandmother


*/



const rMap = {
  'great-grandson':-3, 'great-granddaughter':-3,
  'grandson': -2,'granddaughter': -2,
  'son':-1,'daughter':-1,'nephew':-1,'niece':-1,"son-in-law": -1, "daughter-in-law": -1,
  'wife':0,'husband':0,'brother':0,'sister':0,'cousin':0,'brother-in-law':0,'sister-in-law':0,'fiance':0,
  'father':1,'mother':1,'father-in-law':1,'mother-in-law':1,'uncle':1,'aunt':1,'maternal-uncle':1,'paternal-uncle':1,'maternal-aunt':1,'paternal-aunt':1,
  'grandfather':2,'grandmother':2,
  'great-grandfather':3,'great-grandmother':3
}

const siblingMap = {
  'great-grandson':0, 'great-granddaughter':0,
  'grandson': 0,'granddaughter': 0,
  'son':0,'daughter':0,'nephew':1,'niece':1,"son-in-law": 1, "daughter-in-law": 1,
  'wife':1,'husband':1,'brother':1,'sister':1,'cousin':1,'brother-in-law':2,'sister-in-law':2,'fiance':1,
  'father':0,'mother':0,'father-in-law':1,'mother-in-law':1,'uncle':1,'aunt':1,'maternal-uncle':1,'paternal-uncle':1,'maternal-aunt':1,'paternal-aunt':1,
  'grandfather':0,'grandmother':0,
  'great-grandfather':0,'great-grandmother':0
}

const oppositeMap = {
  'great-grandson':'great-grandparent', 'great-granddaughter':'great-grandparent',
  'grandson': 'grandparent','granddaughter': 'grandparent',
  'son':'parent','daughter':'parent','nephew':'uncle/aunt','niece':'uncle/aunt',
  'wife':'husband','husband':'wife','brother':'sibling','sister':'sibling','cousin':'cousin','brother-in-law':'sibling-in-law','sister-in-law':'sibling-in-law','fiance':'fiance',
  'father':'child','mother':'child','father-in-law':'child-in-law','mother-in-law':'child-in-law','uncle':'nibling','aunt':'nibling','maternal-uncle':'nibling','paternal-uncle':'nibling','maternal-aunt':'nibling','paternal-aunt':'nibling',
  'grandfather':'grandchild','grandmother':'grandchild',
  'great-grandfather':'great-grandchild','great-grandmother':'great-grandchild'
}

const oppositeMapWithGender = {

  'great-grandson':{male: 'great-grandfather', female: 'great-grandmother'}, 'great-granddaughter':{male: 'great-grandfather', female: 'great-grandmother'},

  'grandson': {male: 'grandfather', female: 'grandmother'},'granddaughter': {male: 'grandfather', female: 'grandmother'},

  'son':{male: 'father', female: 'mother'},'daughter':{male: 'father', female: 'mother'},
  'nephew':{male: 'uncle', female: 'aunt'}, 'niece':{male: 'uncle', female: 'aunt'},
  'son-in-law':{male: 'father-in-law', female: 'mother-in-law'}, 'daughter-in-law':{male: 'father-in-law', female: 'mother-in-law'},

  'wife':{male: 'husband', female: ''}, 'husband':{male: '', female: 'wife'},
  'brother':{male: 'brother', female: 'sister'}, 'sister':{male: 'brother', female: 'sister'},
  'cousin': {male: 'cousin', female: 'cousin'}, 'fiance': {male: 'fiance', female: 'fiance'},

  'father':{male: 'son', female: 'daughter'}, 'mother': {male: 'son', female: 'daughter'},
  'father-in-law':{male: 'son-in-law', female: 'daughter-in-law'}, 'mother-in-law':{male: 'son-in-law', female: 'daughter-in-law'},
  'uncle':{male: 'nephew', female: 'niece'}, 'aunt':{male: 'nephew', female: 'niece'},

  'grandfather':{male: 'grandson', female: 'granddaughter'}, 'grandmother':{male: 'grandson', female: 'granddaughter'},

  'great-grandfather':{male: 'great-grandson', female: 'great-granddaughter'}, 'great-grandmother':{male: 'great-grandson', female: 'great-granddaughter'}

}

const genderMap = {
  'great-grandson': 'male', 'great-granddaughter': 'female',
  'grandson': 'male','granddaughter': 'female',
  'son':'male','daughter': 'female','nephew':'male','niece': 'female',
  'wife': 'female','husband':'male','brother':'male','sister': 'female','brother-in-law': 'male','sister-in-law': 'female',
  'father': 'male','mother': 'female','father-in-law': 'male','mother-in-law': 'female','uncle': 'male','aunt': 'female','maternal-uncle': 'male','paternal-uncle': 'male','maternal-aunt': 'female','paternal-aunt': 'female',
  'grandfather': 'male','grandmother': 'female',
  'great-grandfather': 'male', 'great-grandmother': 'female'
}


const exactRelations = {

  //great-grandson:
  'great-grandson+brother': 'great-grandson',
  'great-grandson+sister': 'great-granddaughter',

  //great-granddaughter:
  'great-granddaughter+brother': 'great-grandson',
  'great-granddaughter+sister': 'great-granddaughter',

  // grandson:
  'grandson+son': 'great-grandson',
  'grandson+daughter': 'great-granddaughter',
  'grandson+brother': 'grandson',
  'grandson+sister': 'granddaughter',


  // granddaughter:
  'granddaughter+son': 'great-grandson',
  'granddaughter+daughter': 'great-granddaughter',
  'granddaughter+brother': 'grandson',
  'granddaughter+sister': 'granddaughter',


  //son:
  'son+grandson': 'great-grandson',
  'son+granddaughter': 'great-granddaughter',
  'son+son': 'grandson',
  'son+daughter': 'granddaughter',
  'son+wife': 'daughter-in-law',
  'son+brother': 'son',
  'son+sister': 'daughter',


  //daughter:
  'daughter+grandson': 'great-grandson',
  'daughter+granddaughter': 'great-granddaughter',
  'daughter+son': 'grandson',
  'daughter+daughter': 'granddaughter',
  'daughter+husband': 'son-in-law',
  'daughter+brother': 'son',
  'daughter+sister': 'daughter',

  //nephew:
  'nephew+brother': 'nephew',
  'nephew+sister': 'niece',


  //niece:
  'niece+brother': 'nephew',
  'niece+sister': 'niece',

  //son-in-law:
  'son-in-law+grandson': 'great-grandson',
  'son-in-law+granddaughter': 'great-granddaughter',
  'son-in-law+son': 'grandson',
  'son-in-law+daughter': 'granddaughter',
  'son-in-law+wife': 'daughter',

  //daughter-in-law:
  'daughter-in-law+grandson': 'great-grandson',
  'daughter-in-law+granddaughter': 'great-granddaughter',
  'daughter-in-law+son': 'grandson',
  'daughter-in-law+daughter': 'granddaughter',
  'daughter-in-law+husband': 'son',

  //wife:
  'wife+great-grandson': 'great-grandson',
  'wife+great-granddaughter': 'great-granddaughter',
  'wife+grandson': 'grandson',
  'wife+granddaughter': 'granddaughter',
  'wife+son': 'son',
  'wife+daughter': 'daughter',
  'wife+brother': 'brother-in-law',
  'wife+sister': 'sister-in-law',
  // 'wife+brother-in-law': 'brother',
  // 'wife+sister-in-law': 'sister',           // wife's brother's wife is not your sister
  'wife+father': 'father-in-law',
  'wife+mother': 'mother-in-law',
  'wife+father-in-law': 'father',
  'wife+mother-in-law': 'mother',

  //husband
  'husband+great-grandson': 'great-grandson',
  'husband+great-granddaughter': 'great-granddaughter',
  'husband+grandson': 'grandson',
  'husband+granddaughter': 'granddaughter',
  'husband+son': 'son',
  'husband+daughter': 'daughter',
  'husband+brother': 'brother-in-law',
  'husband+sister': 'sister-in-law',
  // 'husband+brother-in-law': 'brother',          husband's sister's husband is not your brother!
  // 'husband+sister-in-law': 'sister',
  'husband+father': 'father-in-law',
  'husband+mother': 'mother-in-law',
  'husband+father-in-law': 'father',
  'husband+mother-in-law': 'mother',

  //brother
  'brother+son': 'nephew',
  'brother+daughter': 'niece',
  'brother+wife': 'sister-in-law',
  'brother+brother': 'brother',
  'brother+sister': 'sister',
  'brother+cousin': 'cousin',
  'brother+father': 'father',
  'brother+mother': 'mother',
  'brother+uncle': 'uncle',
  'brother+aunt': 'aunt',
  'brother+grandfather': 'grandfather',
  'brother+grandmother': 'grandmother',
  'brother+great-grandfather': 'great-grandfather',
  'brother+great-grandmother': 'great-grandmother',

  //sister
  'sister+son': 'nephew',
  'sister+daughter': 'niece',
  'sister+husband': 'brother-in-law',
  'sister+brother': 'brother',
  'sister+sister': 'sister',
  'sister+cousin': 'cousin',
  'sister+father': 'father',
  'sister+mother': 'mother',
  'sister+uncle': 'uncle',
  'sister+aunt': 'aunt',
  'sister+grandfather': 'grandfather',
  'sister+grandmother': 'grandmother',
  'sister+great-grandfather': 'great-grandfather',
  'sister+great-grandmother': 'great-grandmother',

  //cousin
  'cousin+brother': 'cousin',
  'cousin+sister': 'cousin',
  'cousin+father': 'uncle',
  'cousin+mother': 'aunt',

  //brother-in-law   - wife's brother    or     sister's husband
    // 'brother-in-law+father': 'father-in-law',
    // 'brother-in-law+mother': 'mother-in-law',
    // 'brother-in-law+brother': '',
    // 'brother-in-law+sister': '',


  //sister-in-law       - wife's sister  or   brother's wife


  //father
  'father+nephew': 'cousin',
  'father+niece': 'cousin',
  'father+wife': 'mother',
  'father+brother': 'uncle',
  'father+sister': 'aunt',
  'father+brother-in-law': 'uncle',
  'father+sister-in-law': 'aunt',
  'father+father': 'grandfather',
  'father+mother': 'grandmother',
  'father+father-in-law': 'grandfather',
  'father+mother-in-law': 'grandmother',
  'father+grandfather': 'great-grandfather',
  'father+grandmother': 'great-grandmother',


  //mother
  'mother+nephew': 'cousin',
  'mother+niece': 'cousin',
  'mother+husband': 'father',
  'mother+brother': 'uncle',
  'mother+sister': 'aunt',
  'mother+brother-in-law': 'uncle',
  'mother+sister-in-law': 'aunt',
  'mother+father': 'grandfather',
  'mother+mother': 'grandmother',
  'mother+father-in-law': 'grandfather',
  'mother+mother-in-law': 'grandmother',
  'mother+grandfather': 'great-grandfather',
  'mother+grandmother': 'great-grandmother',

  // father-in-law
  'father-in-law+wife': 'mother-in-law',

  // mother-in-law
  'mother-in-law+husband': 'father-in-law',

  // uncle
  'uncle+son': 'cousin',
  'uncle+daughter': 'cousin',
  'uncle+wife': 'aunt',

  // aunt
  'aunt+son': 'cousin',
  'aunt+daughter': 'cousin',
  'aunt+husband': 'uncle',

  // grandfather
  'grandfather+wife': 'grandmother',
  'grandfather+father': 'great-grandfather',
  'grandfather+mother': 'great-grandmother',

  //grandmother
  'grandmother+husband': 'grandfather',
  'grandmother+father': 'great-grandfather',
  'grandmother+mother': 'great-grandmother',

  //great-grandfather
  'great-grandfather+wife': 'great-grandmother',

  //great-grandmother
  'great-grandmother+husband': 'great-grandfather',

}

const ambigiousRelations = {

  'grandson+father': 'son/son-in-law',
  'grandson+mother': 'daughter/daughter-in-law',

  'granddaughter+father': 'son/son-in-law',
  'granddaughter+mother': 'daughter/daughter-in-law',

  'son+father': 'wife/husband',  //depends on male and female
  'son+mother': 'wife/husband',  //depends on male and female
  'son+uncle': 'brother/brother-in-law',
  'son+aunt': 'sister/sister-in-law',
  'son+grandfather': 'father/father-in-law',
  'son+grandmother': 'mother/mother-in-law',

  'daughter+father': 'wife/husband',  //depends on male and female
  'daughter+mother': 'wife/husband',  //depends on male and female
  'daughter+uncle': 'brother/brother-in-law',
  'daughter+aunt': 'sister/sister-in-law',
  'daughter+grandfather': 'father/father-in-law',
  'daughter+grandmother': 'mother/mother-in-law',

  'nephew+father': 'brother/brother-in-law', // my sister's husband's
  'nephew+mother': 'sister/sister-in-law',   // my brother's wife's

  'niece+father': 'brother/brother-in-law', // my sister's husband's
  'niece+mother': 'sister/sister-in-law',   // my brother's wife's

}



const MapForRelationFlow = {          // this map contains no ambiguity... not even uncle and aunt !!

  //great-grandson:
  'great-grandson+brother': 'great-grandson',
  'great-grandson+sister': 'great-granddaughter',

  //great-granddaughter:
  'great-granddaughter+brother': 'great-grandson',
  'great-granddaughter+sister': 'great-granddaughter',

  // grandson:
  'grandson+son': 'great-grandson',
  'grandson+daughter': 'great-granddaughter',
  'grandson+brother': 'grandson',
  'grandson+sister': 'granddaughter',


  // granddaughter:
  'granddaughter+son': 'great-grandson',
  'granddaughter+daughter': 'great-granddaughter',
  'granddaughter+brother': 'grandson',
  'granddaughter+sister': 'granddaughter',


  //son:
  'son+grandson': 'great-grandson',
  'son+granddaughter': 'great-granddaughter',
  'son+son': 'grandson',
  'son+daughter': 'granddaughter',
  'son+wife': 'daughter-in-law',        //check again
  'son+brother': 'son',
  'son+sister': 'daughter',

  //daughter:
  'daughter+grandson': 'great-grandson',
  'daughter+granddaughter': 'great-granddaughter',
  'daughter+son': 'grandson',
  'daughter+daughter': 'granddaughter',
  'daughter+husband': 'son-in-law',     //check again
  'daughter+brother': 'son',
  'daughter+sister': 'daughter',

  //nephew:
  'nephew+brother': 'nephew',
  'nephew+sister': 'niece',

  //niece:
  'niece+brother': 'nephew',
  'niece+sister': 'niece',

  //son-in-law:
  'son-in-law+grandson': 'great-grandson',
  'son-in-law+granddaughter': 'great-granddaughter',
  'son-in-law+son': 'grandson',
  'son-in-law+daughter': 'granddaughter',
  'son-in-law+wife': 'daughter',

  //daughter-in-law:
  'daughter-in-law+grandson': 'great-grandson',
  'daughter-in-law+granddaughter': 'great-granddaughter',
  'daughter-in-law+son': 'grandson',
  'daughter-in-law+daughter': 'granddaughter',
  'daughter-in-law+husband': 'son',



  //wife:
  'wife+great-grandson': 'great-grandson',
  'wife+great-granddaughter': 'great-granddaughter',
  'wife+grandson': 'grandson',
  'wife+granddaughter': 'granddaughter',
  'wife+son': 'son',
  'wife+daughter': 'daughter',
  'wife+father': 'father-in-law',
  'wife+mother': 'mother-in-law',
  'wife+father-in-law': 'father',
  'wife+mother-in-law': 'mother',

  //husband
  'husband+great-grandson': 'great-grandson',
  'husband+great-granddaughter': 'great-granddaughter',
  'husband+grandson': 'grandson',
  'husband+granddaughter': 'granddaughter',
  'husband+son': 'son',
  'husband+daughter': 'daughter',
  'husband+father': 'father-in-law',
  'husband+mother': 'mother-in-law',
  'husband+father-in-law': 'father',
  'husband+mother-in-law': 'mother',

  // brother
  'brother+brother': 'brother',
  'brother+sister': 'sister',
  'brother+cousin': 'cousin',
  'brother+father': 'father',
  'brother+mother': 'mother',
  'brother+uncle': 'uncle',
  'brother+aunt': 'aunt',
  'brother+grandfather': 'grandfather',
  'brother+grandmother': 'grandmother',
  'brother+great-grandfather': 'great-grandfather',
  'brother+great-grandmother': 'great-grandmother',

  // sister
  'sister+brother': 'brother',
  'sister+sister': 'sister',
  'sister+cousin': 'cousin',
  'sister+father': 'father',
  'sister+mother': 'mother',
  'sister+uncle': 'uncle',
  'sister+aunt': 'aunt',
  'sister+grandfather': 'grandfather',
  'sister+grandmother': 'grandmother',
  'sister+great-grandfather': 'great-grandfather',
  'sister+great-grandmother': 'great-grandmother',

  //cousin
  'cousin+brother': 'cousin',
  'cousin+sister': 'cousin',


  //father
  'father+nephew': 'cousin',
  'father+niece': 'cousin',
  'father+wife': 'mother',
  'father+father': 'grandfather',
  'father+mother': 'grandmother',
  'father+father-in-law': 'grandfather',
  'father+mother-in-law': 'grandmother',
  'father+grandfather': 'great-grandfather',
  'father+grandmother': 'great-grandmother',


  //mother
  'mother+nephew': 'cousin',
  'mother+niece': 'cousin',
  'mother+husband': 'father',
  'mother+father': 'grandfather',
  'mother+mother': 'grandmother',
  'mother+father-in-law': 'grandfather',
  'mother+mother-in-law': 'grandmother',
  'mother+grandfather': 'great-grandfather',
  'mother+grandmother': 'great-grandmother',

  // father-in-law
  'father-in-law+wife': 'mother-in-law',

  // mother-in-law
  'mother-in-law+husband': 'father-in-law',

  // uncle
  'uncle+son': 'cousin',
  'uncle+daughter': 'cousin',
  'uncle+wife': 'aunt',

  // aunt
  'aunt+son': 'cousin',
  'aunt+daughter': 'cousin',
  'aunt+husband': 'uncle',

  // grandfather
  'grandfather+wife': 'grandmother',
  'grandfather+father': 'great-grandfather',
  'grandfather+mother': 'great-grandmother',

  //grandmother
  'grandmother+husband': 'grandfather',
  'grandmother+father': 'great-grandfather',
  'grandmother+mother': 'great-grandmother',

  //great-grandfather
  'great-grandfather+wife': 'great-grandmother',

  //great-grandmother
  'great-grandmother+husband': 'great-grandfather',

}


const indirectRelations = {

  //All the relations that are not mentioned in exactRelations are indirectRelations

}



const AllRelations = {

  'great-grandson+great-grandson': '',
  'great-grandson+great-granddaughter': '',
  'great-grandson+grandson': '',
  'great-grandson+granddaughter': '',
  'great-grandson+son': '',
  'great-grandson+daughter': '',
  'great-grandson+nephew': '',
  'great-grandson+niece': '',
  'great-grandson+wife': '',
  'great-grandson+husband': '',
  'great-grandson+brother': '',
  'great-grandson+sister': '',
  'great-grandson+cousin': '',
  'great-grandson+brother-in-law': '',
  'great-grandson+sister-in-law': '',
  'great-grandson+fiance': '',
  'great-grandson+father': '',
  'great-grandson+mother': '',
  'great-grandson+father-in-law': '',
  'great-grandson+mother-in-law': '',
  'great-grandson+uncle': '',
  'great-grandson+aunt': '',
  'great-grandson+grandfather': '',
  'great-grandson+grandmother': '',
  'great-grandson+great-grandfather': '',
  'great-grandson+great-grandmother': '',


  'great-granddaughter+great-grandson': '',
  'great-granddaughter+great-granddaughter': '',
  'great-granddaughter+grandson': '',
  'great-granddaughter+granddaughter': '',
  'great-granddaughter+son': '',
  'great-granddaughter+daughter': '',
  'great-granddaughter+nephew': '',
  'great-granddaughter+niece': '',
  'great-granddaughter+wife': '',
  'great-granddaughter+husband': '',
  'great-granddaughter+brother': '',
  'great-granddaughter+sister': '',
  'great-granddaughter+cousin': '',
  'great-granddaughter+brother-in-law': '',
  'great-granddaughter+sister-in-law': '',
  'great-granddaughter+fiance': '',
  'great-granddaughter+father': '',
  'great-granddaughter+mother': '',
  'great-granddaughter+father-in-law': '',
  'great-granddaughter+mother-in-law': '',
  'great-granddaughter+uncle': '',
  'great-granddaughter+aunt': '',
  'great-granddaughter+grandfather': '',
  'great-granddaughter+grandmother': '',
  'great-granddaughter+great-grandfather': '',
  'great-granddaughter+great-grandmother': '',


  'grandson+great-grandson': '',
  'grandson+great-granddaughter': '',
  'grandson+grandson': '',
  'grandson+granddaughter': '',
  'grandson+son': '',
  'grandson+daughter': '',
  'grandson+nephew': '',
  'grandson+niece': '',
  'grandson+wife': '',
  'grandson+husband': '',
  'grandson+brother': '',
  'grandson+sister': '',
  'grandson+cousin': '',
  'grandson+brother-in-law': '',
  'grandson+sister-in-law': '',
  'grandson+fiance': '',
  'grandson+father': '',
  'grandson+mother': '',
  'grandson+father-in-law': '',
  'grandson+mother-in-law': '',
  'grandson+uncle': '',
  'grandson+aunt': '',
  'grandson+grandfather': '',
  'grandson+grandmother': '',
  'grandson+great-grandfather': '',
  'grandson+great-grandmother': '',



  'granddaughter+great-grandson': '',
  'granddaughter+great-granddaughter': '',
  'granddaughter+grandson': '',
  'granddaughter+granddaughter': '',
  'granddaughter+son': '',
  'granddaughter+daughter': '',
  'granddaughter+nephew': '',
  'granddaughter+niece': '',
  'granddaughter+wife': '',
  'granddaughter+husband': '',
  'granddaughter+brother': '',
  'granddaughter+sister': '',
  'granddaughter+cousin': '',
  'granddaughter+brother-in-law': '',
  'granddaughter+sister-in-law': '',
  'granddaughter+fiance': '',
  'granddaughter+father': '',
  'granddaughter+mother': '',
  'granddaughter+father-in-law': '',
  'granddaughter+mother-in-law': '',
  'granddaughter+uncle': '',
  'granddaughter+aunt': '',
  'granddaughter+grandfather': '',
  'granddaughter+grandmother': '',
  'granddaughter+great-grandfather': '',
  'granddaughter+great-grandmother': '',

  'son+great-grandson': '',
  'son+great-granddaughter': '',
  'son+grandson': '',
  'son+granddaughter': '',
  'son+son': '',
  'son+daughter': '',
  'son+nephew': '',
  'son+niece': '',
  'son+wife': '',
  'son+husband': '',
  'son+brother': '',
  'son+sister': '',
  'son+cousin': '',
  'son+brother-in-law': '',
  'son+sister-in-law': '',
  'son+fiance': '',
  'son+father': '',
  'son+mother': '',
  'son+father-in-law': '',
  'son+mother-in-law': '',
  'son+uncle': '',
  'son+aunt': '',
  'son+grandfather': '',
  'son+grandmother': '',
  'son+great-grandfather': '',
  'son+great-grandmother': '',



  'daughter+great-grandson': '',
  'daughter+great-granddaughter': '',
  'daughter+grandson': '',
  'daughter+granddaughter': '',
  'daughter+son': '',
  'daughter+daughter': '',
  'daughter+nephew': '',
  'daughter+niece': '',
  'daughter+wife': '',
  'daughter+husband': '',
  'daughter+brother': '',
  'daughter+sister': '',
  'daughter+cousin': '',
  'daughter+brother-in-law': '',
  'daughter+sister-in-law': '',
  'daughter+fiance': '',
  'daughter+father': '',
  'daughter+mother': '',
  'daughter+father-in-law': '',
  'daughter+mother-in-law': '',
  'daughter+uncle': '',
  'daughter+aunt': '',
  'daughter+grandfather': '',
  'daughter+grandmother': '',
  'daughter+great-grandfather': '',
  'daughter+great-grandmother': '',


  'nephew+great-grandson': '',
  'nephew+great-granddaughter': '',
  'nephew+grandson': '',
  'nephew+granddaughter': '',
  'nephew+son': '',
  'nephew+daughter': '',
  'nephew+nephew': '',
  'nephew+niece': '',
  'nephew+wife': '',
  'nephew+husband': '',
  'nephew+brother': '',
  'nephew+sister': '',
  'nephew+cousin': '',
  'nephew+brother-in-law': '',
  'nephew+sister-in-law': '',
  'nephew+fiance': '',
  'nephew+father': '',
  'nephew+mother': '',
  'nephew+father-in-law': '',
  'nephew+mother-in-law': '',
  'nephew+uncle': '',
  'nephew+aunt': '',
  'nephew+grandfather': '',
  'nephew+grandmother': '',
  'nephew+great-grandfather': '',
  'nephew+great-grandmother': '',




  'niece+great-grandson': '',
  'niece+great-granddaughter': '',
  'niece+grandson': '',
  'niece+granddaughter': '',
  'niece+son': '',
  'niece+daughter': '',
  'niece+nephew': '',
  'niece+niece': '',
  'niece+wife': '',
  'niece+husband': '',
  'niece+brother': '',
  'niece+sister': '',
  'niece+cousin': '',
  'niece+brother-in-law': '',
  'niece+sister-in-law': '',
  'niece+fiance': '',
  'niece+father': '',
  'niece+mother': '',
  'niece+father-in-law': '',
  'niece+mother-in-law': '',
  'niece+uncle': '',
  'niece+aunt': '',
  'niece+grandfather': '',
  'niece+grandmother': '',
  'niece+great-grandfather': '',
  'niece+great-grandmother': '',



  'son-in-law+great-grandson': '',
  'son-in-law+great-granddaughter': '',
  'son-in-law+grandson': '',
  'son-in-law+granddaughter': '',
  'son-in-law+son': '',
  'son-in-law+daughter': '',
  'son-in-law+nephew': '',
  'son-in-law+niece': '',
  'son-in-law+wife': '',
  'son-in-law+husband': '',
  'son-in-law+brother': '',
  'son-in-law+sister': '',
  'son-in-law+cousin': '',
  'son-in-law+brother-in-law': '',
  'son-in-law+sister-in-law': '',
  'son-in-law+fiance': '',
  'son-in-law+father': '',
  'son-in-law+mother': '',
  'son-in-law+father-in-law': '',
  'son-in-law+mother-in-law': '',
  'son-in-law+uncle': '',
  'son-in-law+aunt': '',
  'son-in-law+grandfather': '',
  'son-in-law+grandmother': '',
  'son-in-law+great-grandfather': '',
  'son-in-law+great-grandmother': '',



  'daughter-in-law+great-grandson': '',
  'daughter-in-law+great-granddaughter': '',
  'daughter-in-law+grandson': '',
  'daughter-in-law+granddaughter': '',
  'daughter-in-law+son': '',
  'daughter-in-law+daughter': '',
  'daughter-in-law+nephew': '',
  'daughter-in-law+niece': '',
  'daughter-in-law+wife': '',
  'daughter-in-law+husband': '',
  'daughter-in-law+brother': '',
  'daughter-in-law+sister': '',
  'daughter-in-law+cousin': '',
  'daughter-in-law+brother-in-law': '',
  'daughter-in-law+sister-in-law': '',
  'daughter-in-law+fiance': '',
  'daughter-in-law+father': '',
  'daughter-in-law+mother': '',
  'daughter-in-law+father-in-law': '',
  'daughter-in-law+mother-in-law': '',
  'daughter-in-law+uncle': '',
  'daughter-in-law+aunt': '',
  'daughter-in-law+grandfather': '',
  'daughter-in-law+grandmother': '',
  'daughter-in-law+great-grandfather': '',
  'daughter-in-law+great-grandmother': '',




  'wife+great-grandson': '',
  'wife+great-granddaughter': '',
  'wife+grandson': '',
  'wife+granddaughter': '',
  'wife+son': '',
  'wife+daughter': '',
  'wife+nephew': '',
  'wife+niece': '',
  'wife+wife': '',
  'wife+husband': '',
  'wife+brother': '',
  'wife+sister': '',
  'wife+cousin': '',
  'wife+brother-in-law': '',
  'wife+sister-in-law': '',
  'wife+fiance': '',
  'wife+father': '',
  'wife+mother': '',
  'wife+father-in-law': '',
  'wife+mother-in-law': '',
  'wife+uncle': '',
  'wife+aunt': '',
  'wife+grandfather': '',
  'wife+grandmother': '',
  'wife+great-grandfather': '',
  'wife+great-grandmother': '',



  'husband+great-grandson': '',
  'husband+great-granddaughter': '',
  'husband+grandson': '',
  'husband+granddaughter': '',
  'husband+son': '',
  'husband+daughter': '',
  'husband+nephew': '',
  'husband+niece': '',
  'husband+wife': '',
  'husband+husband': '',
  'husband+brother': '',
  'husband+sister': '',
  'husband+cousin': '',
  'husband+brother-in-law': '',
  'husband+sister-in-law': '',
  'husband+fiance': '',
  'husband+father': '',
  'husband+mother': '',
  'husband+father-in-law': '',
  'husband+mother-in-law': '',
  'husband+uncle': '',
  'husband+aunt': '',
  'husband+grandfather': '',
  'husband+grandmother': '',
  'husband+great-grandfather': '',
  'husband+great-grandmother': '',



  'brother+great-grandson': '',
  'brother+great-granddaughter': '',
  'brother+grandson': '',
  'brother+granddaughter': '',
  'brother+son': '',
  'brother+daughter': '',
  'brother+nephew': '',
  'brother+niece': '',
  'brother+wife': '',
  'brother+husband': '',
  'brother+brother': '',
  'brother+sister': '',
  'brother+cousin': '',
  'brother+brother-in-law': '',
  'brother+sister-in-law': '',
  'brother+fiance': '',
  'brother+father': '',
  'brother+mother': '',
  'brother+father-in-law': '',
  'brother+mother-in-law': '',
  'brother+uncle': '',
  'brother+aunt': '',
  'brother+grandfather': '',
  'brother+grandmother': '',
  'brother+great-grandfather': '',
  'brother+great-grandmother': '',




  'sister+great-grandson': '',
  'sister+great-granddaughter': '',
  'sister+grandson': '',
  'sister+granddaughter': '',
  'sister+son': '',
  'sister+daughter': '',
  'sister+nephew': '',
  'sister+niece': '',
  'sister+wife': '',
  'sister+husband': '',
  'sister+brother': '',
  'sister+sister': '',
  'sister+cousin': '',
  'sister+brother-in-law': '',
  'sister+sister-in-law': '',
  'sister+fiance': '',
  'sister+father': '',
  'sister+mother': '',
  'sister+father-in-law': '',
  'sister+mother-in-law': '',
  'sister+uncle': '',
  'sister+aunt': '',
  'sister+grandfather': '',
  'sister+grandmother': '',
  'sister+great-grandfather': '',
  'sister+great-grandmother': '',


  'cousin+great-grandson': '',
  'cousin+great-granddaughter': '',
  'cousin+grandson': '',
  'cousin+granddaughter': '',
  'cousin+son': '',
  'cousin+daughter': '',
  'cousin+nephew': '',
  'cousin+niece': '',
  'cousin+wife': '',
  'cousin+husband': '',
  'cousin+brother': '',
  'cousin+sister': '',
  'cousin+cousin': '',
  'cousin+brother-in-law': '',
  'cousin+sister-in-law': '',
  'cousin+fiance': '',
  'cousin+father': '',
  'cousin+mother': '',
  'cousin+father-in-law': '',
  'cousin+mother-in-law': '',
  'cousin+uncle': '',
  'cousin+aunt': '',
  'cousin+grandfather': '',
  'cousin+grandmother': '',
  'cousin+great-grandfather': '',
  'cousin+great-grandmother': '',


  'brother-in-law+great-grandson': '',
  'brother-in-law+great-granddaughter': '',
  'brother-in-law+grandson': '',
  'brother-in-law+granddaughter': '',
  'brother-in-law+son': '',
  'brother-in-law+daughter': '',
  'brother-in-law+nephew': '',
  'brother-in-law+niece': '',
  'brother-in-law+wife': '',
  'brother-in-law+husband': '',
  'brother-in-law+brother': '',
  'brother-in-law+sister': '',
  'brother-in-law+cousin': '',
  'brother-in-law+brother-in-law': '',
  'brother-in-law+sister-in-law': '',
  'brother-in-law+fiance': '',
  'brother-in-law+father': '',
  'brother-in-law+mother': '',
  'brother-in-law+father-in-law': '',
  'brother-in-law+mother-in-law': '',
  'brother-in-law+uncle': '',
  'brother-in-law+aunt': '',
  'brother-in-law+grandfather': '',
  'brother-in-law+grandmother': '',
  'brother-in-law+great-grandfather': '',
  'brother-in-law+great-grandmother': '',




  'sister-in-law+great-grandson': '',
  'sister-in-law+great-granddaughter': '',
  'sister-in-law+grandson': '',
  'sister-in-law+granddaughter': '',
  'sister-in-law+son': '',
  'sister-in-law+daughter': '',
  'sister-in-law+nephew': '',
  'sister-in-law+niece': '',
  'sister-in-law+wife': '',
  'sister-in-law+husband': '',
  'sister-in-law+brother': '',
  'sister-in-law+sister': '',
  'sister-in-law+cousin': '',
  'sister-in-law+brother-in-law': '',
  'sister-in-law+sister-in-law': '',
  'sister-in-law+fiance': '',
  'sister-in-law+father': '',
  'sister-in-law+mother': '',
  'sister-in-law+father-in-law': '',
  'sister-in-law+mother-in-law': '',
  'sister-in-law+uncle': '',
  'sister-in-law+aunt': '',
  'sister-in-law+grandfather': '',
  'sister-in-law+grandmother': '',
  'sister-in-law+great-grandfather': '',
  'sister-in-law+great-grandmother': '',




  'fiance+great-grandson': '',
  'fiance+great-granddaughter': '',
  'fiance+grandson': '',
  'fiance+granddaughter': '',
  'fiance+son': '',
  'fiance+daughter': '',
  'fiance+nephew': '',
  'fiance+niece': '',
  'fiance+wife': '',
  'fiance+husband': '',
  'fiance+brother': '',
  'fiance+sister': '',
  'fiance+cousin': '',
  'fiance+brother-in-law': '',
  'fiance+sister-in-law': '',
  'fiance+fiance': '',
  'fiance+father': '',
  'fiance+mother': '',
  'fiance+father-in-law': '',
  'fiance+mother-in-law': '',
  'fiance+uncle': '',
  'fiance+aunt': '',
  'fiance+grandfather': '',
  'fiance+grandmother': '',
  'fiance+great-grandfather': '',
  'fiance+great-grandmother': '',




  'father+great-grandson': '',
  'father+great-granddaughter': '',
  'father+grandson': '',
  'father+granddaughter': '',
  'father+son': '',
  'father+daughter': '',
  'father+nephew': '',
  'father+niece': '',
  'father+wife': '',
  'father+husband': '',
  'father+brother': '',
  'father+sister': '',
  'father+cousin': '',
  'father+brother-in-law': '',
  'father+sister-in-law': '',
  'father+fiance': '',
  'father+father': '',
  'father+mother': '',
  'father+father-in-law': '',
  'father+mother-in-law': '',
  'father+uncle': '',
  'father+aunt': '',
  'father+grandfather': '',
  'father+grandmother': '',
  'father+great-grandfather': '',
  'father+great-grandmother': '',




  'mother+great-grandson': '',
  'mother+great-granddaughter': '',
  'mother+grandson': '',
  'mother+granddaughter': '',
  'mother+son': '',
  'mother+daughter': '',
  'mother+nephew': '',
  'mother+niece': '',
  'mother+wife': '',
  'mother+husband': '',
  'mother+brother': '',
  'mother+sister': '',
  'mother+cousin': '',
  'mother+brother-in-law': '',
  'mother+sister-in-law': '',
  'mother+fiance': '',
  'mother+father': '',
  'mother+mother': '',
  'mother+father-in-law': '',
  'mother+mother-in-law': '',
  'mother+uncle': '',
  'mother+aunt': '',
  'mother+grandfather': '',
  'mother+grandmother': '',
  'mother+great-grandfather': '',
  'mother+great-grandmother': '',




  'father-in-law+great-grandson': '',
  'father-in-law+great-granddaughter': '',
  'father-in-law+grandson': '',
  'father-in-law+granddaughter': '',
  'father-in-law+son': '',
  'father-in-law+daughter': '',
  'father-in-law+nephew': '',
  'father-in-law+niece': '',
  'father-in-law+wife': '',
  'father-in-law+husband': '',
  'father-in-law+brother': '',
  'father-in-law+sister': '',
  'father-in-law+cousin': '',
  'father-in-law+brother-in-law': '',
  'father-in-law+sister-in-law': '',
  'father-in-law+fiance': '',
  'father-in-law+father': '',
  'father-in-law+mother': '',
  'father-in-law+father-in-law': '',
  'father-in-law+mother-in-law': '',
  'father-in-law+uncle': '',
  'father-in-law+aunt': '',
  'father-in-law+grandfather': '',
  'father-in-law+grandmother': '',
  'father-in-law+great-grandfather': '',
  'father-in-law+great-grandmother': '',




  'mother-in-law+great-grandson': '',
  'mother-in-law+great-granddaughter': '',
  'mother-in-law+grandson': '',
  'mother-in-law+granddaughter': '',
  'mother-in-law+son': '',
  'mother-in-law+daughter': '',
  'mother-in-law+nephew': '',
  'mother-in-law+niece': '',
  'mother-in-law+wife': '',
  'mother-in-law+husband': '',
  'mother-in-law+brother': '',
  'mother-in-law+sister': '',
  'mother-in-law+cousin': '',
  'mother-in-law+brother-in-law': '',
  'mother-in-law+sister-in-law': '',
  'mother-in-law+fiance': '',
  'mother-in-law+father': '',
  'mother-in-law+mother': '',
  'mother-in-law+father-in-law': '',
  'mother-in-law+mother-in-law': '',
  'mother-in-law+uncle': '',
  'mother-in-law+aunt': '',
  'mother-in-law+grandfather': '',
  'mother-in-law+grandmother': '',
  'mother-in-law+great-grandfather': '',
  'mother-in-law+great-grandmother': '',




  'uncle+great-grandson': '',
  'uncle+great-granddaughter': '',
  'uncle+grandson': '',
  'uncle+granddaughter': '',
  'uncle+son': '',
  'uncle+daughter': '',
  'uncle+nephew': '',
  'uncle+niece': '',
  'uncle+wife': '',
  'uncle+husband': '',
  'uncle+brother': '',
  'uncle+sister': '',
  'uncle+cousin': '',
  'uncle+brother-in-law': '',
  'uncle+sister-in-law': '',
  'uncle+fiance': '',
  'uncle+father': '',
  'uncle+mother': '',
  'uncle+father-in-law': '',
  'uncle+mother-in-law': '',
  'uncle+uncle': '',
  'uncle+aunt': '',
  'uncle+grandfather': '',
  'uncle+grandmother': '',
  'uncle+great-grandfather': '',
  'uncle+great-grandmother': '',




  'aunt+great-grandson': '',
  'aunt+great-granddaughter': '',
  'aunt+grandson': '',
  'aunt+granddaughter': '',
  'aunt+son': '',
  'aunt+daughter': '',
  'aunt+nephew': '',
  'aunt+niece': '',
  'aunt+wife': '',
  'aunt+husband': '',
  'aunt+brother': '',
  'aunt+sister': '',
  'aunt+cousin': '',
  'aunt+brother-in-law': '',
  'aunt+sister-in-law': '',
  'aunt+fiance': '',
  'aunt+father': '',
  'aunt+mother': '',
  'aunt+father-in-law': '',
  'aunt+mother-in-law': '',
  'aunt+uncle': '',
  'aunt+aunt': '',
  'aunt+grandfather': '',
  'aunt+grandmother': '',
  'aunt+great-grandfather': '',
  'aunt+great-grandmother': '',




  'grandfather+great-grandson': '',
  'grandfather+great-granddaughter': '',
  'grandfather+grandson': '',
  'grandfather+granddaughter': '',
  'grandfather+son': '',
  'grandfather+daughter': '',
  'grandfather+nephew': '',
  'grandfather+niece': '',
  'grandfather+wife': '',
  'grandfather+husband': '',
  'grandfather+brother': '',
  'grandfather+sister': '',
  'grandfather+cousin': '',
  'grandfather+brother-in-law': '',
  'grandfather+sister-in-law': '',
  'grandfather+fiance': '',
  'grandfather+father': '',
  'grandfather+mother': '',
  'grandfather+father-in-law': '',
  'grandfather+mother-in-law': '',
  'grandfather+uncle': '',
  'grandfather+aunt': '',
  'grandfather+grandfather': '',
  'grandfather+grandmother': '',
  'grandfather+great-grandfather': '',
  'grandfather+great-grandmother': '',



  'grandmother+great-grandson': '',
  'grandmother+great-granddaughter': '',
  'grandmother+grandson': '',
  'grandmother+granddaughter': '',
  'grandmother+son': '',
  'grandmother+daughter': '',
  'grandmother+nephew': '',
  'grandmother+niece': '',
  'grandmother+wife': '',
  'grandmother+husband': '',
  'grandmother+brother': '',
  'grandmother+sister': '',
  'grandmother+cousin': '',
  'grandmother+brother-in-law': '',
  'grandmother+sister-in-law': '',
  'grandmother+fiance': '',
  'grandmother+father': '',
  'grandmother+mother': '',
  'grandmother+father-in-law': '',
  'grandmother+mother-in-law': '',
  'grandmother+uncle': '',
  'grandmother+aunt': '',
  'grandmother+grandfather': '',
  'grandmother+grandmother': '',
  'grandmother+great-grandfather': '',
  'grandmother+great-grandmother': '',





  'great-grandfather+great-grandson': '',
  'great-grandfather+great-granddaughter': '',
  'great-grandfather+grandson': '',
  'great-grandfather+granddaughter': '',
  'great-grandfather+son': '',
  'great-grandfather+daughter': '',
  'great-grandfather+nephew': '',
  'great-grandfather+niece': '',
  'great-grandfather+wife': '',
  'great-grandfather+husband': '',
  'great-grandfather+brother': '',
  'great-grandfather+sister': '',
  'great-grandfather+cousin': '',
  'great-grandfather+brother-in-law': '',
  'great-grandfather+sister-in-law': '',
  'great-grandfather+fiance': '',
  'great-grandfather+father': '',
  'great-grandfather+mother': '',
  'great-grandfather+father-in-law': '',
  'great-grandfather+mother-in-law': '',
  'great-grandfather+uncle': '',
  'great-grandfather+aunt': '',
  'great-grandfather+grandfather': '',
  'great-grandfather+grandmother': '',
  'great-grandfather+great-grandfather': '',
  'great-grandfather+great-grandmother': '',


  'great-grandmother+great-grandson': '',
  'great-grandmother+great-granddaughter': '',
  'great-grandmother+grandson': '',
  'great-grandmother+granddaughter': '',
  'great-grandmother+son': '',
  'great-grandmother+daughter': '',
  'great-grandmother+nephew': '',
  'great-grandmother+niece': '',
  'great-grandmother+wife': '',
  'great-grandmother+husband': '',
  'great-grandmother+brother': '',
  'great-grandmother+sister': '',
  'great-grandmother+cousin': '',
  'great-grandmother+brother-in-law': '',
  'great-grandmother+sister-in-law': '',
  'great-grandmother+fiance': '',
  'great-grandmother+father': '',
  'great-grandmother+mother': '',
  'great-grandmother+father-in-law': '',
  'great-grandmother+mother-in-law': '',
  'great-grandmother+uncle': '',
  'great-grandmother+aunt': '',
  'great-grandmother+grandfather': '',
  'great-grandmother+grandmother': '',
  'great-grandmother+great-grandfather': '',
  'great-grandmother+great-grandmother': '',



}




module.exports = {
  rMap,
  MapForRelationFlow,
  oppositeMap,
  oppositeMapWithGender,
  genderMap,
  siblingMap,
  exactRelations,
  indirectRelations,
}