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

class ClientsStore{
  clients: Client[];
  currentClient: Client;

  load(newClients: Client[]) {
    this.clients = newClients;
  }

  select(client: Client) {
    this.currentClient = client;
  }

  create(newClient: Client) {
    this.clients = [...this.clients, newClient];
  }
}

const clientsStore = new ClientsStore();

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

// Application State
const tango = appState;

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  echo = tango;
}
