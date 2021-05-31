
export const fetchAllMatches = (username: string, apiKey: string, tournamentIndex: number): any => {
    let url = baseUrl(tournamentIndex);
    const headers = authHeaders(username, apiKey);
    url += 'matches.json';

    let resultSet = null;

    fetch(url, { headers: headers })
        .then(matches => matches.json())
        .then(
            (resultJson => { resultSet = resultJson })
        );

    return resultSet;
};

const baseUrl = (tournamentIndex: number): string => `https://api.challonge.com/v1/tournaments/${tournamentIndex}/`;
const authHeaders = (username: string, apiKey: string): Headers => {
    const headers = new Headers();
    headers.append('Authorization', 'basic ' + btoa(username + ':' + apiKey));
    return headers;
};