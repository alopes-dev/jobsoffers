import AddCandidato from './components/Views/Candidato/addCandidato';
import ListCandidato from './components/Views/Candidato/listCandidato';
import CurriculumViewer from './components/Views/Candidato/CurriculumViewer';
import CoreOportunidade from './components/Views/Oportunidade/index';
import Dashboard from './components/Views/Dashboard/dashboard';
import ListOportunidade from './components/Views/Oportunidade/listOportunidade';
import VOp360 from './components/Views/Oportunidade/360';

const routes = [{
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'flaticon-home',
        layout: '/admin',
        components: Dashboard,
    },

    {
        name: 'Oportunidade',
        icon: 'flaticon-idea',
        collapse: true,
        children: [{
                name: 'Oportunidades',
                path: '/list-oportunidade',
                components: ListOportunidade,
            },
            {
                name: 'Nova Oportunidade',
                path: '/oportunidade',
                components: CoreOportunidade,
                privice: 'admin',
            },
            {
                name: 'Visão Geral da Oportunidade',
                path: '/general-view',
                show: false,
                components: VOp360,
                privice: 'admin',
                aliasIcon: 'flaticon-layers-1',
            },
        ],
    },
    {
        name: 'Candidato',
        icon: 'icon-people',
        collapse: true,
        children: [{
                name: 'Candidatos',
                path: '/list-candidato',
                action: 'Listagem',
                components: ListCandidato,
                aliasIcon: 'icon-people',
            },
            {
                name: 'Novo Candidatos',
                path: '/candidato',
                components: AddCandidato,
                action: 'Formúlario',
                privice: 'admin',
                aliasIcon: 'icon-user-follow',
            },
            {
                name: 'Curriculum do Candidato',
                path: '/curriculum-viewer',
                show: false,
                components: CurriculumViewer,
                privice: 'admin',
                aliasIcon: 'flaticon-layers-1',
            },
        ],
    },
    {
        name: 'Candidatura',
        path: '/Candidatura',
        icon: 'icon-tag',
    },
    {
        name: 'Serviços',
        path: '/servicos',
        icon: 'flaticon-technology-1',
    },
    {
        name: 'Alerta de vagas',
        path: '/alertaDeVagas',
        icon: 'flaticon-alarm-1',
    },
    {
        name: 'Curriculo',
        path: '/curriculo',
        icon: 'flaticon-shapes',
    },
    // {
    //     name: 'Procurar VC',
    //     path: '/procurarVC',
    //     icon: 'flaticon-search-1',
    // },
    // {
    //     name: 'Beneficios',
    //     path: '/Beneficios',
    //     icon: 'icon-support',
    //     components: AddCandidato,
    // },
    // {
    //     name: 'Empresa',
    //     path: '/Empresa',
    //     icon: 'icon-compass',
    // },
    // {
    //     name: 'Cargos',
    //     path: '/Cargos',
    //     icon: 'icon-briefcase',
    // },
];

export default routes;