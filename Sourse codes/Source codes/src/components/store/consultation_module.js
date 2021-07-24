export default {
    state: () => ({
        //Отвечает за модуль создания
        create: false,
        //Отвечает за модуль редактирования
        editing: false,
        //Непосредственно сама консультация 
        //которую нужно изменить
        editing_consultation: [],
        //Отвечает за то, к какому пользователю мы 
        //привязываем консультацию
        id_patient: '',
        //Массив консультаций
        consultation_list: [],
    })
}