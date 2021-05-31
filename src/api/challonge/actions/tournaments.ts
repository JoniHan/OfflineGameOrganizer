
export const fetchAllTournaments = (apiKey: string): any => {
    let url = baseUrl();
    url += 'tournaments.json';
    url += `?api_key=${apiKey}`;

    return fetch(url)
        .then(tournaments => tournaments.json())
        .then(
            result => {
                return result;
            },
            error => {
                return error;
            }
        );
};

// todo: need to proxy requests through CORS proxy. https://stackoverflow.com/a/43268098
const baseUrl = (): string => `https://cors-anywhere.herokuapp.com/https://api.challonge.com/v1/`;
