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

  async getAllCharacters () {
    const res = await this.getResource(`characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter)
  }

  async getCharacter (id) {
    const res = await this.getResource(`characters/${id}`);
    return this._transformCharacter(res);
  }

  async getAllBooks  ()  {
      const res = await this.getResource(`books?page=5&pageSize=10`);
      return res.map(this._transformBook)
  }

  async getBook (id) {
      const res =  this.getResource(`books/${id}`);
      return this._transformBook(res);
  }

  async getAllHouses () {
      const res = await this.getResource(`houses?page=5&pageSize=10`)
      return res.map(this._transformHouse)
  }

  async getHouse (id) {
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

  _transformBook = ({name, numberOfPages, publisher, released}) => {
    return this._transformEmptyFields({
        name,
        numberOfPages,
        publisher,
        released
    })
  }

  _transformHouse = ({name, region, words, titles, overlord, ancestralWeapons}) => {
      return this._transformEmptyFields({
          name,
          region,
          words,
          titles,
          overlord,
          ancestralWeapons
      })
  }

  _transformEmptyFields (obj) {
      for (let key in obj) {
          obj[key] = obj[key] ? obj[key] : ' no data :('
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
