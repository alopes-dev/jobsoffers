import AddCandidato from './components/Views/Candidato/addCandidato';
import ListCandidato from './components/Views/Candidato/listCandidato';
import CurriculumViewer from './components/Views/Candidato/CurriculumViewer';
import CoreOportunidade from './components/Views/Oportunidade/index';
import Dashboard from './components/Views/Dashboard/dashboard';
import ListOportunidade from './components/Views/Oportunidade/listOportunidade';
import VOp360 from './components/Views/Oportunidade/360';
import MobileCore from './mobile';
import EmpresaCore from './components/Views/Empresa';

const routes = [{
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'flaticon-home',
        layout: '/admin',
        components: Dashboard,
    },

    {
        name: 'Empregador',
        path: '/enterprise',
        icon: 'flaticon-store',
        layout: '/admin',
        show: false,
        components: EmpresaCore,
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
            // {
            //     name: 'Detalhe da Oportunidade',
            //     path: '/oportunidades/:id',
            //     show: false,
            //     components: CoreOportunidade,
            //     privice: 'admin',
            // },
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
    // {
    //     name: 'Candidato',
    //     icon: 'icon-people',
    //     collapse: true,
    //     children: [{
    //             name: 'Candidatos',
    //             path: '/list-candidato',
    //             action: 'Listagem',
    //             components: ListCandidato,
    //             aliasIcon: 'icon-people',
    //         },
    //         {
    //             name: 'Novo Candidatos',
    //             path: '/candidato',
    //             components: AddCandidato,
    //             action: 'Formúlario',
    //             privice: 'admin',
    //             aliasIcon: 'icon-user-follow',
    //         },
    //         {
    //             name: 'Curriculum do Candidato',
    //             path: '/curriculum-viewer',
    //             show: false,
    //             components: CurriculumViewer,
    //             privice: 'admin',
    //             aliasIcon: 'flaticon-layers-1',
    //         },
    //     ],
    // },
    {
        name: 'Candidatos',
        path: '/list-candidato',
        action: 'Listagem',
        components: ListCandidato,
        icon: 'icon-people',
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
    {
        name: 'Administração',
        path: '/administracao',
        icon: 'flaticon-technology-1',
    },

    {
        name: 'Mobile Screen',
        path: '/mobile-root',
        icon: 'flaticon-home',
        show: false,
        layout: '/admin',
        components: MobileCore,
    },
    {
        name: 'Mobile',
        icon: 'flaticon-idea',
        show: false,
        collapse: true,
        children: [{
                name: 'Home',
                path: '/mobile-home',
                show: false,
                components: ListOportunidade,
            },
            {
                name: 'Settings',
                path: '/mobile-settings',
                show: false,
                components: CoreOportunidade,
                privice: 'admin',
            },
            {
                name: 'Profile',
                path: '/home-profile',
                show: false,
                components: VOp360,
                privice: 'admin',
                aliasIcon: 'flaticon-layers-1',
            },
        ],
    },
];

export default routes;