import { Component, OnInit } from '@angular/core';

interface BaseEntity{
  id: string | null;
}

interface Client extends BaseEntity{
  firstName: string,
  lastName: string,
  company: string
}

const lawrence: Client = {
  id: '1',
  firstName: 'Lawrence',
  lastName: 'Lubs',
  company: 'Acme, Inc'
}

const john: Client =  {
  id: '2',
  firstName: 'John',
  lastName: 'Doe',
  company: 'NA'
}

//Array of objects
const clients: Client[] = [
  lawrence,
  john
]

//Client composition
interface ClientsState {
  clients: Client[];
  currentClient: Client
}

const newClient: Client = {
  id: null,
  firstName: '',
  lastName: '',
  company: ''
}

//Instance creation before building a collection of objects.
const initialClientsState: ClientsState = {
  clients,
  currentClient: newClient
}


interface Project extends BaseEntity{
  title: string,
  description: string
  completed: boolean;
}

//Project Composition.
interface ProjectsState {
  projects: Project[]
  currentProject: Project;
}

const superProject: Project = {
  id: '1',
  title: 'Super Project',
  description: 'Lovely Project',
  completed: false
}

const hellProject: Project = {
  id: '2',
  title: 'Hell project on Earth',
  description: 'Just make it stop',
  completed: true
}

const newProject: Project = {
  id: null,
  title: '',
  description: '',
  completed: false
}

const projects: Project[] = [
  superProject,
  hellProject
]

//Instance creation
const initialProjectsState: ProjectsState = {
  projects,
  currentProject: newProject
}

//Collection of Object
interface AppState {
  clientsState: ClientsState,
  projectsState: ProjectsState
}

const appState: AppState = {
  clientsState: initialClientsState,
  projectsState: initialProjectsState
}

//Exercise
class ProjectsStore {

  state: ProjectsState;

  constructor(state: ProjectsState) {
    this.state = state;
  }

  getState(): ProjectsState{
    return this.state;
  }

  select(key: string) {
    return this.state[key]
  }
}

const projectsStore = new ProjectsStore(initialProjectsState);
const currentProjects = projectsStore.select('projects')

//Create a reducer which you can put in a new file.
interface Action {
  type: string;
  payload?: any;
}

const CLIENT_LOAD = '[Client] Load';
const CLIENT_CREATE = '[Client] Create';
const CLIENT_UPDATE = '[Client] Update';
const CLIENT_DELETE = '[Client] Delete';
const CLIENT_SELECT = '[Client] Select';
const CLIENT_CLEAR = '[Client] Clear'

const loadClients = (state, clients): ClientsState => {
  return {
    clients,
    currentClient: state.currentClient
  }
}

const selectClient = (state, client): ClientsState => {
  return {
    clients: state.clients,
    currentClient: client
  }
};

const clearClient = (state): ClientsState => {
  return {
    clients: state.clients,
    currentClient: null
  }
};

const createClient = (state, client): ClientsState => {
  return {
    clients: [...state.clients, client],
    currentClient: state.currentClient,
  };
};

const updateClient = (state, client): ClientsState => {
 return {
   clients: state.clients.map((c) => c.id !== client.id),
   currentClient: state.currentClient,
 };
};

const deleteClient = (state, client): ClientsState => {
  return {
    clients: state.clients.filter(c => {
      return (c.id !== client.id) ? Object.assign({}, client) : c;
    }),
    currentClient: state.currentClient,
  };
};

//Class with a reducer.
const clientsReducer = (state: ClientsState = initialClientsState, action: Action) => {
  switch (action.type) {
    case CLIENT_LOAD: 
      return loadClients(state, action.payload);
    case CLIENT_SELECT: 
      return selectClient(state, action.payload);
    case CLIENT_CREATE:
      return createClient(state, action.payload);
    case CLIENT_UPDATE:
      return updateClient(state, action.payload);
    case CLIENT_DELETE:
      return deleteClient(state, action.payload);
    case CLIENT_CLEAR:
      return clearClient(state);
    default:
      return state;
  }
}

class ClientsStore{
  reducer;
  state: ClientsState;

  constructor(state: ClientsState, reducer) {
    this.state = state;
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }

  select(key: string) {
    return this.state[key]
  }

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
  }
}

const jane: Client = {
  id: '123',
  firstName: 'Jane',
  lastName: 'Doe',
  company: 'CrazyBoots'
}

// class instance
const clientsStore = new ClientsStore(initialClientsState, clientsReducer);
const aClient = clientsStore.select('currentClient');
clientsStore.dispatch({ type: CLIENT_CREATE, payload: jane });
const allClients = clientsStore.select('clients');
// const currentClients = clientsStore.select('clients');
// const currentClient = clientsStore.select('currentClient');
// clientsStore.load(clients);
// clientsStore.select(lawrence)



// Application State
const tango =  allClients //projectsStore //appState;

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  echo = tango;
}
