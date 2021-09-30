import React, { useEffect, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import {
  Box,
  Grid,
  Button,
  Container,
  CircularProgress,
  Tooltip,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { TreeLogic } from './TreeLogic';
import { TempLogic } from './tempLogic';
import { useClientData } from '../../../context/ClientContext'
import NodeMember from './NodeMember';
import { useFamilyPanelData } from '../../../context/FamilyPanelContext';

const useStyles = makeStyles((theme) => ({
  FamilyHead: {
    color: '#eabc33',
    fontSize: 20,
    fontWeight: '600',
    margin: theme.spacing(1.5),
  },
  FamilyHeadValue: {
    color: '#585858',
    display: 'inline',
    marginLeft: theme.spacing(1.5),
  },
}))

const FamilyTree = ({selectedClient}) => {

  const classes = useStyles();
  const [FamilyTreeData, setFamilyTreeData] = useState([]);
  const [Loading, setLoading] = useState(1);
  const [FamilyNotesData, setFamilyNotesData] = useState(new Map());
  const [UpdateDataToggle, setUpdateDataToggle] = useState(0);
  const { getFamilyRelations } = useClientData();
  const { getAllFamilyNotes } = useFamilyPanelData();

  const getData = async () => {
    const data = await getFamilyRelations(selectedClient);

    if(data) {
      let family = await TempLogic(data);
      if(family) await setFamilyTreeData(family);
      else{
        console.log('Ambigious relations found so can\'t be displayed.');
        setFamilyTreeData([]);
      }
    } else setFamilyTreeData([]);

  }

  const getNotesData = async () => {
    setLoading(1);
    let AllNotes = await getAllFamilyNotes(selectedClient);
    if(!AllNotes) AllNotes = [];
    let tempMap = new Map();
    await AllNotes.forEach(element => {
      tempMap.set(element.personID, element.personNotes);
    });
    await setFamilyNotesData(tempMap);
    setLoading(0);
  }

  useEffect(() => {

    if(selectedClient){
      getData();
      getNotesData();
    }
    if(UpdateDataToggle) setUpdateDataToggle(0);

  }, [selectedClient, UpdateDataToggle, setUpdateDataToggle])

  const DisplayTree = (item) => {                 /// Display Tree Recursive Function
    return  item?.map((cdata, i) => (
      <>
        <TreeNode
          key={i}
          tag={item}
          label={
            (cdata.FamilyDetails.partner)
            ? <>
                <Box display="flex" justifyContent="center">
                  <Grid container>

                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-end">
                        <NodeMember
                          setUpdateDataToggle={setUpdateDataToggle}
                          FamilyId={selectedClient}
                          personID={cdata.personID}
                          personName={cdata.personName}
                          relation={cdata.relation}
                          notes= {FamilyNotesData.get(cdata.personID)}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        <NodeMember
                          setUpdateDataToggle={setUpdateDataToggle}
                          FamilyId={selectedClient}
                          personID={cdata.FamilyDetails.partner.personID}
                          personName={cdata.FamilyDetails.partner.personName}
                          relation={cdata.FamilyDetails.partner.relation}
                          notes= {FamilyNotesData.get(cdata.FamilyDetails.partner.personID)}
                        />
                      </Box>
                    </Grid>

                  </Grid>
                </Box>
              </>
            : <NodeMember
                setUpdateDataToggle={setUpdateDataToggle}
                FamilyId={selectedClient}
                personID={cdata.personID}
                personName={cdata.personName}
                relation={cdata.relation}
                notes= {FamilyNotesData.get(cdata.personID)}
              />
          }
        >
          {DisplayTree(cdata.FamilyDetails.children)}
        </TreeNode>
      </>
    ))
  }

  return (
    <>

      <Container>

        <Box>
          <Grid container>
            <Grid className={classes.FamilyHead} item xs={4}>
              Family/Client ID:{' '}
              <Box className={classes.FamilyHeadValue}>
                {selectedClient}
              </Box>
            </Grid>
          </Grid>
        </Box>


        { (FamilyTreeData.length !== 0 && selectedClient)
          ? <Box mb={3}>
              <Tree
                lineWidth={'2px'}
                lineColor={'green'}
                lineBorderRadius={'10px'}
                label={
                  (FamilyTreeData.FamilyDetails.partner)
                  ? <>
                      <Box display="flex" justifyContent="center">
                        <Grid container>

                          <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-end">
                              <NodeMember
                                setUpdateDataToggle={setUpdateDataToggle}
                                FamilyId={selectedClient}
                                personID={FamilyTreeData.personID}
                                personName={FamilyTreeData.personName}
                                relation={FamilyTreeData.relation}
                                notes= {FamilyNotesData.get(FamilyTreeData.personID)}
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-start">
                              <NodeMember
                                setUpdateDataToggle={setUpdateDataToggle}
                                FamilyId={selectedClient}
                                personID={FamilyTreeData.FamilyDetails.partner.personID}
                                personName={FamilyTreeData.FamilyDetails.partner.personName}
                                relation={FamilyTreeData.FamilyDetails.partner.relation}
                                notes= {FamilyNotesData.get(FamilyTreeData.FamilyDetails.partner.personID)}
                              />
                            </Box>
                          </Grid>

                        </Grid>
                      </Box>
                    </>

                  : <NodeMember
                      setUpdateDataToggle={setUpdateDataToggle}
                      FamilyId={selectedClient}
                      personID={FamilyTreeData.personID}
                      personName={FamilyTreeData.personName}
                      relation={FamilyTreeData.relation}
                      notes= {FamilyNotesData.get(FamilyTreeData.personID)}
                    />
                }
              >
                {DisplayTree(FamilyTreeData.FamilyDetails.children)}     {/* This function will call itself Recursively... */}
              </Tree>
            </Box>

          : <>
              { (Loading)
                ? <Box mx={2} display="flex" justifyContent="center">
                    <CircularProgress color="secondary" />
                  </Box>
                : <Grid container>
                    <Grid className={classes.FamilyHead} item xs={12}>
                      <Box style={{display:'block',textAlign:'center'}} className={classes.FamilyHeadValue}>
                        Ambigious Relations Found
                      </Box>
                    </Grid>
                  </Grid>
              }
            </>
        }


      </Container>

    </>
  )
}

export default FamilyTree;
