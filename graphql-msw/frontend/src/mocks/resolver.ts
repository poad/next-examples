import { graphql } from 'msw/graphql';
import { HttpResponse } from 'msw/http';
import { QueryPokemonListDocument } from '../gql/graphql';

const api = graphql.link(process.env.NEXT_PUBLIC_API_URL ?? '');

export const handlers = [
  api.query(QueryPokemonListDocument, () => {
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
