/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
export function signIn() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'asjkalksalskamsambsnakksnmasmasasadasa',
                user: {
                    name: 'Antonio Lopes',
                    email: 'afl@gmail.com',
                },
            });
        }, 2000);
    });
}