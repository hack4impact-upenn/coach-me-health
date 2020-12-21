import secureAxios from './core/apiClient';

const getPatient = (patientID: string, { accessToken }: { accessToken: string }) => {
    return new Promise((resolve, reject) => {
      secureAxios({
        url: '/api/patients/' + patientID,
        method: 'GET',
        timeout: 0,
        headers: {
           Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err: Error) => reject(err));
    });
  };

export { getPatient };