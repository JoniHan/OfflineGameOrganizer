
export const fetchAllMatchAttachments = (username: string, apiKey: string, tournamentIndex: number, matchIndex: number): any => {
    let url = baseUrl(tournamentIndex, matchIndex);
    const headers = authHeaders(username, apiKey);
    url += 'attachments.json';

    let resultSet = null;

    fetch(url, { headers: headers })
        .then(attachments => attachments.json())
        .then(
            (resultJson => { resultSet = resultJson })
        );

    return resultSet;
};

const baseUrl = (tournamentIndex: number, matchindex: number): string => `https://api.challonge.com/v1/tournaments/${tournamentIndex}/matches/${matchindex}/`;
const authHeaders = (username: string, apiKey: string): Headers => {
    const headers = new Headers();
    headers.append('Authorization', 'basic ' + btoa(username + ':' + apiKey));
    return headers;
};