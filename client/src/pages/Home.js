import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import Landing from '../components/layout/Landing'
// import AppAppBar from './modules/views/AppAppBar';

function Home() {
  return (
    <React.Fragment>
      {/* <AppAppBar /> */}
      {/* <ProductHero /> */}
      <Landing/>
      {/* <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductSmokingHero /> */}
    </React.Fragment>
  );
}

export default withRoot(Home);
