import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, GridItem } from '@chakra-ui/react';

import FamilyBlock from '../components/Family/FamilyBlock';
import GoalsBlock from '../components/Goals/GoalsBlock';

const Home = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  return currentUser.role === "parent" ? (
    <Grid 
      templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 2fr", lg: "1fr 3fr"}}
      gap={4}
      w="100%"
      h="100%"
    >
      <GridItem overflow="auto">
        <FamilyBlock/>
      </GridItem>
      <GridItem overflow="auto">
        <GoalsBlock/>
      </GridItem>
  </Grid>
  ) : (
    <Box
      w="100%"
      h="100%"
    >
      <GoalsBlock />
    </Box>
  );
};

export default Home;