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

//Class 
class ClientsStore{
  state: ClientsState;

  constructor(state: ClientsState) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  select(key: string) {
    return this.state[key]
  }
}

// class instance
const clientsStore = new ClientsStore(initialClientsState);
const currentClients = clientsStore.select('clients');
const currentClient = clientsStore.select('currentClient');
// clientsStore.load(clients);
// clientsStore.select(lawrence)

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

const loadClients = (state, clients) => {
  console.log('LOAD CLIENTS!', clients)
  return state;
}

const createClient = (state, client) => {
  console.log('CREATE CLIENT!', client);
  return state;
};

const updateClient = (state, client) => {
  console.log('UPDATE CLIENT!', client);
  return state;
};

const deleteClient = (state, client) => {
  console.log('DELETE CLIENTS!', client);
  return state;
};

const selectClient = (state, client) => {
  console.log('SELECT CLIENT!', client)
  return state;
};

const clearClient = (state, client) => {
  console.log('CLEAR CLIENTS!', client);
  return state;
};

const clientReducer = (state: ClientsState = initialClientsState, action: Action) => {
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
      return clearClient(state, action.payload);
    default:
      return state;
  }
}

// Application State
const tango =  projectsStore //appState;

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  echo = tango;
}
