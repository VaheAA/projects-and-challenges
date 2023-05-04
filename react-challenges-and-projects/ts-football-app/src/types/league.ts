import { ICountry } from './country';

export interface ILeague {
  id: number;
  name: string;
  type: string;
  logo: string;
}

interface ISeason {
  year: number;
  start: string;
  end: string;
  current: false;
}


export interface ILeagueStanding {
  all: any;
  away: any;
  description: string;
  form: string;
  goalsDiff: number;
  group: string;
  home: any;
  points: number;
  rank: number;
  status: string;
  team: any;
  update: string;
}


export interface ILeaguesItem {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: [ILeagueStanding[]];
}

export interface ILeagueStandingsResponse {
  league: ILeaguesItem;
}

export interface ILeagueResponse {
  league: ILeague;
  country: ICountry;
  seasons: ISeason[];
}