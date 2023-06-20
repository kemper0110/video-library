

export const translateType = type => {
    switch (type){
        case "season":
            return "сезон";
        case "movie":
            return "фильм";
        case "clip":
            return "клип";
    }
    return "";
}