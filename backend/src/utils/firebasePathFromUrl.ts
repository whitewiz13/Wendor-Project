
export const getPathFromUrl = (url: string) => {
    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/spytest-334c7.appspot.com/o/";
    let imagePath: string = url.replace(baseUrl, "");
    const indexOfEndPath = imagePath.indexOf("?");
    imagePath = imagePath.substring(0, indexOfEndPath);
    imagePath = imagePath.replace("%2F", "/");
    return imagePath;
}