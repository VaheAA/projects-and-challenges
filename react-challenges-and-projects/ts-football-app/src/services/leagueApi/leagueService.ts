import { baseApi } from '../baseApi';
import { IApiResponse } from '../../types/general';
import { ILeagueResponse, ILeagueStandingsResponse } from '../../types/league';


interface LeagueStandingParams {
  season: number;
  league: number;
}


export const leagueApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchLeagues: build.query<ILeagueResponse[], string | undefined>({
      query: (code: string) => ({
        url: '/leagues',
        params: {
          code: code
        },
      }),
      transformResponse: (response: IApiResponse) => {
        return response.response;
      }
    }),
    fetchLeagueById: build.query<ILeagueResponse[], number>({
      query: (id) => ({
        url: '/leagues',
        params: {
          id: id
        }
      }),
      transformResponse: (response: IApiResponse) => {
        return response.response[0];
      }
    }),
    fetchLeagueStats: build.query<ILeagueStandingsResponse, LeagueStandingParams>({
      query: (params) => ({
        url: '/standings',
        params: {
          season: params.season,
          league: params.league
        }
      }),
      transformResponse: (response: IApiResponse) => {
        return response.response[0];
      }
    })
  })
});


export const { useFetchLeaguesQuery, useFetchLeagueByIdQuery, useFetchLeagueStatsQuery } = leagueApi;