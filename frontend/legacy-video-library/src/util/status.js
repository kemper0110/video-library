
export const localizeStatus = status => {
    switch(status){
        case "DELETE":
            return "Отсутствует в списке";
        case "PLANNED":
            return "Запланировано";
        case "WATCHING":
            return "Смотрю";
        case "WATCHED":
            return "Просмотрено";
        case "ABANDONED":
            return "Брошено";
    }
}

export const delocalizeStatus = status => {
    switch(status){
        case "Отсутствует в списке":
            return "DELETE";
        case "Запланировано":
            return "PLANNED";
        case "Смотрю":
            return "WATCHING";
        case "Просмотрено":
            return "WATCHED";
        case "Брошено":
            return "ABANDONED";
    }
}