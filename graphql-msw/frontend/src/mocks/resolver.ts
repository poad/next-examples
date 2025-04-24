import { graphql, HttpResponse } from 'msw';
import { QueryPokemonListDocument } from '../gql/graphql';

export const handlers = [
  graphql.query(QueryPokemonListDocument, () => {
    return HttpResponse.json({
      data: {
        list: [
          {
            id: '0001',
            name: 'フシギダネ',
          },
        ],
      },
    });
  }),
];
