const parseLang = fileName => {
    const lang = fileName.replace(" ", "").split(".");
    return lang[lang.length - 1];
}


export {
    parseLang
}