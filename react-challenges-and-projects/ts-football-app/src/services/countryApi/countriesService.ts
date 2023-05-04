import { baseApi } from '../baseApi';
import { ICountry } from '../../types/country';
import { IApiResponse } from '../../types/general';


export const countryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchAllCountries: build.query<ICountry[], void>({
      query: () => ({
        url: '/countries',
      }),
      transformResponse: (response: IApiResponse) => {
        return response.response;
      }
    })
  })
});



export const { useFetchAllCountriesQuery } = countryApi;