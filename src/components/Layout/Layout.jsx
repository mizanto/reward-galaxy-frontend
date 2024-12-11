import React from 'react';
import { Flex } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex as="main" flex="1" p={4} overflowY="auto">
        {children}
      </Flex>

      <Footer />
    </Flex>
  );
};

export default Layout;