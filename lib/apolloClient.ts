import { ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({

    //uri: 'http://localhost:3000/api/graphql',
    uri:'https://prueba-tecnica-fullstack-git-main-mariamm1110s-projects.vercel.app/api/graphql',
    cache: new InMemoryCache()
});

export default client;