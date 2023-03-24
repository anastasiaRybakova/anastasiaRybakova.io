import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=80009acf45e140d0710ce97f372a30ef';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

    const getComics = async () => {
        const res = await request(`${_apiBase}comics?limit=8&${_apiKey}`);
        return res.data.results.map(_transformComics);
    };

    const getSingleComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
            description: comics.description || 'Description is not found',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : "not available",
            language: comics.textObjects[0]?.language || "en-us"
        }
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    };

    return {loading, error, getAllCharacters, getCharacter, clearError, getComics, getSingleComic, getCharacterByName}
}

export default useMarvelService;
