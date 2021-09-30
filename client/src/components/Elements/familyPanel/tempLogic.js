
import { exactRelations, oppositeMapWithGender, rMap, siblingMap, oppositeMap, genderMap } from "../relationDictionary";
var FamilyGenderDataMap = new Map();


function checkRelations (nodes) {
  const relationSet = new Set(["mother","father","brother","sister","wife","husband","son","daughter"]);
  for (let i=0; i<nodes.length; i++) {
    let givenRel = nodes[i].csvRelation;
    if(!relationSet.has(givenRel)) return false;
  };
  return true;
}

function SaveGenderData (nodes, FamilyGenderDataMap) {
  nodes.forEach((relation) => {
    let sid = relation.ClientID_2;
    let givenRel = relation.csvRelation;
    if( !(FamilyGenderDataMap.has(sid)) && genderMap[givenRel] !== undefined ){
      FamilyGenderDataMap.set(sid, genderMap[givenRel]);
    }
  })
}


function AssignRelationToSid (node, otherPerson) {

  // console.log('AssignRelationToSid called...', otherPerson);

  let relationWithHead = '';

  if(otherPerson.relation === '') relationWithHead = node.csvRelation;
  else relationWithHead = exactRelations[otherPerson.relation + '+' + node.csvRelation];

  if(relationWithHead) return relationWithHead;
  else return 'Indirect';

}

function AssignRelationToPid (node, otherPerson) {

  // console.log('AssignRelationTo{Pid} called...', otherPerson);

  let possibleGender = FamilyGenderDataMap[node.ClientID_2];
  let possibleRelationObject = oppositeMapWithGender[node.csvRelation];

  let oppositeRelation = '';

  if(possibleGender && possibleRelationObject) oppositeRelation = possibleRelationObject[possibleGender];
  else if (node.csvRelation === 'wife') oppositeRelation = 'husband'
  else if (node.csvRelation === 'husband') oppositeRelation = 'wife'
  else oppositeRelation = 0;


  if(oppositeRelation){
    let relationWithHead = '';

    if(otherPerson.relation === '') relationWithHead = oppositeRelation;
    else relationWithHead = exactRelations[otherPerson.relation + '+' + oppositeRelation];

    if(relationWithHead) return relationWithHead;
    else return 0;

  } else return 0;             ////   returning 0 means its an ambigious relation !

}


function filterData(hashMap){
  let resultArray = [];
  let PartnerDetails = 0;
  hashMap.forEach((value, key) => {
    if(value.relation==='son' || value.relation === 'daughter') resultArray.push(value);
    if(value.relation==='wife' || value.relation === 'husband') PartnerDetails = value;
  });
  return [resultArray, PartnerDetails];
}

