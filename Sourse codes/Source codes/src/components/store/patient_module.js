export default {
    state: () => ({
        //Свитч, отвечает за отображение: 
        //Показать модуль просмотра или 
        //модуль создания?
        view_or_create: true,
        //Отвечает за модуль редактирования
        editing: false,
        //Отвечает за модуль консультаций пациента
        patient_all_consultation: false,
        //Непосредственно сам пациент которого нужно 
        //изменить
        editing_patient: [],
        //Отвечает за то, для какого пациента мы 
        //будем выводить консультации
        key_patient: '',
        //Массив пациентов
        patient_list: [{
                id: 1,
                family: 'Орешников',
                name: 'Анатолий',
                patronymic: 'Владимирович',
                date_birth: '22.05.1986',
                gender: 'Male',
                snils: '11223344595',
                physiological_data_patient: '184см 100кг 60лет',
                delete: false,
                patient_search: 'ОрешниковАнатолийВладимирович11223344595'
            },
            {
                id: 2,
                family: 'Орешников',
                name: 'Дмитрий',
                patronymic: 'Владимирович',
                date_birth: '22.05.1986',
                gender: 'Male',
                snils: '11223344595',
                physiological_data_patient: '160см 40кг 30лет',
                delete: false,
                patient_search: 'ОрешниковДмитрийВладимирович11223344595'
            },
            {
                id: 3,
                family: 'Парин',
                name: 'Вадим',
                patronymic: 'Петровович',
                date_birth: '21.03.1916',
                gender: 'Male',
                snils: '11223344595',
                physiological_data_patient: '195см 120кг 13лет',
                delete: false,
                patient_search: 'ПаринВадимПетровович11223344595'
            },
            {
                id: 4,
                family: 'Стрелкова',
                name: 'Катерина',
                patronymic: 'Михайловна',
                date_birth: '01.02.2006',
                gender: 'Female',
                snils: '11223344595',
                physiological_data_patient: '156см 40кг 19лет',
                delete: false,
                patient_search: 'СтрелковаКатеринаМихайловна11223344595'
            },
        ]
    })
}