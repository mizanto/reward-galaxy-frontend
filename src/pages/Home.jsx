import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import FamilyBlock from '../components/Family/FamilyBlock';
import GoalsBlock from '../components/Goals/GoalsBlock';

const Home = () => {
  return (
    <Grid 
      templateColumns={{ base: "1fr", sm: "1fr 3fr" }}
      gap={4}
      w="100%"
    >
      <GridItem>
        <FamilyBlock />
      </GridItem>
      <GridItem>
        <GoalsBlock />
      </GridItem>
  </Grid>
  );
};

export default Home;