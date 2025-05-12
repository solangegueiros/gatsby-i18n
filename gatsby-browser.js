import './src/styles/site.scss';

import React from "react";
import { SidebarProvider } from "./src/context/SidebarContext";

export const wrapRootElement = ({ element }) => (
  <SidebarProvider>{element}</SidebarProvider>
);


/*
import React from 'react';
import Layout from './src/components/Layout';

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout location={props.location} pageTitle={props.pageContext.frontmatter?.title || 'Default Title'}>
      {element}
    </Layout>
  );
};

*/
