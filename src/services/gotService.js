export default class GotService {
  constructor() {
      this._apiBase = 'https://www.anapioficeandfire.com/api/';
  }


  getResource = async (url) => {
      const res = await fetch(`${this._apiBase}${url}`);
      if (!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
      }
      return await res.json();
  }

   getAllCharacters = async () => {
    const res = await this.getResource(`characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter)
  }

   getCharacter = async (id) => {
    const res = await this.getResource(`characters/${id}`);
    return this._transformCharacter(res);
  }

   getAllBooks = async () => {
      const res = await this.getResource(`books?page=1&pageSize=10`);
      return res.map(this._transformBook)
  }

   getBook = async (id) => {
      const res = await this.getResource(`books/${id}`);
      return this._transformBook(res);
  }

   getAllHouses = async () => {
      const res = await this.getResource(`houses?page=1&pageSize=10`)
      return res.map(this._transformHouse)
  }

   getHouse  = async (id) => {
      const res = await this.getResource(`houses/${id}`);
      return this._transformHouse(res);
  }

  _transformCharacter = ({url, name, gender, born, died, culture}) => {
      const id = this._getIdFromURL(url)
      return {
          id,
          ...this._transformEmptyFields({
              name,
              gender,
              born,
              died,
              culture
          })
      }
  }

  _transformBook = ({url, name, numberOfPages, publisher, released}) => {
      const id = this._getIdFromURL(url)
      return {
          id,
          ...this._transformEmptyFields({
              name,
              numberOfPages,
              publisher,
              released
          })
      }
  }

  _transformHouse = ({url, name, region, words, titles, overlord, ancestralWeapons}) => {
      const id = this._getIdFromURL(url)
      return {
          id,
          ...this._transformEmptyFields({
              name,
              region,
              words,
              titles,
              ancestralWeapons
          })
      }
  }

  _transformEmptyFields (obj) {
      for (let key in obj) {
          obj[key] = (obj[key]) ? obj[key] : ' no data :('
          if (Array.isArray(obj[key])) {
              obj[key] = obj[key][0] ? obj[key]: 'no data :(';
          }
      }
      return obj;
  }

  _getIdFromURL(url){
      const regex = /\d/g;    
      return url.match(regex).join('');
  }

  // isSet(data){
  //     if(data){
  //         return data;
  //     } else {
  //         return 'no data :(';
  //     }
  //
  // }
}
