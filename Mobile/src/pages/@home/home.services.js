/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import api from '~/services/service';

export async function subscribeOportunity({ OportunidadeId, CandidatoId }) {
    const res = await api.store({
        table: 'Candidatura',
        useExclamation: true,
        type: 'STORE',
        properties: 'Id Status',
        value: { OportunidadeId, CandidatoId },
    });

    return res;
}