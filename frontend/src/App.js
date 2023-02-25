import { STATE_LOGIN, STATE_SIGNUP } from './components/AuthForm';
import GAListener from './components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from './components/Layout';
import PageSpinner from './components/PageSpinner';
import AuthPage from './pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import Web3 from "web3";
import InfluencerMarketingContract from "./truffle_abis/InfluencerMarketingContract.json";
import KOLCoin from "./truffle_abis/KOLCoin.json";

const HomePage = React.lazy(() => import('./pages/HomePage'));
const CampaignPage = React.lazy(() => import('./pages/CampaignPage'));
const CampaignCreatorPage = React.lazy(() =>
  import('./pages/CampaignCreatorPage'),
);
const CampaignDetailPage = React.lazy(() =>
  import('./pages/CampaignDetailPage'),
);
const ContractDetailPage = React.lazy(() =>
  import('./pages/ContractDetailPage'),
);
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const ContractPage = React.lazy(() => import('./pages/ContractPage'));
const ModalPage = React.lazy(() => import('./pages/ModalPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

const ethers = require('ethers');

class App extends React.Component {
  

  constructor(props) {
    super(props);
    // initialize state
    this.state = {
      account: "0x0",
      // contract is a JS obj
      influencerMarketingCon: {},
      kolC: {},
      kolCBalance: "0"
    };
  }

    // run the function before the rendering component
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected! You can check out MetaMask");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();

    //Load Tether Contract
    const contractData = InfluencerMarketingContract.networks[networkId];
    if (contractData) {
      const influencerMarketingCon = new web3.eth.Contract(InfluencerMarketingContract.abi, contractData.address);
      this.setState({ influencerMarketingCon: influencerMarketingCon });
    } else {
      window.alert("Error! InfluencerMarketingContract contract not deployed - no detected network");
    }

    //Load RWD Contract
    const kolCData = KOLCoin.networks[networkId];
    if (kolCData) {
      const kolC = new web3.eth.Contract(KOLCoin.abi, kolCData.address);
      this.setState({ kolC: kolC });
      let kolCBalance = await kolC.methods.balanceOf(this.state.account).call();

      kolCBalance = await ethers.utils.formatUnits(
        kolCBalance.toString(),
        'ether',
      );

      this.setState({ kolCBalance: kolCBalance.toString() });
      console.log(this.state.account + ": " + kolCBalance);
    } else {
      window.alert("Error! KOL Coin contract not deployed - no detected network");
    }
  }

  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout
              balance={this.state.kolCBalance}
              account={this.state.account}
              breakpoint={this.props.breakpoint}
            >
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/campaigns" component={CampaignPage} />
                <Route
                  exact
                  path="/creatorCampaigns"
                  component={CampaignCreatorPage}
                />
                <Route
                  exact
                  path="/campaigns/:campaignId"
                  component={CampaignDetailPage}
                />
                <Route
                  exact
                  path="/campaigns/:campaignId/contracts/:contractId"
                  component={ContractDetailPage}
                />
                <Route exact path="/profile" component={ProfilePage} />
                <Route exact path="/contract" component={ContractPage} />
                <Route exact path="/modals" component={ModalPage} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