function RecursionLogic(headID, headName, head_gLevel, data) {

  let Family_id = data.id;

  let nodes = [...(data.value)];

  console.log('formulate called for: ', headID, headName);

  let hashMap = new Map();

  let head = {
      Family_id,
    personID: headID,
    personName: headName,
    gLevel: head_gLevel,
    relation: "",
    notes: '',
  };

  hashMap.set(headID, head);       // global map which will be the resulting output

  let noChange;
  // let itr = 0;

  do {

    let tempMap = new Map(hashMap);   // making a copy of current state of hashmap
    noChange = false;

    // itr++;
    // console.log("\nAfter", itr, "Iteration: ", tempMap);

    for (let i = 0; i < nodes.length; i++) {

      let node = nodes[i];   // current relation is called as node   whereas   nodes refers to the array of relations

      if (tempMap.get(node.ClientID_1) !== undefined && tempMap.get(node.ClientID_2) === undefined) {

        let otherPerson = tempMap.get(node.ClientID_1);

        let personID = Number(node.ClientID_2);
        let gLevel = otherPerson.gLevel + rMap[node.csvRelation];
        let relation = AssignRelationToSid(node, otherPerson);


        hashMap.set(node.ClientID_2, {
          Family_id,
          personID,
          personName: node.ClientName_2,
          gLevel,
          relation,
          notes: '',
        });

        nodes.splice(i, 1);
        i--;
        noChange = true;          // To make sure a disjoin set doesn't make an infinite loop
      }

      else if (tempMap.get(node.ClientID_2) !== undefined && tempMap.get(node.ClientID_1) === undefined) {

        let otherPerson = tempMap.get(node.ClientID_2);

        let personID = Number(node.ClientID_1);
        let gLevel = otherPerson.gLevel - rMap[node.csvRelation];

        let relation = AssignRelationToPid(node, otherPerson);

        if(relation){
          hashMap.set(node.ClientID_1, {
            Family_id,
            personID,
            personName: node.ClientName_1,
            gLevel,
            relation,
            notes: '',
          });

          nodes.splice(i, 1);
          i--;
          noChange = true;
        }

      }

    }       // ignoring those relations in which both pid and sid are already defined ...!!

  } while (nodes.length > 0 && noChange);

  // if(nodes.length > 0){
  //   console.log('Relations Ignored or Unhandled: ', nodes);
  // }

  let FilterData = filterData(hashMap)

  let filterDataArray = FilterData[0];
  let PartnerDetails = FilterData[1];

  if(filterDataArray !== []){

    let returnArray = [];

    filterDataArray.forEach((member)=>{
      let tempMember = {
        Family_id,
        personID: Number(member.personID),
        personName: member.personName,
        gLevel: member.gLevel,
        relation: member.relation,
        notes: '',
        FamilyDetails: RecursionLogic(member.personID, member.personName, member.gLevel, data),
      }

      returnArray.push(tempMember);
    });

    return {
      children: returnArray,
      partner: PartnerDetails
    };

  } else if (PartnerDetails) {
    return {
      children: [],
      partner: PartnerDetails,
    }
  }
  else return { children: [], partner: 0 };

}


export function TempLogic (data) {

  let Family_id = data.id;
  let nodes = [...(data.value)];
  let valid = checkRelations(nodes);

  if(valid) {

    FamilyGenderDataMap = new Map();
    SaveGenderData(nodes, FamilyGenderDataMap);

    let headID = nodes[0].ClientID_1;
    let headName = nodes[0].ClientName_1;

    let family = {
        Family_id,
      personID: Number(headID),
      personName: headName,
      gLevel: 0,
      relation: "Family Head",
      notes: '',
      FamilyDetails: RecursionLogic(headID, headName, 0, data)
    };

    console.log('Final Family: ', family);

    return family;

  } else return 0;


}




const item = [
  {
    id: 231,
    personID: 2006,
    relatedTo: 'Moin Khan',
    notes: 'Hello Moin khan',
    childrenDetails: [
      {
        id: 232,
        personID: 2006,
        relatedTo: 'A',
        notes: 'Hello A',
      },
      {
        id: 233,
        personID: 2006,
        relatedTo: 'B',
        notes: 'Hello B',
      },
      {
        id: 234,
        personID: 2006,
        relatedTo: 'C',
        notes: 'Hello C',
      },
    ],
  },
  {
    id: 235,
    personID: 2006,
    relatedTo: 'Moin',
    notes: 'Hello Moin',
    childrenDetails: [
      {
        id: 236,
        personID: 2006,
        relatedTo: 'John',
        notes: 'Hello Jhon',
      },
    ],
  },
  {
    id: 237,
    personID: 2006,
    relatedTo: 'Priya',
    notes: 'Hello Priya',
    childrenDetails: [
      {
        id: 238,
        personID: 2006,
        relatedTo: 'Child1',
        notes: 'Hello Child1',
      },
      {
        id: 239,
        personID: 2006,
        relatedTo: 'Child2',
        notes: 'Hello Child2',
      },
      {
        id: 240,
        personID: 2006,
        relatedTo: 'Child3',
        notes: 'Hello Child3',
      },
      {
        id: 241,
        personID: 2006,
        relatedTo: 'Child4',
        notes: 'Hello Child4',
      },
    ],
  },
  {
    id: 242,
    personID: 2006,
    relatedTo: 'dharshini',
    notes: 'Hello dharshini',
    childrenDetails: [],
  },
]
