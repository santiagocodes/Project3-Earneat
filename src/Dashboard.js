import React, { Component } from 'react'
import TopNavBar from './Components/TopNavBar';
import Puntos from './Components/Puntos';
import Premios from './Components/Premios';
import MiArea from './Components/MiArea';
import MiTarjeta from './Components/MiTarjeta';
import MenuWithRouter from "./MenuWithRouter";
import AdminUsuarios from "./AdminComponents/AdminUsuarios";
import AdminPremios from "./AdminComponents/AdminPremios";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react'; 

export default class Dashboard extends Component {
  
  render() {
    const user = this.props.user;
    const items = [
      ['Dashboard', "/"],
      ['Premios', "/premios"],
      ['Mi Area  Personal', "/mi-area"]
    ];
    if (user.admin) {
      items.push(['Administrar Usuarios', '/administrar-usuarios'], 
      ['Administrar Premios', '/administrar-premios'])
    }
    return ( 
    <Router>
      <TopNavBar/>
      <Grid divided='vertically'>
{/* Grid with SideBar  */}
        <Grid.Column className="sideBarGrid" width={3}>
        <Segment 
          className='sideBar'
          inverted color='teal'
          >
          <MiTarjeta/>
          <MenuWithRouter
            onItemClick={item => this.onItemClick(item)}
            items={items}
            headerIcon={"compass outline"}
          />
        </Segment>
        </Grid.Column>
{/* Grid with Content Area */}
        <Grid.Column
        className="displayAreaGrid" 
         width={13}
        >
          <Segment
            className="displayArea" 
          >
          { user.admin ? 
// Navegacion para administradores
            <Switch>
              <Route path="/" exact render={(p) => (<Puntos {...p} {...{ user: user}} />)} />
              <Route path="/premios" component={Premios} />
              <Route path="/mi-area" component={MiArea} />
              <Route path="/administrar-usuarios" component={AdminUsuarios} />
              <Route path="/administrar-premios" component={AdminPremios} />
            </Switch>
                  :
// Navegacion para resto de usuarios
            <Switch>
              <Route path="/" exact render={(p) => (<Puntos {...p} {...{ user: user}} />)} />
              <Route path="/premios" component={Premios} />
              <Route path="/mi-area" component={MiArea} />
              {/* <Route component={MissingPage} /> */}
            </Switch>
                  }
          </Segment>
        </Grid.Column>
      </Grid>
    </Router>
  )}
}